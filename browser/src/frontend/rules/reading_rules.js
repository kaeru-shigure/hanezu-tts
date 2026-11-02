// Generated from pyopenjtalk-plus e7713f2d6d91f392f595df5e8998ff2b62c3b6f5; see tools/build_rules.py.
var diagnostics = {};
import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __mergefields__, __mergekwargtrans__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __pyUseJsNext__, __rshift__, __setitem__, __setproperty__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __withblock__, __xor__, _sort, abs, all, any, assert, bin, bool, bytearray, bytes, callable, chr, delattr, dict, dir, divmod, filter, float, getattr, hasattr, hex, input, int, isinstance, issubclass, len, list, map, max, min, object, oct, ord, pow, print, property, py_TypeError, py_enumerate, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
import {ReadingPrediction, ReadingTarget, TsqyomiModel, get_loaded_model} from './model_bridge.js';
import * as __module_diagnostics__ from './diagnostics.js';
__nest__ (diagnostics, '', __module_diagnostics__);
import {is_hiragana_word} from './_kana_utils.js';
import {py_replace} from './compatibility.js';
import {join_strings, maketrans, merge_dict, translate} from './compatibility.js';
var __name__ = 'reading_rules';
export var _CLOSING_DELIMITER_BY_OPENING = dict ({'「': '」', '『': '』', '（': '）', '(': ')', '［': '］', '[': ']', '【': '】', '〈': '〉', '《': '》', '“': '”', '‘': '’'});
export var _PRONUNCIATION_CANONICAL_TRANSLATION = __call__ (maketrans, null, dict ({'ヲ': 'オ', 'ヅ': 'ズ', 'ヂ': 'ジ'}));
export var _DURATION_MONTH_FOLLOWING_SURFACES = __call__ (set, null, new set (['間', '前', '後', '以内', '以上', '以下', '未満', '程度', 'ほど', 'くらい', 'ぐらい']));
export var _CONTEXTUAL_NAN_COUNTER_SURFACES = __call__ (set, null, new set (['人', '色', '時', '手']));
export var _CALENDAR_MONTH_MODIFIER_SURFACES = __call__ (set, null, new set (['前年', '去年', '昨年', '今年', '来年', '翌年', '再来年', '次']));
export var _ResolvedTarget =  __class__ ('_ResolvedTarget', [object], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, char_span, morph_range, surface, span_paths, pronunciations, selected_pronunciation, score_margin, was_preserved) {
		if (typeof selected_pronunciation == 'undefined' || (selected_pronunciation != null && selected_pronunciation.hasOwnProperty ("__kwargtrans__"))) {;
			var selected_pronunciation = null;
		};
		if (typeof score_margin == 'undefined' || (score_margin != null && score_margin.hasOwnProperty ("__kwargtrans__"))) {;
			var score_margin = null;
		};
		if (typeof was_preserved == 'undefined' || (was_preserved != null && was_preserved.hasOwnProperty ("__kwargtrans__"))) {;
			var was_preserved = false;
		};
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'char_span': var char_span = __allkwargs0__ [__attrib0__]; break;
						case 'morph_range': var morph_range = __allkwargs0__ [__attrib0__]; break;
						case 'surface': var surface = __allkwargs0__ [__attrib0__]; break;
						case 'span_paths': var span_paths = __allkwargs0__ [__attrib0__]; break;
						case 'pronunciations': var pronunciations = __allkwargs0__ [__attrib0__]; break;
						case 'selected_pronunciation': var selected_pronunciation = __allkwargs0__ [__attrib0__]; break;
						case 'score_margin': var score_margin = __allkwargs0__ [__attrib0__]; break;
						case 'was_preserved': var was_preserved = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		self.char_span = char_span;
		self.morph_range = morph_range;
		self.surface = surface;
		self.span_paths = span_paths;
		self.pronunciations = pronunciations;
		self.selected_pronunciation = selected_pronunciation;
		self.score_margin = score_margin;
		self.was_preserved = was_preserved;
	});},
	get to_reading_target () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		return __call__ (ReadingTarget, null, __kwargtrans__ ({char_span: self.char_span, surface: self.surface, pronunciations: self.pronunciations}));
	});},
	get _get_selected_paths () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		if (__t__ (self.selected_pronunciation === null)) {
			return tuple ([]);
		}
		return __call__ (tuple, null, (function () {
			var __accu0__ = [];
			var __iterable0__ = self.span_paths;
			__iterable0__ = __i__ (__iterable0__);
			for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
				var path = __getitem__ (__iterable0__, __index0__);
				if (__t__ (__eq__ (__getitem__ (path, 'pronunciation'), self.selected_pronunciation))) {
					(function () {
						var __accu1__ = __accu0__;
						return __call__ (__accu1__.append, __accu1__, path);
					}) ();
				}
			}
			return __accu0__;
		}) ());
	});}
});
Object.defineProperty (_ResolvedTarget, 'selected_paths', property.call (_ResolvedTarget, _ResolvedTarget._get_selected_paths));;
export var canonicalize_pronunciation = function (pronunciation) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'pronunciation': var pronunciation = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	return __call__ (translate, null, pronunciation, _PRONUNCIATION_CANONICAL_TRANSLATION);
};
export var _default_path_pronunciation = function (morphs, morph_range) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'morphs': var morphs = __allkwargs0__ [__attrib0__]; break;
					case 'morph_range': var morph_range = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var __left0__ = morph_range;
	var start = __left0__ [0];
	var end = __left0__ [1];
	var segments = [];
	var __iterable0__ = __getslice__ (morphs, start, end, 1);
	__iterable0__ = __i__ (__iterable0__);
	for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
		var morph = __getitem__ (__iterable0__, __index0__);
		if (__t__ (__getitem__ (morph, 'is_ignored') === true)) {
			continue;
		}
		var features = __getitem__ (morph, 'features');
		if (__t__ (__lt__ (__call__ (len, null, features), 10))) {
			return null;
		}
		(function () {
			var __accu0__ = segments;
			return __call__ (__accu0__.append, __accu0__, __getitem__ (features, 9));
		}) ();
	}
	if (__t__ (__eq__ (__call__ (len, null, segments), 0))) {
		return null;
	}
	return __call__ (join_strings, null, '', segments);
};
export var _is_minute_counter_suffix = function (morph) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'morph': var morph = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var features = __getitem__ (morph, 'features');
	return __t__ (__ge__ (__call__ (len, null, features), 4)) && __t__ (__eq__ (__getslice__ (features, 1, 4, 1), ['名詞', '接尾', '助数詞'])) && __eq__ (__getitem__ (morph, 'surface'), '分');
};
export var _is_hour_counter_suffix = function (morph) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'morph': var morph = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var features = __getitem__ (morph, 'features');
	return __t__ (__ge__ (__call__ (len, null, features), 4)) && __t__ (__eq__ (__getslice__ (features, 1, 4, 1), ['名詞', '接尾', '助数詞'])) && __eq__ (__getitem__ (morph, 'surface'), '時');
};
export var _is_duration_kan_suffix = function (morph) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'morph': var morph = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var features = __getitem__ (morph, 'features');
	return __t__ (__ge__ (__call__ (len, null, features), 4)) && __t__ (__eq__ (__getslice__ (features, 1, 4, 1), ['名詞', '接尾', '一般'])) && __eq__ (__getitem__ (morph, 'surface'), '間');
};
export var _is_hour_duration_head_morph = function (morph) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'morph': var morph = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var surface = __getitem__ (morph, 'surface');
	var features = __getitem__ (morph, 'features');
	if (__t__ (__t__ ((function () {
		var __accu0__ = surface;
		return __call__ (__accu0__.endswith, __accu0__, '時間');
	}) ()) && __t__ (__ge__ (__call__ (len, null, features), 3)) && __eq__ (__getslice__ (features, 1, 3, 1), ['名詞', '一般']))) {
		return true;
	}
	if (__t__ (__t__ (__eq__ (surface, '何時')) || !__t__ (((function () {
		var __accu0__ = surface;
		return __call__ (__accu0__.endswith, __accu0__, '時');
	}) ())))) {
		return false;
	}
	if (__t__ (__t__ (__ge__ (__call__ (len, null, features), 3)) && __eq__ (__getslice__ (features, 1, 3, 1), ['名詞', '一般']))) {
		return true;
	}
	if (__t__ (__t__ (__ge__ (__call__ (len, null, features), 4)) && __eq__ (__getslice__ (features, 1, 4, 1), ['名詞', '固有名詞', '地域']))) {
		return true;
	}
	return false;
};
export var _is_general_counter_suffix = function (morph) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'morph': var morph = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var features = __getitem__ (morph, 'features');
	return __t__ (__ge__ (__call__ (len, null, features), 4)) && __eq__ (__getslice__ (features, 1, 4, 1), ['名詞', '接尾', '助数詞']);
};
export var _is_number_nan_morph = function (morph) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'morph': var morph = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var features = __getitem__ (morph, 'features');
	return __t__ (__eq__ (__getitem__ (morph, 'surface'), '何')) && __t__ (__ge__ (__call__ (len, null, features), 3)) && __eq__ (__getslice__ (features, 1, 3, 1), ['名詞', '数']);
};
export var _is_duration_month_morph = function (morphs, morph_index) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'morphs': var morphs = __allkwargs0__ [__attrib0__]; break;
					case 'morph_index': var morph_index = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var morph = __getitem__ (morphs, morph_index);
	var features = __getitem__ (morph, 'features');
	if (__t__ (__t__ (__ne__ (__getitem__ (morph, 'surface'), '一月')) || __t__ (__lt__ (__call__ (len, null, features), 3)) || __t__ (__ne__ (__getslice__ (features, 1, 3, 1), ['名詞', '一般'])) || __ge__ (__add__ (morph_index, 1), __call__ (len, null, morphs)))) {
		return false;
	}
	if (__t__ (__ge__ (morph_index, 2))) {
		var previous_morph = __getitem__ (morphs, __sub__ (morph_index, 1));
		var modifier_morph = __getitem__ (morphs, __sub__ (morph_index, 2));
		if (__t__ (__t__ (__eq__ (__getitem__ (previous_morph, 'surface'), 'の')) && __t__ (__in__ (__getitem__ (modifier_morph, 'surface'), _CALENDAR_MONTH_MODIFIER_SURFACES)) && __t__ (__eq__ (__getitem__ (__getitem__ (modifier_morph, 'char_span'), 1), __getitem__ (__getitem__ (previous_morph, 'char_span'), 0))) && __eq__ (__getitem__ (__getitem__ (previous_morph, 'char_span'), 1), __getitem__ (__getitem__ (morph, 'char_span'), 0)))) {
			return false;
		}
	}
	var following_morph = __getitem__ (morphs, __add__ (morph_index, 1));
	return __t__ (__eq__ (__getitem__ (__getitem__ (morph, 'char_span'), 1), __getitem__ (__getitem__ (following_morph, 'char_span'), 0))) && __in__ (__getitem__ (following_morph, 'surface'), _DURATION_MONTH_FOLLOWING_SURFACES);
};
export var _is_dictionary_go_suffix_morph = function (morph) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'morph': var morph = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	if (__t__ (__ne__ (__getitem__ (morph, 'surface'), '後'))) {
		return false;
	}
	var features = __getitem__ (morph, 'features');
	return __t__ (__ge__ (__call__ (len, null, features), 10)) && __t__ (__eq__ (__getslice__ (features, 1, 4, 1), ['名詞', '接尾', '副詞可能'])) && __eq__ (__getitem__ (features, 9), 'ゴ');
};
export var _is_contiguous_go_suffix_morph = function (morph, previous_morph) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'morph': var morph = __allkwargs0__ [__attrib0__]; break;
					case 'previous_morph': var previous_morph = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	return __t__ (__ge__ (__call__ (len, null, __getitem__ (previous_morph, 'features')), 2)) && __t__ (__eq__ (__getitem__ (__getitem__ (previous_morph, 'features'), 1), '名詞')) && __t__ (__eq__ (__getitem__ (__getitem__ (previous_morph, 'char_span'), 1), __getitem__ (__getitem__ (morph, 'char_span'), 0))) && __call__ (_is_dictionary_go_suffix_morph, null, morph) === true;
};
export var _find_dictionary_owned_quantity_ranges = function (morphs) {
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
	var protected_ranges = [];
	var morph_index = 0;
	while (__t__ (__lt__ (morph_index, __call__ (len, null, morphs)))) {
		var morph = __getitem__ (morphs, morph_index);
		var features = __getitem__ (morph, 'features');
		if (__t__ (__call__ (_is_duration_month_morph, null, morphs, morph_index) === true)) {
			(function () {
				var __accu0__ = protected_ranges;
				return __call__ (__accu0__.append, __accu0__, __getitem__ (morph, 'char_span'));
			}) ();
			var morph_index = __call__ (__iadd__, null, morph_index, 1);
			continue;
		}
		if (__t__ (__t__ (__lt__ (__add__ (morph_index, 2), __call__ (len, null, morphs))) && __t__ (__ge__ (__call__ (len, null, features), 3)) && __t__ (__eq__ (__getslice__ (features, 1, 3, 1), ['名詞', '数'])) && __t__ (__eq__ (__getitem__ (__getitem__ (morphs, __add__ (morph_index, 1)), 'surface'), '日')) && __t__ (__eq__ (__getitem__ (__getitem__ (morphs, __add__ (morph_index, 2)), 'surface'), '中')) && __t__ (__eq__ (__getitem__ (__getitem__ (morph, 'char_span'), 1), __getitem__ (__getitem__ (__getitem__ (morphs, __add__ (morph_index, 1)), 'char_span'), 0))) && __eq__ (__getitem__ (__getitem__ (__getitem__ (morphs, __add__ (morph_index, 1)), 'char_span'), 1), __getitem__ (__getitem__ (__getitem__ (morphs, __add__ (morph_index, 2)), 'char_span'), 0)))) {
			(function () {
				var __accu0__ = protected_ranges;
				return __call__ (__accu0__.append, __accu0__, tuple ([__getitem__ (__getitem__ (__getitem__ (morphs, __add__ (morph_index, 1)), 'char_span'), 0), __getitem__ (__getitem__ (__getitem__ (morphs, __add__ (morph_index, 2)), 'char_span'), 1)]));
			}) ();
			var morph_index = __call__ (__iadd__, null, morph_index, 3);
			continue;
		}
		if (__t__ (__eq__ (__getitem__ (morph, 'surface'), '何分'))) {
			(function () {
				var __accu0__ = protected_ranges;
				return __call__ (__accu0__.append, __accu0__, __getitem__ (morph, 'char_span'));
			}) ();
			var morph_index = __call__ (__iadd__, null, morph_index, 1);
			continue;
		}
		if (__t__ (__t__ (__call__ (_is_hour_duration_head_morph, null, morph) === true) && (function () {
			var __accu0__ = __getitem__ (morph, 'surface');
			return __call__ (__accu0__.endswith, __accu0__, '時間');
		}) () === true)) {
			(function () {
				var __accu0__ = protected_ranges;
				return __call__ (__accu0__.append, __accu0__, __getitem__ (morph, 'char_span'));
			}) ();
			var morph_index = __call__ (__iadd__, null, morph_index, 1);
			continue;
		}
		if (__t__ (__lt__ (__add__ (morph_index, 1), __call__ (len, null, morphs)))) {
			var kan_morph = __getitem__ (morphs, __add__ (morph_index, 1));
			var is_contiguous_kan = __eq__ (__getitem__ (__getitem__ (morph, 'char_span'), 1), __getitem__ (__getitem__ (kan_morph, 'char_span'), 0));
			if (__t__ (__t__ (is_contiguous_kan === true) && __t__ (__call__ (_is_hour_duration_head_morph, null, morph) === true) && __call__ (_is_duration_kan_suffix, null, kan_morph) === true)) {
				(function () {
					var __accu0__ = protected_ranges;
					return __call__ (__accu0__.append, __accu0__, tuple ([__getitem__ (__getitem__ (morph, 'char_span'), 0), __getitem__ (__getitem__ (kan_morph, 'char_span'), 1)]));
				}) ();
				var morph_index = __call__ (__iadd__, null, morph_index, 2);
				continue;
			}
		}
		if (__t__ (__t__ (__eq__ (__getitem__ (morph, 'surface'), '何時間')) && __lt__ (__add__ (morph_index, 1), __call__ (len, null, morphs)))) {
			var following_morph = __getitem__ (morphs, __add__ (morph_index, 1));
			var is_contiguous = __eq__ (__getitem__ (__getitem__ (morph, 'char_span'), 1), __getitem__ (__getitem__ (following_morph, 'char_span'), 0));
			if (__t__ (__t__ (is_contiguous === true) && __eq__ (__getitem__ (following_morph, 'surface'), '何分'))) {
				(function () {
					var __accu0__ = protected_ranges;
					return __call__ (__accu0__.append, __accu0__, __getitem__ (following_morph, 'char_span'));
				}) ();
				var morph_index = __call__ (__iadd__, null, morph_index, 2);
				continue;
			}
			if (__t__ (__t__ (is_contiguous === true) && __t__ (__eq__ (__getitem__ (following_morph, 'surface'), '何')) && __lt__ (__add__ (morph_index, 2), __call__ (len, null, morphs)))) {
				var minute_morph = __getitem__ (morphs, __add__ (morph_index, 2));
				var is_minute_contiguous = __eq__ (__getitem__ (__getitem__ (following_morph, 'char_span'), 1), __getitem__ (__getitem__ (minute_morph, 'char_span'), 0));
				if (__t__ (__t__ (is_minute_contiguous === true) && __call__ (_is_minute_counter_suffix, null, minute_morph) === true)) {
					(function () {
						var __accu0__ = protected_ranges;
						return __call__ (__accu0__.append, __accu0__, tuple ([__getitem__ (__getitem__ (following_morph, 'char_span'), 0), __getitem__ (__getitem__ (minute_morph, 'char_span'), 1)]));
					}) ();
					var morph_index = __call__ (__iadd__, null, morph_index, 3);
					continue;
				}
			}
		}
		if (__t__ (__t__ (__eq__ (__getitem__ (morph, 'surface'), '何')) && __lt__ (__add__ (morph_index, 1), __call__ (len, null, morphs)))) {
			var minute_morph = __getitem__ (morphs, __add__ (morph_index, 1));
			var is_contiguous = __eq__ (__getitem__ (__getitem__ (morph, 'char_span'), 1), __getitem__ (__getitem__ (minute_morph, 'char_span'), 0));
			if (__t__ (__t__ (is_contiguous === true) && __call__ (_is_minute_counter_suffix, null, minute_morph) === true)) {
				(function () {
					var __accu0__ = protected_ranges;
					return __call__ (__accu0__.append, __accu0__, tuple ([__getitem__ (__getitem__ (morph, 'char_span'), 0), __getitem__ (__getitem__ (minute_morph, 'char_span'), 1)]));
				}) ();
				var morph_index = __call__ (__iadd__, null, morph_index, 2);
				continue;
			}
			if (__t__ (__lt__ (__add__ (morph_index, 3), __call__ (len, null, morphs)))) {
				var hour_morph = __getitem__ (morphs, __add__ (morph_index, 1));
				var second_nan_morph = __getitem__ (morphs, __add__ (morph_index, 2));
				var minute_morph = __getitem__ (morphs, __add__ (morph_index, 3));
				var is_clock_contiguous = __t__ (__eq__ (__getitem__ (__getitem__ (morph, 'char_span'), 1), __getitem__ (__getitem__ (hour_morph, 'char_span'), 0))) && __t__ (__eq__ (__getitem__ (__getitem__ (hour_morph, 'char_span'), 1), __getitem__ (__getitem__ (second_nan_morph, 'char_span'), 0))) && __eq__ (__getitem__ (__getitem__ (second_nan_morph, 'char_span'), 1), __getitem__ (__getitem__ (minute_morph, 'char_span'), 0));
				if (__t__ (__t__ (is_clock_contiguous === true) && __t__ (__call__ (_is_hour_counter_suffix, null, hour_morph) === true) && __t__ (__eq__ (__getitem__ (second_nan_morph, 'surface'), '何')) && __call__ (_is_minute_counter_suffix, null, minute_morph) === true)) {
					(function () {
						var __accu0__ = protected_ranges;
						return __call__ (__accu0__.append, __accu0__, tuple ([__getitem__ (__getitem__ (morph, 'char_span'), 0), __getitem__ (__getitem__ (minute_morph, 'char_span'), 1)]));
					}) ();
					var morph_index = __call__ (__iadd__, null, morph_index, 4);
					continue;
				}
			}
			if (__t__ (__lt__ (__add__ (morph_index, 3), __call__ (len, null, morphs)))) {
				var hour_morph = __getitem__ (morphs, __add__ (morph_index, 1));
				var made_morph = __getitem__ (morphs, __add__ (morph_index, 2));
				var following_morph = __getitem__ (morphs, __add__ (morph_index, 3));
				var is_made_contiguous = __t__ (__eq__ (__getitem__ (__getitem__ (morph, 'char_span'), 1), __getitem__ (__getitem__ (hour_morph, 'char_span'), 0))) && __t__ (__eq__ (__getitem__ (__getitem__ (hour_morph, 'char_span'), 1), __getitem__ (__getitem__ (made_morph, 'char_span'), 0))) && __eq__ (__getitem__ (__getitem__ (made_morph, 'char_span'), 1), __getitem__ (__getitem__ (following_morph, 'char_span'), 0));
				if (__t__ (__t__ (is_made_contiguous === true) && __t__ (__call__ (_is_hour_counter_suffix, null, hour_morph) === true) && __t__ (__eq__ (__getitem__ (made_morph, 'surface'), 'まで')) && __call__ (_is_contiguous_go_suffix_morph, null, following_morph, made_morph) === true)) {
					(function () {
						var __accu0__ = protected_ranges;
						return __call__ (__accu0__.append, __accu0__, tuple ([__getitem__ (__getitem__ (morph, 'char_span'), 0), __getitem__ (__getitem__ (made_morph, 'char_span'), 1)]));
					}) ();
					var morph_index = __call__ (__iadd__, null, morph_index, 3);
					continue;
				}
			}
			if (__t__ (__lt__ (__add__ (morph_index, 2), __call__ (len, null, morphs)))) {
				var hour_morph = __getitem__ (morphs, __add__ (morph_index, 1));
				var following_morph = __getitem__ (morphs, __add__ (morph_index, 2));
				var is_hour_contiguous = __eq__ (__getitem__ (__getitem__ (morph, 'char_span'), 1), __getitem__ (__getitem__ (hour_morph, 'char_span'), 0));
				var is_following_contiguous = __eq__ (__getitem__ (__getitem__ (hour_morph, 'char_span'), 1), __getitem__ (__getitem__ (following_morph, 'char_span'), 0));
				if (__t__ (__t__ (is_hour_contiguous === true) && __t__ (is_following_contiguous === true) && __t__ (__call__ (_is_hour_counter_suffix, null, hour_morph) === true) && __call__ (_is_contiguous_go_suffix_morph, null, following_morph, hour_morph) === true)) {
					(function () {
						var __accu0__ = protected_ranges;
						return __call__ (__accu0__.append, __accu0__, tuple ([__getitem__ (__getitem__ (morph, 'char_span'), 0), __getitem__ (__getitem__ (following_morph, 'char_span'), 1)]));
					}) ();
					var morph_index = __call__ (__iadd__, null, morph_index, 3);
					continue;
				}
			}
			var counter_morph = __getitem__ (morphs, __add__ (morph_index, 1));
			if (__t__ (__t__ (is_contiguous === true) && __t__ (__call__ (_is_number_nan_morph, null, morph) === true) && __t__ (__call__ (_is_general_counter_suffix, null, counter_morph) === true) && !__in__ (__getitem__ (counter_morph, 'surface'), _CONTEXTUAL_NAN_COUNTER_SURFACES))) {
				(function () {
					var __accu0__ = protected_ranges;
					return __call__ (__accu0__.append, __accu0__, tuple ([__getitem__ (__getitem__ (morph, 'char_span'), 0), __getitem__ (__getitem__ (counter_morph, 'char_span'), 1)]));
				}) ();
				var morph_index = __call__ (__iadd__, null, morph_index, 2);
				continue;
			}
		}
		if (__t__ (__t__ (__eq__ (__getitem__ (morph, 'surface'), '何時')) && __lt__ (__add__ (morph_index, 1), __call__ (len, null, morphs)))) {
			var duration_morph = __getitem__ (morphs, __add__ (morph_index, 1));
			var duration_features = __getitem__ (duration_morph, 'features');
			var is_contiguous = __eq__ (__getitem__ (__getitem__ (morph, 'char_span'), 1), __getitem__ (__getitem__ (duration_morph, 'char_span'), 0));
			var is_duration_suffix = __t__ (__ge__ (__call__ (len, null, duration_features), 3)) && __t__ (__eq__ (__getslice__ (duration_features, 1, 3, 1), ['名詞', '接尾'])) && __eq__ (__getitem__ (duration_morph, 'surface'), '間');
			if (__t__ (__t__ (is_contiguous === true) && is_duration_suffix === true)) {
				(function () {
					var __accu0__ = protected_ranges;
					return __call__ (__accu0__.append, __accu0__, tuple ([__getitem__ (__getitem__ (morph, 'char_span'), 0), __getitem__ (__getitem__ (duration_morph, 'char_span'), 1)]));
				}) ();
				var morph_index = __call__ (__iadd__, null, morph_index, 2);
				continue;
			}
		}
		if (__t__ (__t__ (__lt__ (__call__ (len, null, features), 3)) || __ne__ (__getslice__ (features, 1, 3, 1), ['名詞', '数']))) {
			var morph_index = __call__ (__iadd__, null, morph_index, 1);
			continue;
		}
		var number_start = morph_index;
		var number_end = __add__ (morph_index, 1);
		while (__t__ (__lt__ (number_end, __call__ (len, null, morphs)))) {
			var next_morph = __getitem__ (morphs, number_end);
			var next_features = __getitem__ (next_morph, 'features');
			if (__t__ (__t__ (__lt__ (__call__ (len, null, next_features), 3)) || __t__ (__ne__ (__getslice__ (next_features, 1, 3, 1), ['名詞', '数'])) || __ne__ (__getitem__ (__getitem__ (__getitem__ (morphs, __sub__ (number_end, 1)), 'char_span'), 1), __getitem__ (__getitem__ (next_morph, 'char_span'), 0)))) {
				break;
			}
			var number_end = __call__ (__iadd__, null, number_end, 1);
		}
		if (__t__ (__lt__ (__add__ (number_end, 1), __call__ (len, null, morphs)))) {
			var hour_morph = __getitem__ (morphs, number_end);
			var duration_morph = __getitem__ (morphs, __add__ (number_end, 1));
			var duration_features = __getitem__ (duration_morph, 'features');
			var is_contiguous = __t__ (__eq__ (__getitem__ (__getitem__ (__getitem__ (morphs, __sub__ (number_end, 1)), 'char_span'), 1), __getitem__ (__getitem__ (hour_morph, 'char_span'), 0))) && __eq__ (__getitem__ (__getitem__ (hour_morph, 'char_span'), 1), __getitem__ (__getitem__ (duration_morph, 'char_span'), 0));
			var is_hour_counter = __call__ (_is_hour_counter_suffix, null, hour_morph);
			var is_duration_suffix = __t__ (__ge__ (__call__ (len, null, duration_features), 3)) && __t__ (__eq__ (__getslice__ (duration_features, 1, 3, 1), ['名詞', '接尾'])) && __eq__ (__getitem__ (duration_morph, 'surface'), '間');
			if (__t__ (__t__ (is_contiguous === true) && __t__ (is_hour_counter === true) && is_duration_suffix === true)) {
				(function () {
					var __accu0__ = protected_ranges;
					return __call__ (__accu0__.append, __accu0__, tuple ([__getitem__ (__getitem__ (__getitem__ (morphs, number_start), 'char_span'), 0), __getitem__ (__getitem__ (duration_morph, 'char_span'), 1)]));
				}) ();
			}
		}
		if (__t__ (__t__ (__gt__ (number_end, __add__ (number_start, 1))) && __lt__ (number_end, __call__ (len, null, morphs)))) {
			var minute_morph = __getitem__ (morphs, number_end);
			var is_contiguous_minute = __eq__ (__getitem__ (__getitem__ (__getitem__ (morphs, __sub__ (number_end, 1)), 'char_span'), 1), __getitem__ (__getitem__ (minute_morph, 'char_span'), 0));
			var is_minute_counter = __call__ (_is_minute_counter_suffix, null, minute_morph);
			if (__t__ (__t__ (is_contiguous_minute === true) && is_minute_counter === true)) {
				(function () {
					var __accu0__ = protected_ranges;
					return __call__ (__accu0__.append, __accu0__, tuple ([__getitem__ (__getitem__ (__getitem__ (morphs, number_start), 'char_span'), 0), __getitem__ (__getitem__ (minute_morph, 'char_span'), 1)]));
				}) ();
			}
		}
		var morph_index = number_end;
	}
	var __iterable0__ = __call__ (py_enumerate, null, morphs);
	__iterable0__ = __i__ (__iterable0__);
	for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
		var __left0__ = __getitem__ (__iterable0__, __index0__);
		var go_morph_index = __left0__ [0];
		var morph = __left0__ [1];
		if (__t__ (__eq__ (go_morph_index, 0))) {
			continue;
		}
		if (__t__ (__call__ (_is_contiguous_go_suffix_morph, null, morph, __getitem__ (morphs, __sub__ (go_morph_index, 1))) === false)) {
			continue;
		}
		if (__t__ (__call__ (any, null, (function () {
			var __accu0__ = [];
			var __iterable1__ = protected_ranges;
			__iterable1__ = __i__ (__iterable1__);
			for (var __index1__ = 0; __index1__ < len (__iterable1__); __index1__++) {
				var char_range = __getitem__ (__iterable1__, __index1__);
				(function () {
					var __accu1__ = __accu0__;
					return __call__ (__accu1__.append, __accu1__, __t__ (__le__ (__getitem__ (char_range, 0), __getitem__ (__getitem__ (morph, 'char_span'), 0))) && __le__ (__getitem__ (__getitem__ (morph, 'char_span'), 1), __getitem__ (char_range, 1)));
				}) ();
			}
			return __accu0__;
		}) ()))) {
			continue;
		}
		(function () {
			var __accu0__ = protected_ranges;
			return __call__ (__accu0__.append, __accu0__, __getitem__ (morph, 'char_span'));
		}) ();
	}
	return __call__ (tuple, null, (function () {
		var __accu0__ = dict;
		return __call__ (__accu0__.py_fromkeys, __accu0__, protected_ranges);
	}) ());
};
export var _resolve_selected_pronunciations = function (model, resolved_targets, predictions, analysis) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'model': var model = __allkwargs0__ [__attrib0__]; break;
					case 'resolved_targets': var resolved_targets = __allkwargs0__ [__attrib0__]; break;
					case 'predictions': var predictions = __allkwargs0__ [__attrib0__]; break;
					case 'analysis': var analysis = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var preserve_pairs = __call__ (set, null, model.metadata.preserve_dictionary_default_pronunciations);
	var selected_targets = [];
	var __iterable0__ = __call__ (zip, null, resolved_targets, predictions);
	__iterable0__ = __i__ (__iterable0__);
	for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
		var __left0__ = __getitem__ (__iterable0__, __index0__);
		var target = __left0__ [0];
		var prediction = __left0__ [1];
		var selected_pronunciation = prediction.pronunciation;
		var was_preserved = false;
		var default_pronunciation = __call__ (_default_path_pronunciation, null, __getitem__ (analysis, 'morphs'), target.morph_range);
		var default_morphs = __getslice__ (__getitem__ (analysis, 'morphs'), __getitem__ (target.morph_range, 0), __getitem__ (target.morph_range, 1), 1);
		var previous_morph = (__t__ (__gt__ (__getitem__ (target.morph_range, 0), 0)) ? __getitem__ (__getitem__ (analysis, 'morphs'), __sub__ (__getitem__ (target.morph_range, 0), 1)) : null);
		var morph_before_previous = (__t__ (__gt__ (__getitem__ (target.morph_range, 0), 1)) ? __getitem__ (__getitem__ (analysis, 'morphs'), __sub__ (__getitem__ (target.morph_range, 0), 2)) : null);
		var is_previous_morph_inflection_fragment = __t__ (previous_morph !== null) && __t__ (morph_before_previous !== null) && __t__ (__ge__ (__call__ (len, null, __getitem__ (previous_morph, 'features')), 3)) && __t__ (__eq__ (__getslice__ (__getitem__ (previous_morph, 'features'), 1, 3, 1), ['名詞', '一般'])) && __t__ (__call__ (is_hiragana_word, null, __getitem__ (previous_morph, 'surface')) === true) && __t__ (__ge__ (__call__ (len, null, __getitem__ (morph_before_previous, 'features')), 2)) && __t__ (__eq__ (__getitem__ (__getitem__ (morph_before_previous, 'features'), 1), '動詞')) && __t__ (__eq__ (__getitem__ (__getitem__ (morph_before_previous, 'char_span'), 1), __getitem__ (__getitem__ (previous_morph, 'char_span'), 0))) && __eq__ (__getitem__ (__getitem__ (previous_morph, 'char_span'), 1), __getitem__ (target.char_span, 0));
		var is_compound_suffix_default = __t__ (__eq__ (__call__ (len, null, default_morphs), 1)) && __t__ (__ge__ (__call__ (len, null, __getitem__ (__getitem__ (default_morphs, 0), 'features')), 3)) && __t__ (__eq__ (__getslice__ (__getitem__ (__getitem__ (default_morphs, 0), 'features'), 1, 3, 1), ['名詞', '接尾'])) && __t__ (previous_morph !== null) && __t__ (__ge__ (__call__ (len, null, __getitem__ (previous_morph, 'features')), 3)) && __t__ (__eq__ (__getitem__ (__getitem__ (previous_morph, 'features'), 1), '名詞')) && __t__ (__ne__ (__getitem__ (__getitem__ (previous_morph, 'features'), 2), '副詞可能')) && __t__ (is_previous_morph_inflection_fragment === false) && __t__ (__eq__ (__getitem__ (__getitem__ (previous_morph, 'char_span'), 1), __getitem__ (target.char_span, 0))) && __t__ (default_pronunciation !== null) && !__in__ (default_pronunciation, target.pronunciations);
		var following_morph = (__t__ (__lt__ (__getitem__ (target.morph_range, 1), __call__ (len, null, __getitem__ (analysis, 'morphs')))) ? __getitem__ (__getitem__ (analysis, 'morphs'), __getitem__ (target.morph_range, 1)) : null);
		var is_preceded_by_contiguous_noun = __t__ (previous_morph !== null) && __t__ (__ge__ (__call__ (len, null, __getitem__ (previous_morph, 'features')), 2)) && __t__ (__eq__ (__getitem__ (__getitem__ (previous_morph, 'features'), 1), '名詞')) && __eq__ (__getitem__ (__getitem__ (previous_morph, 'char_span'), 1), __getitem__ (target.char_span, 0));
		var is_followed_by_case_particle_wo = __t__ (following_morph !== null) && __t__ (__ge__ (__call__ (len, null, __getitem__ (following_morph, 'features')), 3)) && __t__ (__eq__ (__getslice__ (__getitem__ (following_morph, 'features'), 1, 3, 1), ['助詞', '格助詞'])) && __t__ (__eq__ (__getitem__ (following_morph, 'surface'), 'を')) && __eq__ (__getitem__ (target.char_span, 1), __getitem__ (__getitem__ (following_morph, 'char_span'), 0));
		var independent_adverbial_pronunciations = (function () {
			var __accu0__ = [];
			var __iterable1__ = target.span_paths;
			__iterable1__ = __i__ (__iterable1__);
			for (var __index1__ = 0; __index1__ < len (__iterable1__); __index1__++) {
				var path = __getitem__ (__iterable1__, __index1__);
				if (__t__ (__t__ (__eq__ (__call__ (len, null, __getitem__ (path, 'features')), 1)) && __eq__ (__getslice__ ((function () {
					var __accu1__ = __getitem__ (__getitem__ (path, 'features'), 0);
					return __call__ (__accu1__.py_split, __accu1__, ',');
				}) (), 1, 3, 1), ['名詞', '副詞可能']))) {
					(function () {
						var __accu1__ = __accu0__;
						return __call__ (__accu1__.append, __accu1__, __getitem__ (path, 'pronunciation'));
					}) ();
				}
			}
			return set (__accu0__);
		}) ();
		if (__t__ (__t__ (__eq__ (target.surface, '後')) && __t__ (is_followed_by_case_particle_wo === true) && __t__ (is_preceded_by_contiguous_noun === false) && __eq__ (__call__ (len, null, independent_adverbial_pronunciations), 1))) {
			var selected_pronunciation = __call__ (py_next, null, __call__ (py_iter, null, independent_adverbial_pronunciations));
		}
		var is_numbered_inning_half = __t__ (__eq__ (target.surface, '表')) && __t__ (previous_morph !== null) && __t__ (morph_before_previous !== null) && __t__ (__eq__ (__getitem__ (previous_morph, 'surface'), '回')) && __t__ (__ge__ (__call__ (len, null, __getitem__ (previous_morph, 'features')), 4)) && __t__ (__eq__ (__getslice__ (__getitem__ (previous_morph, 'features'), 1, 4, 1), ['名詞', '接尾', '助数詞'])) && __t__ (__ge__ (__call__ (len, null, __getitem__ (morph_before_previous, 'features')), 3)) && __t__ (__eq__ (__getslice__ (__getitem__ (morph_before_previous, 'features'), 1, 3, 1), ['名詞', '数'])) && __t__ (__eq__ (__getitem__ (__getitem__ (morph_before_previous, 'char_span'), 1), __getitem__ (__getitem__ (previous_morph, 'char_span'), 0))) && __eq__ (__getitem__ (__getitem__ (previous_morph, 'char_span'), 1), __getitem__ (target.char_span, 0));
		var inning_half_pronunciations = (function () {
			var __accu0__ = [];
			var __iterable1__ = target.span_paths;
			__iterable1__ = __i__ (__iterable1__);
			for (var __index1__ = 0; __index1__ < len (__iterable1__); __index1__++) {
				var path = __getitem__ (__iterable1__, __index1__);
				if (__t__ (__eq__ (__call__ (canonicalize_pronunciation, null, __getitem__ (path, 'pronunciation')), 'オモテ'))) {
					(function () {
						var __accu1__ = __accu0__;
						return __call__ (__accu1__.append, __accu1__, __getitem__ (path, 'pronunciation'));
					}) ();
				}
			}
			return set (__accu0__);
		}) ();
		if (__t__ (__t__ (is_numbered_inning_half === true) && __eq__ (__call__ (len, null, inning_half_pronunciations), 1))) {
			var selected_pronunciation = __call__ (py_next, null, __call__ (py_iter, null, inning_half_pronunciations));
		}
		var is_unambiguous_juubun_adjective = __t__ (__eq__ (target.surface, '十分')) && __t__ (__eq__ (__call__ (len, null, default_morphs), 1)) && __t__ (__ge__ (__call__ (len, null, __getitem__ (__getitem__ (default_morphs, 0), 'features')), 3)) && __t__ (__eq__ (__getslice__ (__getitem__ (__getitem__ (default_morphs, 0), 'features'), 1, 3, 1), ['名詞', '形容動詞語幹'])) && __t__ (following_morph !== null) && __t__ (__in__ (__getitem__ (following_morph, 'surface'), new set (['に', 'な']))) && __eq__ (__getitem__ (target.char_span, 1), __getitem__ (__getitem__ (following_morph, 'char_span'), 0));
		if (__t__ (__t__ (is_unambiguous_juubun_adjective === true) && default_pronunciation !== null)) {
			var selected_pronunciation = default_pronunciation;
			var was_preserved = true;
		}
		var is_unambiguous_toki_noun = __t__ (__eq__ (target.surface, '時')) && __t__ (default_pronunciation !== null) && (__t__ (__t__ (previous_morph !== null) && __t__ (__ge__ (__call__ (len, null, __getitem__ (previous_morph, 'features')), 3)) && __t__ (__eq__ (__getslice__ (__getitem__ (previous_morph, 'features'), 1, 3, 1), ['助詞', '連体化'])) && __eq__ (__getitem__ (__getitem__ (previous_morph, 'char_span'), 1), __getitem__ (target.char_span, 0))) || __t__ (following_morph !== null) && __t__ (__eq__ (__getitem__ (following_morph, 'surface'), 'あたかも')) && __eq__ (__getitem__ (target.char_span, 1), __getitem__ (__getitem__ (following_morph, 'char_span'), 0)));
		if (__t__ (is_unambiguous_toki_noun === true)) {
			var selected_pronunciation = default_pronunciation;
			var was_preserved = true;
		}
		if (__t__ (__t__ (default_pronunciation !== null) && __t__ (__ne__ (selected_pronunciation, default_pronunciation)) && (__t__ (__in__ (tuple ([target.surface, default_pronunciation]), preserve_pairs)) || is_compound_suffix_default === true))) {
			var selected_pronunciation = default_pronunciation;
			var was_preserved = true;
		}
		var sorted_scores = __call__ (sorted, null, prediction.scores, __kwargtrans__ ({reverse: true}));
		(function () {
			var __accu0__ = selected_targets;
			return __call__ (__accu0__.append, __accu0__, __call__ (py_replace, null, target, __kwargtrans__ ({selected_pronunciation: selected_pronunciation, score_margin: (__t__ (__ge__ (__call__ (len, null, prediction.scores), 2)) ? __sub__ (__getitem__ (sorted_scores, 0), __getitem__ (sorted_scores, 1)) : null), was_preserved: was_preserved})));
		}) ();
	}
	return selected_targets;
};
export var select_mecab_features_with_tsqyomi = async function (text) {
	var include_morphs = true;
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'text': var text = __allkwargs0__ [__attrib0__]; break;
					case 'include_morphs': var include_morphs = __allkwargs0__ [__attrib0__]; break;
					case 'jtalk': var jtalk = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var model = __call__ (get_loaded_model, null);
	var normalized_text = (function () {
		var __accu0__ = jtalk;
		return __call__ (__accu0__.normalize_for_mecab, __accu0__, text);
	}) ();
	var target_spans = __call__ (_find_target_spans, null, normalized_text, model.metadata.surfaces_by_first_character);
	if (__t__ (__eq__ (__call__ (len, null, target_spans), 0))) {
		if (__t__ (include_morphs === false)) {
			return tuple ([(function () {
				var __accu0__ = jtalk;
				return __call__ (__accu0__.run_mecab, __accu0__, normalized_text);
			}) (), []]);
		}
		return (function () {
			var __accu0__ = jtalk;
			return __call__ (__accu0__.run_mecab_detailed, __accu0__, normalized_text);
		}) ();
	}
	var processing_segments = __call__ (_split_target_processing_segments, null, normalized_text, target_spans);
	if (__t__ (__gt__ (__call__ (len, null, processing_segments), 1))) {
		var combined_features = [];
		var combined_morphs = [];
		var __iterable0__ = processing_segments;
		__iterable0__ = __i__ (__iterable0__);
		for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
			var __left0__ = __getitem__ (__iterable0__, __index0__);
			var segment_start = __left0__ [0];
			var segment_end = __left0__ [1];
			var diagnostic_start_index = (function () {
				var __accu0__ = diagnostics;
				return __call__ (__accu0__.record_count, __accu0__);
			}) ();
			var __left0__ = await __call__ (select_mecab_features_with_tsqyomi, null, __getslice__ (normalized_text, segment_start, segment_end, 1), __kwargtrans__ ({include_morphs: include_morphs, jtalk: jtalk}));
			var segment_features = __left0__ [0];
			var segment_morphs = __left0__ [1];
			(function () {
				var __accu0__ = diagnostics;
				return __call__ (__accu0__.rebase_recording_char_spans, __accu0__, diagnostic_start_index, segment_start);
			}) ();
			(function () {
				var __accu0__ = combined_features;
				return __call__ (__accu0__.extend, __accu0__, segment_features);
			}) ();
			var __iterable1__ = segment_morphs;
			__iterable1__ = __i__ (__iterable1__);
			for (var __index1__ = 0; __index1__ < len (__iterable1__); __index1__++) {
				var morph = __getitem__ (__iterable1__, __index1__);
				var adjusted_morph = (function () {
					var __accu0__ = morph;
					return __call__ (__accu0__.py_copy, __accu0__);
				}) ();
				__setitem__ (adjusted_morph, 'char_span', tuple ([__add__ (__getitem__ (__getitem__ (morph, 'char_span'), 0), segment_start), __add__ (__getitem__ (__getitem__ (morph, 'char_span'), 1), segment_start)]));
				(function () {
					var __accu0__ = combined_morphs;
					return __call__ (__accu0__.append, __accu0__, adjusted_morph);
				}) ();
			}
		}
		return tuple ([combined_features, combined_morphs]);
	}
	var analysis = (function () {
		var __accu0__ = jtalk;
		return __call__ (__accu0__.analyze_mecab_candidates, __accu0__, normalized_text, target_spans);
	}) ();
	var nodes_by_id = (function () {
		var __accu0__ = [];
		var __iterable0__ = __getitem__ (analysis, 'nodes');
		__iterable0__ = __i__ (__iterable0__);
		for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
			var node = __getitem__ (__iterable0__, __index0__);
			(function () {
				var __accu1__ = __accu0__;
				return __call__ (__accu1__.append, __accu1__, [__getitem__ (node, 'node_id'), node]);
			}) ();
		}
		return dict (__accu0__);
	}) ();
	var selected_features = __call__ (list, null, __getitem__ (analysis, 'features'));
	var resolved_targets = [];
	var dictionary_owned_quantity_ranges = __call__ (_find_dictionary_owned_quantity_ranges, null, __getitem__ (analysis, 'morphs'));
	var __iterable0__ = target_spans;
	__iterable0__ = __i__ (__iterable0__);
	for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
		var char_span = __getitem__ (__iterable0__, __index0__);
		var surface = __getslice__ (__getitem__ (analysis, 'normalized_text'), __getitem__ (char_span, 0), __getitem__ (char_span, 1), 1);
		var allowed_readings = __call__ (set, null, (function () {
			var __accu0__ = model.metadata.class_index_by_surface_and_pronunciation;
			return __call__ (__accu0__.py_get, __accu0__, surface, dict ({}));
		}) ());
		if (__t__ (__lt__ (__call__ (len, null, allowed_readings), 2))) {
			continue;
		}
		var morph_range = __call__ (_find_exact_morph_range, null, __getitem__ (analysis, 'morphs'), char_span);
		if (__t__ (morph_range === null)) {
			(function () {
				var __accu0__ = diagnostics;
				return __call__ (__accu0__.record, __accu0__, (function () {
					var __accu1__ = diagnostics;
					return __call__ (__accu1__.TargetDiagnostic, __accu1__, __kwargtrans__ ({segment_text: __getitem__ (analysis, 'normalized_text'), char_span: char_span, surface: surface, outcome: 'no_exact_morph_range'}));
				}) ());
			}) ();
			continue;
		}
		if (__t__ (__t__ (__call__ (_is_inside_numeral_run, null, __getitem__ (analysis, 'morphs'), morph_range) === true) || __call__ (any, null, (function () {
			var __accu0__ = [];
			var __iterable1__ = dictionary_owned_quantity_ranges;
			__iterable1__ = __i__ (__iterable1__);
			for (var __index1__ = 0; __index1__ < len (__iterable1__); __index1__++) {
				var __left0__ = __getitem__ (__iterable1__, __index1__);
				var protected_start = __left0__ [0];
				var protected_end = __left0__ [1];
				(function () {
					var __accu1__ = __accu0__;
					return __call__ (__accu1__.append, __accu1__, __t__ (__le__ (protected_start, __getitem__ (char_span, 0))) && __le__ (__getitem__ (char_span, 1), protected_end));
				}) ();
			}
			return __accu0__;
		}) ()))) {
			var default_pronunciation = __call__ (_default_path_pronunciation, null, __getitem__ (analysis, 'morphs'), morph_range);
			(function () {
				var __accu0__ = diagnostics;
				return __call__ (__accu0__.record, __accu0__, (function () {
					var __accu1__ = diagnostics;
					return __call__ (__accu1__.TargetDiagnostic, __accu1__, __kwargtrans__ ({segment_text: __getitem__ (analysis, 'normalized_text'), char_span: char_span, surface: surface, outcome: 'dictionary_default_protected', reachable_pronunciations: (__t__ (default_pronunciation !== null) ? tuple ([default_pronunciation]) : tuple ([])), selected_pronunciation: default_pronunciation, was_preserved: true}));
				}) ());
			}) ();
			continue;
		}
		var __left0__ = __call__ (_eligible_span_paths, null, analysis, char_span, surface, allowed_readings, nodes_by_id);
		var span_paths = __left0__ [0];
		var is_reading_protected = __left0__ [1];
		var span_paths = __call__ (_filter_inflection_paths, null, analysis, morph_range, span_paths);
		var pronunciations = __call__ (tuple, null, (function () {
			var __accu0__ = dict;
			return __call__ (__accu0__.py_fromkeys, __accu0__, (function () {
				var __accu1__ = [];
				var __iterable1__ = span_paths;
				__iterable1__ = __i__ (__iterable1__);
				for (var __index1__ = 0; __index1__ < len (__iterable1__); __index1__++) {
					var path = __getitem__ (__iterable1__, __index1__);
					(function () {
						var __accu2__ = __accu1__;
						return __call__ (__accu2__.append, __accu2__, __getitem__ (path, 'pronunciation'));
					}) ();
				}
				return __accu1__;
			}) ());
		}) ());
		if (__t__ (__lt__ (__call__ (len, null, pronunciations), 2))) {
			(function () {
				var __accu0__ = diagnostics;
				return __call__ (__accu0__.record, __accu0__, (function () {
					var __accu1__ = diagnostics;
					return __call__ (__accu1__.TargetDiagnostic, __accu1__, __kwargtrans__ ({segment_text: __getitem__ (analysis, 'normalized_text'), char_span: char_span, surface: surface, outcome: (__t__ (is_reading_protected) ? 'reading_protected' : 'lattice_reachable_lt2'), reachable_pronunciations: pronunciations}));
				}) ());
			}) ();
			continue;
		}
		var class_indices_by_pronunciation = __getitem__ (model.metadata.class_index_by_surface_and_pronunciation, surface);
		var reachable_class_indices = (function () {
			var __accu0__ = [];
			var __iterable1__ = pronunciations;
			__iterable1__ = __i__ (__iterable1__);
			for (var __index1__ = 0; __index1__ < len (__iterable1__); __index1__++) {
				var pronunciation = __getitem__ (__iterable1__, __index1__);
				(function () {
					var __accu1__ = __accu0__;
					return __call__ (__accu1__.append, __accu1__, __getitem__ (class_indices_by_pronunciation, __call__ (canonicalize_pronunciation, null, pronunciation)));
				}) ();
			}
			return set (__accu0__);
		}) ();
		if (__t__ (__eq__ (__call__ (len, null, reachable_class_indices), 1))) {
			var default_pronunciation = __call__ (_default_path_pronunciation, null, __getitem__ (analysis, 'morphs'), morph_range);
			(function () {
				var __accu0__ = diagnostics;
				return __call__ (__accu0__.record, __accu0__, (function () {
					var __accu1__ = diagnostics;
					return __call__ (__accu1__.TargetDiagnostic, __accu1__, __kwargtrans__ ({segment_text: __getitem__ (analysis, 'normalized_text'), char_span: char_span, surface: surface, outcome: 'dictionary_default_protected', reachable_pronunciations: pronunciations, selected_pronunciation: default_pronunciation, was_preserved: true}));
				}) ());
			}) ();
			continue;
		}
		(function () {
			var __accu0__ = resolved_targets;
			return __call__ (__accu0__.append, __accu0__, __call__ (_ResolvedTarget, null, __kwargtrans__ ({char_span: char_span, morph_range: morph_range, surface: surface, span_paths: __call__ (tuple, null, span_paths), pronunciations: pronunciations})));
		}) ();
	}
	if (__t__ (__gt__ (__call__ (len, null, resolved_targets), 0))) {
		var predictions = await (function () {
			var __accu0__ = model;
			return __call__ (__accu0__.predict, __accu0__, __getitem__ (analysis, 'normalized_text'), __call__ (tuple, null, (function () {
				var __accu1__ = [];
				var __iterable0__ = resolved_targets;
				__iterable0__ = __i__ (__iterable0__);
				for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
					var item = __getitem__ (__iterable0__, __index0__);
					(function () {
						var __accu2__ = __accu1__;
						return __call__ (__accu2__.append, __accu2__, (function () {
							var __accu3__ = item;
							return __call__ (__accu3__.to_reading_target, __accu3__);
						}) ());
					}) ();
				}
				return __accu1__;
			}) ()));
		}) ();
		var resolved_targets = __call__ (_resolve_selected_pronunciations, null, model, resolved_targets, predictions, analysis);
		var applicable_targets = [];
		var __iterable0__ = resolved_targets;
		__iterable0__ = __i__ (__iterable0__);
		for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
			var target = __getitem__ (__iterable0__, __index0__);
			if (__t__ (__t__ (target.selected_pronunciation !== null) && !__in__ (target.selected_pronunciation, target.pronunciations))) {
				(function () {
					var __accu0__ = diagnostics;
					return __call__ (__accu0__.record, __accu0__, (function () {
						var __accu1__ = diagnostics;
						return __call__ (__accu1__.TargetDiagnostic, __accu1__, __kwargtrans__ ({segment_text: __getitem__ (analysis, 'normalized_text'), char_span: target.char_span, surface: target.surface, outcome: 'dictionary_default_protected', reachable_pronunciations: tuple ([target.selected_pronunciation, target.pronunciations]), selected_pronunciation: target.selected_pronunciation, score_margin: target.score_margin, was_preserved: target.was_preserved}));
					}) ());
				}) ();
				continue;
			}
			var class_index_by_pronunciation = __getitem__ (model.metadata.class_index_by_surface_and_pronunciation, target.surface);
			var default_pronunciation = __call__ (_default_path_pronunciation, null, __getitem__ (analysis, 'morphs'), target.morph_range);
			if (__t__ (__t__ (target.selected_pronunciation !== null) && __t__ (default_pronunciation !== null) && __eq__ ((function () {
				var __accu0__ = class_index_by_pronunciation;
				return __call__ (__accu0__.py_get, __accu0__, __call__ (canonicalize_pronunciation, null, default_pronunciation));
			}) (), __getitem__ (class_index_by_pronunciation, __call__ (canonicalize_pronunciation, null, target.selected_pronunciation))))) {
				var __iterable1__ = __getslice__ (__getitem__ (analysis, 'morphs'), __getitem__ (target.morph_range, 0), __getitem__ (target.morph_range, 1), 1);
				__iterable1__ = __i__ (__iterable1__);
				for (var __index1__ = 0; __index1__ < len (__iterable1__); __index1__++) {
					var morph = __getitem__ (__iterable1__, __index1__);
					__setitem__ (morph, 'is_tsqyomi_target', true);
				}
				(function () {
					var __accu0__ = diagnostics;
					return __call__ (__accu0__.record, __accu0__, (function () {
						var __accu1__ = diagnostics;
						return __call__ (__accu1__.TargetDiagnostic, __accu1__, __kwargtrans__ ({segment_text: __getitem__ (analysis, 'normalized_text'), char_span: target.char_span, surface: target.surface, outcome: 'applied', reachable_pronunciations: target.pronunciations, selected_pronunciation: target.selected_pronunciation, score_margin: target.score_margin, was_preserved: target.was_preserved}));
					}) ());
				}) ();
				continue;
			}
			(function () {
				var __accu0__ = applicable_targets;
				return __call__ (__accu0__.append, __accu0__, target);
			}) ();
		}
		var resolved_targets = applicable_targets;
		var connection_costs = (function () {
			var __accu0__ = [];
			var __iterable0__ = __getitem__ (analysis, 'connections');
			__iterable0__ = __i__ (__iterable0__);
			for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
				var connection = __getitem__ (__iterable0__, __index0__);
				(function () {
					var __accu1__ = __accu0__;
					return __call__ (__accu1__.append, __accu1__, [tuple ([__getitem__ (connection, 'left_node_id'), __getitem__ (connection, 'right_node_id')]), __getitem__ (connection, 'cost')]);
				}) ();
			}
			return dict (__accu0__);
		}) ();
		var selected_paths = [];
		var __iterable0__ = __call__ (_group_adjacent_targets, null, resolved_targets);
		__iterable0__ = __i__ (__iterable0__);
		for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
			var target_group = __getitem__ (__iterable0__, __index0__);
			var group_paths = __call__ (_select_joint_paths, null, connection_costs, target_group);
			if (__t__ (__eq__ (__call__ (len, null, group_paths), 0))) {
				var __iterable1__ = target_group;
				__iterable1__ = __i__ (__iterable1__);
				for (var __index1__ = 0; __index1__ < len (__iterable1__); __index1__++) {
					var dropped_target = __getitem__ (__iterable1__, __index1__);
					(function () {
						var __accu0__ = diagnostics;
						return __call__ (__accu0__.record, __accu0__, (function () {
							var __accu1__ = diagnostics;
							return __call__ (__accu1__.TargetDiagnostic, __accu1__, __kwargtrans__ ({segment_text: __getitem__ (analysis, 'normalized_text'), char_span: dropped_target.char_span, surface: dropped_target.surface, outcome: 'joint_path_dropped', reachable_pronunciations: dropped_target.pronunciations, selected_pronunciation: dropped_target.selected_pronunciation, score_margin: dropped_target.score_margin, was_preserved: dropped_target.was_preserved}));
						}) ());
					}) ();
				}
				continue;
			}
			(function () {
				var __accu0__ = selected_paths;
				return __call__ (__accu0__.extend, __accu0__, group_paths);
			}) ();
		}
		var applied_paths = [];
		var __iterable0__ = __call__ (py_reversed, null, selected_paths);
		__iterable0__ = __i__ (__iterable0__);
		for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
			var __left0__ = __getitem__ (__iterable0__, __index0__);
			var target = __left0__ [0];
			var path = __left0__ [1];
			var __left0__ = target.morph_range;
			var start = __left0__ [0];
			var end = __left0__ [1];
			var target_feature_indices = __call__ (tuple, null, (function () {
				var __accu0__ = [];
				var __iterable1__ = __getslice__ (__getitem__ (analysis, 'feature_index_by_morph'), start, end, 1);
				__iterable1__ = __i__ (__iterable1__);
				for (var __index1__ = 0; __index1__ < len (__iterable1__); __index1__++) {
					var feature_index = __getitem__ (__iterable1__, __index1__);
					if (__t__ (feature_index !== null)) {
						(function () {
							var __accu1__ = __accu0__;
							return __call__ (__accu1__.append, __accu1__, feature_index);
						}) ();
					}
				}
				return __accu0__;
			}) ());
			if (__t__ (__eq__ (__call__ (len, null, target_feature_indices), 0))) {
				(function () {
					var __accu0__ = diagnostics;
					return __call__ (__accu0__.record, __accu0__, (function () {
						var __accu1__ = diagnostics;
						return __call__ (__accu1__.TargetDiagnostic, __accu1__, __kwargtrans__ ({segment_text: __getitem__ (analysis, 'normalized_text'), char_span: target.char_span, surface: target.surface, outcome: 'no_feature_replaced', reachable_pronunciations: target.pronunciations, selected_pronunciation: target.selected_pronunciation, score_margin: target.score_margin, was_preserved: target.was_preserved}));
					}) ());
				}) ();
				continue;
			}
			var feature_start = __getitem__ (target_feature_indices, 0);
			var feature_end = __add__ (__getitem__ (target_feature_indices, __neg__ (1)), 1);
			__setslice__ (selected_features, feature_start, feature_end, null, __call__ (list, null, __getitem__ (path, 'features')));
			(function () {
				var __accu0__ = applied_paths;
				return __call__ (__accu0__.append, __accu0__, tuple ([target, path]));
			}) ();
			(function () {
				var __accu0__ = diagnostics;
				return __call__ (__accu0__.record, __accu0__, (function () {
					var __accu1__ = diagnostics;
					return __call__ (__accu1__.TargetDiagnostic, __accu1__, __kwargtrans__ ({segment_text: __getitem__ (analysis, 'normalized_text'), char_span: target.char_span, surface: target.surface, outcome: 'applied', reachable_pronunciations: target.pronunciations, selected_pronunciation: target.selected_pronunciation, score_margin: target.score_margin, was_preserved: target.was_preserved}));
				}) ());
			}) ();
		}
		if (__t__ (include_morphs === false)) {
			return tuple ([selected_features, []]);
		}
		var selected_path_by_start = (function () {
			var __accu0__ = [];
			var __iterable0__ = applied_paths;
			__iterable0__ = __i__ (__iterable0__);
			for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
				var __left0__ = __getitem__ (__iterable0__, __index0__);
				var target = __left0__ [0];
				var path = __left0__ [1];
				(function () {
					var __accu1__ = __accu0__;
					return __call__ (__accu1__.append, __accu1__, [__getitem__ (target.morph_range, 0), tuple ([target, path])]);
				}) ();
			}
			return dict (__accu0__);
		}) ();
		var selected_morphs = [];
		var morph_index = 0;
		var cumulative_cost = 0;
		var previous_selected_node_id = null;
		var pending_right_link_cost = null;
		while (__t__ (__lt__ (morph_index, __call__ (len, null, __getitem__ (analysis, 'morphs'))))) {
			var selected_path = (function () {
				var __accu0__ = selected_path_by_start;
				return __call__ (__accu0__.py_get, __accu0__, morph_index);
			}) ();
			if (__t__ (selected_path !== null)) {
				var __left0__ = selected_path;
				var target = __left0__ [0];
				var path = __left0__ [1];
				var node = __getitem__ (nodes_by_id, __getitem__ (__getitem__ (path, 'node_ids'), 0));
				if (__t__ (previous_selected_node_id === null)) {
					var link_cost = __getitem__ (path, 'left_boundary_cost');
				}
				else {
					var link_cost = connection_costs.__getitem__ ([previous_selected_node_id, __getitem__ (__getitem__ (path, 'node_ids'), 0)]);
				}
				var cumulative_cost = __call__ (__iadd__, null, cumulative_cost, link_cost);
				var selected_morph = __call__ (_replace_morph, null, node, link_cost, cumulative_cost);
				__setitem__ (selected_morph, 'is_tsqyomi_selected', true);
				__setitem__ (selected_morph, 'is_tsqyomi_target', true);
				(function () {
					var __accu0__ = selected_morphs;
					return __call__ (__accu0__.append, __accu0__, selected_morph);
				}) ();
				var morph_index = __getitem__ (target.morph_range, 1);
				var previous_selected_node_id = __getitem__ (__getitem__ (path, 'node_ids'), __neg__ (1));
				var pending_right_link_cost = __getitem__ (path, 'right_link_cost');
				continue;
			}
			var base_morph = __getitem__ (__getitem__ (analysis, 'morphs'), morph_index);
			var link_cost = (__t__ (pending_right_link_cost !== null) ? pending_right_link_cost : __getitem__ (base_morph, 'link_cost'));
			var cumulative_cost = __call__ (__iadd__, null, cumulative_cost, link_cost);
			var copied_morph = __call__ (_copy_morph, null, base_morph, __kwargtrans__ ({link_cost: link_cost, node_cost: cumulative_cost}));
			(function () {
				var __accu0__ = selected_morphs;
				return __call__ (__accu0__.append, __accu0__, copied_morph);
			}) ();
			var morph_index = __call__ (__iadd__, null, morph_index, 1);
			var previous_selected_node_id = null;
			var pending_right_link_cost = null;
		}
	}
	else {
		if (__t__ (include_morphs === false)) {
			return tuple ([selected_features, []]);
		}
		var selected_morphs = (function () {
			var __accu0__ = [];
			var __iterable0__ = __getitem__ (analysis, 'morphs');
			__iterable0__ = __i__ (__iterable0__);
			for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
				var morph = __getitem__ (__iterable0__, __index0__);
				(function () {
					var __accu1__ = __accu0__;
					return __call__ (__accu1__.append, __accu1__, __call__ (_copy_morph, null, morph));
				}) ();
			}
			return __accu0__;
		}) ();
	}
	return tuple ([selected_features, selected_morphs]);
};
export var _find_target_spans = function (text, surfaces_by_first_character) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'text': var text = __allkwargs0__ [__attrib0__]; break;
					case 'surfaces_by_first_character': var surfaces_by_first_character = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var occurrences = [];
	var __iterable0__ = __call__ (py_enumerate, null, text);
	__iterable0__ = __i__ (__iterable0__);
	for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
		var __left0__ = __getitem__ (__iterable0__, __index0__);
		var start = __left0__ [0];
		var character = __left0__ [1];
		var __iterable1__ = (function () {
			var __accu0__ = surfaces_by_first_character;
			return __call__ (__accu0__.py_get, __accu0__, character, tuple ([]));
		}) ();
		__iterable1__ = __i__ (__iterable1__);
		for (var __index1__ = 0; __index1__ < len (__iterable1__); __index1__++) {
			var surface = __getitem__ (__iterable1__, __index1__);
			if (__t__ ((function () {
				var __accu0__ = text;
				return __call__ (__accu0__.startswith, __accu0__, surface, start);
			}) ())) {
				(function () {
					var __accu0__ = occurrences;
					return __call__ (__accu0__.append, __accu0__, tuple ([start, __add__ (start, __call__ (len, null, surface))]));
				}) ();
				break;
			}
		}
	}
	var selected = [];
	var last_selected_end = 0;
	var __iterable0__ = occurrences;
	__iterable0__ = __i__ (__iterable0__);
	for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
		var occurrence = __getitem__ (__iterable0__, __index0__);
		if (__t__ (__lt__ (__getitem__ (occurrence, 0), last_selected_end))) {
			continue;
		}
		(function () {
			var __accu0__ = selected;
			return __call__ (__accu0__.append, __accu0__, occurrence);
		}) ();
		var last_selected_end = __getitem__ (occurrence, 1);
	}
	return __call__ (tuple, null, selected);
};
export var _split_target_processing_segments = function (text, target_spans) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'text': var text = __allkwargs0__ [__attrib0__]; break;
					case 'target_spans': var target_spans = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var __left0__ = __call__ (_matched_delimiter_indices, null, text);
	var matched_openings = __left0__ [0];
	var matched_closings = __left0__ [1];
	var sentence_ranges = [];
	var sentence_start = 0;
	var delimiter_depth = 0;
	var __iterable0__ = __call__ (py_enumerate, null, text);
	__iterable0__ = __i__ (__iterable0__);
	for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
		var __left0__ = __getitem__ (__iterable0__, __index0__);
		var index = __left0__ [0];
		var character = __left0__ [1];
		if (__t__ (__in__ (index, matched_openings))) {
			var delimiter_depth = __call__ (__iadd__, null, delimiter_depth, 1);
		}
		if (__t__ (__t__ (__in__ (character, '。！？!?\n')) && __eq__ (delimiter_depth, 0))) {
			(function () {
				var __accu0__ = sentence_ranges;
				return __call__ (__accu0__.append, __accu0__, tuple ([sentence_start, __add__ (index, 1)]));
			}) ();
			var sentence_start = __add__ (index, 1);
		}
		if (__t__ (__in__ (index, matched_closings))) {
			var delimiter_depth = __call__ (__isub__, null, delimiter_depth, 1);
		}
	}
	if (__t__ (__lt__ (sentence_start, __call__ (len, null, text)))) {
		(function () {
			var __accu0__ = sentence_ranges;
			return __call__ (__accu0__.append, __accu0__, tuple ([sentence_start, __call__ (len, null, text)]));
		}) ();
	}
	if (__t__ (__le__ (__call__ (len, null, sentence_ranges), 1))) {
		return tuple ([tuple ([0, __call__ (len, null, text)])]);
	}
	var segments = [];
	var __iterable0__ = sentence_ranges;
	__iterable0__ = __i__ (__iterable0__);
	for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
		var __left0__ = __getitem__ (__iterable0__, __index0__);
		var range_start = __left0__ [0];
		var range_end = __left0__ [1];
		var has_target = __call__ (any, null, (function () {
			var __accu0__ = [];
			var __iterable1__ = target_spans;
			__iterable1__ = __i__ (__iterable1__);
			for (var __index1__ = 0; __index1__ < len (__iterable1__); __index1__++) {
				var __left0__ = __getitem__ (__iterable1__, __index1__);
				var target_start = __left0__ [0];
				var target_end = __left0__ [1];
				(function () {
					var __accu1__ = __accu0__;
					return __call__ (__accu1__.append, __accu1__, __t__ (__le__ (range_start, target_start)) && __le__ (target_end, range_end));
				}) ();
			}
			return __accu0__;
		}) ());
		if (__t__ (__t__ (segments) && __t__ (has_target === false) && __getitem__ (__getitem__ (segments, __neg__ (1)), 2) === false)) {
			__setitem__ (segments, __neg__ (1), tuple ([__getitem__ (__getitem__ (segments, __neg__ (1)), 0), range_end, false]));
		}
		else {
			(function () {
				var __accu0__ = segments;
				return __call__ (__accu0__.append, __accu0__, tuple ([range_start, range_end, has_target]));
			}) ();
		}
	}
	return __call__ (tuple, null, (function () {
		var __accu0__ = [];
		var __iterable0__ = segments;
		__iterable0__ = __i__ (__iterable0__);
		for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
			var __left0__ = __getitem__ (__iterable0__, __index0__);
			var start = __left0__ [0];
			var end = __left0__ [1];
			var _ = __left0__ [2];
			(function () {
				var __accu1__ = __accu0__;
				return __call__ (__accu1__.append, __accu1__, tuple ([start, end]));
			}) ();
		}
		return __accu0__;
	}) ());
};
export var _matched_delimiter_indices = function (text) {
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
	var expected_closings = [];
	var matched_openings = __call__ (set, null);
	var matched_closings = __call__ (set, null);
	var __iterable0__ = __call__ (py_enumerate, null, text);
	__iterable0__ = __i__ (__iterable0__);
	for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
		var __left0__ = __getitem__ (__iterable0__, __index0__);
		var index = __left0__ [0];
		var character = __left0__ [1];
		var expected_closing = (function () {
			var __accu0__ = _CLOSING_DELIMITER_BY_OPENING;
			return __call__ (__accu0__.py_get, __accu0__, character);
		}) ();
		if (__t__ (expected_closing !== null)) {
			(function () {
				var __accu0__ = expected_closings;
				return __call__ (__accu0__.append, __accu0__, tuple ([expected_closing, index]));
			}) ();
			continue;
		}
		if (__t__ (__t__ (__eq__ (__call__ (len, null, expected_closings), 0)) || __ne__ (__getitem__ (__getitem__ (expected_closings, __neg__ (1)), 0), character))) {
			continue;
		}
		var __left0__ = (function () {
			var __accu0__ = expected_closings;
			return __call__ (__accu0__.py_pop, __accu0__);
		}) ();
		var _ = __left0__ [0];
		var opening_index = __left0__ [1];
		(function () {
			var __accu0__ = matched_openings;
			return __call__ (__accu0__.add, __accu0__, opening_index);
		}) ();
		(function () {
			var __accu0__ = matched_closings;
			return __call__ (__accu0__.add, __accu0__, index);
		}) ();
	}
	return tuple ([__call__ (set, null, matched_openings), __call__ (set, null, matched_closings)]);
};
export var _find_exact_morph_range = function (morphs, char_span) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'morphs': var morphs = __allkwargs0__ [__attrib0__]; break;
					case 'char_span': var char_span = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var start_indices = (function () {
		var __accu0__ = [];
		var __iterable0__ = __call__ (py_enumerate, null, morphs);
		__iterable0__ = __i__ (__iterable0__);
		for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
			var __left0__ = __getitem__ (__iterable0__, __index0__);
			var index = __left0__ [0];
			var morph = __left0__ [1];
			if (__t__ (__eq__ (__getitem__ (__getitem__ (morph, 'char_span'), 0), __getitem__ (char_span, 0)))) {
				(function () {
					var __accu1__ = __accu0__;
					return __call__ (__accu1__.append, __accu1__, index);
				}) ();
			}
		}
		return __accu0__;
	}) ();
	if (__t__ (__ne__ (__call__ (len, null, start_indices), 1))) {
		return null;
	}
	var start = __getitem__ (start_indices, 0);
	var cursor = __getitem__ (char_span, 0);
	for (var end = start; end < __call__ (len, null, morphs); end++) {
		var morph_span = __getitem__ (__getitem__ (morphs, end), 'char_span');
		if (__t__ (__t__ (__ne__ (__getitem__ (morph_span, 0), cursor)) || __gt__ (__getitem__ (morph_span, 1), __getitem__ (char_span, 1)))) {
			return null;
		}
		var cursor = __getitem__ (morph_span, 1);
		if (__t__ (__eq__ (cursor, __getitem__ (char_span, 1)))) {
			return tuple ([start, __add__ (end, 1)]);
		}
	}
	return null;
};
export var _is_inside_numeral_run = function (morphs, morph_range) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'morphs': var morphs = __allkwargs0__ [__attrib0__]; break;
					case 'morph_range': var morph_range = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var __left0__ = morph_range;
	var start = __left0__ [0];
	var end = __left0__ [1];
	var is_numeral = (function () {
		var __accu0__ = [];
		var __iterable0__ = __getslice__ (morphs, __call__ (max, null, __sub__ (start, 1), 0), __add__ (end, 1), 1);
		__iterable0__ = __i__ (__iterable0__);
		for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
			var morph = __getitem__ (__iterable0__, __index0__);
			(function () {
				var __accu1__ = __accu0__;
				return __call__ (__accu1__.append, __accu1__, __t__ (__ge__ (__call__ (len, null, __getitem__ (morph, 'features')), 3)) && __eq__ (__getslice__ (__getitem__ (morph, 'features'), 1, 3, 1), ['名詞', '数']));
			}) ();
		}
		return __accu0__;
	}) ();
	var first_index = __sub__ (start, __call__ (max, null, __sub__ (start, 1), 0));
	var last_index = __sub__ (__add__ (first_index, __sub__ (end, start)), 1);
	if (__t__ (__t__ (__gt__ (start, 0)) && __t__ (__getitem__ (is_numeral, first_index) === true) && __t__ (__getitem__ (is_numeral, __sub__ (first_index, 1)) === true) && __eq__ (__getitem__ (__getitem__ (__getitem__ (morphs, __sub__ (start, 1)), 'char_span'), 1), __getitem__ (__getitem__ (__getitem__ (morphs, start), 'char_span'), 0)))) {
		return true;
	}
	return __t__ (__lt__ (end, __call__ (len, null, morphs))) && __t__ (__getitem__ (is_numeral, last_index) === true) && __t__ (__getitem__ (is_numeral, __add__ (last_index, 1)) === true) && __eq__ (__getitem__ (__getitem__ (__getitem__ (morphs, __sub__ (end, 1)), 'char_span'), 1), __getitem__ (__getitem__ (__getitem__ (morphs, end), 'char_span'), 0));
};
export var _eligible_span_paths = function (analysis, char_span, surface, allowed_readings, nodes_by_id) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'analysis': var analysis = __allkwargs0__ [__attrib0__]; break;
					case 'char_span': var char_span = __allkwargs0__ [__attrib0__]; break;
					case 'surface': var surface = __allkwargs0__ [__attrib0__]; break;
					case 'allowed_readings': var allowed_readings = __allkwargs0__ [__attrib0__]; break;
					case 'nodes_by_id': var nodes_by_id = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var paths = (function () {
		var __accu0__ = [];
		var __iterable0__ = __getitem__ (analysis, 'paths');
		__iterable0__ = __i__ (__iterable0__);
		for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
			var path = __getitem__ (__iterable0__, __index0__);
			if (__t__ (__t__ (__eq__ (__getitem__ (path, 'char_span'), char_span)) && __eq__ (__getitem__ (path, 'surface'), surface))) {
				(function () {
					var __accu1__ = __accu0__;
					return __call__ (__accu1__.append, __accu1__, path);
				}) ();
			}
		}
		return __accu0__;
	}) ();
	if (__t__ (__call__ (any, null, (function () {
		var __accu0__ = [];
		var __iterable0__ = paths;
		__iterable0__ = __i__ (__iterable0__);
		for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
			var path = __getitem__ (__iterable0__, __index0__);
			(function () {
				var __accu1__ = __accu0__;
				return __call__ (__accu1__.append, __accu1__, __getitem__ (__getitem__ (nodes_by_id, __getitem__ (__getitem__ (path, 'node_ids'), 0)), 'is_reading_protected') === true);
			}) ();
		}
		return __accu0__;
	}) ()))) {
		return tuple ([[], true]);
	}
	return tuple ([(function () {
		var __accu0__ = [];
		var __iterable0__ = paths;
		__iterable0__ = __i__ (__iterable0__);
		for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
			var path = __getitem__ (__iterable0__, __index0__);
			if (__t__ (__t__ (__in__ (__call__ (canonicalize_pronunciation, null, __getitem__ (path, 'pronunciation')), allowed_readings)) && __getitem__ (__getitem__ (nodes_by_id, __getitem__ (__getitem__ (path, 'node_ids'), 0)), 'is_ignored') === false)) {
				(function () {
					var __accu1__ = __accu0__;
					return __call__ (__accu1__.append, __accu1__, path);
				}) ();
			}
		}
		return __accu0__;
	}) (), false]);
};
export var _filter_inflection_paths = function (analysis, morph_range, paths) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'analysis': var analysis = __allkwargs0__ [__attrib0__]; break;
					case 'morph_range': var morph_range = __allkwargs0__ [__attrib0__]; break;
					case 'paths': var paths = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var __left0__ = morph_range;
	var start = __left0__ [0];
	var end = __left0__ [1];
	if (__t__ (__t__ (__ne__ (__sub__ (end, start), 1)) || __eq__ (end, __call__ (len, null, __getitem__ (analysis, 'morphs'))))) {
		return paths;
	}
	var morph = __getitem__ (__getitem__ (analysis, 'morphs'), start);
	var following = __getitem__ (__getitem__ (analysis, 'morphs'), end);
	if (__t__ (__t__ (__ne__ (__getitem__ (__getitem__ (morph, 'features'), 1), '動詞')) || __t__ (__ne__ (__getitem__ (__getitem__ (morph, 'features'), 5), '一段')) || __ne__ (__getitem__ (__getitem__ (morph, 'char_span'), 1), __getitem__ (__getitem__ (following, 'char_span'), 0)))) {
		return paths;
	}
	var is_past_or_te_connection = __t__ ((function () {
		var __accu0__ = __getitem__ (__getitem__ (morph, 'features'), 6);
		return __call__ (__accu0__.startswith, __accu0__, '連用');
	}) ()) && (__t__ (__t__ (__in__ (__getitem__ (following, 'surface'), new set (['て', 'で']))) && __eq__ (__getslice__ (__getitem__ (following, 'features'), 1, 3, 1), ['助詞', '接続助詞'])) || __eq__ (__getitem__ (__getitem__ (following, 'features'), 5), '特殊・タ'));
	var is_negative_connection = __t__ (__eq__ (__getitem__ (__getitem__ (morph, 'features'), 6), '未然形')) && __t__ (__eq__ (__getitem__ (__getitem__ (following, 'features'), 1), '助動詞')) && __eq__ (__getitem__ (__getitem__ (following, 'features'), 5), '特殊・ヌ');
	if (__t__ (!__t__ ((__t__ (is_past_or_te_connection) || is_negative_connection)))) {
		return paths;
	}
	var compatible_paths = [];
	var __iterable0__ = paths;
	__iterable0__ = __i__ (__iterable0__);
	for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
		var path = __getitem__ (__iterable0__, __index0__);
		if (__t__ (__ne__ (__call__ (len, null, __getitem__ (path, 'features')), 1))) {
			continue;
		}
		var features = (function () {
			var __accu0__ = __getitem__ (__getitem__ (path, 'features'), 0);
			return __call__ (__accu0__.py_split, __accu0__, ',');
		}) ();
		var expected_form = (__t__ (is_negative_connection) ? '未然形' : (__t__ (__t__ ((function () {
			var __accu0__ = __getitem__ (features, 5);
			return __call__ (__accu0__.startswith, __accu0__, '五段');
		}) ()) && __ne__ (__getitem__ (features, 5), '五段・サ行')) ? '連用タ接続' : '連用形'));
		if (__t__ (__t__ (__eq__ (__getitem__ (features, 1), '動詞')) && __eq__ (__getitem__ (features, 6), expected_form))) {
			(function () {
				var __accu0__ = compatible_paths;
				return __call__ (__accu0__.append, __accu0__, path);
			}) ();
		}
	}
	return compatible_paths;
};
export var _group_adjacent_targets = function (targets) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'targets': var targets = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var groups = [];
	var __iterable0__ = __call__ (sorted, null, targets, __kwargtrans__ ({key: (function __lambda__ (item) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'item': var item = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		return item.morph_range;
	})}));
	__iterable0__ = __i__ (__iterable0__);
	for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
		var target = __getitem__ (__iterable0__, __index0__);
		if (__t__ (__t__ (groups) && __eq__ (__getitem__ (__getitem__ (__getitem__ (groups, __neg__ (1)), __neg__ (1)).morph_range, 1), __getitem__ (target.morph_range, 0)))) {
			(function () {
				var __accu0__ = __getitem__ (groups, __neg__ (1));
				return __call__ (__accu0__.append, __accu0__, target);
			}) ();
		}
		else {
			(function () {
				var __accu0__ = groups;
				return __call__ (__accu0__.append, __accu0__, [target]);
			}) ();
		}
	}
	return (function () {
		var __accu0__ = [];
		var __iterable0__ = groups;
		__iterable0__ = __i__ (__iterable0__);
		for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
			var group = __getitem__ (__iterable0__, __index0__);
			(function () {
				var __accu1__ = __accu0__;
				return __call__ (__accu1__.append, __accu1__, __call__ (tuple, null, group));
			}) ();
		}
		return __accu0__;
	}) ();
};
export var _select_joint_paths = function (connection_costs, targets) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'connection_costs': var connection_costs = __allkwargs0__ [__attrib0__]; break;
					case 'targets': var targets = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	if (__t__ (__eq__ (__call__ (len, null, targets), 1))) {
		if (__t__ (__eq__ (__call__ (len, null, __getitem__ (targets, 0).selected_paths), 0))) {
			return [];
		}
		var best_path = __call__ (min, null, __getitem__ (targets, 0).selected_paths, __kwargtrans__ ({key: (function __lambda__ (path) {
			if (arguments.length) {
				var __ilastarg0__ = arguments.length - 1;
				if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
					var __allkwargs0__ = arguments [__ilastarg0__--];
					for (var __attrib0__ in __allkwargs0__) {
						switch (__attrib0__) {
							case 'path': var path = __allkwargs0__ [__attrib0__]; break;
						}
					}
				}
			}
			else {
			}
			return tuple ([__getitem__ (path, 'boundary_cost'), __getitem__ (path, 'path_id')]);
		})}));
		return [tuple ([__getitem__ (targets, 0), best_path])];
	}
	var states = (function () {
		var __accu0__ = [];
		var __iterable0__ = __getitem__ (targets, 0).selected_paths;
		__iterable0__ = __i__ (__iterable0__);
		for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
			var path = __getitem__ (__iterable0__, __index0__);
			(function () {
				var __accu1__ = __accu0__;
				return __call__ (__accu1__.append, __accu1__, tuple ([__getitem__ (path, 'left_boundary_cost'), tuple ([__getitem__ (path, 'path_id')]), tuple ([path])]));
			}) ();
		}
		return __accu0__;
	}) ();
	var __iterable0__ = __getslice__ (targets, 1, null, 1);
	__iterable0__ = __i__ (__iterable0__);
	for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
		var target = __getitem__ (__iterable0__, __index0__);
		var next_states = [];
		var __iterable1__ = target.selected_paths;
		__iterable1__ = __i__ (__iterable1__);
		for (var __index1__ = 0; __index1__ < len (__iterable1__); __index1__++) {
			var right_path = __getitem__ (__iterable1__, __index1__);
			var candidates = [];
			var __iterable2__ = states;
			__iterable2__ = __i__ (__iterable2__);
			for (var __index2__ = 0; __index2__ < len (__iterable2__); __index2__++) {
				var __left0__ = __getitem__ (__iterable2__, __index2__);
				var cost = __left0__ [0];
				var path_ids = __left0__ [1];
				var paths = __left0__ [2];
				var connection_cost = (function () {
					var __accu0__ = connection_costs;
					return __call__ (__accu0__.py_get, __accu0__, tuple ([__getitem__ (__getitem__ (__getitem__ (paths, __neg__ (1)), 'node_ids'), __neg__ (1)), __getitem__ (__getitem__ (right_path, 'node_ids'), 0)]));
				}) ();
				if (__t__ (connection_cost === null)) {
					continue;
				}
				(function () {
					var __accu0__ = candidates;
					return __call__ (__accu0__.append, __accu0__, tuple ([__add__ (cost, connection_cost), tuple ([path_ids, __getitem__ (right_path, 'path_id')]), tuple ([paths, right_path])]));
				}) ();
			}
			if (__t__ (__gt__ (__call__ (len, null, candidates), 0))) {
				(function () {
					var __accu0__ = next_states;
					return __call__ (__accu0__.append, __accu0__, __call__ (min, null, candidates, __kwargtrans__ ({key: (function __lambda__ (state) {
						if (arguments.length) {
							var __ilastarg0__ = arguments.length - 1;
							if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
								var __allkwargs0__ = arguments [__ilastarg0__--];
								for (var __attrib0__ in __allkwargs0__) {
									switch (__attrib0__) {
										case 'state': var state = __allkwargs0__ [__attrib0__]; break;
									}
								}
							}
						}
						else {
						}
						return tuple ([__getitem__ (state, 0), __getitem__ (state, 1)]);
					})})));
				}) ();
			}
		}
		var states = next_states;
		if (__t__ (__eq__ (__call__ (len, null, states), 0))) {
			break;
		}
	}
	if (__t__ (__eq__ (__call__ (len, null, states), 0))) {
		return [];
	}
	var __left0__ = __call__ (min, null, states, __kwargtrans__ ({key: (function __lambda__ (state) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'state': var state = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		return tuple ([__add__ (__getitem__ (state, 0), __getitem__ (__getitem__ (__getitem__ (state, 2), __neg__ (1)), 'right_boundary_cost')), __getitem__ (state, 1)]);
	})}));
	var _ = __left0__ [0];
	var _ = __left0__ [1];
	var best_paths = __left0__ [2];
	return __call__ (list, null, __call__ (zip, null, targets, best_paths));
};
export var _replace_morph = function (node, link_cost, node_cost) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'node': var node = __allkwargs0__ [__attrib0__]; break;
					case 'link_cost': var link_cost = __allkwargs0__ [__attrib0__]; break;
					case 'node_cost': var node_cost = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	return __call__ (dict, null, __kwargtrans__ ({surface: __getitem__ (node, 'surface'), features: (function () {
		var __accu0__ = __getitem__ (node, 'feature');
		return __call__ (__accu0__.py_split, __accu0__, ',');
	}) (), char_span: __getitem__ (node, 'char_span'), pos_id: __getitem__ (node, 'pos_id'), left_id: __getitem__ (node, 'left_id'), right_id: __getitem__ (node, 'right_id'), word_cost: __getitem__ (node, 'word_cost'), link_cost: link_cost, node_cost: node_cost, is_unknown: __getitem__ (node, 'is_unknown'), is_ignored: __getitem__ (node, 'is_ignored'), dictionary_index: __getitem__ (node, 'dictionary_index'), is_tsqyomi_selected: false, is_tsqyomi_target: false}));
};
export var _copy_morph = function (morph) {
	var link_cost = null;
	var node_cost = null;
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'morph': var morph = __allkwargs0__ [__attrib0__]; break;
					case 'link_cost': var link_cost = __allkwargs0__ [__attrib0__]; break;
					case 'node_cost': var node_cost = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	return __call__ (dict, null, __kwargtrans__ ({surface: __getitem__ (morph, 'surface'), features: __call__ (list, null, __getitem__ (morph, 'features')), char_span: __getitem__ (morph, 'char_span'), pos_id: __getitem__ (morph, 'pos_id'), left_id: __getitem__ (morph, 'left_id'), right_id: __getitem__ (morph, 'right_id'), word_cost: __getitem__ (morph, 'word_cost'), link_cost: (__t__ (link_cost === null) ? __getitem__ (morph, 'link_cost') : link_cost), node_cost: (__t__ (node_cost === null) ? __getitem__ (morph, 'node_cost') : node_cost), is_unknown: __getitem__ (morph, 'is_unknown'), is_ignored: __getitem__ (morph, 'is_ignored'), dictionary_index: __getitem__ (morph, 'dictionary_index'), is_tsqyomi_selected: __getitem__ (morph, 'is_tsqyomi_selected'), is_tsqyomi_target: __getitem__ (morph, 'is_tsqyomi_target')}));
};

