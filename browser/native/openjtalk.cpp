// Fixed OpenJTalk C core bridge. No Python ABI, interpreter or acoustic engine.
#include <emscripten/bind.h>
#include <emscripten/val.h>
#include <map>
#include <stdexcept>
#include <string>
#include <vector>
extern "C" {
#include "jpcommon.h"
#include "njd.h"
#include "mecab2njd.h"
#include "njd2jpcommon.h"
#include "njd_set_accent_phrase.h"
#include "njd_set_accent_type.h"
#include "njd_set_digit.h"
#include "njd_set_long_vowel.h"
#include "njd_set_pronunciation.h"
#include "njd_set_unvoiced_vowel.h"
#include "text2mecab.h"
}
#include "mecab.h"
using emscripten::val;
using std::string;
static MeCab::Model *model = nullptr;
static string str(const char *s) { return s ? s : ""; }
static val array() { return val::array(); }
static void push(val &a, const val &v) { a.call<void>("push", v); }
static val span(int a, int b) {
  val out = array();
  out.set(0, a);
  out.set(1, b);
  return out;
}
static string normalize(const string &text) {
  std::vector<char> buffer(65536);
  if (text2mecab(buffer.data(), buffer.size(), text.c_str()))
    throw std::runtime_error("text2mecab failed");
  return buffer.data();
}
static void initialize(const string &directory) {
  delete model;
  model = MeCab::createModel(("-d " + directory).c_str());
  if (!model)
    throw std::runtime_error("Cannot load OpenJTalk dictionary");
}
static val analyze(const string &text) {
  if (!model)
    throw std::runtime_error("Dictionary not loaded");
  auto *tagger = model->createTagger();
  auto *lattice = model->createLattice();
  string normalized = normalize(text);
  lattice->set_request_type(MECAB_NBEST);
  if (!Mecab_parse_lattice_with_numeral_boundaries(tagger, lattice,
                                                   normalized.c_str())) {
    delete lattice;
    delete tagger;
    throw std::runtime_error("MeCab parse failed");
  }
  const char *sentence = lattice->sentence();
  int size = lattice->size();
  std::vector<int> offsets(size + 1);
  int count = 0;
  for (int i = 0; i < size; i++) {
    offsets[i] = count;
    if ((static_cast<unsigned char>(sentence[i]) & 0xC0) != 0x80)
      count++;
  }
  offsets[size] = count;
  // Byte boundaries, including supplementary Unicode characters, map to code
  // points.
  count = 0;
  for (int i = 0; i < size;) {
    int width = 1;
    auto ch = static_cast<unsigned char>(sentence[i]);
    if (ch >= 240)
      width = 4;
    else if (ch >= 224)
      width = 3;
    else if (ch >= 192)
      width = 2;
    for (int j = 0; j < width && i + j < size; j++)
      offsets[i + j] = count;
    i += width;
    count++;
  }
  offsets[size] = count;
  std::vector<const MeCab::Node *> nodes{lattice->bos_node()};
  for (int i = 0; i <= size; i++)
    for (auto *n = lattice->begin_nodes(i); n; n = n->bnext)
      nodes.push_back(n);
  std::map<const MeCab::Node *, int> indices;
  for (int i = 0; i < (int)nodes.size(); i++)
    indices[nodes[i]] = i;
  val result = val::object(), out = array(), best = array(), edges = array();
  for (int i = 0; i < (int)nodes.size(); i++) {
    auto *n = nodes[i];
    val entry = val::object();
    int start = n->surface - sentence, end = start + n->length;
    if (start < 0 || end > size)
      start = end = 0;
    entry.set("is_tsqyomi_selected", false);
    entry.set("is_tsqyomi_target", false);
    entry.set("node_id", i);
    entry.set("surface", string(n->surface, n->length));
    entry.set("feature", str(n->feature));
    entry.set("char_span", span(offsets[start], offsets[end]));
    entry.set("pos_id", n->posid);
    entry.set("left_id", n->lcAttr);
    entry.set("right_id", n->rcAttr);
    entry.set("word_cost", n->wcost);
    entry.set("node_cost", double(n->cost));
    entry.set("stat", n->stat);
    entry.set("dictionary_index", n->dictionary_index);
    entry.set("is_unknown", n->stat == 1);
    entry.set("is_ignored", str(n->feature).find("記号,空白") != string::npos);
    entry.set("prev",
              n->prev && indices.count(n->prev) ? indices[n->prev] : -1);
    entry.set("next",
              n->next && indices.count(n->next) ? indices[n->next] : -1);
    push(out, entry);
    for (auto *p = n->rpath; p; p = p->rnext)
      if (indices.count(p->rnode)) {
        val e = val::object();
        e.set("left_node_id", i);
        e.set("right_node_id", indices[p->rnode]);
        e.set("cost", p->cost);
        push(edges, e);
      }
  }
  for (auto *n = lattice->bos_node(); n; n = n->next)
    if (n->stat != 2 && n->stat != 3 && n->stat != 4)
      push(best, val(indices[n]));
  result.set("normalized_text", normalized);
  result.set("nodes", out);
  result.set("best", best);
  result.set("connections", edges);
  delete lattice;
  delete tagger;
  return result;
}
#define STR_FIELDS(F)                                                          \
  F(string)                                                                    \
  F(pos) F(pos_group1) F(pos_group2) F(pos_group3) F(ctype) F(cform) F(orig)   \
      F(read) F(pron) F(chain_rule)
