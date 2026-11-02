// Generated from pyopenjtalk-plus e7713f2d6d91f392f595df5e8998ff2b62c3b6f5; see tools/build_rules.py.
var unicodedata = {};
import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __mergefields__, __mergekwargtrans__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __pyUseJsNext__, __rshift__, __setitem__, __setproperty__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __withblock__, __xor__, _sort, abs, all, any, assert, bin, bool, bytearray, bytes, callable, chr, delattr, dict, dir, divmod, filter, float, getattr, hasattr, hex, input, int, isinstance, issubclass, len, list, map, max, min, object, oct, ord, pow, print, property, py_TypeError, py_enumerate, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
import {ITAIJI_MAP} from './_itaiji_map.js';
import {CJKVI_VARIANTS} from './_cjkvi_variants_map.js';
import * as __module_unicodedata__ from './unicodedata.js';
__nest__ (unicodedata, '', __module_unicodedata__);
import {join_strings, maketrans, merge_dict, translate} from './compatibility.js';
var __name__ = 'utils';
export var _SMALL_KANA = __call__ (set, null, 'ャュョァィゥェォヮ');
export var _SEION_CHAR_MAP = dict ({'が': 'か', 'ぎ': 'き', 'ぐ': 'く', 'げ': 'け', 'ご': 'こ', 'ざ': 'さ', 'じ': 'し', 'ず': 'す', 'ぜ': 'せ', 'ぞ': 'そ', 'だ': 'た', 'ぢ': 'ち', 'づ': 'つ', 'で': 'て', 'ど': 'と', 'ば': 'は', 'び': 'ひ', 'ぶ': 'ふ', 'べ': 'へ', 'ぼ': 'ほ', 'ガ': 'カ', 'ギ': 'キ', 'グ': 'ク', 'ゲ': 'ケ', 'ゴ': 'コ', 'ザ': 'サ', 'ジ': 'シ', 'ズ': 'ス', 'ゼ': 'セ', 'ゾ': 'ソ', 'ダ': 'タ', 'ヂ': 'チ', 'ヅ': 'ツ', 'デ': 'テ', 'ド': 'ト', 'バ': 'ハ', 'ビ': 'ヒ', 'ブ': 'フ', 'ベ': 'ヘ', 'ボ': 'ホ', 'ヴ': 'ウ'});
export var _DAN_MAP = dict ({'ア': 'a', 'カ': 'a', 'サ': 'a', 'タ': 'a', 'ナ': 'a', 'ハ': 'a', 'マ': 'a', 'ヤ': 'a', 'ラ': 'a', 'ワ': 'a', 'ガ': 'a', 'ザ': 'a', 'ダ': 'a', 'バ': 'a', 'パ': 'a', 'ァ': 'a', 'イ': 'i', 'キ': 'i', 'シ': 'i', 'チ': 'i', 'ニ': 'i', 'ヒ': 'i', 'ミ': 'i', 'リ': 'i', 'ギ': 'i', 'ジ': 'i', 'ヂ': 'i', 'ビ': 'i', 'ピ': 'i', 'ィ': 'i', 'ウ': 'u', 'ク': 'u', 'ス': 'u', 'ツ': 'u', 'ヌ': 'u', 'フ': 'u', 'ム': 'u', 'ユ': 'u', 'ル': 'u', 'グ': 'u', 'ズ': 'u', 'ヅ': 'u', 'ブ': 'u', 'プ': 'u', 'ヴ': 'u', 'ゥ': 'u', 'エ': 'e', 'ケ': 'e', 'セ': 'e', 'テ': 'e', 'ネ': 'e', 'ヘ': 'e', 'メ': 'e', 'レ': 'e', 'ゲ': 'e', 'ゼ': 'e', 'デ': 'e', 'ベ': 'e', 'ペ': 'e', 'ェ': 'e', 'オ': 'o', 'コ': 'o', 'ソ': 'o', 'ト': 'o', 'ノ': 'o', 'ホ': 'o', 'モ': 'o', 'ヨ': 'o', 'ロ': 'o', 'ヲ': 'o', 'ゴ': 'o', 'ゾ': 'o', 'ド': 'o', 'ボ': 'o', 'ポ': 'o', 'ォ': 'o'});
export var _OLD_PROVINCE_NAMES = __call__ (set, null, new set (['山城', '大和', '河内', '和泉', '摂津', '伊賀', '伊勢', '志摩', '尾張', '三河', '遠江', '駿河', '伊豆', '甲斐', '相模', '武蔵', '安房', '上総', '下総', '常陸', '近江', '美濃', '飛騨', '信濃', '上野', '下野', '陸奥', '出羽', '若狭', '越前', '加賀', '能登', '越中', '越後', '佐渡', '丹波', '丹後', '但馬', '因幡', '伯耆', '出雲', '石見', '隠岐', '播磨', '美作', '備前', '備中', '備後', '安芸', '周防', '長門', '紀伊', '淡路', '阿波', '讃岐', '伊予', '土佐', '筑前', '筑後', '豊前', '豊後', '肥前', '肥後', '日向', '大隅', '薩摩', '壱岐', '対馬', '岩代', '磐城', '陸前', '陸中', '羽前', '羽後', '渡島', '後志', '胆振', '石狩', '天塩', '北見', '日高', '十勝', '釧路', '根室', '千島', '大倭', '御野', '諏方', '石城', '石背', '多禰', '筑紫', '末廬', '高志', '上毛野', '下毛野', '三野', '針間', '吉備', '科野']));
export var _INDEPENDENT_PREFIXES = __call__ (set, null, new set (['本', '当', '同', '全']));
export var _VARIANT_MAP = __call__ (merge_dict, null, CJKVI_VARIANTS, ITAIJI_MAP);
export var _ITAIJI_TRANSLATION = __call__ (maketrans, null, _VARIANT_MAP);
export var _ROMAN_NUMERAL_VALUES = (function () {
	var __accu0__ = [];
	var __iterable0__ = tuple ([8544, 8560]);
	__iterable0__ = __i__ (__iterable0__);
	for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
		var start = __getitem__ (__iterable0__, __index0__);
		var __iterable1__ = __call__ (zip, null, (function () {
			var __accu1__ = [];
			for (var offset = 0; offset < 16; offset++) {
				(function () {
					var __accu2__ = __accu1__;
					return __call__ (__accu2__.append, __accu2__, __call__ (chr, null, __add__ (start, offset)));
				}) ();
			}
			return __accu1__;
		}) (), tuple ([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 50, 100, 500, 1000]));
		__iterable1__ = __i__ (__iterable1__);
		for (var __index1__ = 0; __index1__ < len (__iterable1__); __index1__++) {
			var __left0__ = __getitem__ (__iterable1__, __index1__);
			var character = __left0__ [0];
			var value = __left0__ [1];
			(function () {
				var __accu1__ = __accu0__;
				return __call__ (__accu1__.append, __accu1__, [character, value]);
			}) ();
		}
	}
	return dict (__accu0__);
}) ();
export var _FULLWIDTH_DIGIT_TRANSLATION = __call__ (maketrans, null, '0123456789', '０１２３４５６７８９');
export var _LONG_VOWEL_KANA = __call__ (set, null, 'アイウエオァィゥェォ');
export var _YOTSUGANA_PAIRS = __call__ (set, null, new set ([tuple (['ヅ', 'ズ']), tuple (['ヂ', 'ジ'])]));
export var normalize_text = function (text, normalize_mode) {
	if (typeof normalize_mode == 'undefined' || (normalize_mode != null && normalize_mode.hasOwnProperty ("__kwargtrans__"))) {;
		var normalize_mode = 'None';
	};
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'text': var text = __allkwargs0__ [__attrib0__]; break;
					case 'normalize_mode': var normalize_mode = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	if (__t__ (!__in__ (normalize_mode, tuple (['None', 'NFC', 'NFKC'])))) {
		var __except0__ = __call__ (ValueError, null, "normalize_mode must be one of 'None', 'NFC', or 'NFKC'");
		__except0__.__cause__ = null;
		throw __except0__;
	}
	if (__t__ (__eq__ (normalize_mode, 'None'))) {
		return text;
	}
	var normalized_form = (__t__ (__eq__ (normalize_mode, 'NFC')) ? 'NFC' : 'NFKC');
	if (__t__ ((function () {
		var __accu0__ = unicodedata;
		return __call__ (__accu0__.is_normalized, __accu0__, normalized_form, text);
	}) () === true)) {
		return text;
	}
	return (function () {
		var __accu0__ = unicodedata;
		return __call__ (__accu0__.normalize, __accu0__, normalized_form, text);
	}) ();
};
export var normalize_itaiji = function (text, target_characters) {
	if (typeof target_characters == 'undefined' || (target_characters != null && target_characters.hasOwnProperty ("__kwargtrans__"))) {;
		var target_characters = null;
	};
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'text': var text = __allkwargs0__ [__attrib0__]; break;
					case 'target_characters': var target_characters = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	if (__t__ (target_characters !== null)) {
		return __call__ (join_strings, null, '', (function () {
			var __accu0__ = [];
			var __iterable0__ = text;
			__iterable0__ = __i__ (__iterable0__);
			for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
				var character = __getitem__ (__iterable0__, __index0__);
				(function () {
					var __accu1__ = __accu0__;
					return __call__ (__accu1__.append, __accu1__, (__t__ (__in__ (character, target_characters)) ? (function () {
						var __accu2__ = _VARIANT_MAP;
						return __call__ (__accu2__.py_get, __accu2__, character, character);
					}) () : character));
				}) ();
			}
			return __accu0__;
		}) ());
	}
	return __call__ (translate, null, text, _ITAIJI_TRANSLATION);
};
export var normalize_unknown_itaiji = function (text) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'text': var text = __allkwargs0__ [__attrib0__]; break;
					case 'inference_jtalk': var inference_jtalk = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var _is_kanji = function (character) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'character': var character = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		var codepoint = __call__ (ord, null, character);
		return __t__ ((__le__ (13312, codepoint) && __le__ (codepoint, 19903))) || __t__ ((__le__ (19968, codepoint) && __le__ (codepoint, 40959))) || __t__ ((__le__ (63744, codepoint) && __le__ (codepoint, 64255))) || (__le__ (131072, codepoint) && __le__ (codepoint, 262143));
	};
	var _is_resolved_replacement = function (index, original_morphs, candidate_morphs, mecab_indices) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'index': var index = __allkwargs0__ [__attrib0__]; break;
						case 'original_morphs': var original_morphs = __allkwargs0__ [__attrib0__]; break;
						case 'candidate_morphs': var candidate_morphs = __allkwargs0__ [__attrib0__]; break;
						case 'mecab_indices': var mecab_indices = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		var mecab_index = __getitem__ (mecab_indices, index);
		var morph = __call__ (py_next, null, __call__ (py_iter, null, (function () {
			var __accu0__ = [];
			var __iterable0__ = candidate_morphs;
			__iterable0__ = __i__ (__iterable0__);
			for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
				var candidate_morph = __getitem__ (__iterable0__, __index0__);
				if (__t__ ((__le__ (__getitem__ (__getitem__ (candidate_morph, 'char_span'), 0), mecab_index) && __lt__ (mecab_index, __getitem__ (__getitem__ (candidate_morph, 'char_span'), 1))))) {
					(function () {
						var __accu1__ = __accu0__;
						return __call__ (__accu1__.append, __accu1__, candidate_morph);
					}) ();
				}
			}
			return __accu0__;
		}) ()), null);
		if (__t__ (__t__ (morph === null) || __getitem__ (morph, 'is_unknown') === true)) {
			return false;
		}
		var __left0__ = __getitem__ (morph, 'char_span');
		var span_start = __left0__ [0];
		var span_end = __left0__ [1];
		if (__t__ (__eq__ (__sub__ (span_end, span_start), 1))) {
			return __t__ ((__t__ (__eq__ (index, 0)) || __call__ (_is_kanji, null, __getitem__ (text, __sub__ (index, 1))) === false)) && (__t__ (__eq__ (__add__ (index, 1), __call__ (len, null, text))) || __call__ (_is_kanji, null, __getitem__ (text, __add__ (index, 1))) === false);
		}
		if (__t__ (__ne__ (__getitem__ (morph, 'dictionary_index'), 0))) {
			return false;
		}
		var __iterable0__ = original_morphs;
		__iterable0__ = __i__ (__iterable0__);
		for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
			var original_morph = __getitem__ (__iterable0__, __index0__);
			var __left0__ = __getitem__ (original_morph, 'char_span');
			var original_start = __left0__ [0];
			var original_end = __left0__ [1];
			if (__t__ (__t__ (__le__ (original_end, span_start)) || __ge__ (original_start, span_end))) {
				continue;
			}
			if (__t__ (__getitem__ (original_morph, 'is_unknown') === true)) {
				continue;
			}
			if (__t__ (__t__ (__ne__ (__getitem__ (original_morph, 'dictionary_index'), 0)) || __t__ (__lt__ (original_start, span_start)) || __gt__ (original_end, span_end))) {
				return false;
			}
		}
		return true;
	};
	if (__t__ (__call__ (all, null, (function () {
		var __accu0__ = [];
		var __iterable0__ = text;
		__iterable0__ = __i__ (__iterable0__);
		for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
			var character = __getitem__ (__iterable0__, __index0__);
			(function () {
				var __accu1__ = __accu0__;
				return __call__ (__accu1__.append, __accu1__, !__in__ (character, _VARIANT_MAP));
			}) ();
		}
		return __accu0__;
	}) ()))) {
		return text;
	}
	var __left0__ = (function () {
		var __accu0__ = inference_jtalk;
		return __call__ (__accu0__.run_mecab_detailed, __accu0__, text);
	}) ();
	var _ = __left0__ [0];
	var original_morphs = __left0__ [1];
	var mecab_indices = __call__ (_mecab_index_by_original_index, null, text, __kwargtrans__ ({inference_jtalk: inference_jtalk}));
	if (__t__ (mecab_indices === null)) {
		return text;
	}
	var unknown_mecab_indices = (function () {
		var __accu0__ = [];
		var __iterable0__ = original_morphs;
		__iterable0__ = __i__ (__iterable0__);
		for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
			var morph = __getitem__ (__iterable0__, __index0__);
			if (__t__ (__getitem__ (morph, 'is_unknown') === true)) {
				var __iterable1__ = __call__ (range, null, ...__getitem__ (morph, 'char_span'));
				__iterable1__ = __i__ (__iterable1__);
				for (var __index1__ = 0; __index1__ < len (__iterable1__); __index1__++) {
					var mecab_index = __getitem__ (__iterable1__, __index1__);
					(function () {
						var __accu1__ = __accu0__;
						return __call__ (__accu1__.append, __accu1__, mecab_index);
					}) ();
				}
			}
		}
		return set (__accu0__);
	}) ();
	var replacements = (function () {
		var __accu0__ = [];
		var __iterable0__ = __call__ (py_enumerate, null, text);
		__iterable0__ = __i__ (__iterable0__);
		for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
			var __left0__ = __getitem__ (__iterable0__, __index0__);
			var index = __left0__ [0];
			var character = __left0__ [1];
			if (__t__ (__t__ (__in__ (character, _VARIANT_MAP)) && __in__ (__getitem__ (mecab_indices, index), unknown_mecab_indices))) {
				(function () {
					var __accu1__ = __accu0__;
					return __call__ (__accu1__.append, __accu1__, [index, __getitem__ (_VARIANT_MAP, character)]);
				}) ();
			}
		}
		return dict (__accu0__);
	}) ();
	for (var _ = 0; _ < 2; _++) {
		if (__t__ (__eq__ (__call__ (len, null, replacements), 0))) {
			break;
		}
		var candidate_text = __call__ (join_strings, null, '', (function () {
			var __accu0__ = [];
			var __iterable0__ = __call__ (py_enumerate, null, text);
			__iterable0__ = __i__ (__iterable0__);
			for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
				var __left0__ = __getitem__ (__iterable0__, __index0__);
				var index = __left0__ [0];
				var character = __left0__ [1];
				(function () {
					var __accu1__ = __accu0__;
					return __call__ (__accu1__.append, __accu1__, (function () {
						var __accu2__ = replacements;
						return __call__ (__accu2__.py_get, __accu2__, index, character);
					}) ());
				}) ();
			}
			return __accu0__;
		}) ());
		if (__t__ (__ne__ (__call__ (_mecab_index_by_original_index, null, candidate_text, __kwargtrans__ ({inference_jtalk: inference_jtalk})), mecab_indices))) {
			break;
		}
		var __left0__ = (function () {
			var __accu0__ = inference_jtalk;
			return __call__ (__accu0__.run_mecab_detailed, __accu0__, candidate_text);
		}) ();
		var _ = __left0__ [0];
		var candidate_morphs = __left0__ [1];
		var retained = (function () {
			var __accu0__ = [];
			var __iterable0__ = (function () {
				var __accu1__ = replacements;
				return __call__ (__accu1__.py_items, __accu1__);
			}) ();
			__iterable0__ = __i__ (__iterable0__);
			for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
				var __left0__ = __getitem__ (__iterable0__, __index0__);
				var index = __left0__ [0];
				var proper = __left0__ [1];
				if (__t__ (__call__ (_is_resolved_replacement, null, index, original_morphs, candidate_morphs, mecab_indices))) {
					(function () {
						var __accu1__ = __accu0__;
						return __call__ (__accu1__.append, __accu1__, [index, proper]);
					}) ();
				}
			}
			return dict (__accu0__);
		}) ();
		if (__t__ (__eq__ (__call__ (len, null, retained), __call__ (len, null, replacements)))) {
			return candidate_text;
		}
		var replacements = retained;
	}
	return text;
};
export var normalize_roman_numerals = function (text) {
	var inference_jtalk = null;
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'text': var text = __allkwargs0__ [__attrib0__]; break;
					case 'inference_jtalk': var inference_jtalk = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var _roman_numeral_value = function (numeral) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'numeral': var numeral = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		var py_values = (function () {
			var __accu0__ = [];
			var __iterable0__ = numeral;
			__iterable0__ = __i__ (__iterable0__);
			for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
				var character = __getitem__ (__iterable0__, __index0__);
				(function () {
					var __accu1__ = __accu0__;
					return __call__ (__accu1__.append, __accu1__, __getitem__ (_ROMAN_NUMERAL_VALUES, character));
				}) ();
			}
			return __accu0__;
		}) ();
		var value = __call__ (sum, null, (function () {
			var __accu0__ = [];
			var __iterable0__ = __call__ (py_enumerate, null, py_values);
			__iterable0__ = __i__ (__iterable0__);
			for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
				var __left0__ = __getitem__ (__iterable0__, __index0__);
				var index = __left0__ [0];
				var current = __left0__ [1];
				(function () {
					var __accu1__ = __accu0__;
					return __call__ (__accu1__.append, __accu1__, (__t__ (__t__ (__lt__ (__add__ (index, 1), __call__ (len, null, py_values))) && __lt__ (current, __getitem__ (py_values, __add__ (index, 1)))) ? __neg__ (current) : current));
				}) ();
			}
			return __accu0__;
		}) ());
		var canonical = '';
		var remaining = value;
		var __iterable0__ = tuple ([tuple ([1000, 'M']), tuple ([900, 'CM']), tuple ([500, 'D']), tuple ([400, 'CD']), tuple ([100, 'C']), tuple ([90, 'XC']), tuple ([50, 'L']), tuple ([40, 'XL']), tuple ([10, 'X']), tuple ([9, 'IX']), tuple ([5, 'V']), tuple ([4, 'IV']), tuple ([1, 'I'])]);
		__iterable0__ = __i__ (__iterable0__);
		for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
			var __left0__ = __getitem__ (__iterable0__, __index0__);
			var symbol_value = __left0__ [0];
			var symbol = __left0__ [1];
			var __left0__ = __call__ (divmod, null, remaining, symbol_value);
			var count = __left0__ [0];
			var remaining = __left0__ [1];
			var canonical = __call__ (__iadd__, null, canonical, __mul__ (symbol, count));
		}
		if (__t__ (__ne__ ((function () {
			var __accu0__ = (function () {
				var __accu1__ = unicodedata;
				return __call__ (__accu1__.normalize, __accu1__, 'NFKC', numeral);
			}) ();
			return __call__ (__accu0__.upper, __accu0__);
		}) (), canonical))) {
			return null;
		}
		return value;
	};
	if (__t__ (__call__ (any, null, (function () {
		var __accu0__ = [];
		var __iterable0__ = text;
		__iterable0__ = __i__ (__iterable0__);
		for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
			var character = __getitem__ (__iterable0__, __index0__);
			(function () {
				var __accu1__ = __accu0__;
				return __call__ (__accu1__.append, __accu1__, __in__ (character, _ROMAN_NUMERAL_VALUES));
			}) ();
		}
		return __accu0__;
	}) ()) === false)) {
		return text;
	}
	var kept_indices = __call__ (set, null);
	var kept_characters = __call__ (set, null);
	var user_dictionary_count = (__t__ (inference_jtalk !== null) ? __call__ (len, null, inference_jtalk.userdic_reading_protection) : 0);
	if (__t__ (__t__ (inference_jtalk !== null) && __gt__ (user_dictionary_count, 0))) {
		var __left0__ = (function () {
			var __accu0__ = inference_jtalk;
			return __call__ (__accu0__.run_mecab_detailed, __accu0__, text);
		}) ();
		var _ = __left0__ [0];
		var morphs = __left0__ [1];
		var user_dictionary_morphs = (function () {
			var __accu0__ = [];
			var __iterable0__ = morphs;
			__iterable0__ = __i__ (__iterable0__);
			for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
				var morph = __getitem__ (__iterable0__, __index0__);
				if (__t__ (__t__ (__getitem__ (morph, 'is_unknown') === false) && (__le__ (1, __getitem__ (morph, 'dictionary_index')) && __le__ (__getitem__ (morph, 'dictionary_index'), user_dictionary_count)))) {
					(function () {
						var __accu1__ = __accu0__;
						return __call__ (__accu1__.append, __accu1__, morph);
					}) ();
				}
			}
			return __accu0__;
		}) ();
		var user_dictionary_mecab_indices = (function () {
			var __accu0__ = [];
			var __iterable0__ = user_dictionary_morphs;
			__iterable0__ = __i__ (__iterable0__);
			for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
				var morph = __getitem__ (__iterable0__, __index0__);
				var __iterable1__ = __call__ (range, null, ...__getitem__ (morph, 'char_span'));
				__iterable1__ = __i__ (__iterable1__);
				for (var __index1__ = 0; __index1__ < len (__iterable1__); __index1__++) {
					var mecab_index = __getitem__ (__iterable1__, __index1__);
					(function () {
						var __accu1__ = __accu0__;
						return __call__ (__accu1__.append, __accu1__, mecab_index);
					}) ();
				}
			}
			return set (__accu0__);
		}) ();
		var mecab_indices = __call__ (_mecab_index_by_original_index, null, text, __kwargtrans__ ({inference_jtalk: inference_jtalk}));
		if (__t__ (mecab_indices === null)) {
			var kept_characters = (function () {
				var __accu0__ = [];
				var __iterable0__ = user_dictionary_morphs;
				__iterable0__ = __i__ (__iterable0__);
				for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
					var morph = __getitem__ (__iterable0__, __index0__);
					var __iterable1__ = __getitem__ (morph, 'surface');
					__iterable1__ = __i__ (__iterable1__);
					for (var __index1__ = 0; __index1__ < len (__iterable1__); __index1__++) {
						var character = __getitem__ (__iterable1__, __index1__);
						if (__t__ (__in__ (character, _ROMAN_NUMERAL_VALUES))) {
							(function () {
								var __accu1__ = __accu0__;
								return __call__ (__accu1__.append, __accu1__, character);
							}) ();
						}
					}
				}
				return set (__accu0__);
			}) ();
		}
		else {
			var kept_indices = (function () {
				var __accu0__ = [];
				var __iterable0__ = __call__ (py_enumerate, null, text);
				__iterable0__ = __i__ (__iterable0__);
				for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
					var __left0__ = __getitem__ (__iterable0__, __index0__);
					var index = __left0__ [0];
					var character = __left0__ [1];
					if (__t__ (__t__ (__in__ (character, _ROMAN_NUMERAL_VALUES)) && __in__ (__getitem__ (mecab_indices, index), user_dictionary_mecab_indices))) {
						(function () {
							var __accu1__ = __accu0__;
							return __call__ (__accu1__.append, __accu1__, index);
						}) ();
					}
				}
				return set (__accu0__);
			}) ();
		}
	}
	var _is_replaceable = function (index) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'index': var index = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		var character = __getitem__ (text, index);
		return __t__ (__in__ (character, _ROMAN_NUMERAL_VALUES)) && __t__ (!__in__ (index, kept_indices)) && !__in__ (character, kept_characters);
	};
	var pieces = [];
	var index = 0;
	while (__t__ (__lt__ (index, __call__ (len, null, text)))) {
		if (__t__ (__call__ (_is_replaceable, null, index) === false)) {
			(function () {
				var __accu0__ = pieces;
				return __call__ (__accu0__.append, __accu0__, __getitem__ (text, index));
			}) ();
			var index = __call__ (__iadd__, null, index, 1);
			continue;
		}
		var end = index;
		while (__t__ (__t__ (__lt__ (end, __call__ (len, null, text))) && __call__ (_is_replaceable, null, end) === true)) {
			var end = __call__ (__iadd__, null, end, 1);
		}
		var numeral = __getslice__ (text, index, end, 1);
		var value = __call__ (_roman_numeral_value, null, numeral);
		var is_adjacent_digit = __t__ (__t__ (__gt__ (index, 0)) && __in__ (__getitem__ (text, __sub__ (index, 1)), '0123456789０１２３４５６７８９')) || __t__ (__lt__ (end, __call__ (len, null, text))) && __in__ (__getitem__ (text, end), '0123456789０１２３４５６７８９');
		if (__t__ (__t__ (value !== null) && __t__ (__eq__ (__call__ (len, null, __call__ (str, null, value)), __call__ (len, null, numeral))) && is_adjacent_digit === false)) {
			(function () {
				var __accu0__ = pieces;
				return __call__ (__accu0__.append, __accu0__, __call__ (translate, null, __call__ (str, null, value), _FULLWIDTH_DIGIT_TRANSLATION));
			}) ();
		}
		else {
			(function () {
				var __accu0__ = pieces;
				return __call__ (__accu0__.append, __accu0__, numeral);
			}) ();
		}
		var index = end;
	}
	return __call__ (join_strings, null, '', pieces);
};
export var _mecab_index_by_original_index = function (source) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'source': var source = __allkwargs0__ [__attrib0__]; break;
					case 'inference_jtalk': var inference_jtalk = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var chunks = [];
	var index = 0;
	while (__t__ (__lt__ (index, __call__ (len, null, source)))) {
		var end = __add__ (index, 1);
		if (__t__ (__t__ (__lt__ (end, __call__ (len, null, source))) && __in__ (__getitem__ (source, end), 'ﾞﾟ゙゚'))) {
			var end = __call__ (__iadd__, null, end, 1);
		}
		while (__t__ (__t__ (__lt__ (end, __call__ (len, null, source))) && (__t__ ((__le__ ('︀', __getitem__ (source, end)) && __le__ (__getitem__ (source, end), '️'))) || (__le__ ('󠄀', __getitem__ (source, end)) && __le__ (__getitem__ (source, end), '󠇯'))))) {
			var end = __call__ (__iadd__, null, end, 1);
		}
		(function () {
			var __accu0__ = chunks;
			return __call__ (__accu0__.append, __accu0__, tuple ([__sub__ (end, index), (function () {
				var __accu1__ = inference_jtalk;
				return __call__ (__accu1__.normalize_for_mecab, __accu1__, __getslice__ (source, index, end, 1));
			}) ()]));
		}) ();
		var index = end;
	}
	if (__t__ (__ne__ (__call__ (join_strings, null, '', (function () {
		var __accu0__ = [];
		var __iterable0__ = chunks;
		__iterable0__ = __i__ (__iterable0__);
		for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
			var __left0__ = __getitem__ (__iterable0__, __index0__);
			var _ = __left0__ [0];
			var normalized = __left0__ [1];
			(function () {
				var __accu1__ = __accu0__;
				return __call__ (__accu1__.append, __accu1__, normalized);
			}) ();
		}
		return __accu0__;
	}) ()), (function () {
		var __accu0__ = inference_jtalk;
		return __call__ (__accu0__.normalize_for_mecab, __accu0__, source);
	}) ()))) {
		return null;
	}
	var mecab_indices = [];
	var mecab_index = 0;
	var __iterable0__ = chunks;
	__iterable0__ = __i__ (__iterable0__);
	for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
		var __left0__ = __getitem__ (__iterable0__, __index0__);
		var source_size = __left0__ [0];
		var normalized = __left0__ [1];
		if (__t__ (__eq__ (source_size, __call__ (len, null, normalized)))) {
			(function () {
				var __accu0__ = mecab_indices;
				return __call__ (__accu0__.extend, __accu0__, __call__ (range, null, mecab_index, __add__ (mecab_index, source_size)));
			}) ();
		}
		else {
			(function () {
				var __accu0__ = mecab_indices;
				return __call__ (__accu0__.extend, __accu0__, __mul__ ([mecab_index], source_size));
			}) ();
		}
		var mecab_index = __call__ (__iadd__, null, mecab_index, __call__ (len, null, normalized));
	}
	return mecab_indices;
};
export var fill_missing_feature_flags = function (njd_features) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'njd_features': var njd_features = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var __iterable0__ = njd_features;
	__iterable0__ = __i__ (__iterable0__);
	for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
		var feature = __getitem__ (__iterable0__, __index0__);
		(function () {
			var __accu0__ = feature;
			return __call__ (__accu0__.py_setdefault, __accu0__, 'is_reading_protected', false);
		}) ();
		(function () {
			var __accu0__ = feature;
			return __call__ (__accu0__.py_setdefault, __accu0__, 'is_reading_rewritten', false);
		}) ();
	}
	return njd_features;
};
export var fill_missing_morph_flags = function (morphs) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'morphs': var morphs = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var __iterable0__ = morphs;
	__iterable0__ = __i__ (__iterable0__);
	for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
		var morph = __getitem__ (__iterable0__, __index0__);
		(function () {
			var __accu0__ = morph;
			return __call__ (__accu0__.py_setdefault, __accu0__, 'is_tsqyomi_selected', false);
		}) ();
		(function () {
			var __accu0__ = morph;
			return __call__ (__accu0__.py_setdefault, __accu0__, 'is_tsqyomi_target', false);
		}) ();
	}
	return morphs;
};
export var is_high_confidence_nani_context = function (next_feature) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'next_feature': var next_feature = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	if (__t__ (next_feature === null)) {
		return false;
	}
	return __t__ (__in__ (__getitem__ (next_feature, 'orig'), new set (['を', 'が', 'に', 'も', 'より']))) || __t__ (__eq__ (__getitem__ (next_feature, 'orig'), 'する')) || __t__ (__eq__ (__getitem__ (next_feature, 'string'), 'で')) && __t__ (__eq__ (__getitem__ (next_feature, 'pos'), '助動詞')) && __eq__ (__getitem__ (next_feature, 'ctype'), '特殊・ダ');
};
export var suppress_unnatural_auxiliary_u_long_vowel = function (njd_features) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'njd_features': var njd_features = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	if (__t__ (__lt__ (__call__ (len, null, njd_features), 2))) {
		return njd_features;
	}
	for (var feature_index = 0; feature_index < __sub__ (__call__ (len, null, njd_features), 1); feature_index++) {
		var current_feature = __getitem__ (njd_features, feature_index);
		var next_feature = __getitem__ (njd_features, __add__ (feature_index, 1));
		if (__t__ (__t__ (__ne__ (__getitem__ (next_feature, 'pron'), 'ー')) || __ne__ (__getitem__ (next_feature, 'read'), 'ウ'))) {
			continue;
		}
		var current_pron = (function () {
			var __accu0__ = __getitem__ (current_feature, 'pron');
			return __call__ (__accu0__.rstrip, __accu0__, '’');
		}) ();
		if (__t__ (__eq__ (current_pron, ''))) {
			continue;
		}
		var previous_dan = (function () {
			var __accu0__ = _DAN_MAP;
			return __call__ (__accu0__.py_get, __accu0__, __getitem__ (current_pron, __neg__ (1)));
		}) ();
		if (__t__ (__in__ (previous_dan, tuple (['a', 'i', 'e'])))) {
			__setitem__ (next_feature, 'pron', 'ウ');
		}
	}
	return njd_features;
};
export var retreat_acc_nuc = function (njd_features) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'njd_features': var njd_features = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	if (__t__ (!__t__ ((njd_features)))) {
		return njd_features;
	}
	var inappropriate_for_nuclear_chars = ['ー', 'ッ', 'ン'];
	var delete_youon = __call__ (maketrans, null, '', '', __call__ (join_strings, null, '', _SMALL_KANA));
	var phase_len = 0;
	var acc = 0;
	var head = __getitem__ (njd_features, 0);
	var __iterable0__ = __call__ (py_enumerate, null, njd_features);
	__iterable0__ = __i__ (__iterable0__);
	for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
		var __left0__ = __getitem__ (__iterable0__, __index0__);
		var index = __left0__ [0];
		var njd = __left0__ [1];
		if (__t__ (__in__ (__getitem__ (njd, 'chain_flag'), [0, __neg__ (1)]))) {
			var head = njd;
			var acc = __getitem__ (njd, 'acc');
			var phase_len = 0;
		}
		var phase_len = __call__ (__iadd__, null, phase_len, __getitem__ (njd, 'mora_size'));
		var pron = (function () {
			var __accu0__ = __call__ (translate, null, __getitem__ (njd, 'pron'), delete_youon);
			return __call__ (__accu0__.py_replace, __accu0__, '’', '');
		}) ();
		if (__t__ (__eq__ (__call__ (len, null, pron), 0))) {
			var pron = __getitem__ (njd, 'pron');
		}
		if (__t__ (__gt__ (acc, 0))) {
			if (__t__ (__le__ (acc, __getitem__ (njd, 'mora_size')))) {
				var next_njd = (__t__ (__lt__ (__add__ (index, 1), __call__ (len, null, njd_features))) ? __getitem__ (njd_features, __add__ (index, 1)) : null);
				var is_c3_boundary = __t__ (__eq__ (acc, __getitem__ (njd, 'mora_size'))) && __t__ (next_njd !== null) && __t__ (__eq__ (__getitem__ (next_njd, 'chain_flag'), 1)) && __eq__ (__getitem__ (next_njd, 'chain_rule'), 'C3');
				try {
					var nuc_pron = __getitem__ (pron, __sub__ (acc, 1));
				}
				catch (__except0__) {
					if (isinstance (__except0__, IndexError)) {
						var nuc_pron = __getitem__ (pron, 0);
					}
					else {
						throw __except0__;
					}
				}
				var previous_kana = __getslice__ ((function () {
					var __accu0__ = __getitem__ (njd, 'pron');
					return __call__ (__accu0__.py_replace, __accu0__, '’', '');
				}) (), __neg__ (2), __neg__ (1), 1);
				var is_quasi_special_mora = __t__ (__t__ (__ge__ (__call__ (len, null, pron), 2)) && __t__ (__eq__ (nuc_pron, 'イ')) && (__t__ (__eq__ ((function () {
					var __accu0__ = _DAN_MAP;
					return __call__ (__accu0__.py_get, __accu0__, previous_kana);
				}) (), 'a')) || __eq__ (previous_kana, 'ャ'))) || (function () {
					var __accu0__ = __getitem__ (njd, 'pron');
					return __call__ (__accu0__.endswith, __accu0__, '’');
				}) ();
				if (__t__ (__t__ (__in__ (nuc_pron, inappropriate_for_nuclear_chars)) || __t__ (is_c3_boundary === true) && is_quasi_special_mora === true)) {
					__setitem__ (head, 'acc', __call__ (__iadd__, null, __getitem__ (head, 'acc'), __neg__ (1)));
				}
				var acc = __neg__ (1);
			}
			else {
				var acc = __sub__ (acc, __getitem__ (njd, 'mora_size'));
			}
		}
	}
	return njd_features;
};
export var modify_acc_after_chaining = function (njd_features) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'njd_features': var njd_features = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	if (__t__ (!__t__ ((njd_features)))) {
		return njd_features;
	}
	var acc = 0;
	var is_after_nuc = false;
	var phase_len = 0;
	var head = __getitem__ (njd_features, 0);
	var __iterable0__ = njd_features;
	__iterable0__ = __i__ (__iterable0__);
	for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
		var njd = __getitem__ (__iterable0__, __index0__);
		if (__t__ (__in__ (__getitem__ (njd, 'chain_flag'), [0, __neg__ (1)]))) {
			var is_after_nuc = false;
			var head = njd;
			var acc = __getitem__ (njd, 'acc');
			var phase_len = 0;
		}
		if (__t__ (__eq__ (acc, 0))) {
			continue;
		}
		else if (__t__ (is_after_nuc)) {
			if (__t__ (__eq__ (__getitem__ (njd, 'ctype'), '特殊・マス'))) {
				__setitem__ (head, 'acc', (__t__ (__ne__ (__getitem__ (njd, 'cform'), '未然形')) ? __add__ (phase_len, 1) : __add__ (phase_len, 2)));
			}
			else if (__t__ (__eq__ (__getitem__ (njd, 'ctype'), '特殊・ナイ'))) {
				__setitem__ (head, 'acc', phase_len);
			}
			else if (__t__ (__in__ (__getitem__ (njd, 'orig'), ['れる', 'られる', 'すぎる', 'せる', 'させる']))) {
				__setitem__ (head, 'acc', __add__ (phase_len, __getitem__ (njd, 'acc')));
			}
			else {
				var is_after_nuc = false;
				var acc = 0;
			}
			var phase_len = __call__ (__iadd__, null, phase_len, __getitem__ (njd, 'mora_size'));
		}
		else {
			var phase_len = __call__ (__iadd__, null, phase_len, __getitem__ (njd, 'mora_size'));
			if (__t__ (__le__ (acc, __getitem__ (njd, 'mora_size')))) {
				var is_after_nuc = true;
			}
			else {
				var acc = __sub__ (acc, __getitem__ (njd, 'mora_size'));
			}
		}
	}
	return njd_features;
};
export var split_kana_mora = function (text) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'text': var text = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var chars = __call__ (list, null, text);
	var result = [];
	var idx = 0;
	while (__t__ (__lt__ (idx, __call__ (len, null, chars)))) {
		var char = __getitem__ (chars, idx);
		if (__t__ (__t__ (__lt__ (__add__ (idx, 1), __call__ (len, null, chars))) && __in__ (__getitem__ (chars, __add__ (idx, 1)), _SMALL_KANA))) {
			(function () {
				var __accu0__ = result;
				return __call__ (__accu0__.append, __accu0__, __add__ (char, __getitem__ (chars, __add__ (idx, 1))));
			}) ();
			var idx = __call__ (__iadd__, null, idx, 2);
		}
		else {
			(function () {
				var __accu0__ = result;
				return __call__ (__accu0__.append, __accu0__, char);
			}) ();
			var idx = __call__ (__iadd__, null, idx, 1);
		}
	}
	return result;
};
export var modify_old_province_yomi = function (njd_features) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'njd_features': var njd_features = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	for (var index = 1; index < __call__ (len, null, njd_features); index++) {
		var feature = __getitem__ (njd_features, index);
		if (__t__ (__t__ (__ne__ (__getitem__ (feature, 'string'), '国')) || __t__ (__ne__ (__getitem__ (feature, 'pos_group1'), '接尾')) || !__in__ (__getitem__ (__getitem__ (njd_features, __sub__ (index, 1)), 'string'), _OLD_PROVINCE_NAMES))) {
			continue;
		}
		__setitem__ (feature, 'read', 'ノクニ');
		__setitem__ (feature, 'pron', 'ノクニ');
		__setitem__ (feature, 'mora_size', 3);
	}
	return njd_features;
};
export var split_prefix_accent_phrase = function (njd_features) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'njd_features': var njd_features = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	for (var index = 1; index < __call__ (len, null, njd_features); index++) {
		var previous = __getitem__ (njd_features, __sub__ (index, 1));
		if (__t__ (__t__ (__ne__ (__getitem__ (__getitem__ (njd_features, index), 'chain_flag'), 0)) && __t__ (__eq__ (__getitem__ (previous, 'pos'), '接頭詞')) && __in__ (__getitem__ (previous, 'string'), _INDEPENDENT_PREFIXES))) {
			__setitem__ (__getitem__ (njd_features, index), 'chain_flag', 0);
		}
	}
	return njd_features;
};
export var detect_odori_unit = function (read) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'read': var read = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var seion_read = __call__ (join_strings, null, '', (function () {
		var __accu0__ = [];
		var __iterable0__ = read;
		__iterable0__ = __i__ (__iterable0__);
		for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
			var ch = __getitem__ (__iterable0__, __index0__);
			(function () {
				var __accu1__ = __accu0__;
				return __call__ (__accu1__.append, __accu1__, (function () {
					var __accu2__ = _SEION_CHAR_MAP;
					return __call__ (__accu2__.py_get, __accu2__, ch, ch);
				}) ());
			}) ();
		}
		return __accu0__;
	}) ());
	var moras = __call__ (split_kana_mora, null, seion_read);
	var mora_count = __call__ (len, null, moras);
	if (__t__ (__lt__ (mora_count, 2))) {
		return null;
	}
	for (var period = 1; period < __add__ (__floordiv__ (mora_count, 2), 1); period++) {
		var first_half = __getslice__ (moras, __sub__ (mora_count, __mul__ (period, 2)), __sub__ (mora_count, period), 1);
		var second_half = __getslice__ (moras, __sub__ (mora_count, period), null, 1);
		if (__t__ (__eq__ (first_half, second_half))) {
			return period;
		}
	}
	return null;
};
export var process_odori_features = function (njd_features) {
	var jtalk = null;
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'njd_features': var njd_features = __allkwargs0__ [__attrib0__]; break;
					case 'jtalk': var jtalk = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var is_dancing = function (orig) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'orig': var orig = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		return __eq__ (__call__ (set, null, orig), new set (['々']));
	};
	var is_odoriji = function (orig) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'orig': var orig = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		return __le__ (__call__ (set, null, orig), new set (['ゝ', 'ゞ', 'ヽ', 'ヾ']));
	};
	var count_odori = function (orig) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'orig': var orig = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		return (function () {
			var __accu0__ = orig;
			return __call__ (__accu0__.count, __accu0__, '々');
		}) ();
	};
	var is_kanji_token = function (token) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'token': var token = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		if (__t__ (__eq__ (__getitem__ (token, 'pos'), '記号'))) {
			return false;
		}
		return __call__ (any, null, (function () {
			var __accu0__ = [];
			var __iterable0__ = __getitem__ (token, 'orig');
			__iterable0__ = __i__ (__iterable0__);
			for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
				var c = __getitem__ (__iterable0__, __index0__);
				(function () {
					var __accu1__ = __accu0__;
					return __call__ (__accu1__.append, __accu1__, (__le__ (19968, __call__ (ord, null, c)) && __le__ (__call__ (ord, null, c), 40959)));
				}) ();
			}
			return __accu0__;
		}) ());
	};
	var is_single_kanji_token = function (token) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'token': var token = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		return __t__ (__call__ (is_kanji_token, null, token)) && __t__ (__eq__ (__call__ (len, null, __getitem__ (token, 'orig')), 1)) && (__le__ (19968, __call__ (ord, null, __getitem__ (__getitem__ (token, 'orig'), 0))) && __le__ (__call__ (ord, null, __getitem__ (__getitem__ (token, 'orig'), 0)), 40959));
	};
	var needs_reanalysis = function (odori_feature, prev_feature, next_feature) {
		if (typeof next_feature == 'undefined' || (next_feature != null && next_feature.hasOwnProperty ("__kwargtrans__"))) {;
			var next_feature = null;
		};
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'odori_feature': var odori_feature = __allkwargs0__ [__attrib0__]; break;
						case 'prev_feature': var prev_feature = __allkwargs0__ [__attrib0__]; break;
						case 'next_feature': var next_feature = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		if (__t__ (__ne__ (__call__ (count_odori, null, __getitem__ (odori_feature, 'orig')), 1))) {
			return tuple ([false, '', null]);
		}
		if (__t__ (!__t__ ((__call__ (is_kanji_token, null, prev_feature))))) {
			return tuple ([false, '', null]);
		}
		if (__t__ (__gt__ (__call__ (len, null, __getitem__ (prev_feature, 'orig')), 1))) {
			var last_char = __getitem__ (__getitem__ (prev_feature, 'orig'), __neg__ (1));
			if (__t__ ((__le__ (19968, __call__ (ord, null, last_char)) && __le__ (__call__ (ord, null, last_char), 40959)))) {
				if (__t__ (__t__ (next_feature !== null) && __call__ (is_single_kanji_token, null, next_feature))) {
					return tuple ([true, last_char, __getitem__ (next_feature, 'orig')]);
				}
				return tuple ([true, last_char, null]);
			}
		}
		return tuple ([false, '', null]);
	};
	var reanalyze_kanji = function (kanji) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'kanji': var kanji = __allkwargs0__ [__attrib0__]; break;
						case 'jtalk': var jtalk = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		var features = (function () {
			var __accu0__ = jtalk;
			return __call__ (__accu0__.run_frontend, __accu0__, kanji);
		}) ();
		return features;
	};
	var process_odoriji = function (odori_feature, prev_feature) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'odori_feature': var odori_feature = __allkwargs0__ [__attrib0__]; break;
						case 'prev_feature': var prev_feature = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		var prev_read_chars = [];
		var prev_pron_chars = [];
		var prev_mora_sizes = [];
		var i = 0;
		while (__t__ (__lt__ (i, __call__ (len, null, __getitem__ (prev_feature, 'read'))))) {
			var char = __getitem__ (__getitem__ (prev_feature, 'read'), i);
			if (__t__ (__t__ (__lt__ (__add__ (i, 1), __call__ (len, null, __getitem__ (prev_feature, 'read')))) && __in__ (__getitem__ (__getitem__ (prev_feature, 'read'), __add__ (i, 1)), new set (['ャ', 'ュ', 'ョ', 'ァ', 'ィ', 'ゥ', 'ェ', 'ォ'])))) {
				(function () {
					var __accu0__ = prev_read_chars;
					return __call__ (__accu0__.append, __accu0__, __add__ (char, __getitem__ (__getitem__ (prev_feature, 'read'), __add__ (i, 1))));
				}) ();
				var i = __call__ (__iadd__, null, i, 2);
			}
			else {
				(function () {
					var __accu0__ = prev_read_chars;
					return __call__ (__accu0__.append, __accu0__, char);
				}) ();
				var i = __call__ (__iadd__, null, i, 1);
			}
		}
		var prev_pron_source = (function () {
			var __accu0__ = __getitem__ (prev_feature, 'pron');
			return __call__ (__accu0__.py_replace, __accu0__, '’', '');
		}) ();
		if (__t__ (__eq__ (prev_pron_source, ''))) {
			var prev_pron_source = __getitem__ (prev_feature, 'read');
		}
		var i = 0;
		while (__t__ (__lt__ (i, __call__ (len, null, prev_pron_source)))) {
			var char = __getitem__ (prev_pron_source, i);
			if (__t__ (__t__ (__lt__ (__add__ (i, 1), __call__ (len, null, prev_pron_source))) && __in__ (__getitem__ (prev_pron_source, __add__ (i, 1)), new set (['ャ', 'ュ', 'ョ', 'ァ', 'ィ', 'ゥ', 'ェ', 'ォ'])))) {
				(function () {
					var __accu0__ = prev_pron_chars;
					return __call__ (__accu0__.append, __accu0__, __add__ (char, __getitem__ (prev_pron_source, __add__ (i, 1))));
				}) ();
				var i = __call__ (__iadd__, null, i, 2);
			}
			else {
				(function () {
					var __accu0__ = prev_pron_chars;
					return __call__ (__accu0__.append, __accu0__, char);
				}) ();
				var i = __call__ (__iadd__, null, i, 1);
			}
		}
		var mora_per_char = __truediv__ (__getitem__ (prev_feature, 'mora_size'), __call__ (len, null, prev_read_chars));
		var prev_mora_sizes = __mul__ ([mora_per_char], __call__ (len, null, prev_read_chars));
		var prev_read = __getitem__ (prev_read_chars, __neg__ (1));
		var prev_pron = __getitem__ (prev_pron_chars, __neg__ (1));
		var prev_mora_size = __getitem__ (prev_mora_sizes, __neg__ (1));
		var dakuten_map = dict ({'カ': 'ガ', 'キ': 'ギ', 'ク': 'グ', 'ケ': 'ゲ', 'コ': 'ゴ', 'サ': 'ザ', 'シ': 'ジ', 'ス': 'ズ', 'セ': 'ゼ', 'ソ': 'ゾ', 'タ': 'ダ', 'チ': 'ヂ', 'ツ': 'ヅ', 'テ': 'デ', 'ト': 'ド', 'ハ': 'バ', 'ヒ': 'ビ', 'フ': 'ブ', 'ヘ': 'ベ', 'ホ': 'ボ', 'か': 'が', 'き': 'ぎ', 'く': 'ぐ', 'け': 'げ', 'こ': 'ご', 'さ': 'ざ', 'し': 'じ', 'す': 'ず', 'せ': 'ぜ', 'そ': 'ぞ', 'た': 'だ', 'ち': 'ぢ', 'つ': 'づ', 'て': 'で', 'と': 'ど', 'は': 'ば', 'ひ': 'び', 'ふ': 'ぶ', 'へ': 'べ', 'ほ': 'ぼ', 'キャ': 'ギャ', 'キュ': 'ギュ', 'キョ': 'ギョ', 'シャ': 'ジャ', 'シュ': 'ジュ', 'ショ': 'ジョ', 'チャ': 'ヂャ', 'チュ': 'ヂュ', 'チョ': 'ヂョ', 'ヒャ': 'ビャ', 'ヒュ': 'ビュ', 'ヒョ': 'ビョ', 'きゃ': 'ぎゃ', 'きゅ': 'ぎゅ', 'きょ': 'ぎょ', 'しゃ': 'じゃ', 'しゅ': 'じゅ', 'しょ': 'じょ', 'ちゃ': 'ぢゃ', 'ちゅ': 'ぢゅ', 'ちょ': 'ぢょ', 'ひゃ': 'びゃ', 'ひゅ': 'びゅ', 'ひょ': 'びょ'});
		var dakuten_reverse_map = (function () {
			var __accu0__ = [];
			var __iterable0__ = (function () {
				var __accu1__ = dakuten_map;
				return __call__ (__accu1__.py_items, __accu1__);
			}) ();
			__iterable0__ = __i__ (__iterable0__);
			for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
				var __left0__ = __getitem__ (__iterable0__, __index0__);
				var k = __left0__ [0];
				var v = __left0__ [1];
				(function () {
					var __accu1__ = __accu0__;
					return __call__ (__accu1__.append, __accu1__, [v, k]);
				}) ();
			}
			return dict (__accu0__);
		}) ();
		var is_forced_voiced = false;
		var __iterable0__ = __getitem__ (odori_feature, 'orig');
		__iterable0__ = __i__ (__iterable0__);
		for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
			var char = __getitem__ (__iterable0__, __index0__);
			if (__t__ (__in__ (char, tuple (['ゞ', 'ヾ'])))) {
				var is_forced_voiced = true;
				break;
			}
			if (__t__ (__in__ (char, tuple (['ゝ', 'ヽ'])))) {
				break;
			}
		}
		var is_single_grapheme_mora = !__t__ ((__call__ (any, null, (function () {
			var __accu0__ = [];
			var __iterable0__ = prev_read;
			__iterable0__ = __i__ (__iterable0__);
			for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
				var char = __getitem__ (__iterable0__, __index0__);
				(function () {
					var __accu1__ = __accu0__;
					return __call__ (__accu1__.append, __accu1__, __in__ (char, _SMALL_KANA));
				}) ();
			}
			return __accu0__;
		}) ())));
		if (__t__ (is_forced_voiced === true)) {
			var voiced_read = __t__ ((function () {
				var __accu0__ = dakuten_map;
				return __call__ (__accu0__.py_get, __accu0__, prev_read);
			}) ()) || prev_read;
			var voiced_pron = __t__ ((function () {
				var __accu0__ = dakuten_map;
				return __call__ (__accu0__.py_get, __accu0__, prev_pron);
			}) ()) || prev_pron;
			__setitem__ (odori_feature, 'read', voiced_read);
			__setitem__ (odori_feature, 'pron', voiced_pron);
			__setitem__ (odori_feature, 'mora_size', __call__ (int, null, prev_mora_size));
		}
		else {
			if (__t__ (is_single_grapheme_mora === true)) {
				var seion_read = __t__ ((function () {
					var __accu0__ = dakuten_reverse_map;
					return __call__ (__accu0__.py_get, __accu0__, prev_read);
				}) ()) || prev_read;
				var seion_pron = __t__ ((function () {
					var __accu0__ = dakuten_reverse_map;
					return __call__ (__accu0__.py_get, __accu0__, prev_pron);
				}) ()) || prev_pron;
				__setitem__ (odori_feature, 'read', seion_read);
				__setitem__ (odori_feature, 'pron', seion_pron);
			}
			else {
				__setitem__ (odori_feature, 'read', prev_read);
				__setitem__ (odori_feature, 'pron', prev_pron);
			}
			__setitem__ (odori_feature, 'mora_size', __call__ (int, null, prev_mora_size));
		}
		if (__t__ (__eq__ (__getitem__ (odori_feature, 'pos'), '記号'))) {
			__setitem__ (odori_feature, 'pos', '名詞');
			__setitem__ (odori_feature, 'pos_group1', '一般');
			__setitem__ (odori_feature, 'pos_group2', '*');
			__setitem__ (odori_feature, 'pos_group3', '*');
			__setitem__ (odori_feature, 'ctype', '*');
			__setitem__ (odori_feature, 'cform', '*');
		}
		return odori_feature;
	};
	var i = 0;
	while (__t__ (__lt__ (i, __call__ (len, null, njd_features)))) {
		if (__t__ (__getitem__ (__getitem__ (njd_features, i), 'is_reading_protected') === true)) {
			var i = __call__ (__iadd__, null, i, 1);
			continue;
		}
		if (__t__ (__call__ (is_dancing, null, __getitem__ (__getitem__ (njd_features, i), 'orig')))) {
			if (__t__ (__t__ (__gt__ (i, 0)) && jtalk !== null)) {
				var next_feature = (__t__ (__lt__ (__add__ (i, 1), __call__ (len, null, njd_features))) ? __getitem__ (njd_features, __add__ (i, 1)) : null);
				if (__t__ (__t__ (next_feature !== null) && __getitem__ (next_feature, 'is_reading_protected') === true)) {
					var next_feature = null;
				}
				var __left0__ = __call__ (needs_reanalysis, null, __getitem__ (njd_features, i), __getitem__ (njd_features, __sub__ (i, 1)), next_feature);
				var needs_reanalysis_flag = __left0__ [0];
				var target_kanji = __left0__ [1];
				var next_kanji = __left0__ [2];
				if (__t__ (needs_reanalysis_flag)) {
					if (__t__ (next_kanji !== null)) {
						var analyzed = __call__ (reanalyze_kanji, null, __add__ (target_kanji, next_kanji), __kwargtrans__ ({jtalk: jtalk}));
						if (__t__ (__gt__ (__call__ (len, null, analyzed), 0))) {
							__setitem__ (__getitem__ (analyzed, 0), 'chain_flag', 1);
						}
						__setslice__ (njd_features, i, __add__ (i, 2), null, analyzed);
						var i = __call__ (__iadd__, null, i, __call__ (len, null, analyzed));
						continue;
					}
					else {
						var analyzed = __call__ (reanalyze_kanji, null, target_kanji, __kwargtrans__ ({jtalk: jtalk}));
						__setitem__ (njd_features, i, __getitem__ (analyzed, 0));
						__setitem__ (__getitem__ (njd_features, i), 'chain_flag', 1);
						__setitem__ (__getitem__ (njd_features, i), 'pos', '名詞');
						__setitem__ (__getitem__ (njd_features, i), 'pos_group1', '一般');
						__setitem__ (__getitem__ (njd_features, i), 'pos_group2', '*');
						__setitem__ (__getitem__ (njd_features, i), 'pos_group3', '*');
						__setitem__ (__getitem__ (njd_features, i), 'ctype', '*');
						__setitem__ (__getitem__ (njd_features, i), 'cform', '*');
						var i = __call__ (__iadd__, null, i, 1);
						continue;
					}
				}
			}
			var start = i;
			var end = i;
			var total_odori = 0;
			while (__t__ (__t__ (__lt__ (end, __call__ (len, null, njd_features))) && __t__ (__call__ (is_dancing, null, __getitem__ (__getitem__ (njd_features, end), 'orig'))) && __getitem__ (__getitem__ (njd_features, end), 'is_reading_protected') === false)) {
				var total_odori = __call__ (__iadd__, null, total_odori, __call__ (count_odori, null, __getitem__ (__getitem__ (njd_features, end), 'orig')));
				var end = __call__ (__iadd__, null, end, 1);
			}
			if (__t__ (__t__ (__gt__ (i, 0)) && (function () {
				var __accu0__ = __getitem__ (__getitem__ (njd_features, __sub__ (i, 1)), 'orig');
				return __call__ (__accu0__.endswith, __accu0__, '々');
			}) ())) {
				var prev = __getitem__ (njd_features, __sub__ (i, 1));
				var period = __call__ (detect_odori_unit, null, __getitem__ (prev, 'read'));
				if (__t__ (period !== null)) {
					var raw_read_moras = __call__ (split_kana_mora, null, __getitem__ (prev, 'read'));
					var raw_pron_moras = __call__ (split_kana_mora, null, __getitem__ (prev, 'pron'));
					if (__t__ (__t__ (__ge__ (__call__ (len, null, raw_read_moras), period)) && __gt__ (__call__ (len, null, raw_read_moras), 0))) {
						var unit_read = __call__ (join_strings, null, '', __getslice__ (raw_read_moras, __sub__ (__call__ (len, null, raw_read_moras), period), null, 1));
						var unit_pron = __call__ (join_strings, null, '', __getslice__ (raw_pron_moras, __sub__ (__call__ (len, null, raw_pron_moras), period), null, 1));
						var unit_mora = __mul__ (__floordiv__ (__getitem__ (prev, 'mora_size'), __call__ (len, null, raw_read_moras)), period);
						var base_acc = __getitem__ (prev, 'acc');
						var current_feat = __getitem__ (njd_features, i);
						var current_odori = __call__ (count_odori, null, __getitem__ (current_feat, 'orig'));
						__setitem__ (current_feat, 'read', __mul__ (unit_read, current_odori));
						__setitem__ (current_feat, 'pron', __mul__ (unit_pron, current_odori));
						__setitem__ (current_feat, 'mora_size', __mul__ (unit_mora, current_odori));
						__setitem__ (current_feat, 'acc', base_acc);
						__setitem__ (current_feat, 'chain_flag', 1);
						if (__t__ (__eq__ (__getitem__ (current_feat, 'pos'), '記号'))) {
							__setitem__ (current_feat, 'pos', '名詞');
							__setitem__ (current_feat, 'pos_group1', '一般');
							__setitem__ (current_feat, 'pos_group2', '*');
							__setitem__ (current_feat, 'pos_group3', '*');
							__setitem__ (current_feat, 'ctype', '*');
							__setitem__ (current_feat, 'cform', '*');
						}
						var i = __call__ (__iadd__, null, i, 1);
						continue;
					}
				}
			}
			var normal_list = [];
			var j = __sub__ (start, 1);
			var collected_chars = 0;
			var needed_chars = __call__ (min, null, total_odori, 8);
			while (__t__ (__ge__ (j, 0))) {
				var target = __getitem__ (njd_features, j);
				if (__t__ (__in__ (__getitem__ (target, 'pos'), tuple (['記号', 'フィラー', '感動詞'])))) {
					break;
				}
				if (__t__ (__call__ (is_kanji_token, null, target))) {
					(function () {
						var __accu0__ = normal_list;
						return __call__ (__accu0__.append, __accu0__, target);
					}) ();
					var collected_chars = __call__ (__iadd__, null, collected_chars, __call__ (len, null, __getitem__ (target, 'orig')));
					if (__t__ (__ge__ (collected_chars, needed_chars))) {
						break;
					}
				}
				else {
					break;
				}
				var j = __call__ (__isub__, null, j, 1);
			}
			(function () {
				var __accu0__ = normal_list;
				return __call__ (__accu0__.reverse, __accu0__);
			}) ();
			if (__t__ (!__t__ ((normal_list)))) {
				var i = end;
				continue;
			}
			var is_single_kanji = __t__ (__eq__ (__call__ (len, null, normal_list), 1)) && __eq__ (__call__ (len, null, __getitem__ (__getitem__ (normal_list, 0), 'orig')), 1);
			if (__t__ (is_single_kanji)) {
				var base_read = __getitem__ (__getitem__ (normal_list, 0), 'read');
				var base_pron = __getitem__ (__getitem__ (normal_list, 0), 'pron');
				var base_mora_size = __getitem__ (__getitem__ (normal_list, 0), 'mora_size');
			}
			else {
				var base_read = __call__ (join_strings, null, '', (function () {
					var __accu0__ = [];
					var __iterable0__ = normal_list;
					__iterable0__ = __i__ (__iterable0__);
					for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
						var item = __getitem__ (__iterable0__, __index0__);
						(function () {
							var __accu1__ = __accu0__;
							return __call__ (__accu1__.append, __accu1__, __getitem__ (item, 'read'));
						}) ();
					}
					return __accu0__;
				}) ());
				var base_pron = __call__ (join_strings, null, '', (function () {
					var __accu0__ = [];
					var __iterable0__ = normal_list;
					__iterable0__ = __i__ (__iterable0__);
					for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
						var item = __getitem__ (__iterable0__, __index0__);
						(function () {
							var __accu1__ = __accu0__;
							return __call__ (__accu1__.append, __accu1__, __getitem__ (item, 'pron'));
						}) ();
					}
					return __accu0__;
				}) ());
				var base_mora_size = __call__ (sum, null, (function () {
					var __accu0__ = [];
					var __iterable0__ = normal_list;
					__iterable0__ = __i__ (__iterable0__);
					for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
						var item = __getitem__ (__iterable0__, __index0__);
						(function () {
							var __accu1__ = __accu0__;
							return __call__ (__accu1__.append, __accu1__, __getitem__ (item, 'mora_size'));
						}) ();
					}
					return __accu0__;
				}) ());
			}
			var base_acc = __getitem__ (__getitem__ (normal_list, 0), 'acc');
			var processed_odori = 0;
			for (var j = start; j < end; j++) {
				var current_odori = __call__ (count_odori, null, __getitem__ (__getitem__ (njd_features, j), 'orig'));
				if (__t__ (is_single_kanji)) {
					__setitem__ (__getitem__ (njd_features, j), 'read', __mul__ (base_read, current_odori));
					__setitem__ (__getitem__ (njd_features, j), 'pron', __mul__ (base_pron, current_odori));
					__setitem__ (__getitem__ (njd_features, j), 'mora_size', __mul__ (base_mora_size, current_odori));
				}
				else {
					__setitem__ (__getitem__ (njd_features, j), 'read', base_read);
					__setitem__ (__getitem__ (njd_features, j), 'pron', base_pron);
					__setitem__ (__getitem__ (njd_features, j), 'mora_size', base_mora_size);
				}
				__setitem__ (__getitem__ (njd_features, j), 'acc', base_acc);
				__setitem__ (__getitem__ (njd_features, j), 'chain_flag', 1);
				var processed_odori = __call__ (__iadd__, null, processed_odori, current_odori);
				if (__t__ (__eq__ (__getitem__ (__getitem__ (njd_features, j), 'pos'), '記号'))) {
					__setitem__ (__getitem__ (njd_features, j), 'pos', '名詞');
					__setitem__ (__getitem__ (njd_features, j), 'pos_group1', '一般');
					__setitem__ (__getitem__ (njd_features, j), 'pos_group2', '*');
					__setitem__ (__getitem__ (njd_features, j), 'pos_group3', '*');
					__setitem__ (__getitem__ (njd_features, j), 'ctype', '*');
					__setitem__ (__getitem__ (njd_features, j), 'cform', '*');
				}
			}
			var i = end;
		}
		else if (__t__ (__call__ (is_odoriji, null, __getitem__ (__getitem__ (njd_features, i), 'orig')))) {
			if (__t__ (__gt__ (i, 0))) {
				var direct_prev = __getitem__ (njd_features, __sub__ (i, 1));
				if (__t__ (__ne__ (__getitem__ (direct_prev, 'pos'), '記号'))) {
					var prev_index = __sub__ (i, 1);
					while (__t__ (__ge__ (prev_index, 0))) {
						var prev_token = __getitem__ (njd_features, prev_index);
						if (__t__ (__t__ (__ne__ (__getitem__ (prev_token, 'pos'), '記号')) && __gt__ (__getitem__ (prev_token, 'mora_size'), 0))) {
							break;
						}
						var prev_index = __call__ (__isub__, null, prev_index, 1);
					}
					if (__t__ (__ge__ (prev_index, 0))) {
						__setitem__ (njd_features, i, __call__ (process_odoriji, null, __getitem__ (njd_features, i), __getitem__ (njd_features, prev_index)));
					}
				}
			}
			var i = __call__ (__iadd__, null, i, 1);
		}
		else {
			var i = __call__ (__iadd__, null, i, 1);
		}
	}
	return njd_features;
};

