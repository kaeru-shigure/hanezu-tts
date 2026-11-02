// Generated from pyopenjtalk-plus e7713f2d6d91f392f595df5e8998ff2b62c3b6f5; see tools/build_rules.py.
import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __mergefields__, __mergekwargtrans__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __pyUseJsNext__, __rshift__, __setitem__, __setproperty__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __withblock__, __xor__, _sort, abs, all, any, assert, bin, bool, bytearray, bytes, callable, chr, delattr, dict, dir, divmod, filter, float, getattr, hasattr, hex, input, int, isinstance, issubclass, len, list, map, max, min, object, oct, ord, pow, print, property, py_TypeError, py_enumerate, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
import {split_kana_mora} from './utils.js';
import {is_katakana_word} from './_kana_utils.js';
import {join_strings, maketrans, merge_dict, translate} from './compatibility.js';
var __name__ = '_loanword';
export var _LOANWORD_KANA_RESTORATIONS = tuple ([tuple (['ヴャ', 'ビャ']), tuple (['ヴュ', 'ビュ']), tuple (['ヴョ', 'ビョ']), tuple (['ヴァ', 'バ']), tuple (['ヴィ', 'ビ']), tuple (['ヴェ', 'ベ']), tuple (['ヴォ', 'ボ']), tuple (['ヴ', 'ブ']), tuple (['スィ', 'シ']), tuple (['ズィ', 'ジ']), tuple (['テュ', 'チュ']), tuple (['デュ', 'ヂュ']), tuple (['イェ', 'イエ']), tuple (['シィ', 'シー']), tuple (['リェ', 'リエ']), tuple (['ニェ', 'ニエ']), tuple (['ヒェ', 'ヒエ']), tuple (['ミェ', 'ミエ']), tuple (['ビェ', 'ビエ']), tuple (['ピェ', 'ピエ']), tuple (['キェ', 'ケ']), tuple (['ギェ', 'ゲ']), tuple (['グゥ', 'グウ']), tuple (['クゥ', 'クウ'])]);
export var restore_loanword_kana = function (njd_features) {
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
	var _restore_spelling = function (surface, pronunciation) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'surface': var surface = __allkwargs0__ [__attrib0__]; break;
						case 'pronunciation': var pronunciation = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		var restored = [];
		var restored_segments = [];
		var surface_offset = 0;
		var pronunciation_offset = 0;
		var is_changed = false;
		while (__t__ (__lt__ (surface_offset, __call__ (len, null, surface)))) {
			if (__t__ ((function () {
				var __accu0__ = pronunciation;
				return __call__ (__accu0__.startswith, __accu0__, '’', pronunciation_offset);
			}) ())) {
				(function () {
					var __accu0__ = restored;
					return __call__ (__accu0__.append, __accu0__, '’');
				}) ();
				var pronunciation_offset = __call__ (__iadd__, null, pronunciation_offset, 1);
				continue;
			}
			var restoration = __call__ (py_next, null, __call__ (py_iter, null, (function () {
				var __accu0__ = [];
				var __iterable0__ = _LOANWORD_KANA_RESTORATIONS;
				__iterable0__ = __i__ (__iterable0__);
				for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
					var __left0__ = __getitem__ (__iterable0__, __index0__);
					var original = __left0__ [0];
					var collapsed = __left0__ [1];
					if (__t__ (__t__ ((function () {
						var __accu1__ = surface;
						return __call__ (__accu1__.startswith, __accu1__, original, surface_offset);
					}) ()) && (function () {
						var __accu1__ = pronunciation;
						return __call__ (__accu1__.startswith, __accu1__, collapsed, pronunciation_offset);
					}) ())) {
						(function () {
							var __accu1__ = __accu0__;
							return __call__ (__accu1__.append, __accu1__, tuple ([original, collapsed]));
						}) ();
					}
				}
				return __accu0__;
			}) ()), null);
			if (__t__ (restoration !== null)) {
				var __left0__ = restoration;
				var original = __left0__ [0];
				var collapsed = __left0__ [1];
				(function () {
					var __accu0__ = restored_segments;
					return __call__ (__accu0__.append, __accu0__, tuple ([__call__ (len, null, __call__ (split_kana_mora, null, (function () {
						var __accu1__ = __getslice__ (pronunciation, null, pronunciation_offset, 1);
						return __call__ (__accu1__.py_replace, __accu1__, '’', '');
					}) ())), __call__ (len, null, __call__ (split_kana_mora, null, collapsed)), __call__ (len, null, __call__ (split_kana_mora, null, original))]));
				}) ();
				(function () {
					var __accu0__ = restored;
					return __call__ (__accu0__.append, __accu0__, original);
				}) ();
				var surface_offset = __call__ (__iadd__, null, surface_offset, __call__ (len, null, original));
				var pronunciation_offset = __call__ (__iadd__, null, pronunciation_offset, __call__ (len, null, collapsed));
				var is_changed = true;
				continue;
			}
			var surface_char = __getitem__ (surface, surface_offset);
			if (__t__ (__t__ (__in__ (surface_char, 'イウ')) && (function () {
				var __accu0__ = pronunciation;
				return __call__ (__accu0__.startswith, __accu0__, 'ー', pronunciation_offset);
			}) ())) {
				(function () {
					var __accu0__ = restored;
					return __call__ (__accu0__.append, __accu0__, 'ー');
				}) ();
				var surface_offset = __call__ (__iadd__, null, surface_offset, 1);
				var pronunciation_offset = __call__ (__iadd__, null, pronunciation_offset, 1);
				continue;
			}
			if (__t__ ((function () {
				var __accu0__ = pronunciation;
				return __call__ (__accu0__.startswith, __accu0__, surface_char, pronunciation_offset);
			}) () === false)) {
				return null;
			}
			(function () {
				var __accu0__ = restored;
				return __call__ (__accu0__.append, __accu0__, surface_char);
			}) ();
			var surface_offset = __call__ (__iadd__, null, surface_offset, 1);
			var pronunciation_offset = __call__ (__iadd__, null, pronunciation_offset, 1);
		}
		if (__t__ ((function () {
			var __accu0__ = pronunciation;
			return __call__ (__accu0__.startswith, __accu0__, '’', pronunciation_offset);
		}) ())) {
			(function () {
				var __accu0__ = restored;
				return __call__ (__accu0__.append, __accu0__, '’');
			}) ();
			var pronunciation_offset = __call__ (__iadd__, null, pronunciation_offset, 1);
		}
		if (__t__ (__t__ (__ne__ (pronunciation_offset, __call__ (len, null, pronunciation))) || is_changed === false)) {
			return null;
		}
		return tuple ([__call__ (join_strings, null, '', restored), restored_segments]);
	};
	var phrase_head = null;
	var phrase_mora_offset = 0;
	var __iterable0__ = __call__ (py_enumerate, null, njd_features);
	__iterable0__ = __i__ (__iterable0__);
	for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
		var __left0__ = __getitem__ (__iterable0__, __index0__);
		var index = __left0__ [0];
		var feature = __left0__ [1];
		if (__t__ (__t__ (phrase_head === null) || __ne__ (__getitem__ (feature, 'chain_flag'), 1))) {
			var phrase_head = feature;
			var phrase_mora_offset = 0;
		}
		else {
			var phrase_mora_offset = __call__ (__iadd__, null, phrase_mora_offset, __getitem__ (__getitem__ (njd_features, __sub__ (index, 1)), 'mora_size'));
		}
		if (__t__ (__getitem__ (feature, 'is_reading_protected') === true)) {
			continue;
		}
		var surface = __getitem__ (feature, 'string');
		if (__t__ (__call__ (is_katakana_word, null, surface) === false)) {
			continue;
		}
		var restored_read = __call__ (_restore_spelling, null, surface, __getitem__ (feature, 'read'));
		if (__t__ (restored_read !== null)) {
			__setitem__ (feature, 'read', __getitem__ (restored_read, 0));
		}
		var restored_pronunciation = __call__ (_restore_spelling, null, surface, __getitem__ (feature, 'pron'));
		if (__t__ (restored_pronunciation !== null)) {
			var __left0__ = restored_pronunciation;
			__setitem__ (feature, 'pron', __left0__ [0]);
			var restored_segments = __left0__ [1];
			__setitem__ (feature, 'mora_size', __call__ (len, null, __call__ (split_kana_mora, null, (function () {
				var __accu0__ = __getitem__ (feature, 'pron');
				return __call__ (__accu0__.py_replace, __accu0__, '’', '');
			}) ())));
			var accent_shift = 0;
			var phrase_accent_shift = 0;
			var __iterable1__ = restored_segments;
			__iterable1__ = __i__ (__iterable1__);
			for (var __index1__ = 0; __index1__ < len (__iterable1__); __index1__++) {
				var __left0__ = __getitem__ (__iterable1__, __index1__);
				var segment_start = __left0__ [0];
				var collapsed_mora_count = __left0__ [1];
				var original_mora_count = __left0__ [2];
				if (__t__ (__gt__ (__getitem__ (feature, 'acc'), __add__ (segment_start, collapsed_mora_count)))) {
					var accent_shift = __call__ (__iadd__, null, accent_shift, __sub__ (collapsed_mora_count, original_mora_count));
				}
				else if (__t__ (__gt__ (__getitem__ (feature, 'acc'), segment_start))) {
					var offset_in_segment = __sub__ (__getitem__ (feature, 'acc'), segment_start);
					var accent_shift = __call__ (__iadd__, null, accent_shift, __sub__ (offset_in_segment, __call__ (min, null, offset_in_segment, original_mora_count)));
				}
				if (__t__ (phrase_head !== feature)) {
					var phrase_segment_start = __add__ (phrase_mora_offset, segment_start);
					if (__t__ (__gt__ (__getitem__ (phrase_head, 'acc'), __add__ (phrase_segment_start, collapsed_mora_count)))) {
						var phrase_accent_shift = __call__ (__iadd__, null, phrase_accent_shift, __sub__ (collapsed_mora_count, original_mora_count));
					}
					else if (__t__ (__gt__ (__getitem__ (phrase_head, 'acc'), phrase_segment_start))) {
						var offset_in_segment = __sub__ (__getitem__ (phrase_head, 'acc'), phrase_segment_start);
						var phrase_accent_shift = __call__ (__iadd__, null, phrase_accent_shift, __sub__ (offset_in_segment, __call__ (min, null, offset_in_segment, original_mora_count)));
					}
				}
			}
			__setitem__ (feature, 'acc', __call__ (__isub__, null, __getitem__ (feature, 'acc'), accent_shift));
			__setitem__ (phrase_head, 'acc', __call__ (__isub__, null, __getitem__ (phrase_head, 'acc'), phrase_accent_shift));
		}
	}
	return njd_features;
};