static val dump(NJD *njd) {
  val out = array();
  for (auto *n = njd->head; n; n = n->next) {
    val e = val::object();
#define GET(field) e.set(#field, str(NJDNode_get_##field(n)));
    STR_FIELDS(GET)
#undef GET
    e.set("is_reading_protected", false);
    e.set("is_reading_rewritten", false);
    e.set("acc", NJDNode_get_acc(n));
    e.set("mora_size", NJDNode_get_mora_size(n));
    e.set("chain_flag", NJDNode_get_chain_flag(n));
    push(out, e);
  }
  return out;
}
static void load(NJD *njd, const val &features) {
  int length = features["length"].as<int>();
  for (int i = 0; i < length; i++) {
    val e = features[i];
    auto *n = (NJDNode *)calloc(1, sizeof(NJDNode));
    NJDNode_initialize(n);
#define SET(field) NJDNode_set_##field(n, e[#field].as<string>().c_str());
    STR_FIELDS(SET)
#undef SET
    NJDNode_set_acc(n, e["acc"].as<int>());
    NJDNode_set_mora_size(n, e["mora_size"].as<int>());
    NJDNode_set_chain_flag(n, e["chain_flag"].as<int>());
    NJD_push_node(njd, n);
  }
}
static val pronunciation(const val &input) {
  NJD njd;
  NJD_initialize(&njd);
  int length = input["length"].as<int>();
  std::vector<string> strings;
  std::vector<char *> features;
  for (int i = 0; i < length; i++)
    strings.push_back(input[i].as<string>());
  for (auto &s : strings)
    features.push_back(s.data());
  mecab2njd(&njd, features.data(), length);
  njd_set_pronunciation(&njd);
  val result = dump(&njd);
  NJD_clear(&njd);
  return result;
}
static val digit(const val &input) {
  NJD njd;
  NJD_initialize(&njd);
  load(&njd, input);
  njd_set_digit(&njd);
  val out = dump(&njd);
  NJD_clear(&njd);
  return out;
}
static val accent(const val &input) {
  NJD njd;
  NJD_initialize(&njd);
  load(&njd, input);
  njd_set_accent_phrase(&njd);
  njd_set_accent_type(&njd);
  njd_set_unvoiced_vowel(&njd);
  njd_set_long_vowel(&njd);
  val out = dump(&njd);
  NJD_clear(&njd);
  return out;
}
static val unvoiced(const val &input) {
  NJD njd;
  NJD_initialize(&njd);
  load(&njd, input);
  njd_set_unvoiced_vowel(&njd);
  val out = dump(&njd);
  NJD_clear(&njd);
  return out;
}
static val labels(const val &input) {
  NJD njd;
  JPCommon jp;
  NJD_initialize(&njd);
  JPCommon_initialize(&jp);
  load(&njd, input);
  njd2jpcommon(&jp, &njd);
  JPCommon_make_label(&jp);
  val out = array();
  for (int i = 0; i < JPCommon_get_label_size(&jp); i++)
    push(out, val(str(JPCommon_get_label_feature(&jp)[i])));
  JPCommon_clear(&jp);
  NJD_clear(&njd);
  return out;
}
static val phones(const val &input) {
  NJD njd;
  JPCommon jp;
  NJD_initialize(&njd);
  JPCommon_initialize(&jp);
  val audible = array(), out = array(), moras = array(),
      absorbed = val::object();
  std::vector<int> indices;
  for (int i = 0; i < input["length"].as<int>(); i++) {
    push(out, array());
    push(moras, val(0));
    if (input[i]["pron"].as<string>() != "") {
      push(audible, input[i]);
      indices.push_back(i);
    }
  }
  load(&njd, audible);
  njd2jpcommon(&jp, &njd);
  jp.label = (JPCommonLabel *)calloc(1, sizeof(JPCommonLabel));
  JPCommonLabel_initialize(jp.label);
  std::map<JPCommonLabelWord *, int> owner;
  int i = 0;
  for (auto *node = jp.head; node; node = node->next, i++) {
    auto *prev = jp.label->word_tail;
    auto *previousMora = prev ? prev->tail : nullptr;
    JPCommonLabel_push_word(
        jp.label, JPCommonNode_get_pron(node), JPCommonNode_get_pos(node),
        JPCommonNode_get_ctype(node), JPCommonNode_get_cform(node),
        JPCommonNode_get_acc(node), JPCommonNode_get_chain_flag(node));
    if (prev != jp.label->word_tail && jp.label->word_tail)
      owner[jp.label->word_tail] = indices[i];
    if (previousMora) {
      int count = 0;
      for (auto *m = previousMora->next; m && m->up == prev; m = m->next)
        count++;
      if (count)
        absorbed.set(std::to_string(indices[i]), span(owner[prev], count));
    }
  }
  std::map<JPCommonLabelMora *, bool> counted;
  for (auto *p = jp.label->phoneme_head; p; p = p->next)
    if (p->up && p->up->up && owner.count(p->up->up) &&
        str(p->phoneme) != "pau") {
      int index = owner[p->up->up];
      val a = out[index];
      push(a, val(str(p->phoneme)));
      if (!counted[p->up]) {
        counted[p->up] = true;
        moras.set(index, moras[index].as<int>() + 1);
      }
    }
  val result = val::object();
  result.set("phones", out);
  result.set("moras", moras);
  result.set("absorbed", absorbed);
  JPCommon_clear(&jp);
  NJD_clear(&njd);
  return result;
}
EMSCRIPTEN_BINDINGS(hanezu_jtalk) {
  emscripten::function("initialize", &initialize);
  emscripten::function("normalize", &normalize);
  emscripten::function("analyze", &analyze);
  emscripten::function("pronunciation", &pronunciation);
  emscripten::function("digit", &digit);
  emscripten::function("accent", &accent);
  emscripten::function("unvoiced", &unvoiced);
  emscripten::function("labels", &labels);
  emscripten::function("phones", &phones);
}
