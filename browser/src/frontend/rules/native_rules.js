// Generated from pyopenjtalk-plus e7713f2d6d91f392f595df5e8998ff2b62c3b6f5; see tools/build_rules.py.
import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __mergefields__, __mergekwargtrans__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __pyUseJsNext__, __rshift__, __setitem__, __setproperty__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __withblock__, __xor__, _sort, abs, all, any, assert, bin, bool, bytearray, bytes, callable, chr, delattr, dict, dir, divmod, filter, float, getattr, hasattr, hex, input, int, isinstance, issubclass, len, list, map, max, min, object, oct, ord, pow, print, property, py_TypeError, py_enumerate, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
import {split_prefix_accent_phrase} from './utils.js';
import {KNOWN_SYMBOL_FEATURES} from './_known_symbols.js';
import {contains_hiragana, is_katakana_word} from './_kana_utils.js';
import {join_strings, maketrans, merge_dict, translate} from './compatibility.js';
var __name__ = 'native_rules';
export var _NON_PAUSE_SYMBOLS = __call__ (set, null, tuple (['「', '」', '『', '』', '（', '）', '(', ')', '【', '】', '［', '］', '[', ']', '〈', '〉', '《', '》', '〔', '〕', '｛', '｝', '{', '}', '"', "'", '”', '“', '’', '‘']));
export var _PAUSE_SYMBOLS_REQUIRING_EXPANSION = __call__ (set, null, tuple (['！', '？']));
export var _UNIT_LETTER_COUNTERS = dict ({'ｇ': tuple (['グラム', 1, 3, 'C1']), 'ｍ': tuple (['メートル', 0, 4, 'C2']), 'ｔ': tuple (['トン', 1, 2, 'C3']), 'ｌ': tuple (['リットル', 0, 4, 'C2'])});
export var _UNIT_LETTER_FORMULA_OPERATORS = __call__ (set, null, '＋−－＝×÷＊＜＞+-=*<>');
export var _restore_unknown_katakana_features = function (njd_features, mecab_features) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'njd_features': var njd_features = __allkwargs0__ [__attrib0__]; break;
					case 'mecab_features': var mecab_features = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var unknown_pos_by_surface = dict ({});
	var __iterable0__ = mecab_features;
	__iterable0__ = __i__ (__iterable0__);
	for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
		var mecab_feature = __getitem__ (__iterable0__, __index0__);
		var fields = (function () {
			var __accu0__ = mecab_feature;
			return __call__ (__accu0__.py_split, __accu0__, ',');
		}) ();
		if (__t__ (__t__ (__lt__ (__call__ (len, null, fields), 5)) || __ge__ (__call__ (len, null, fields), 12))) {
			continue;
		}
		(function () {
			var __accu0__ = (function () {
				var __accu1__ = unknown_pos_by_surface;
				return __call__ (__accu1__.py_setdefault, __accu1__, __getitem__ (fields, 0), []);
			}) ();
			return __call__ (__accu0__.append, __accu0__, tuple ([__getitem__ (fields, 1), __getitem__ (fields, 2), __getitem__ (fields, 3), __getitem__ (fields, 4)]));
		}) ();
	}
	var __iterable0__ = njd_features;
	__iterable0__ = __i__ (__iterable0__);
	for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
		var feature = __getitem__ (__iterable0__, __index0__);
		var surface = __getitem__ (feature, 'string');
		if (__t__ (__t__ (__ne__ (__getitem__ (feature, 'pos'), 'フィラー')) || __t__ (__call__ (is_katakana_word, null, surface) === false) || !__in__ (surface, unknown_pos_by_surface))) {
			continue;
		}
		var __left0__ = (function () {
			var __accu0__ = __getitem__ (unknown_pos_by_surface, surface);
			return __call__ (__accu0__.py_pop, __accu0__, 0);
		}) ();
		var pos = __left0__ [0];
		var pos_group1 = __left0__ [1];
		var pos_group2 = __left0__ [2];
		var pos_group3 = __left0__ [3];
		if (__t__ (__eq__ (__call__ (len, null, __getitem__ (unknown_pos_by_surface, surface)), 0))) {
			delete __getitem__ (unknown_pos_by_surface, surface);
		}
		__setitem__ (feature, 'pos', pos);
		__setitem__ (feature, 'pos_group1', pos_group1);
		__setitem__ (feature, 'pos_group2', pos_group2);
		__setitem__ (feature, 'pos_group3', pos_group3);
		var moras = [];
		var __iterable1__ = __getitem__ (feature, 'pron');
		__iterable1__ = __i__ (__iterable1__);
		for (var __index1__ = 0; __index1__ < len (__iterable1__); __index1__++) {
			var char = __getitem__ (__iterable1__, __index1__);
			if (__t__ (__t__ (__in__ (char, 'ャュョァィゥェォ')) && __gt__ (__call__ (len, null, moras), 0))) {
				__setitem__ (moras, __neg__ (1), __call__ (__iadd__, null, __getitem__ (moras, __neg__ (1)), char));
			}
			else {
				(function () {
					var __accu0__ = moras;
					return __call__ (__accu0__.append, __accu0__, char);
				}) ();
			}
		}
		if (__t__ (__le__ (__call__ (len, null, moras), 3))) {
			__setitem__ (feature, 'acc', 1);
		}
		else {
			var accent_index = __sub__ (__call__ (len, null, moras), 3);
			while (__t__ (__t__ (__gt__ (accent_index, 0)) && __in__ (__getitem__ (moras, accent_index), tuple (['ー', 'ン', 'ッ'])))) {
				var accent_index = __call__ (__isub__, null, accent_index, 1);
			}
			__setitem__ (feature, 'acc', __add__ (accent_index, 1));
		}
	}
	return njd_features;
};
export var _apply_original_rule_before_chaining = function (njd_features, modify_numeral_reading) {
	if (typeof modify_numeral_reading == 'undefined' || (modify_numeral_reading != null && modify_numeral_reading.hasOwnProperty ("__kwargtrans__"))) {;
		var modify_numeral_reading = true;
	};
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'njd_features': var njd_features = __allkwargs0__ [__attrib0__]; break;
					case 'modify_numeral_reading': var modify_numeral_reading = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var numeral_zero_indices = __call__ (set, null);
	var digit_characters = '０１２３４５６７８９〇零一二三四五六七八九';
	var index = 0;
	while (__t__ (__lt__ (index, __call__ (len, null, njd_features)))) {
		var start = index;
		while (__t__ (__t__ (__lt__ (index, __call__ (len, null, njd_features))) && __t__ (__in__ (__getitem__ (__getitem__ (njd_features, index), 'string'), digit_characters)) && __eq__ (__call__ (len, null, __getitem__ (__getitem__ (njd_features, index), 'string')), 1))) {
			var index = __call__ (__iadd__, null, index, 1);
		}
		if (__t__ (__eq__ (index, start))) {
			var index = __call__ (__iadd__, null, index, 1);
			continue;
		}
		var is_number = __call__ (any, null, (function () {
			var __accu0__ = [];
			var __iterable0__ = __getslice__ (njd_features, start, index, 1);
			__iterable0__ = __i__ (__iterable0__);
			for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
				var feature = __getitem__ (__iterable0__, __index0__);
				(function () {
					var __accu1__ = __accu0__;
					return __call__ (__accu1__.append, __accu1__, __ne__ (__getitem__ (feature, 'string'), '〇'));
				}) ();
			}
			return __accu0__;
		}) ());
		if (__t__ (__lt__ (index, __call__ (len, null, njd_features)))) {
			var following = __getitem__ (njd_features, index);
			var is_number = __t__ (is_number) || __eq__ (__getitem__ (following, 'pos_group2'), '助数詞');
			if (__t__ (__t__ (__in__ (__getitem__ (following, 'string'), '−－ー‐‑‒–—-')) && __lt__ (__add__ (index, 1), __call__ (len, null, njd_features)))) {
				var is_number = __t__ (is_number) || __in__ (__getitem__ (__getitem__ (njd_features, __add__ (index, 1)), 'string'), digit_characters);
			}
		}
		if (__t__ (__t__ (__ge__ (start, 2)) && __in__ (__getitem__ (__getitem__ (njd_features, __sub__ (start, 1)), 'string'), '−－ー‐‑‒–—-，'))) {
			var is_number = __t__ (is_number) || __in__ (__getitem__ (__getitem__ (njd_features, __sub__ (start, 2)), 'string'), digit_characters);
		}
		if (__t__ (__t__ (is_number === true) && __gt__ (__sub__ (index, start), 1))) {
			for (var zero_index = start; zero_index < index; zero_index++) {
				var zero = __getitem__ (njd_features, zero_index);
				if (__t__ (__eq__ (__getitem__ (zero, 'string'), '〇'))) {
					(function () {
						var __accu0__ = numeral_zero_indices;
						return __call__ (__accu0__.add, __accu0__, zero_index);
					}) ();
					__setitem__ (zero, 'pos', '名詞');
					__setitem__ (zero, 'pos_group1', '数');
					var __left0__ = 'ゼロ';
					__setitem__ (zero, 'read', __left0__);
					__setitem__ (zero, 'pron', __left0__);
					__setitem__ (zero, 'mora_size', 2);
				}
			}
		}
	}
	var __iterable0__ = __call__ (py_enumerate, null, __getslice__ (njd_features, null, __neg__ (1), 1));
	__iterable0__ = __i__ (__iterable0__);
	for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
		var __left0__ = __getitem__ (__iterable0__, __index0__);
		var i = __left0__ [0];
		var njd = __left0__ [1];
		var next_njd = __getitem__ (njd_features, __add__ (i, 1));
		if (__t__ (__t__ (__eq__ (__getitem__ (njd, 'pos'), '助動詞')) && __t__ (__eq__ (__getitem__ (njd, 'orig'), 'ない')) && __t__ ((__t__ (__eq__ (__getitem__ (next_njd, 'pos'), '助詞')) || __t__ (__eq__ (__getitem__ (next_njd, 'pos'), '名詞')) && __eq__ (__getitem__ (next_njd, 'pos_group1'), '非自立'))) && __in__ (__getitem__ (next_njd, 'orig'), tuple (['の', 'と'])))) {
			__setitem__ (next_njd, 'chain_rule', __add__ ('助動詞%F1/', __call__ (join_strings, null, '/', (function () {
				var __accu0__ = [];
				var __iterable1__ = (function () {
					var __accu1__ = __getitem__ (next_njd, 'chain_rule');
					return __call__ (__accu1__.py_split, __accu1__, '/');
				}) ();
				__iterable1__ = __i__ (__iterable1__);
				for (var __index1__ = 0; __index1__ < len (__iterable1__); __index1__++) {
					var rule = __getitem__ (__iterable1__, __index1__);
					if (__t__ (!__t__ (((function () {
						var __accu1__ = rule;
						return __call__ (__accu1__.startswith, __accu1__, '助動詞%');
					}) ())))) {
						(function () {
							var __accu1__ = __accu0__;
							return __call__ (__accu1__.append, __accu1__, rule);
						}) ();
					}
				}
				return __accu0__;
			}) ())));
		}
		if (__t__ (__t__ (__eq__ (__getitem__ (njd, 'string'), '放っ')) && (__t__ (__t__ (__eq__ (__getitem__ (next_njd, 'string'), 'て')) && __t__ (__lt__ (__add__ (i, 2), __call__ (len, null, njd_features))) && __t__ (__eq__ (__getitem__ (__getitem__ (njd_features, __add__ (i, 2)), 'orig'), 'おく')) && __eq__ (__getitem__ (__getitem__ (njd_features, __add__ (i, 2)), 'pos'), '動詞')) || __t__ (__eq__ (__getitem__ (next_njd, 'orig'), 'とく')) && __eq__ (__getitem__ (next_njd, 'pos'), '動詞')))) {
			__setitem__ (njd, 'acc', 0);
		}
		if (__t__ (__t__ (__eq__ (__getitem__ (njd, 'pos'), '動詞')) && __t__ (__eq__ (__getitem__ (njd, 'cform'), '未然ウ接続')) && __t__ (__eq__ (__getitem__ (next_njd, 'pos'), '助動詞')) && __eq__ (__getitem__ (next_njd, 'orig'), 'う'))) {
			var is_flat_before_to_suru = __t__ (__eq__ (__getitem__ (njd, 'acc'), 0)) && __t__ (__lt__ (__add__ (i, 3), __call__ (len, null, njd_features))) && __t__ (__eq__ (__getitem__ (__getitem__ (njd_features, __add__ (i, 2)), 'string'), 'と')) && __in__ (__getitem__ (__getitem__ (njd_features, __add__ (i, 3)), 'orig'), tuple (['する', '思う']));
			if (__t__ (is_flat_before_to_suru === false)) {
				__setitem__ (next_njd, 'chain_rule', '動詞%F4@0/特殊助動詞%F2@0');
			}
		}
		if (__t__ (__t__ (__eq__ (__getitem__ (njd, 'pos'), '動詞')) && __t__ (__eq__ (__getitem__ (njd, 'pos_group1'), '自立')) && __t__ (__eq__ (__getitem__ (njd, 'acc'), 0)) && __t__ (__eq__ (__getitem__ (next_njd, 'pos'), '動詞')) && __t__ (__eq__ (__getitem__ (next_njd, 'pos_group1'), '接尾')) && __t__ (__in__ (__getitem__ (next_njd, 'orig'), tuple (['せる', 'させる']))) && __t__ (__lt__ (__add__ (i, 2), __call__ (len, null, njd_features))) && __t__ (__eq__ (__getitem__ (__getitem__ (njd_features, __add__ (i, 2)), 'pos'), '助動詞')) && __eq__ (__getitem__ (__getitem__ (njd_features, __add__ (i, 2)), 'orig'), 'ない'))) {
			__setitem__ (next_njd, 'acc', 0);
			__setitem__ (__getitem__ (njd_features, __add__ (i, 2)), 'chain_rule', __call__ (join_strings, null, '/', (function () {
				var __accu0__ = [];
				var __iterable1__ = (function () {
					var __accu1__ = __getitem__ (__getitem__ (njd_features, __add__ (i, 2)), 'chain_rule');
					return __call__ (__accu1__.py_split, __accu1__, '/');
				}) ();
				__iterable1__ = __i__ (__iterable1__);
				for (var __index1__ = 0; __index1__ < len (__iterable1__); __index1__++) {
					var rule = __getitem__ (__iterable1__, __index1__);
					(function () {
						var __accu1__ = __accu0__;
						return __call__ (__accu1__.append, __accu1__, (__t__ ((function () {
							var __accu2__ = rule;
							return __call__ (__accu2__.startswith, __accu2__, '動詞%');
						}) ()) ? '動詞%F1' : rule));
					}) ();
				}
				return __accu0__;
			}) ()));
		}
		if (__t__ (__t__ (__eq__ (__getitem__ (njd, 'pos'), '動詞')) && __t__ (__eq__ (__getitem__ (njd, 'pos_group1'), '自立')) && __t__ (__eq__ (__getitem__ (njd, 'acc'), 0)) && __t__ (__eq__ (__getitem__ (next_njd, 'pos'), '動詞')) && __t__ (__eq__ (__getitem__ (next_njd, 'pos_group1'), '接尾')) && __t__ (__in__ (__getitem__ (next_njd, 'orig'), tuple (['せる', 'させる']))) && __eq__ (__getitem__ (next_njd, 'cform'), '基本形'))) {
			__setitem__ (next_njd, 'acc', 0);
		}
		if (__t__ (__t__ (__eq__ (__getitem__ (njd, 'pos'), '名詞')) && __t__ (__eq__ (__getitem__ (next_njd, 'string'), '湖')) && __eq__ (__getitem__ (next_njd, 'pron'), 'ミズウミ'))) {
			var preceding_mora_size = 0;
			for (var preceding_index = i; preceding_index > __neg__ (1); preceding_index--) {
				var preceding_njd = __getitem__ (njd_features, preceding_index);
				if (__t__ (__ne__ (__getitem__ (preceding_njd, 'pos'), '名詞'))) {
					break;
				}
				var preceding_mora_size = __call__ (__iadd__, null, preceding_mora_size, __getitem__ (preceding_njd, 'mora_size'));
				if (__t__ (__eq__ (__getitem__ (preceding_njd, 'chain_flag'), 0))) {
					break;
				}
			}
			if (__t__ (__ge__ (__add__ (preceding_mora_size, 1), 4))) {
				__setitem__ (next_njd, 'chain_rule', 'C3');
			}
		}
		if (__t__ (__t__ (__eq__ (__getitem__ (njd, 'pos'), '名詞')) && __t__ (__eq__ (__getitem__ (next_njd, 'string'), '不足')) && __eq__ (__getitem__ (next_njd, 'pron'), 'フソク'))) {
			__setitem__ (next_njd, 'read', 'ブソク');
			__setitem__ (next_njd, 'pron', 'ブソク');
		}
		var is_fraction_denominator = false;
		if (__t__ (__t__ (__lt__ (__add__ (i, 2), __call__ (len, null, njd_features))) && __eq__ (__getitem__ (next_njd, 'string'), 'の'))) {
			var following_njd = __getitem__ (njd_features, __add__ (i, 2));
			if (__t__ (__t__ (modify_numeral_reading === true) && __t__ ((function () {
				var __accu0__ = __getitem__ (njd, 'string');
				return __call__ (__accu0__.endswith, __accu0__, '分');
			}) ()) && __t__ ((__t__ (__t__ (__gt__ (__call__ (len, null, __getitem__ (njd, 'string')), 1)) && __call__ (all, null, (function () {
				var __accu0__ = [];
				var __iterable1__ = __getslice__ (__getitem__ (njd, 'string'), null, __neg__ (1), 1);
				__iterable1__ = __i__ (__iterable1__);
				for (var __index1__ = 0; __index1__ < len (__iterable1__); __index1__++) {
					var character = __getitem__ (__iterable1__, __index1__);
					(function () {
						var __accu1__ = __accu0__;
						return __call__ (__accu1__.append, __accu1__, __in__ (character, __add__ (digit_characters, '十百千万何')));
					}) ();
				}
				return __accu0__;
			}) ())) || __t__ (__gt__ (i, 0)) && __eq__ (__getitem__ (__getitem__ (njd_features, __sub__ (i, 1)), 'pos_group1'), '数'))) && __t__ (__eq__ (__getitem__ (following_njd, 'string'), '何')) && __t__ (__ne__ (__getitem__ (following_njd, 'pos_group1'), '数')) && __t__ ((__t__ (__ge__ (__add__ (i, 3), __call__ (len, null, njd_features))) || __ne__ (__getitem__ (__getitem__ (njd_features, __add__ (i, 3)), 'string'), 'も'))) && !__t__ ((__t__ (__lt__ (__add__ (i, 4), __call__ (len, null, njd_features))) && __t__ (__eq__ (__getitem__ (__getitem__ (njd_features, __add__ (i, 3)), 'string'), 'が')) && __eq__ (__getitem__ (__getitem__ (njd_features, __add__ (i, 4)), 'string'), 'し'))))) {
				(function () {
					var __accu0__ = following_njd;
					return __call__ (__accu0__.py_update, __accu0__, __kwargtrans__ ({pos: '名詞', pos_group1: '数', pos_group2: '*', pos_group3: '*', read: 'ナン', pron: 'ナン', acc: 1, mora_size: 2, chain_rule: 'C3'}));
				}) ();
			}
			var is_fraction_denominator = __eq__ (__getitem__ (following_njd, 'pos_group1'), '数');
		}
		if (__t__ (__t__ (modify_numeral_reading === true) && __t__ (is_fraction_denominator === true) && (function () {
			var __accu0__ = __getitem__ (njd, 'string');
			return __call__ (__accu0__.endswith, __accu0__, '分');
		}) ())) {
			if (__t__ ((function () {
				var __accu0__ = __getitem__ (njd, 'pron');
				return __call__ (__accu0__.endswith, __accu0__, tuple (['フン', 'プン']));
			}) ())) {
				__setitem__ (njd, 'read', __add__ (__getslice__ (__getitem__ (njd, 'read'), null, __neg__ (2), 1), 'ブン'));
				__setitem__ (njd, 'pron', __add__ (__getslice__ (__getitem__ (njd, 'pron'), null, __neg__ (2), 1), 'ブン'));
			}
			else if (__t__ ((function () {
				var __accu0__ = __getitem__ (njd, 'pron');
				return __call__ (__accu0__.endswith, __accu0__, 'ブ');
			}) ())) {
				__setitem__ (njd, 'read', __call__ (__iadd__, null, __getitem__ (njd, 'read'), 'ン'));
				__setitem__ (njd, 'pron', __call__ (__iadd__, null, __getitem__ (njd, 'pron'), 'ン'));
			}
			__setitem__ (njd, 'mora_size', __call__ (sum, null, (function () {
				var __accu0__ = [];
				var __iterable1__ = __getitem__ (njd, 'pron');
				__iterable1__ = __i__ (__iterable1__);
				for (var __index1__ = 0; __index1__ < len (__iterable1__); __index1__++) {
					var character = __getitem__ (__iterable1__, __index1__);
					(function () {
						var __accu1__ = __accu0__;
						return __call__ (__accu1__.append, __accu1__, !__in__ (character, 'ャュョァィゥェォ’'));
					}) ();
				}
				return __accu0__;
			}) ()));
			if (__t__ (__t__ (__eq__ (__getitem__ (njd, 'string'), '分')) && __t__ (__gt__ (i, 0)) && __eq__ (__getitem__ (__getitem__ (njd_features, __sub__ (i, 1)), 'pos_group1'), '数'))) {
				__setitem__ (njd, 'chain_rule', 'F5');
			}
			else {
				__setitem__ (njd, 'acc', 0);
			}
			__setitem__ (next_njd, 'chain_flag', 1);
			__setitem__ (__getitem__ (njd_features, __add__ (i, 2)), 'chain_flag', 1);
			__setitem__ (__getitem__ (njd_features, __add__ (i, 2)), 'chain_rule', 'C1');
		}
		if (__t__ (__t__ (modify_numeral_reading === true) && __t__ (__gt__ (i, 0)) && __t__ (__lt__ (__add__ (i, 2), __call__ (len, null, njd_features))) && __t__ (__eq__ (__getitem__ (njd, 'string'), '分')) && __t__ (__eq__ (__getitem__ (__getitem__ (njd_features, __sub__ (i, 1)), 'pos_group1'), '数')) && __t__ (__eq__ (__getitem__ (next_njd, 'string'), 'の')) && __eq__ (__getitem__ (__getitem__ (njd_features, __add__ (i, 2)), 'pos_group1'), '数'))) {
			__setitem__ (njd, 'read', 'ブン');
			__setitem__ (njd, 'pron', 'ブン');
			__setitem__ (njd, 'mora_size', 2);
		}
		var following_string = (__t__ (__lt__ (__add__ (i, 2), __call__ (len, null, njd_features))) ? __getitem__ (__getitem__ (njd_features, __add__ (i, 2)), 'string') : '');
		if (__t__ (__t__ (modify_numeral_reading === true) && __t__ (__eq__ (__getitem__ (njd, 'pos_group1'), '数')) && __t__ (__eq__ (__getitem__ (next_njd, 'pos'), '記号')) && __t__ (__in__ (__getitem__ (next_njd, 'string'), _UNIT_LETTER_COUNTERS)) && __t__ (__ne__ (__getitem__ (next_njd, 'pos_group3'), '読み保護')) && !__in__ (__getslice__ (following_string, null, 1, 1), _UNIT_LETTER_FORMULA_OPERATORS))) {
			var __left0__ = __getitem__ (_UNIT_LETTER_COUNTERS, __getitem__ (next_njd, 'string'));
			var read = __left0__ [0];
			var acc = __left0__ [1];
			var mora_size = __left0__ [2];
			var chain_rule = __left0__ [3];
			(function () {
				var __accu0__ = next_njd;
				return __call__ (__accu0__.py_update, __accu0__, __kwargtrans__ ({pos: '名詞', pos_group1: '接尾', pos_group2: '助数詞', pos_group3: '*', read: read, pron: read, acc: acc, mora_size: mora_size, chain_rule: chain_rule}));
			}) ();
		}
		if (__t__ (__t__ (modify_numeral_reading === true) && __t__ (__eq__ (__getitem__ (njd, 'string'), '〇')) && __t__ (__eq__ (__getitem__ (next_njd, 'string'), '〇')) && __t__ (!__in__ (i, numeral_zero_indices)) && !__in__ (__add__ (i, 1), numeral_zero_indices))) {
			var __iterable1__ = tuple ([njd, next_njd]);
			__iterable1__ = __i__ (__iterable1__);
			for (var __index1__ = 0; __index1__ < len (__iterable1__); __index1__++) {
				var placeholder_njd = __getitem__ (__iterable1__, __index1__);
				__setitem__ (placeholder_njd, 'pos', '名詞');
				__setitem__ (placeholder_njd, 'pos_group1', '一般');
				__setitem__ (placeholder_njd, 'read', 'マル');
				__setitem__ (placeholder_njd, 'pron', 'マル');
				__setitem__ (placeholder_njd, 'acc', 0);
				__setitem__ (placeholder_njd, 'mora_size', 2);
			}
		}
		if (__t__ (__t__ (__eq__ (__getitem__ (next_njd, 'string'), '球')) && __t__ (__eq__ (__getitem__ (next_njd, 'pos'), '名詞')) && __t__ (__eq__ (__getitem__ (next_njd, 'pos_group1'), '接尾')) && __t__ (__eq__ (__getitem__ (next_njd, 'pron'), 'キュー')) && __t__ (__call__ (any, null, (function () {
			var __accu0__ = [];
			var __iterable1__ = __getitem__ (njd, 'string');
			__iterable1__ = __i__ (__iterable1__);
			for (var __index1__ = 0; __index1__ < len (__iterable1__); __index1__++) {
				var character = __getitem__ (__iterable1__, __index1__);
				(function () {
					var __accu1__ = __accu0__;
					return __call__ (__accu1__.append, __accu1__, (__le__ ('一', character) && __le__ (character, '鿿')));
				}) ();
			}
			return __accu0__;
		}) ())) && __call__ (contains_hiragana, null, __getitem__ (njd, 'string')) === true)) {
			__setitem__ (next_njd, 'read', 'ダマ');
			__setitem__ (next_njd, 'pron', 'ダマ');
			__setitem__ (next_njd, 'acc', 1);
			__setitem__ (next_njd, 'mora_size', 2);
			__setitem__ (next_njd, 'chain_rule', 'C4');
		}
		if (__t__ (__t__ ((__t__ (__in__ (__getitem__ (njd, 'pos_group1'), ['サ変接続', '格助詞', '接続助詞'])) || __t__ (__t__ (__eq__ (__getitem__ (njd, 'pos'), '名詞')) && __eq__ (__getitem__ (njd, 'pos_group1'), '一般')) || __eq__ (__getitem__ (njd, 'pos'), '副詞'))) && __eq__ (__getitem__ (__getitem__ (njd_features, __add__ (i, 1)), 'ctype'), 'サ変・スル'))) {
			__setitem__ (__getitem__ (njd_features, __add__ (i, 1)), 'chain_flag', 1);
		}
		if (__t__ (__t__ (__in__ (__getitem__ (njd, 'string'), ['お', '御', 'ご'])) && __eq__ (__getitem__ (njd, 'chain_rule'), 'P1'))) {
			if (__t__ (__t__ (__eq__ (__getitem__ (__getitem__ (njd_features, __add__ (i, 1)), 'acc'), 0)) || __eq__ (__getitem__ (__getitem__ (njd_features, __add__ (i, 1)), 'acc'), __getitem__ (__getitem__ (njd_features, __add__ (i, 1)), 'mora_size')))) {
				__setitem__ (__getitem__ (njd_features, __add__ (i, 1)), 'chain_rule', 'C4');
				__setitem__ (__getitem__ (njd_features, __add__ (i, 1)), 'acc', 0);
			}
			else {
				__setitem__ (__getitem__ (njd_features, __add__ (i, 1)), 'chain_rule', 'C1');
			}
		}
		if (__t__ (__t__ (__eq__ (__getitem__ (njd, 'pos'), '動詞')) && __eq__ (__getitem__ (__getitem__ (njd_features, __add__ (i, 1)), 'pos'), '動詞'))) {
			__setitem__ (__getitem__ (njd_features, __add__ (i, 1)), 'chain_rule', (__t__ (__ne__ (__getitem__ (__getitem__ (njd_features, __add__ (i, 1)), 'acc'), 0)) ? 'C1' : 'C4'));
		}
		if (__t__ (__t__ (__in__ (__getitem__ (njd, 'cform'), ['連用形', '連用タ接続', '連用ゴザイ接続', '連用テ接続'])) && (__eq__ (__getitem__ (njd, 'acc'), __getitem__ (njd, 'mora_size')) && __gt__ (__getitem__ (njd, 'mora_size'), 1)))) {
			__setitem__ (njd, 'acc', __call__ (__isub__, null, __getitem__ (njd, 'acc'), 1));
		}
		if (__t__ (__t__ (__in__ (__getitem__ (njd, 'orig'), ['れる', 'られる', 'せる', 'させる', 'ちゃう'])) && __in__ (__getitem__ (__getitem__ (njd_features, __add__ (i, 1)), 'string'), ['た']))) {
			__setitem__ (__getitem__ (njd_features, __add__ (i, 1)), 'chain_rule', 'F2@1');
		}
		if (__t__ (__t__ (__eq__ (__getitem__ (njd, 'pos'), '形容詞')) && __in__ (__getitem__ (__getitem__ (njd_features, __add__ (i, 1)), 'orig'), ['なる', 'する']))) {
			__setitem__ (__getitem__ (njd_features, __add__ (i, 1)), 'chain_flag', 1);
		}
	}
	var __iterable0__ = __call__ (py_enumerate, null, njd_features);
	__iterable0__ = __i__ (__iterable0__);
	for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
		var __left0__ = __getitem__ (__iterable0__, __index0__);
		var i = __left0__ [0];
		var njd = __left0__ [1];
		if (__t__ (__ne__ (__getitem__ (njd, 'pos'), 'フィラー'))) {
			continue;
		}
		__setitem__ (njd, 'chain_flag', 0);
		if (__t__ (__t__ (__lt__ (__add__ (i, 1), __call__ (len, null, njd_features))) && __eq__ (__getitem__ (__getitem__ (njd_features, __add__ (i, 1)), 'pos'), '名詞'))) {
			__setitem__ (__getitem__ (njd_features, __add__ (i, 1)), 'chain_flag', 0);
		}
	}
	if (__t__ (modify_numeral_reading === true)) {
		__call__ (split_prefix_accent_phrase, null, njd_features);
	}
	return njd_features;
};
export var _expand_symbol_feature = function (mecab_feature) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'mecab_feature': var mecab_feature = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var columns = (function () {
		var __accu0__ = mecab_feature;
		return __call__ (__accu0__.py_split, __accu0__, ',');
	}) ();
	var surface = __getitem__ (columns, 0);
	var is_unknown_symbol_chunk = __t__ (__eq__ (__call__ (len, null, columns), 8)) && __t__ (__gt__ (__call__ (len, null, surface), 1)) && __t__ (__call__ (all, null, (function () {
		var __accu0__ = [];
		var __iterable0__ = surface;
		__iterable0__ = __i__ (__iterable0__);
		for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
			var character = __getitem__ (__iterable0__, __index0__);
			(function () {
				var __accu1__ = __accu0__;
				return __call__ (__accu1__.append, __accu1__, (function () {
					var __accu2__ = character;
					return __call__ (__accu2__.isalnum, __accu2__);
				}) () === false);
			}) ();
		}
		return __accu0__;
	}) ())) && __call__ (any, null, (function () {
		var __accu0__ = [];
		var __iterable0__ = surface;
		__iterable0__ = __i__ (__iterable0__);
		for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
			var character = __getitem__ (__iterable0__, __index0__);
			(function () {
				var __accu1__ = __accu0__;
				return __call__ (__accu1__.append, __accu1__, __in__ (character, _PAUSE_SYMBOLS_REQUIRING_EXPANSION));
			}) ();
		}
		return __accu0__;
	}) ());
	if (__t__ (is_unknown_symbol_chunk === false)) {
		return [mecab_feature];
	}
	var expanded_features = [];
	var __iterable0__ = surface;
	__iterable0__ = __i__ (__iterable0__);
	for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
		var character = __getitem__ (__iterable0__, __index0__);
		var known_symbol = (function () {
			var __accu0__ = KNOWN_SYMBOL_FEATURES;
			return __call__ (__accu0__.py_get, __accu0__, character);
		}) ();
		if (__t__ (known_symbol === null)) {
			(function () {
				var __accu0__ = expanded_features;
				return __call__ (__accu0__.append, __accu0__, __add__ (__add__ (character, ','), __call__ (join_strings, null, ',', __getslice__ (columns, 1, null, 1))));
			}) ();
		}
		else {
			(function () {
				var __accu0__ = expanded_features;
				return __call__ (__accu0__.append, __accu0__, __add__ (__add__ (character, ','), __getitem__ (known_symbol, 3)));
			}) ();
		}
	}
	return expanded_features;
};
export var _mark_numeral_space_boundaries = function (features) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'features': var features = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var result = [];
	var previous_was_number = false;
	var number_space = false;
	var __iterable0__ = features;
	__iterable0__ = __i__ (__iterable0__);
	for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
		var feature = __getitem__ (__iterable0__, __index0__);
		var columns = (function () {
			var __accu0__ = feature;
			return __call__ (__accu0__.py_split, __accu0__, ',');
		}) ();
		if (__t__ (__in__ ('記号,空白', feature))) {
			var number_space = previous_was_number;
			continue;
		}
		var is_number = __t__ (__gt__ (__call__ (len, null, columns), 2)) && __eq__ (__getslice__ (columns, 1, 3, 1), ['名詞', '数']);
		if (__t__ (__t__ (number_space === true) && is_number === true)) {
			if (__t__ (__eq__ (__call__ (len, null, columns), 12))) {
				(function () {
					var __accu0__ = columns;
					return __call__ (__accu0__.append, __accu0__, '0');
				}) ();
			}
			else if (__t__ (__gt__ (__call__ (len, null, columns), 12))) {
				__setitem__ (columns, 12, '0');
			}
			var feature = __call__ (join_strings, null, ',', columns);
		}
		(function () {
			var __accu0__ = result;
			return __call__ (__accu0__.append, __accu0__, feature);
		}) ();
		var previous_was_number = is_number;
		var number_space = false;
	}
	return result;
};

