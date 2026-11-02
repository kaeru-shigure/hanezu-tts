// HZD1: radix surface index and interned OpenJTalk features. MIT (HanezuTTS).
#ifndef HANEZU_COMPACT_DICTIONARY_H
#define HANEZU_COMPACT_DICTIONARY_H
#include <cstdint>
#include <cstring>
#include <limits>

namespace hanezu {
template <class Token> class Dictionary {
  const uint32_t *header_ = nullptr, *children_ = nullptr, *edges_ = nullptr,
                 *values_ = nullptr, *refs_ = nullptr, *grammars_ = nullptr,
                 *suffixes_ = nullptr;
  const char *labels_ = nullptr, *strings_ = nullptr;
  const Token *tokens_ = nullptr;

  const char *stringAt(uint32_t offset) const { return strings_ + offset; }

public:
  static bool hasMagic(const char *data, size_t size) {
    return size >= 4 && std::memcmp(data, "HZD1", 4) == 0;
  }
  bool active() const { return header_ != nullptr; }
  void close() { header_ = nullptr; }
  uint32_t size() const { return header_[2]; }
  uint32_t leftSize() const { return header_[3]; }
  uint32_t rightSize() const { return header_[4]; }
  bool open(const char *data, size_t bytes) {
    close();
    if (bytes < 64 || !hasMagic(data, bytes))
      return false;
    const auto *h = reinterpret_cast<const uint32_t *>(data);
    if (h[1] != 1 || h[10] != bytes || !h[2] || !h[3] || !h[4] || !h[5] ||
        !h[7] || !h[8] || !h[9] || h[7] > 65536 || h[8] > 65536)
      return false;
    for (int i = 11; i < 16; ++i)
      if (h[i])
        return false;
    const uint64_t paddedLabels = (uint64_t(h[6]) + 3) & ~uint64_t(3);
    const uint64_t expected = 64 + (uint64_t(h[5]) * 3 + 2) * 4 + paddedLabels +
                              uint64_t(h[2]) * 28 +
                              (uint64_t(h[7]) + h[8]) * 4 + h[9];
    if (expected != bytes || h[2] > std::numeric_limits<uint32_t>::max() / 12)
      return false;
    const auto *p = reinterpret_cast<const uint32_t *>(data + 64);
    children_ = p;
    p += h[5] + 1;
    edges_ = p;
    p += h[5] + 1;
    values_ = p;
    p += h[5];
    labels_ = reinterpret_cast<const char *>(p);
    p += paddedLabels / 4;
    tokens_ = reinterpret_cast<const Token *>(p);
    p += uint64_t(h[2]) * 4;
    refs_ = p;
    p += uint64_t(h[2]) * 3;
    grammars_ = p;
    p += h[7];
    suffixes_ = p;
    p += h[8];
    strings_ = reinterpret_cast<const char *>(p);
    // Validate all references once. Runtime lookup never interprets unchecked
    // offsets, including when a corrupt file is supplied outside CacheStorage.
    if (strings_[h[9] - 1] != 0 || children_[0] != 1 ||
        children_[h[5]] != h[5] || edges_[0] != 0 || edges_[1] != 0 ||
        edges_[h[5]] != h[6])
      return false;
    for (uint32_t i = 0; i < h[5]; ++i) {
      if (children_[i] > children_[i + 1] || children_[i + 1] > h[5] ||
          (children_[i] != children_[i + 1] && children_[i] <= i) ||
          edges_[i] > edges_[i + 1] || edges_[i + 1] > h[6] ||
          (i && edges_[i] == edges_[i + 1]))
        return false;
      const uint32_t value = values_[i], count = value & 255;
      if (value != UINT32_MAX &&
          (!count || (value >> 8) >= h[2] || count > h[2] - (value >> 8)))
        return false;
    }
    // All edge ranges are now known to be safe. Siblings must be byte-sorted.
    for (uint32_t i = 0; i < h[5]; ++i)
      for (uint32_t j = children_[i] + 1; j < children_[i + 1]; ++j)
        if (static_cast<unsigned char>(labels_[edges_[j - 1]]) >=
            static_cast<unsigned char>(labels_[edges_[j]]))
          return false;
    for (uint32_t i = 0; i < h[2]; ++i) {
      const Token &t = tokens_[i];
      if (t.lcAttr >= h[3] || t.rcAttr >= h[4] || t.feature != i * 12 ||
          (t.compound & 65535) >= h[7] || (t.compound >> 16) >= h[8])
        return false;
    }
    for (uint64_t i = 0; i < uint64_t(h[2]) * 3; ++i)
      if (refs_[i] >= h[9] || (refs_[i] && strings_[refs_[i] - 1]))
        return false;
    for (uint32_t i = 0; i < h[7]; ++i)
      if (grammars_[i] >= h[9] || (grammars_[i] && strings_[grammars_[i] - 1]))
        return false;
    for (uint32_t i = 0; i < h[8]; ++i)
      if (suffixes_[i] >= h[9] || (suffixes_[i] && strings_[suffixes_[i] - 1]))
        return false;
    header_ = h;
    return true;
  }
  const Token *tokens(uint32_t value) const { return tokens_ + (value >> 8); }

  template <class Result>
  size_t search(const char *key, size_t length, Result *result,
                size_t capacity) const {
    uint32_t node = 0;
    size_t position = 0, found = 0;
    for (;;) {
      if (values_[node] != UINT32_MAX) {
        if (found < capacity) {
          result[found].value = values_[node];
          result[found].length = position;
        }
        ++found;
      }
      if (position == length)
        break;
      uint32_t low = children_[node], high = children_[node + 1];
      const auto ch = static_cast<unsigned char>(key[position]);
      // Compressed unary paths cost one memcmp; branching nodes use binary
      // search over contiguous children, without materializing any surface.
      while (low < high) {
        const uint32_t mid = low + (high - low) / 2;
        if (static_cast<unsigned char>(labels_[edges_[mid]]) < ch)
          low = mid + 1;
        else
          high = mid;
      }
      if (low == children_[node + 1])
        break;
      const uint32_t start = edges_[low], size = edges_[low + 1] - start;
      if (size > length - position ||
          std::memcmp(key + position, labels_ + start, size))
        break;
      position += size;
      node = low;
    }
    return found;
  }
  template <class Result> Result exact(const char *key) const {
    // MeCab uses exact lookup for dictionary metadata/unknown categories.
    Result results[512], out;
    out.value = -1;
    out.length = 0;
    const size_t length = std::strlen(key);
    const size_t count = search(key, length, results, 512);
    for (size_t i = 0; i < count && i < 512; ++i)
      if (results[i].length == length)
        return results[i];
    return out;
  }
  template <class Allocator>
  const char *feature(const Token &t, Allocator *allocator) const {
    const auto *r = refs_ + t.feature / 4;
    const char *parts[] = {stringAt(grammars_[t.compound & 65535]),
                           stringAt(r[0]), stringAt(r[1]), stringAt(r[2]),
                           stringAt(suffixes_[t.compound >> 16])};
    size_t sizes[5], total = 4;
    for (int i = 0; i < 5; ++i) {
      sizes[i] = std::strlen(parts[i]);
      total += sizes[i];
    }
    char *out = allocator->alloc(total), *p = out;
    for (int i = 0; i < 5; ++i) {
      if (i)
        *p++ = ',';
      std::memcpy(p, parts[i], sizes[i]);
      p += sizes[i];
    }
    *p = 0;
    // The lattice allocator owns this buffer and frees it with the parse.
    return out;
  }
};
} // namespace hanezu
#endif
