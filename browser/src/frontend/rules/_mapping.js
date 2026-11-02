// Generated from pyopenjtalk-plus e7713f2d6d91f392f595df5e8998ff2b62c3b6f5; see tools/build_rules.py.
import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __mergefields__, __mergekwargtrans__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __pyUseJsNext__, __rshift__, __setitem__, __setproperty__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __withblock__, __xor__, _sort, abs, all, any, assert, bin, bool, bytearray, bytes, callable, chr, delattr, dict, dir, divmod, filter, float, getattr, hasattr, hex, input, int, isinstance, issubclass, len, list, map, max, min, object, oct, ord, pow, print, property, py_TypeError, py_enumerate, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
import {normalize_itaiji, normalize_roman_numerals, normalize_text, split_kana_mora} from './utils.js';
import {join_strings, maketrans, merge_dict, translate} from './compatibility.js';
var __name__ = '_mapping';
export var _DEFAULT_NON_PAUSE_SYMBOLS = __call__ (set, null, tuple (['「', '」', '『', '』', '（', '）', '(', ')', '【', '】', '［', '］', '[', ']', '〈', '〉', '《', '》', '〔', '〕', '｛', '｝', '{', '}', '"', "'", '”', '“', '’', '‘']));
export var _ODORI_CHARS = __call__ (set, null, '々ゝゞヽヾ');
export var _DIGIT_MORPH_SURFACES = __call__ (set, null, '０１２３４５６７８９0123456789');
export var _CHARACTERS_REMOVED_BY_TEXT2MECAB = __call__ (set, null, 'ﾞﾟ');
export var _MAX_CALLER_TEXT_CHUNK_LENGTH = 18;
export var _MAX_NUMBER_ALIGNMENT_BLOCK_LENGTH = 128;
export var _NJD_NUMBER_MORPH_SURFACE_KEYS = dict ({'○': '〇', '〇': '〇', '０': '〇', '0': '〇', '１': '一', '1': '一', '一': '一', 'いち': '一', '壱': '一', '２': '二', '2': '二', '二': '二', 'に': '二', '弐': '二', '貳': '二', 'ニ': '二', '３': '三', '3': '三', '三': '三', 'さん': '三', '参': '三', '４': '四', '4': '四', '四': '四', 'よん': '四', 'し': '四', '５': '五', '5': '五', '五': '五', 'ご': '五', '６': '六', '6': '六', '六': '六', 'ろく': '六', '７': '七', '7': '七', '七': '七', 'なな': '七', 'しち': '七', '８': '八', '8': '八', '八': '八', 'はち': '八', '９': '九', '9': '九', '九': '九', 'きゅう': '九', 'く': '九', '拾': '十', '萬': '万'});
export var _KANJI_NUMBER_SURFACES = __call__ (set, null, '一二三四五六七八九十百千万億兆〇零');
export var _NJD_NUMBER_ALIGNMENT_TRANSLATION = __call__ (maketrans, null, '0123456789０１２３４５６７８９零', '〇一二三四五六七八九〇一二三四五六七八九〇');
export var default_is_non_pause_symbol = function (surface) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'surface': var surface = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	return __in__ (surface, _DEFAULT_NON_PAUSE_SYMBOLS);
};
export var mark_user_dictionary_reading_protection = function (njd_features, morphs, reading_protection) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'njd_features': var njd_features = __allkwargs0__ [__attrib0__]; break;
					case 'morphs': var morphs = __allkwargs0__ [__attrib0__]; break;
					case 'reading_protection': var reading_protection = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	if (__t__ (__call__ (any, null, reading_protection) === false)) {
		return ;
	}
	var feature_char_spans = __call__ (njd_feature_char_spans, null, njd_features, morphs);
	var morph_index = 0;
	var __iterable0__ = __call__ (zip, null, njd_features, feature_char_spans);
	__iterable0__ = __i__ (__iterable0__);
	for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
		var __left0__ = __getitem__ (__iterable0__, __index0__);
		var feature = __left0__ [0];
		var feature_char_span = __left0__ [1];
		var __left0__ = feature_char_span;
		var feature_start = __left0__ [0];
		var feature_end = __left0__ [1];
		if (__t__ (__eq__ (feature_start, feature_end))) {
			continue;
		}
		while (__t__ (__t__ (__lt__ (morph_index, __call__ (len, null, morphs))) && __le__ (__getitem__ (__getitem__ (__getitem__ (morphs, morph_index), 'char_span'), 1), feature_start))) {
			var morph_index = __call__ (__iadd__, null, morph_index, 1);
		}
		var overlapping_morphs = [];
		var candidate_morph_index = morph_index;
		while (__t__ (__t__ (__lt__ (candidate_morph_index, __call__ (len, null, morphs))) && __lt__ (__getitem__ (__getitem__ (__getitem__ (morphs, candidate_morph_index), 'char_span'), 0), feature_end))) {
			var candidate_morph = __getitem__ (morphs, candidate_morph_index);
			if (__t__ (__t__ (__getitem__ (candidate_morph, 'is_ignored') === false) && __lt__ (feature_start, __getitem__ (__getitem__ (candidate_morph, 'char_span'), 1)))) {
				(function () {
					var __accu0__ = overlapping_morphs;
					return __call__ (__accu0__.append, __accu0__, candidate_morph);
				}) ();
			}
			var candidate_morph_index = __call__ (__iadd__, null, candidate_morph_index, 1);
		}
		if (__t__ (__eq__ (__call__ (len, null, overlapping_morphs), 0))) {
			continue;
		}
		var protected_morphs = (function () {
			var __accu0__ = [];
			var __iterable1__ = overlapping_morphs;
			__iterable1__ = __i__ (__iterable1__);
			for (var __index1__ = 0; __index1__ < len (__iterable1__); __index1__++) {
				var morph = __getitem__ (__iterable1__, __index1__);
				if (__t__ (__t__ ((__le__ (1, __getitem__ (morph, 'dictionary_index')) && __le__ (__getitem__ (morph, 'dictionary_index'), __call__ (len, null, reading_protection)))) && __getitem__ (reading_protection, __sub__ (__getitem__ (morph, 'dictionary_index'), 1)) === true)) {
					(function () {
						var __accu1__ = __accu0__;
						return __call__ (__accu1__.append, __accu1__, morph);
					}) ();
				}
			}
			return __accu0__;
		}) ();
		__setitem__ (feature, 'is_reading_protected', __gt__ (__call__ (len, null, protected_morphs), 0));
		if (__t__ (__eq__ (__call__ (len, null, protected_morphs), 0))) {
			continue;
		}
		if (__t__ (__t__ (__ne__ (__call__ (len, null, overlapping_morphs), 1)) || __ne__ (__getitem__ (__getitem__ (overlapping_morphs, 0), 'char_span'), feature_char_span))) {
			continue;
		}
		var morph_features = __getitem__ (__getitem__ (overlapping_morphs, 0), 'features');
		if (__t__ (__t__ (__ge__ (__call__ (len, null, morph_features), 10)) && __t__ (!__in__ (':', __getitem__ (morph_features, 8))) && __t__ (!__in__ (':', __getitem__ (morph_features, 9))) && (__t__ (__ne__ ((function () {
			var __accu0__ = __getitem__ (feature, 'read');
			return __call__ (__accu0__.py_replace, __accu0__, '’', '');
		}) (), (function () {
			var __accu0__ = __getitem__ (morph_features, 8);
			return __call__ (__accu0__.py_replace, __accu0__, '’', '');
		}) ())) || __ne__ ((function () {
			var __accu0__ = __getitem__ (feature, 'pron');
			return __call__ (__accu0__.py_replace, __accu0__, '’', '');
		}) (), (function () {
			var __accu0__ = __getitem__ (morph_features, 9);
			return __call__ (__accu0__.py_replace, __accu0__, '’', '');
		}) ())))) {
			__setitem__ (feature, 'read', __getitem__ (morph_features, 8));
			__setitem__ (feature, 'pron', __getitem__ (morph_features, 9));
			__setitem__ (feature, 'mora_size', __call__ (len, null, __call__ (split_kana_mora, null, (function () {
				var __accu0__ = __getitem__ (morph_features, 9);
				return __call__ (__accu0__.py_replace, __accu0__, '’', '');
			}) ())));
		}
	}
};
export var make_phoneme_mapping = function (njd_features, morphs) {
	var caller_text = null;
	var normalize_mode = 'None';
	var is_non_pause_symbol = default_is_non_pause_symbol;
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'njd_features': var njd_features = __allkwargs0__ [__attrib0__]; break;
					case 'morphs': var morphs = __allkwargs0__ [__attrib0__]; break;
					case 'caller_text': var caller_text = __allkwargs0__ [__attrib0__]; break;
					case 'normalize_mode': var normalize_mode = __allkwargs0__ [__attrib0__]; break;
					case 'is_non_pause_symbol': var is_non_pause_symbol = __allkwargs0__ [__attrib0__]; break;
					case 'inference_jtalk': var inference_jtalk = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var base_mapping = (function () {
		var __accu0__ = inference_jtalk;
		return __call__ (__accu0__.make_phoneme_mapping, __accu0__, njd_features);
	}) ();
	var __iterable0__ = base_mapping;
	__iterable0__ = __i__ (__iterable0__);
	for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
		var entry = __getitem__ (__iterable0__, __index0__);
		if (__t__ (__t__ (!__in__ (__getitem__ (entry, 'pron'), tuple (['、', '？', '！']))) || __eq__ (__getitem__ (entry, 'pos_group3'), '数の区切り'))) {
			continue;
		}
		if (__t__ (__call__ (is_non_pause_symbol, null, __getitem__ (entry, 'surface')) === true)) {
			__setitem__ (entry, 'phonemes', []);
		}
		else if (__t__ (__eq__ (__call__ (len, null, __getitem__ (entry, 'phonemes')), 0))) {
			__setitem__ (entry, 'phonemes', ['pau']);
		}
	}
	var mecab_text = (__t__ (morphs === null) ? '' : __call__ (join_strings, null, '', (function () {
		var __accu0__ = [];
		var __iterable0__ = morphs;
		__iterable0__ = __i__ (__iterable0__);
		for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
			var morph = __getitem__ (__iterable0__, __index0__);
			(function () {
				var __accu1__ = __accu0__;
				return __call__ (__accu1__.append, __accu1__, __getitem__ (morph, 'surface'));
			}) ();
		}
		return __accu0__;
	}) ()));
	var reference_text = (__t__ (caller_text !== null) ? caller_text : mecab_text);
	if (__t__ (__eq__ (mecab_text, reference_text))) {
		var caller_text_spans = (function () {
			var __accu0__ = [];
			for (var index = 0; index < __call__ (len, null, mecab_text); index++) {
				(function () {
					var __accu1__ = __accu0__;
					return __call__ (__accu1__.append, __accu1__, tuple ([index, __add__ (index, 1)]));
				}) ();
			}
			return __accu0__;
		}) ();
	}
	else {
		var caller_text_spans = __call__ (build_caller_text_spans_by_mecab_character, null, mecab_text, reference_text, normalize_mode, __kwargtrans__ ({inference_jtalk: inference_jtalk}));
	}
	if (__t__ (morphs === null)) {
		var sequential_start = 0;
		var entries_without_morphs = [];
		var __iterable0__ = base_mapping;
		__iterable0__ = __i__ (__iterable0__);
		for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
			var entry = __getitem__ (__iterable0__, __index0__);
			var char_span = tuple ([sequential_start, __add__ (sequential_start, __call__ (len, null, __getitem__ (entry, 'surface')))]);
			var sequential_start = __call__ (__iadd__, null, sequential_start, __call__ (len, null, __getitem__ (entry, 'surface')));
			(function () {
				var __accu0__ = entries_without_morphs;
				return __call__ (__accu0__.append, __accu0__, __call__ (_base_to_detail, null, entry, __getitem__ (entry, 'phonemes'), __kwargtrans__ ({char_span: char_span, is_unknown: __t__ (__eq__ (__getitem__ (entry, 'pos'), 'フィラー')) && __eq__ (__getitem__ (entry, 'chain_rule'), '*'), is_ignored: __eq__ (__call__ (len, null, __getitem__ (entry, 'phonemes')), 0)})));
			}) ();
		}
		return entries_without_morphs;
	}
	var result = [];
	var morph_ranges = [];
	var mecab_char_span_overrides = [];
	var _append_aligned = function (entry, morph_range) {
		var mecab_char_span = null;
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'entry': var entry = __allkwargs0__ [__attrib0__]; break;
						case 'morph_range': var morph_range = __allkwargs0__ [__attrib0__]; break;
						case 'mecab_char_span': var mecab_char_span = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		(function () {
			var __accu0__ = result;
			return __call__ (__accu0__.append, __accu0__, entry);
		}) ();
		(function () {
			var __accu0__ = morph_ranges;
			return __call__ (__accu0__.append, __accu0__, morph_range);
		}) ();
		(function () {
			var __accu0__ = mecab_char_span_overrides;
			return __call__ (__accu0__.append, __accu0__, mecab_char_span);
		}) ();
	};
	var has_valid_morph = __call__ (any, null, (function () {
		var __accu0__ = [];
		var __iterable0__ = morphs;
		__iterable0__ = __i__ (__iterable0__);
		for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
			var morph = __getitem__ (__iterable0__, __index0__);
			(function () {
				var __accu1__ = __accu0__;
				return __call__ (__accu1__.append, __accu1__, __getitem__ (morph, 'is_ignored') === false);
			}) ();
		}
		return __accu0__;
	}) ());
	if (__t__ (has_valid_morph === false)) {
		var ignored_entries = (function () {
			var __accu0__ = [];
			var __iterable0__ = morphs;
			__iterable0__ = __i__ (__iterable0__);
			for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
				var morph = __getitem__ (__iterable0__, __index0__);
				(function () {
					var __accu1__ = __accu0__;
					return __call__ (__accu1__.append, __accu1__, __call__ (_sp_entry, null, __getitem__ (morph, 'surface'), __kwargtrans__ ({char_span: tuple ([0, 0]), is_unknown: __getitem__ (morph, 'is_unknown')})));
				}) ();
			}
			return __accu0__;
		}) ();
		var ignored_ranges = (function () {
			var __accu0__ = [];
			for (var index = 0; index < __call__ (len, null, morphs); index++) {
				(function () {
					var __accu1__ = __accu0__;
					return __call__ (__accu1__.append, __accu1__, tuple ([index, __add__ (index, 1)]));
				}) ();
			}
			return __accu0__;
		}) ();
		var ignored_entries = __call__ (_assign_char_spans_from_morph_ranges, null, ignored_entries, ignored_ranges, morphs, caller_text_spans);
		return __call__ (_restore_caller_itaiji_surfaces, null, ignored_entries, caller_text, normalize_mode);
	}
	var morph_idx = 0;
	var number_block_end_base_idx = 0;
	var split_remaining_surface = '';
	var __iterable0__ = __call__ (py_enumerate, null, base_mapping);
	__iterable0__ = __i__ (__iterable0__);
	for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
		var __left0__ = __getitem__ (__iterable0__, __index0__);
		var base_idx = __left0__ [0];
		var base_entry = __left0__ [1];
		if (__t__ (__lt__ (base_idx, number_block_end_base_idx))) {
			continue;
		}
		var current_surface = __getitem__ (base_entry, 'surface');
		var current_phonemes = __getitem__ (base_entry, 'phonemes');
		if (__t__ (__ne__ (split_remaining_surface, ''))) {
			if (__t__ (__t__ (__lt__ (morph_idx, __call__ (len, null, morphs))) && (function () {
				var __accu0__ = split_remaining_surface;
				return __call__ (__accu0__.startswith, __accu0__, current_surface);
			}) () === true)) {
				__call__ (_append_aligned, null, __call__ (_base_to_detail, null, base_entry, __call__ (list, null, current_phonemes), __kwargtrans__ ({char_span: tuple ([0, 0]), is_unknown: __getitem__ (__getitem__ (morphs, morph_idx), 'is_unknown'), is_ignored: __eq__ (__call__ (len, null, current_phonemes), 0)})), tuple ([morph_idx, __add__ (morph_idx, 1)]), __kwargtrans__ ({mecab_char_span: tuple ([__sub__ (__add__ (__getitem__ (__getitem__ (__getitem__ (morphs, morph_idx), 'char_span'), 0), __call__ (len, null, __getitem__ (__getitem__ (morphs, morph_idx), 'surface'))), __call__ (len, null, split_remaining_surface)), __add__ (__sub__ (__add__ (__getitem__ (__getitem__ (__getitem__ (morphs, morph_idx), 'char_span'), 0), __call__ (len, null, __getitem__ (__getitem__ (morphs, morph_idx), 'surface'))), __call__ (len, null, split_remaining_surface)), __call__ (len, null, current_surface))])}));
				var split_remaining_surface = __getslice__ (split_remaining_surface, __call__ (len, null, current_surface), null, 1);
				if (__t__ (__eq__ (split_remaining_surface, ''))) {
					var morph_idx = __call__ (__iadd__, null, morph_idx, 1);
				}
				continue;
			}
			var split_remaining_surface = '';
			var morph_idx = __call__ (__iadd__, null, morph_idx, 1);
		}
		while (__t__ (__lt__ (morph_idx, __call__ (len, null, morphs)))) {
			var morph = __getitem__ (morphs, morph_idx);
			if (__t__ (__t__ (__getitem__ (morph, 'is_ignored') === true) && __t__ (__gt__ (__call__ (len, null, current_surface), __call__ (len, null, __getitem__ (morph, 'surface')))) && (function () {
				var __accu0__ = current_surface;
				return __call__ (__accu0__.startswith, __accu0__, __getitem__ (morph, 'surface'));
			}) () === true)) {
				break;
			}
			if (__t__ (__getitem__ (morph, 'is_ignored') === true)) {
				__call__ (_append_aligned, null, __call__ (_sp_entry, null, __getitem__ (morph, 'surface'), __kwargtrans__ ({char_span: tuple ([0, 0]), is_unknown: __getitem__ (morph, 'is_unknown')})), tuple ([morph_idx, __add__ (morph_idx, 1)]));
				var morph_idx = __call__ (__iadd__, null, morph_idx, 1);
			}
			else {
				break;
			}
		}
		if (__t__ (__ge__ (morph_idx, __call__ (len, null, morphs)))) {
			__call__ (_append_aligned, null, __call__ (_base_to_detail, null, base_entry, current_phonemes, __kwargtrans__ ({char_span: tuple ([0, 0]), is_ignored: __eq__ (__call__ (len, null, current_phonemes), 0)})), tuple ([0, 0]));
			continue;
		}
		var morph = __getitem__ (morphs, morph_idx);
		if (__t__ (__t__ (__call__ (_is_njd_number_surface, null, current_surface) === true) && __call__ (_is_njd_number_morph, null, morph) === true)) {
			var number_block_end_base_idx = base_idx;
			while (__t__ (__t__ (__lt__ (number_block_end_base_idx, __call__ (len, null, base_mapping))) && __t__ (__call__ (_is_njd_number_surface, null, __getitem__ (__getitem__ (base_mapping, number_block_end_base_idx), 'surface')) === true) && __t__ ((__t__ (__eq__ (number_block_end_base_idx, base_idx)) || __ne__ (__getitem__ (__getitem__ (base_mapping, number_block_end_base_idx), 'pos_group1'), '固有名詞'))) && (__t__ (__eq__ (number_block_end_base_idx, base_idx)) || (function () {
				var __accu0__ = __getitem__ (__getitem__ (base_mapping, __sub__ (number_block_end_base_idx, 1)), 'surface');
				return __call__ (__accu0__.endswith, __accu0__, 'ー');
			}) () === false))) {
				var number_block_end_base_idx = __call__ (__iadd__, null, number_block_end_base_idx, 1);
			}
			var number_entries = __getslice__ (base_mapping, base_idx, number_block_end_base_idx, 1);
			var next_surface = (__t__ (__lt__ (number_block_end_base_idx, __call__ (len, null, base_mapping))) ? __getitem__ (__getitem__ (base_mapping, number_block_end_base_idx), 'surface') : '');
			var __left0__ = __call__ (_collect_njd_number_morphs, null, morphs, morph_idx, (function () {
				var __accu0__ = [];
				var __iterable1__ = number_entries;
				__iterable1__ = __i__ (__iterable1__);
				for (var __index1__ = 0; __index1__ < len (__iterable1__); __index1__++) {
					var entry = __getitem__ (__iterable1__, __index1__);
					(function () {
						var __accu1__ = __accu0__;
						return __call__ (__accu1__.append, __accu1__, __getitem__ (entry, 'surface'));
					}) ();
				}
				return __accu0__;
			}) (), next_surface);
			var number_morph_indices = __left0__ [0];
			var number_block_end_morph_idx = __left0__ [1];
			var number_assignments = __call__ (_align_njd_number_block, null, (function () {
				var __accu0__ = [];
				var __iterable1__ = number_entries;
				__iterable1__ = __i__ (__iterable1__);
				for (var __index1__ = 0; __index1__ < len (__iterable1__); __index1__++) {
					var entry = __getitem__ (__iterable1__, __index1__);
					(function () {
						var __accu1__ = __accu0__;
						return __call__ (__accu1__.append, __accu1__, __getitem__ (entry, 'surface'));
					}) ();
				}
				return __accu0__;
			}) (), morphs, number_morph_indices);
			var ignored_morph_indices = (function () {
				var __accu0__ = [];
				for (var index = morph_idx; index < number_block_end_morph_idx; index++) {
					if (__t__ (__getitem__ (__getitem__ (morphs, index), 'is_ignored') === true)) {
						(function () {
							var __accu1__ = __accu0__;
							return __call__ (__accu1__.append, __accu1__, index);
						}) ();
					}
				}
				return __accu0__;
			}) ();
			var emitted_ignored_indices = __call__ (set, null);
			var __iterable1__ = __call__ (zip, null, number_entries, number_assignments);
			__iterable1__ = __i__ (__iterable1__);
			for (var __index1__ = 0; __index1__ < len (__iterable1__); __index1__++) {
				var __left0__ = __getitem__ (__iterable1__, __index1__);
				var number_entry = __left0__ [0];
				var assigned_morph_indices = __left0__ [1];
				if (__t__ (__eq__ (__call__ (len, null, assigned_morph_indices), 0))) {
					var entry_morph_range = tuple ([0, 0]);
					var assigned_morphs = [];
				}
				else {
					var entry_morph_range = tuple ([__getitem__ (assigned_morph_indices, 0), __add__ (__getitem__ (assigned_morph_indices, __neg__ (1)), 1)]);
					var assigned_morphs = (function () {
						var __accu0__ = [];
						var __iterable2__ = assigned_morph_indices;
						__iterable2__ = __i__ (__iterable2__);
						for (var __index2__ = 0; __index2__ < len (__iterable2__); __index2__++) {
							var index = __getitem__ (__iterable2__, __index2__);
							(function () {
								var __accu1__ = __accu0__;
								return __call__ (__accu1__.append, __accu1__, __getitem__ (morphs, index));
							}) ();
						}
						return __accu0__;
					}) ();
					var __iterable2__ = ignored_morph_indices;
					__iterable2__ = __i__ (__iterable2__);
					for (var __index2__ = 0; __index2__ < len (__iterable2__); __index2__++) {
						var ignored_index = __getitem__ (__iterable2__, __index2__);
						if (__t__ (__t__ (__ge__ (ignored_index, __getitem__ (entry_morph_range, 0))) || __in__ (ignored_index, emitted_ignored_indices))) {
							continue;
						}
						__call__ (_append_aligned, null, __call__ (_sp_entry, null, __getitem__ (__getitem__ (morphs, ignored_index), 'surface'), __kwargtrans__ ({char_span: tuple ([0, 0]), is_unknown: __getitem__ (__getitem__ (morphs, ignored_index), 'is_unknown')})), tuple ([ignored_index, __add__ (ignored_index, 1)]));
						(function () {
							var __accu0__ = emitted_ignored_indices;
							return __call__ (__accu0__.add, __accu0__, ignored_index);
						}) ();
					}
				}
				var features = null;
				if (__t__ (__t__ (__eq__ (__call__ (len, null, assigned_morphs), 1)) && __eq__ (__getitem__ (__getitem__ (assigned_morphs, 0), 'surface'), __getitem__ (number_entry, 'surface')))) {
					var features = __getitem__ (__getitem__ (assigned_morphs, 0), 'features');
				}
				__call__ (_append_aligned, null, __call__ (_base_to_detail, null, number_entry, __call__ (list, null, __getitem__ (number_entry, 'phonemes')), __kwargtrans__ ({char_span: tuple ([0, 0]), features: features, is_unknown: __call__ (any, null, (function () {
					var __accu0__ = [];
					var __iterable2__ = assigned_morphs;
					__iterable2__ = __i__ (__iterable2__);
					for (var __index2__ = 0; __index2__ < len (__iterable2__); __index2__++) {
						var assigned_morph = __getitem__ (__iterable2__, __index2__);
						(function () {
							var __accu1__ = __accu0__;
							return __call__ (__accu1__.append, __accu1__, __getitem__ (assigned_morph, 'is_unknown') === true);
						}) ();
					}
					return __accu0__;
				}) ()), is_ignored: __eq__ (__call__ (len, null, __getitem__ (number_entry, 'phonemes')), 0)})), entry_morph_range);
				var __iterable2__ = ignored_morph_indices;
				__iterable2__ = __i__ (__iterable2__);
				for (var __index2__ = 0; __index2__ < len (__iterable2__); __index2__++) {
					var ignored_index = __getitem__ (__iterable2__, __index2__);
					if (__t__ (__t__ (__le__ (ignored_index, __getitem__ (entry_morph_range, 0))) || __t__ (__ge__ (ignored_index, __getitem__ (entry_morph_range, 1))) || __in__ (ignored_index, emitted_ignored_indices))) {
						continue;
					}
					__call__ (_append_aligned, null, __call__ (_sp_entry, null, __getitem__ (__getitem__ (morphs, ignored_index), 'surface'), __kwargtrans__ ({char_span: tuple ([0, 0]), is_unknown: __getitem__ (__getitem__ (morphs, ignored_index), 'is_unknown')})), tuple ([0, 0]));
					(function () {
						var __accu0__ = emitted_ignored_indices;
						return __call__ (__accu0__.add, __accu0__, ignored_index);
					}) ();
				}
			}
			var __iterable1__ = ignored_morph_indices;
			__iterable1__ = __i__ (__iterable1__);
			for (var __index1__ = 0; __index1__ < len (__iterable1__); __index1__++) {
				var ignored_index = __getitem__ (__iterable1__, __index1__);
				if (__t__ (__in__ (ignored_index, emitted_ignored_indices))) {
					continue;
				}
				__call__ (_append_aligned, null, __call__ (_sp_entry, null, __getitem__ (__getitem__ (morphs, ignored_index), 'surface'), __kwargtrans__ ({char_span: tuple ([0, 0]), is_unknown: __getitem__ (__getitem__ (morphs, ignored_index), 'is_unknown')})), tuple ([ignored_index, __add__ (ignored_index, 1)]));
			}
			var morph_idx = number_block_end_morph_idx;
			continue;
		}
		var compound_morph_range = __call__ (_njd_digit_compound_morph_range, null, morphs, morph_idx, current_surface);
		if (__t__ (__ne__ (compound_morph_range, tuple ([morph_idx, __add__ (morph_idx, 1)])))) {
			__call__ (_append_aligned, null, __call__ (_base_to_detail, null, base_entry, __call__ (list, null, current_phonemes), __kwargtrans__ ({char_span: tuple ([0, 0]), is_ignored: __eq__ (__call__ (len, null, current_phonemes), 0)})), compound_morph_range);
			var morph_idx = __getitem__ (compound_morph_range, 1);
			continue;
		}
		if (__t__ (__eq__ (current_surface, __getitem__ (morph, 'surface')))) {
			var phonemes = __call__ (list, null, current_phonemes);
			if (__t__ (__t__ (__getitem__ (morph, 'is_unknown') === true) && __t__ ((__t__ (__eq__ (__call__ (len, null, phonemes), 0)) || __eq__ (phonemes, ['pau']))) && !__t__ ((__t__ (__eq__ (current_surface, 'ー')) && __eq__ (__getitem__ (base_entry, 'pron'), '、'))))) {
				var phonemes = ['unk'];
			}
			__call__ (_append_aligned, null, __call__ (_base_to_detail, null, base_entry, phonemes, __kwargtrans__ ({char_span: tuple ([0, 0]), is_unknown: __getitem__ (morph, 'is_unknown'), is_ignored: __eq__ (__call__ (len, null, current_phonemes), 0), features: __getitem__ (morph, 'features')})), tuple ([morph_idx, __add__ (morph_idx, 1)]));
			var morph_idx = __call__ (__iadd__, null, morph_idx, 1);
		}
		else if (__t__ ((function () {
			var __accu0__ = current_surface;
			return __call__ (__accu0__.startswith, __accu0__, __getitem__ (morph, 'surface'));
		}) ())) {
			var match_start_idx = morph_idx;
			var symbol_morphs = [];
			var symbol_surface = '';
			var symbol_morph_idx = morph_idx;
			while (__t__ (__t__ (__lt__ (symbol_morph_idx, __call__ (len, null, morphs))) && __lt__ (__call__ (len, null, symbol_surface), __call__ (len, null, current_surface)))) {
				var symbol_morph = __getitem__ (morphs, symbol_morph_idx);
				if (__t__ (__t__ (__t__ (__getitem__ (symbol_morph, 'is_ignored') === false) && (__t__ (__ne__ (__call__ (len, null, __getitem__ (symbol_morph, 'surface')), 1)) || (function () {
					var __accu0__ = __getitem__ (symbol_morph, 'surface');
					return __call__ (__accu0__.isalnum, __accu0__);
				}) () === true)) || (function () {
					var __accu0__ = current_surface;
					return __call__ (__accu0__.startswith, __accu0__, __getitem__ (symbol_morph, 'surface'), __call__ (len, null, symbol_surface));
				}) () === false)) {
					break;
				}
				(function () {
					var __accu0__ = symbol_morphs;
					return __call__ (__accu0__.append, __accu0__, symbol_morph);
				}) ();
				var symbol_surface = __call__ (__iadd__, null, symbol_surface, __getitem__ (symbol_morph, 'surface'));
				var symbol_morph_idx = __call__ (__iadd__, null, symbol_morph_idx, 1);
			}
			var is_restored_symbol_chunk = __t__ (__gt__ (__call__ (len, null, symbol_morphs), 1)) && __t__ (__eq__ (symbol_surface, current_surface)) && (__t__ (__eq__ (__call__ (len, null, current_phonemes), 0)) || __eq__ (current_phonemes, ['pau']));
			if (__t__ (is_restored_symbol_chunk === true)) {
				var symbol_range_start = morph_idx;
				var first_symbol_idx = __call__ (py_next, null, __call__ (py_iter, null, (function () {
					var __accu0__ = [];
					var __iterable1__ = __call__ (py_enumerate, null, symbol_morphs);
					__iterable1__ = __i__ (__iterable1__);
					for (var __index1__ = 0; __index1__ < len (__iterable1__); __index1__++) {
						var __left0__ = __getitem__ (__iterable1__, __index1__);
						var symbol_idx = __left0__ [0];
						var symbol_morph = __left0__ [1];
						if (__t__ (__getitem__ (symbol_morph, 'is_ignored') === false)) {
							(function () {
								var __accu1__ = __accu0__;
								return __call__ (__accu1__.append, __accu1__, symbol_idx);
							}) ();
						}
					}
					return __accu0__;
				}) ()), 0);
				var __iterable1__ = __call__ (py_enumerate, null, symbol_morphs);
				__iterable1__ = __i__ (__iterable1__);
				for (var __index1__ = 0; __index1__ < len (__iterable1__); __index1__++) {
					var __left0__ = __getitem__ (__iterable1__, __index1__);
					var symbol_idx = __left0__ [0];
					var symbol_morph = __left0__ [1];
					if (__t__ (__getitem__ (symbol_morph, 'is_ignored') === true)) {
						__call__ (_append_aligned, null, __call__ (_sp_entry, null, __getitem__ (symbol_morph, 'surface'), __kwargtrans__ ({char_span: tuple ([0, 0]), is_unknown: __getitem__ (symbol_morph, 'is_unknown')})), tuple ([__add__ (symbol_range_start, symbol_idx), __add__ (__add__ (symbol_range_start, symbol_idx), 1)]));
						continue;
					}
					var symbol_mapping = __call__ (_base_to_detail, null, base_entry, (__t__ (__eq__ (symbol_idx, first_symbol_idx)) ? __call__ (list, null, current_phonemes) : []), __kwargtrans__ ({char_span: tuple ([0, 0]), features: __getitem__ (symbol_morph, 'features'), is_unknown: __getitem__ (symbol_morph, 'is_unknown'), is_ignored: false}));
					__setitem__ (symbol_mapping, 'surface', __getitem__ (symbol_morph, 'surface'));
					__setitem__ (symbol_mapping, 'orig', __getitem__ (symbol_morph, 'surface'));
					__call__ (_append_aligned, null, symbol_mapping, tuple ([__add__ (symbol_range_start, symbol_idx), __add__ (__add__ (symbol_range_start, symbol_idx), 1)]));
				}
				var morph_idx = symbol_morph_idx;
				continue;
			}
			var is_unknown_word = false;
			var matched_len = 0;
			var internal_ignored_entries = [];
			while (__t__ (__lt__ (morph_idx, __call__ (len, null, morphs)))) {
				var inner_morph = __getitem__ (morphs, morph_idx);
				if (__t__ (__getitem__ (inner_morph, 'is_ignored') === true)) {
					(function () {
						var __accu0__ = internal_ignored_entries;
						return __call__ (__accu0__.append, __accu0__, __call__ (_sp_entry, null, __getitem__ (inner_morph, 'surface'), __kwargtrans__ ({char_span: tuple ([0, 0]), is_unknown: __getitem__ (inner_morph, 'is_unknown')})));
					}) ();
					var morph_idx = __call__ (__iadd__, null, morph_idx, 1);
					continue;
				}
				var remaining = __getslice__ (current_surface, matched_len, null, 1);
				if (__t__ ((function () {
					var __accu0__ = remaining;
					return __call__ (__accu0__.startswith, __accu0__, __getitem__ (inner_morph, 'surface'));
				}) ())) {
					var is_unknown_word = __t__ (is_unknown_word) || __getitem__ (inner_morph, 'is_unknown');
					var matched_len = __call__ (__iadd__, null, matched_len, __call__ (len, null, __getitem__ (inner_morph, 'surface')));
					var morph_idx = __call__ (__iadd__, null, morph_idx, 1);
					if (__t__ (__eq__ (matched_len, __call__ (len, null, current_surface)))) {
						break;
					}
				}
				else {
					break;
				}
			}
			var phonemes = __call__ (list, null, current_phonemes);
			if (__t__ (__t__ (is_unknown_word === true) && (__t__ (__eq__ (__call__ (len, null, phonemes), 0)) || __eq__ (phonemes, ['pau'])))) {
				var phonemes = ['unk'];
			}
			__call__ (_append_aligned, null, __call__ (_base_to_detail, null, base_entry, phonemes, __kwargtrans__ ({char_span: tuple ([0, 0]), is_unknown: is_unknown_word, is_ignored: __eq__ (__call__ (len, null, current_phonemes), 0)})), tuple ([match_start_idx, morph_idx]));
			var __iterable1__ = internal_ignored_entries;
			__iterable1__ = __i__ (__iterable1__);
			for (var __index1__ = 0; __index1__ < len (__iterable1__); __index1__++) {
				var ignored_entry = __getitem__ (__iterable1__, __index1__);
				__call__ (_append_aligned, null, ignored_entry, tuple ([0, 0]));
			}
		}
		else if (__t__ (__t__ ((function () {
			var __accu0__ = __getitem__ (morph, 'surface');
			return __call__ (__accu0__.startswith, __accu0__, current_surface);
		}) ()) && __call__ (_is_split_morph, null, base_mapping, base_idx, __getitem__ (morph, 'surface')) === true)) {
			__call__ (_append_aligned, null, __call__ (_base_to_detail, null, base_entry, __call__ (list, null, current_phonemes), __kwargtrans__ ({char_span: tuple ([0, 0]), is_unknown: __getitem__ (morph, 'is_unknown'), is_ignored: __eq__ (__call__ (len, null, current_phonemes), 0)})), tuple ([morph_idx, __add__ (morph_idx, 1)]), __kwargtrans__ ({mecab_char_span: tuple ([__getitem__ (__getitem__ (morph, 'char_span'), 0), __add__ (__getitem__ (__getitem__ (morph, 'char_span'), 0), __call__ (len, null, current_surface))])}));
			var split_remaining_surface = __getslice__ (__getitem__ (morph, 'surface'), __call__ (len, null, current_surface), null, 1);
		}
		else {
			__call__ (_append_aligned, null, __call__ (_base_to_detail, null, base_entry, __call__ (list, null, current_phonemes), __kwargtrans__ ({char_span: tuple ([0, 0]), is_ignored: __eq__ (__call__ (len, null, current_phonemes), 0)})), tuple ([morph_idx, __add__ (morph_idx, 1)]));
			var current_morph_surface = __getitem__ (__getitem__ (morphs, morph_idx), 'surface');
			var has_odori = __call__ (any, null, (function () {
				var __accu0__ = [];
				var __iterable1__ = current_morph_surface;
				__iterable1__ = __i__ (__iterable1__);
				for (var __index1__ = 0; __index1__ < len (__iterable1__); __index1__++) {
					var c = __getitem__ (__iterable1__, __index1__);
					(function () {
						var __accu1__ = __accu0__;
						return __call__ (__accu1__.append, __accu1__, __in__ (c, _ODORI_CHARS));
					}) ();
				}
				return __accu0__;
			}) ());
			if (__t__ (has_odori === true)) {
				var odori_morph_start = morph_idx;
				var morph_idx = __call__ (__iadd__, null, morph_idx, 1);
				if (__t__ (__lt__ (morph_idx, __call__ (len, null, morphs)))) {
					var ahead = __getitem__ (morphs, morph_idx);
					if (__t__ (__t__ (__getitem__ (ahead, 'is_ignored') !== true) && (function () {
						var __accu0__ = current_surface;
						return __call__ (__accu0__.endswith, __accu0__, __getitem__ (ahead, 'surface'));
					}) ())) {
						var morph_idx = __call__ (__iadd__, null, morph_idx, 1);
					}
				}
				__setitem__ (morph_ranges, __neg__ (1), tuple ([odori_morph_start, morph_idx]));
			}
			else {
				var morph_idx = __call__ (__iadd__, null, morph_idx, 1);
			}
		}
	}
	while (__t__ (__lt__ (morph_idx, __call__ (len, null, morphs)))) {
		var morph = __getitem__ (morphs, morph_idx);
		if (__t__ (__getitem__ (morph, 'is_ignored') === true)) {
			__call__ (_append_aligned, null, __call__ (_sp_entry, null, __getitem__ (morph, 'surface'), __kwargtrans__ ({char_span: tuple ([0, 0]), is_unknown: __getitem__ (morph, 'is_unknown')})), tuple ([morph_idx, __add__ (morph_idx, 1)]));
		}
		var morph_idx = __call__ (__iadd__, null, morph_idx, 1);
	}
	__call__ (_assign_reading_sources, null, result, morph_ranges, morphs, inference_jtalk.userdic_paths);
	var result = __call__ (_assign_char_spans_from_morph_ranges, null, result, morph_ranges, morphs, caller_text_spans, mecab_char_span_overrides);
	return __call__ (_restore_caller_itaiji_surfaces, null, result, caller_text, normalize_mode);
};
export var check_caller_char_spans = function (mapping, text, function_name) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'mapping': var mapping = __allkwargs0__ [__attrib0__]; break;
					case 'text': var text = __allkwargs0__ [__attrib0__]; break;
					case 'function_name': var function_name = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var expected_start = 0;
	var __iterable0__ = mapping;
	__iterable0__ = __i__ (__iterable0__);
	for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
		var entry = __getitem__ (__iterable0__, __index0__);
		var __left0__ = __getitem__ (entry, 'char_span');
		var char_start = __left0__ [0];
		var char_end = __left0__ [1];
		if (__t__ (__eq__ (tuple ([char_start, char_end]), tuple ([0, 0])))) {
			continue;
		}
		if (__t__ (__t__ (__lt__ (char_start, expected_start)) || __t__ (__le__ (char_end, char_start)) || __t__ (__gt__ (char_end, __call__ (len, null, text))) || __call__ (any, null, (function () {
			var __accu0__ = [];
			var __iterable1__ = __getslice__ (text, expected_start, char_start, 1);
			__iterable1__ = __i__ (__iterable1__);
			for (var __index1__ = 0; __index1__ < len (__iterable1__); __index1__++) {
				var character = __getitem__ (__iterable1__, __index1__);
				(function () {
					var __accu1__ = __accu0__;
					return __call__ (__accu1__.append, __accu1__, __t__ (__ge__ (__call__ (ord, null, character), 32)) && __t__ (__ne__ (character, '\x7f')) && !__in__ (character, _CHARACTERS_REMOVED_BY_TEXT2MECAB));
				}) ();
			}
			return __accu0__;
		}) ()))) {
			var __except0__ = __call__ (ValueError, null, '{} char_span must cover caller text exactly once'.format (function_name));
			__except0__.__cause__ = null;
			throw __except0__;
		}
		var expected_start = char_end;
	}
	if (__t__ (__call__ (any, null, (function () {
		var __accu0__ = [];
		var __iterable0__ = __getslice__ (text, expected_start, null, 1);
		__iterable0__ = __i__ (__iterable0__);
		for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
			var character = __getitem__ (__iterable0__, __index0__);
			(function () {
				var __accu1__ = __accu0__;
				return __call__ (__accu1__.append, __accu1__, __t__ (__ge__ (__call__ (ord, null, character), 32)) && __t__ (__ne__ (character, '\x7f')) && !__in__ (character, _CHARACTERS_REMOVED_BY_TEXT2MECAB));
			}) ();
		}
		return __accu0__;
	}) ()))) {
		var __except0__ = __call__ (ValueError, null, '{} char_span must cover caller text exactly once'.format (function_name));
		__except0__.__cause__ = null;
		throw __except0__;
	}
};
export var njd_feature_char_spans = function (njd_features, morphs) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'njd_features': var njd_features = __allkwargs0__ [__attrib0__]; break;
					case 'morphs': var morphs = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var feature_char_spans = __mul__ ([tuple ([0, 0])], __call__ (len, null, njd_features));
	var feature_index = 0;
	var morph_index = 0;
	while (__t__ (__lt__ (feature_index, __call__ (len, null, njd_features)))) {
		var feature_surface = __getitem__ (__getitem__ (njd_features, feature_index), 'string');
		while (__t__ (__t__ (__lt__ (morph_index, __call__ (len, null, morphs))) && __t__ (__getitem__ (__getitem__ (morphs, morph_index), 'is_ignored') === true) && (function () {
			var __accu0__ = feature_surface;
			return __call__ (__accu0__.startswith, __accu0__, __getitem__ (__getitem__ (morphs, morph_index), 'surface'));
		}) () === false)) {
			var morph_index = __call__ (__iadd__, null, morph_index, 1);
		}
		if (__t__ (__ge__ (morph_index, __call__ (len, null, morphs)))) {
			var text_end = (__t__ (__gt__ (__call__ (len, null, morphs), 0)) ? __getitem__ (__getitem__ (__getitem__ (morphs, __neg__ (1)), 'char_span'), 1) : 0);
			__setitem__ (feature_char_spans, feature_index, tuple ([text_end, text_end]));
			var feature_index = __call__ (__iadd__, null, feature_index, 1);
			continue;
		}
		var morph = __getitem__ (morphs, morph_index);
		if (__t__ (__t__ (__call__ (_is_njd_number_feature, null, __getitem__ (njd_features, feature_index)) === true) && __call__ (_is_njd_number_morph, null, morph) === true)) {
			var feature_end = feature_index;
			while (__t__ (__t__ (__lt__ (feature_end, __call__ (len, null, njd_features))) && __call__ (_is_njd_number_feature, null, __getitem__ (njd_features, feature_end)) === true)) {
				var feature_end = __call__ (__iadd__, null, feature_end, 1);
			}
			var next_surface = (__t__ (__lt__ (feature_end, __call__ (len, null, njd_features))) ? __getitem__ (__getitem__ (njd_features, feature_end), 'string') : '');
			var __left0__ = __call__ (_collect_njd_number_morphs, null, morphs, morph_index, (function () {
				var __accu0__ = [];
				var __iterable0__ = __getslice__ (njd_features, feature_index, feature_end, 1);
				__iterable0__ = __i__ (__iterable0__);
				for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
					var feature = __getitem__ (__iterable0__, __index0__);
					(function () {
						var __accu1__ = __accu0__;
						return __call__ (__accu1__.append, __accu1__, __getitem__ (feature, 'string'));
					}) ();
				}
				return __accu0__;
			}) (), next_surface);
			var number_morph_indices = __left0__ [0];
			var morph_end = __left0__ [1];
			var number_assignments = __call__ (_align_njd_number_block, null, (function () {
				var __accu0__ = [];
				var __iterable0__ = __getslice__ (njd_features, feature_index, feature_end, 1);
				__iterable0__ = __i__ (__iterable0__);
				for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
					var feature = __getitem__ (__iterable0__, __index0__);
					(function () {
						var __accu1__ = __accu0__;
						return __call__ (__accu1__.append, __accu1__, __getitem__ (feature, 'string'));
					}) ();
				}
				return __accu0__;
			}) (), morphs, number_morph_indices);
			var insertion_position = __getitem__ (__getitem__ (morph, 'char_span'), 0);
			var __iterable0__ = __call__ (py_enumerate, null, number_assignments);
			__iterable0__ = __i__ (__iterable0__);
			for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
				var __left0__ = __getitem__ (__iterable0__, __index0__);
				var offset = __left0__ [0];
				var assigned_morph_indices = __left0__ [1];
				if (__t__ (__eq__ (__call__ (len, null, assigned_morph_indices), 0))) {
					__setitem__ (feature_char_spans, __add__ (feature_index, offset), tuple ([insertion_position, insertion_position]));
					continue;
				}
				var span_start = __getitem__ (__getitem__ (__getitem__ (morphs, __getitem__ (assigned_morph_indices, 0)), 'char_span'), 0);
				var span_end = __getitem__ (__getitem__ (__getitem__ (morphs, __getitem__ (assigned_morph_indices, __neg__ (1))), 'char_span'), 1);
				__setitem__ (feature_char_spans, __add__ (feature_index, offset), tuple ([span_start, span_end]));
				var insertion_position = span_end;
			}
			var feature_index = feature_end;
			var morph_index = morph_end;
			continue;
		}
		var __left0__ = __call__ (_njd_digit_compound_morph_range, null, morphs, morph_index, feature_surface);
		var compound_morph_start = __left0__ [0];
		var compound_morph_end = __left0__ [1];
		if (__t__ (__t__ (__lt__ (compound_morph_start, morph_index)) || __gt__ (compound_morph_end, __add__ (morph_index, 1)))) {
			__setitem__ (feature_char_spans, feature_index, tuple ([__getitem__ (__getitem__ (__getitem__ (morphs, compound_morph_start), 'char_span'), 0), __getitem__ (__getitem__ (__getitem__ (morphs, __sub__ (compound_morph_end, 1)), 'char_span'), 1)]));
			var morph_index = compound_morph_end;
			var feature_index = __call__ (__iadd__, null, feature_index, 1);
			continue;
		}
		var split_feature_end = feature_index;
		var concatenated_surface = '';
		while (__t__ (__t__ (__lt__ (split_feature_end, __call__ (len, null, njd_features))) && __lt__ (__call__ (len, null, concatenated_surface), __call__ (len, null, __getitem__ (morph, 'surface'))))) {
			var concatenated_surface = __call__ (__iadd__, null, concatenated_surface, __getitem__ (__getitem__ (njd_features, split_feature_end), 'string'));
			var split_feature_end = __call__ (__iadd__, null, split_feature_end, 1);
		}
		if (__t__ (__t__ (__gt__ (split_feature_end, __add__ (feature_index, 1))) && __eq__ (concatenated_surface, __getitem__ (morph, 'surface')))) {
			var split_position = __getitem__ (__getitem__ (morph, 'char_span'), 0);
			for (var split_feature_index = feature_index; split_feature_index < split_feature_end; split_feature_index++) {
				var split_end = __add__ (split_position, __call__ (len, null, __getitem__ (__getitem__ (njd_features, split_feature_index), 'string')));
				__setitem__ (feature_char_spans, split_feature_index, tuple ([split_position, split_end]));
				var split_position = split_end;
			}
			var feature_index = split_feature_end;
			var morph_index = __call__ (__iadd__, null, morph_index, 1);
			continue;
		}
		if (__t__ (__eq__ (feature_surface, __getitem__ (morph, 'surface')))) {
			var consumed_morph_count = 1;
		}
		else if (__t__ ((function () {
			var __accu0__ = feature_surface;
			return __call__ (__accu0__.startswith, __accu0__, __getitem__ (morph, 'surface'));
		}) ())) {
			var matched_length = 0;
			var consumed_morph_count = 0;
			while (__t__ (__lt__ (__add__ (morph_index, consumed_morph_count), __call__ (len, null, morphs)))) {
				var candidate_morph = __getitem__ (morphs, __add__ (morph_index, consumed_morph_count));
				if (__t__ (__t__ (__getitem__ (candidate_morph, 'is_ignored') === true) && (function () {
					var __accu0__ = __getslice__ (feature_surface, matched_length, null, 1);
					return __call__ (__accu0__.startswith, __accu0__, __getitem__ (candidate_morph, 'surface'));
				}) () === false)) {
					var consumed_morph_count = __call__ (__iadd__, null, consumed_morph_count, 1);
					continue;
				}
				if (__t__ ((function () {
					var __accu0__ = __getslice__ (feature_surface, matched_length, null, 1);
					return __call__ (__accu0__.startswith, __accu0__, __getitem__ (candidate_morph, 'surface'));
				}) () === false)) {
					break;
				}
				var consumed_morph_count = __call__ (__iadd__, null, consumed_morph_count, 1);
				var matched_length = __call__ (__iadd__, null, matched_length, __call__ (len, null, __getitem__ (candidate_morph, 'surface')));
				if (__t__ (__eq__ (matched_length, __call__ (len, null, feature_surface)))) {
					break;
				}
			}
		}
		else if (__t__ (__call__ (any, null, (function () {
			var __accu0__ = [];
			var __iterable0__ = __getitem__ (morph, 'surface');
			__iterable0__ = __i__ (__iterable0__);
			for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
				var character = __getitem__ (__iterable0__, __index0__);
				(function () {
					var __accu1__ = __accu0__;
					return __call__ (__accu1__.append, __accu1__, __in__ (character, _ODORI_CHARS));
				}) ();
			}
			return __accu0__;
		}) ()))) {
			var consumed_morph_count = 1;
			var next_morph_index = __add__ (morph_index, 1);
			while (__t__ (__t__ (__lt__ (next_morph_index, __call__ (len, null, morphs))) && __getitem__ (__getitem__ (morphs, next_morph_index), 'is_ignored') === true)) {
				var next_morph_index = __call__ (__iadd__, null, next_morph_index, 1);
			}
			if (__t__ (__t__ (__lt__ (next_morph_index, __call__ (len, null, morphs))) && (function () {
				var __accu0__ = feature_surface;
				return __call__ (__accu0__.endswith, __accu0__, __getitem__ (__getitem__ (morphs, next_morph_index), 'surface'));
			}) () === true)) {
				var consumed_morph_count = __add__ (__sub__ (next_morph_index, morph_index), 1);
			}
		}
		else {
			var consumed_morph_count = 1;
		}
		var consumed_morphs = __getslice__ (morphs, morph_index, __add__ (morph_index, consumed_morph_count), 1);
		var span_start = __getitem__ (__getitem__ (morph, 'char_span'), 0);
		var span_end = __call__ (max, null, (function () {
			var __accu0__ = [];
			var __iterable0__ = consumed_morphs;
			__iterable0__ = __i__ (__iterable0__);
			for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
				var consumed_morph = __getitem__ (__iterable0__, __index0__);
				(function () {
					var __accu1__ = __accu0__;
					return __call__ (__accu1__.append, __accu1__, __getitem__ (__getitem__ (consumed_morph, 'char_span'), 1));
				}) ();
			}
			return __accu0__;
		}) (), __kwargtrans__ ({py_default: span_start}));
		__setitem__ (feature_char_spans, feature_index, tuple ([span_start, span_end]));
		var morph_index = __call__ (__iadd__, null, morph_index, consumed_morph_count);
		var feature_index = __call__ (__iadd__, null, feature_index, 1);
	}
	return feature_char_spans;
};
export var build_caller_text_spans_by_mecab_character = function (mecab_text, reference_text, normalize_mode) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'mecab_text': var mecab_text = __allkwargs0__ [__attrib0__]; break;
					case 'reference_text': var reference_text = __allkwargs0__ [__attrib0__]; break;
					case 'normalize_mode': var normalize_mode = __allkwargs0__ [__attrib0__]; break;
					case 'inference_jtalk': var inference_jtalk = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var source_spans = [];
	var mecab_text_by_source_chunk = dict ({});
	var source_start = 0;
	var mecab_start = 0;
	while (__t__ (__lt__ (source_start, __call__ (len, null, reference_text)))) {
		var matched_end = null;
		var matched_text = '';
		var maximum_source_end = __call__ (min, null, __add__ (source_start, _MAX_CALLER_TEXT_CHUNK_LENGTH), __call__ (len, null, reference_text));
		while (__t__ (__t__ (__lt__ (maximum_source_end, __call__ (len, null, reference_text))) && (__t__ ((__le__ ('︀', __getitem__ (reference_text, maximum_source_end)) && __le__ (__getitem__ (reference_text, maximum_source_end), '️'))) || (__le__ ('󠄀', __getitem__ (reference_text, maximum_source_end)) && __le__ (__getitem__ (reference_text, maximum_source_end), '󠇯'))))) {
			var maximum_source_end = __call__ (__iadd__, null, maximum_source_end, 1);
		}
		for (var source_end = __add__ (source_start, 1); source_end < __add__ (maximum_source_end, 1); source_end++) {
			var selector_start = source_end;
			while (__t__ (__t__ (__lt__ (selector_start, __call__ (len, null, reference_text))) && (__t__ (__lt__ (__call__ (ord, null, __getitem__ (reference_text, selector_start)), 32)) || __eq__ (__getitem__ (reference_text, selector_start), '\x7f')))) {
				var selector_start = __call__ (__iadd__, null, selector_start, 1);
			}
			if (__t__ (__t__ (__lt__ (selector_start, __call__ (len, null, reference_text))) && (__t__ ((__le__ ('︀', __getitem__ (reference_text, selector_start)) && __le__ (__getitem__ (reference_text, selector_start), '️'))) || (__le__ ('󠄀', __getitem__ (reference_text, selector_start)) && __le__ (__getitem__ (reference_text, selector_start), '󠇯'))))) {
				continue;
			}
			var source_chunk = __getslice__ (reference_text, source_start, source_end, 1);
			var candidate_text_pair = (function () {
				var __accu0__ = mecab_text_by_source_chunk;
				return __call__ (__accu0__.py_get, __accu0__, source_chunk);
			}) ();
			if (__t__ (candidate_text_pair === null)) {
				var normalized_chunk = __call__ (normalize_text, null, source_chunk, normalize_mode);
				var candidate_text_pair = tuple ([(function () {
					var __accu0__ = inference_jtalk;
					return __call__ (__accu0__.normalize_for_mecab, __accu0__, normalized_chunk);
				}) (), (function () {
					var __accu0__ = inference_jtalk;
					return __call__ (__accu0__.normalize_for_mecab, __accu0__, __call__ (normalize_roman_numerals, null, __call__ (normalize_itaiji, null, normalized_chunk)));
				}) ()]);
				__setitem__ (mecab_text_by_source_chunk, source_chunk, candidate_text_pair);
			}
			if (__t__ (__eq__ (__getitem__ (candidate_text_pair, 0), ''))) {
				var matched_end = source_end;
				break;
			}
			var __iterable0__ = (function () {
				var __accu0__ = dict;
				return __call__ (__accu0__.py_fromkeys, __accu0__, candidate_text_pair);
			}) ();
			__iterable0__ = __i__ (__iterable0__);
			for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
				var candidate_text = __getitem__ (__iterable0__, __index0__);
				if (__t__ ((function () {
					var __accu0__ = mecab_text;
					return __call__ (__accu0__.startswith, __accu0__, candidate_text, mecab_start);
				}) () === true)) {
					var matched_end = source_end;
					var matched_text = candidate_text;
					break;
				}
			}
			if (__t__ (matched_end !== null)) {
				break;
			}
		}
		if (__t__ (matched_end === null)) {
			var __except0__ = __call__ (ValueError, null, 'caller text normalization does not match MeCab text');
			__except0__.__cause__ = null;
			throw __except0__;
		}
		if (__t__ (__eq__ (__call__ (len, null, matched_text), __sub__ (matched_end, source_start)))) {
			(function () {
				var __accu0__ = source_spans;
				return __call__ (__accu0__.extend, __accu0__, (function () {
					var __accu1__ = [];
					for (var index = source_start; index < matched_end; index++) {
						(function () {
							var __accu2__ = __accu1__;
							return __call__ (__accu2__.append, __accu2__, tuple ([index, __add__ (index, 1)]));
						}) ();
					}
					return __accu1__;
				}) ());
			}) ();
		}
		else {
			(function () {
				var __accu0__ = source_spans;
				return __call__ (__accu0__.extend, __accu0__, __mul__ ([tuple ([source_start, matched_end])], __call__ (len, null, matched_text)));
			}) ();
		}
		var source_start = matched_end;
		var mecab_start = __call__ (__iadd__, null, mecab_start, __call__ (len, null, matched_text));
	}
	if (__t__ (__ne__ (mecab_start, __call__ (len, null, mecab_text)))) {
		var __except0__ = __call__ (ValueError, null, 'caller text normalization does not cover MeCab text');
		__except0__.__cause__ = null;
		throw __except0__;
	}
	return source_spans;
};
export var _is_njd_number_feature = function (feature) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'feature': var feature = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	return __t__ (__in__ (__getitem__ (feature, 'pos_group1'), tuple (['数', '副詞可能']))) && __call__ (_is_njd_number_surface, null, __getitem__ (feature, 'string')) === true;
};
export var _base_to_detail = function (base, phonemes) {
	var features = null;
	var is_unknown = false;
	var is_ignored = false;
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'base': var base = __allkwargs0__ [__attrib0__]; break;
					case 'phonemes': var phonemes = __allkwargs0__ [__attrib0__]; break;
					case 'char_span': var char_span = __allkwargs0__ [__attrib0__]; break;
					case 'features': var features = __allkwargs0__ [__attrib0__]; break;
					case 'is_unknown': var is_unknown = __allkwargs0__ [__attrib0__]; break;
					case 'is_ignored': var is_ignored = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	return __call__ (dict, null, __kwargtrans__ ({surface: __getitem__ (base, 'surface'), phonemes: phonemes, features: (__t__ (features !== null) ? features : []), char_span: char_span, pos: __getitem__ (base, 'pos'), pos_group1: __getitem__ (base, 'pos_group1'), pos_group2: __getitem__ (base, 'pos_group2'), pos_group3: __getitem__ (base, 'pos_group3'), ctype: __getitem__ (base, 'ctype'), cform: __getitem__ (base, 'cform'), orig: __getitem__ (base, 'orig'), read: __getitem__ (base, 'read'), pron: __getitem__ (base, 'pron'), accent_nucleus: __getitem__ (base, 'accent_nucleus'), mora_count: __getitem__ (base, 'mora_count'), chain_rule: __getitem__ (base, 'chain_rule'), chain_flag: __getitem__ (base, 'chain_flag'), is_unknown: is_unknown, is_ignored: is_ignored, reading_source: (__t__ (__getitem__ (base, 'is_reading_rewritten') === true) ? 'Rule' : 'Dictionary'), is_tsqyomi_target: false, user_dictionary_path: null}));
};
export var _sp_entry = function (surface) {
	var is_unknown = false;
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'surface': var surface = __allkwargs0__ [__attrib0__]; break;
					case 'char_span': var char_span = __allkwargs0__ [__attrib0__]; break;
					case 'is_unknown': var is_unknown = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	return __call__ (dict, null, __kwargtrans__ ({surface: surface, phonemes: ['sp'], features: [], char_span: char_span, pos: '記号', pos_group1: '空白', pos_group2: '*', pos_group3: '*', ctype: '*', cform: '*', orig: surface, read: surface, pron: surface, accent_nucleus: 0, mora_count: 0, chain_rule: '*', chain_flag: __neg__ (1), is_unknown: is_unknown, is_ignored: true, reading_source: 'Dictionary', is_tsqyomi_target: false, user_dictionary_path: null}));
};
export var _assign_reading_sources = function (entries, morph_ranges, morphs, userdic_paths) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'entries': var entries = __allkwargs0__ [__attrib0__]; break;
					case 'morph_ranges': var morph_ranges = __allkwargs0__ [__attrib0__]; break;
					case 'morphs': var morphs = __allkwargs0__ [__attrib0__]; break;
					case 'userdic_paths': var userdic_paths = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var __iterable0__ = __call__ (zip, null, entries, morph_ranges);
	__iterable0__ = __i__ (__iterable0__);
	for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
		var __left0__ = __getitem__ (__iterable0__, __index0__);
		var entry = __left0__ [0];
		var morph_start = __left0__ [1][0];
		var morph_end = __left0__ [1][1];
		var aligned_morphs = (function () {
			var __accu0__ = [];
			var __iterable1__ = __getslice__ (morphs, morph_start, morph_end, 1);
			__iterable1__ = __i__ (__iterable1__);
			for (var __index1__ = 0; __index1__ < len (__iterable1__); __index1__++) {
				var morph = __getitem__ (__iterable1__, __index1__);
				if (__t__ (__getitem__ (morph, 'is_ignored') === false)) {
					(function () {
						var __accu1__ = __accu0__;
						return __call__ (__accu1__.append, __accu1__, morph);
					}) ();
				}
			}
			return __accu0__;
		}) ();
		__setitem__ (entry, 'is_tsqyomi_target', __call__ (any, null, (function () {
			var __accu0__ = [];
			var __iterable1__ = aligned_morphs;
			__iterable1__ = __i__ (__iterable1__);
			for (var __index1__ = 0; __index1__ < len (__iterable1__); __index1__++) {
				var morph = __getitem__ (__iterable1__, __index1__);
				(function () {
					var __accu1__ = __accu0__;
					return __call__ (__accu1__.append, __accu1__, __getitem__ (morph, 'is_tsqyomi_target') === true);
				}) ();
			}
			return __accu0__;
		}) ()));
		var user_dictionary_indices = (function () {
			var __accu0__ = [];
			var __iterable1__ = aligned_morphs;
			__iterable1__ = __i__ (__iterable1__);
			for (var __index1__ = 0; __index1__ < len (__iterable1__); __index1__++) {
				var morph = __getitem__ (__iterable1__, __index1__);
				if (__t__ ((__le__ (1, __getitem__ (morph, 'dictionary_index')) && __le__ (__getitem__ (morph, 'dictionary_index'), __call__ (len, null, userdic_paths))))) {
					(function () {
						var __accu1__ = __accu0__;
						return __call__ (__accu1__.append, __accu1__, __getitem__ (morph, 'dictionary_index'));
					}) ();
				}
			}
			return __accu0__;
		}) ();
		if (__t__ (__gt__ (__call__ (len, null, user_dictionary_indices), 0))) {
			__setitem__ (entry, 'user_dictionary_path', __getitem__ (userdic_paths, __sub__ (__getitem__ (user_dictionary_indices, 0), 1)));
		}
		if (__t__ (__eq__ (__getitem__ (entry, 'reading_source'), 'Rule'))) {
			continue;
		}
		if (__t__ (__call__ (any, null, (function () {
			var __accu0__ = [];
			var __iterable1__ = aligned_morphs;
			__iterable1__ = __i__ (__iterable1__);
			for (var __index1__ = 0; __index1__ < len (__iterable1__); __index1__++) {
				var morph = __getitem__ (__iterable1__, __index1__);
				(function () {
					var __accu1__ = __accu0__;
					return __call__ (__accu1__.append, __accu1__, __getitem__ (morph, 'is_tsqyomi_selected') === true);
				}) ();
			}
			return __accu0__;
		}) ()))) {
			__setitem__ (entry, 'reading_source', 'Tsqyomi');
		}
		else if (__t__ (__gt__ (__call__ (len, null, user_dictionary_indices), 0))) {
			__setitem__ (entry, 'reading_source', 'UserDictionary');
		}
	}
};
export var _assign_char_spans_from_morph_ranges = function (entries, aligned_morph_ranges, morphs, caller_text_spans, mecab_char_spans) {
	if (typeof mecab_char_spans == 'undefined' || (mecab_char_spans != null && mecab_char_spans.hasOwnProperty ("__kwargtrans__"))) {;
		var mecab_char_spans = null;
	};
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'entries': var entries = __allkwargs0__ [__attrib0__]; break;
					case 'aligned_morph_ranges': var aligned_morph_ranges = __allkwargs0__ [__attrib0__]; break;
					case 'morphs': var morphs = __allkwargs0__ [__attrib0__]; break;
					case 'caller_text_spans': var caller_text_spans = __allkwargs0__ [__attrib0__]; break;
					case 'mecab_char_spans': var mecab_char_spans = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	if (__t__ (__ne__ (__call__ (len, null, entries), __call__ (len, null, aligned_morph_ranges)))) {
		var __except0__ = __call__ (ValueError, null, 'aligned entry count must match morph_range count');
		__except0__.__cause__ = null;
		throw __except0__;
	}
	if (__t__ (mecab_char_spans === null)) {
		var resolved_mecab_char_span_overrides = __mul__ ([null], __call__ (len, null, entries));
	}
	else {
		var resolved_mecab_char_span_overrides = mecab_char_spans;
	}
	if (__t__ (__ne__ (__call__ (len, null, entries), __call__ (len, null, resolved_mecab_char_span_overrides)))) {
		var __except0__ = __call__ (ValueError, null, 'aligned entry count must match MeCab char_span count');
		__except0__.__cause__ = null;
		throw __except0__;
	}
	var resolved_mecab_char_spans = (function () {
		var __accu0__ = [];
		var __iterable0__ = __call__ (py_enumerate, null, resolved_mecab_char_span_overrides);
		__iterable0__ = __i__ (__iterable0__);
		for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
			var __left0__ = __getitem__ (__iterable0__, __index0__);
			var index = __left0__ [0];
			var mecab_char_span = __left0__ [1];
			(function () {
				var __accu1__ = __accu0__;
				return __call__ (__accu1__.append, __accu1__, (__t__ (mecab_char_span !== null) ? mecab_char_span : __call__ (_char_span_from_morph_range, null, morphs, __getitem__ (aligned_morph_ranges, index))));
			}) ();
		}
		return __accu0__;
	}) ();
	var __left0__ = 0;
	var previous_mecab_end = __left0__;
	var previous_caller_end = __left0__;
	var __iterable0__ = __call__ (py_enumerate, null, entries);
	__iterable0__ = __i__ (__iterable0__);
	for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
		var __left0__ = __getitem__ (__iterable0__, __index0__);
		var index = __left0__ [0];
		var entry = __left0__ [1];
		var __left0__ = __getitem__ (resolved_mecab_char_spans, index);
		var mecab_start = __left0__ [0];
		var mecab_end = __left0__ [1];
		var __left0__ = __call__ (_project_char_span, null, caller_text_spans, __getitem__ (resolved_mecab_char_spans, index));
		var caller_start = __left0__ [0];
		var caller_end = __left0__ [1];
		if (__t__ (__t__ ((__ge__ (mecab_start, previous_mecab_end) && __gt__ (previous_mecab_end, 0))) && __t__ (__lt__ (mecab_start, mecab_end)) && __t__ (__lt__ (caller_start, previous_caller_end)) && __eq__ (__getitem__ (caller_text_spans, mecab_start), __getitem__ (caller_text_spans, __sub__ (previous_mecab_end, 1))))) {
			var caller_start = previous_caller_end;
			if (__t__ (__ge__ (caller_start, caller_end))) {
				var __left0__ = 0;
				var caller_start = __left0__;
				var caller_end = __left0__;
			}
		}
		__setitem__ (entry, 'char_span', tuple ([caller_start, caller_end]));
		if (__t__ (__lt__ (mecab_start, mecab_end))) {
			var previous_mecab_end = mecab_end;
			if (__t__ (__gt__ (caller_end, 0))) {
				var previous_caller_end = caller_end;
			}
		}
	}
	return entries;
};
export var _char_span_from_morph_range = function (morphs, morph_range) {
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
	var morph_start = __left0__ [0];
	var morph_end = __left0__ [1];
	if (__t__ (__ge__ (morph_start, morph_end))) {
		return tuple ([0, 0]);
	}
	return tuple ([__getitem__ (__getitem__ (__getitem__ (morphs, morph_start), 'char_span'), 0), __getitem__ (__getitem__ (__getitem__ (morphs, __sub__ (morph_end, 1)), 'char_span'), 1)]);
};
export var _project_char_span = function (source_spans, char_span) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'source_spans': var source_spans = __allkwargs0__ [__attrib0__]; break;
					case 'char_span': var char_span = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var __left0__ = char_span;
	var char_start = __left0__ [0];
	var char_end = __left0__ [1];
	if (__t__ (__ge__ (char_start, char_end))) {
		return tuple ([0, 0]);
	}
	return tuple ([__getitem__ (__getitem__ (source_spans, char_start), 0), __getitem__ (__getitem__ (source_spans, __sub__ (char_end, 1)), 1)]);
};
export var _restore_caller_itaiji_surfaces = function (entries, caller_text, normalize_mode) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'entries': var entries = __allkwargs0__ [__attrib0__]; break;
					case 'caller_text': var caller_text = __allkwargs0__ [__attrib0__]; break;
					case 'normalize_mode': var normalize_mode = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	if (__t__ (caller_text === null)) {
		return entries;
	}
	var __iterable0__ = entries;
	__iterable0__ = __i__ (__iterable0__);
	for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
		var entry = __getitem__ (__iterable0__, __index0__);
		var __left0__ = __getitem__ (entry, 'char_span');
		var char_start = __left0__ [0];
		var char_end = __left0__ [1];
		if (__t__ (__eq__ (tuple ([char_start, char_end]), tuple ([0, 0])))) {
			continue;
		}
		var source_surface = __getslice__ (caller_text, char_start, char_end, 1);
		var normalized_source_surface = __call__ (normalize_text, null, source_surface, normalize_mode);
		var itaiji_normalized_surface = __call__ (normalize_itaiji, null, normalized_source_surface);
		if (__t__ (__t__ (__ne__ (itaiji_normalized_surface, normalized_source_surface)) && __eq__ (itaiji_normalized_surface, __getitem__ (entry, 'surface')))) {
			__setitem__ (entry, 'surface', source_surface);
		}
	}
	return entries;
};
export var _is_njd_number_surface = function (surface) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'surface': var surface = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var number_surface = (function () {
		var __accu0__ = surface;
		return __call__ (__accu0__.rstrip, __accu0__, 'ー');
	}) ();
	return __t__ (__ne__ (number_surface, '')) && __call__ (all, null, (function () {
		var __accu0__ = [];
		var __iterable0__ = number_surface;
		__iterable0__ = __i__ (__iterable0__);
		for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
			var character = __getitem__ (__iterable0__, __index0__);
			(function () {
				var __accu1__ = __accu0__;
				return __call__ (__accu1__.append, __accu1__, __t__ (__in__ (character, _KANJI_NUMBER_SURFACES)) || __in__ (character, _DIGIT_MORPH_SURFACES));
			}) ();
		}
		return __accu0__;
	}) ());
};
export var _is_njd_number_morph = function (morph) {
	var is_group_separator_allowed = false;
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'morph': var morph = __allkwargs0__ [__attrib0__]; break;
					case 'is_group_separator_allowed': var is_group_separator_allowed = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	return __t__ (__gt__ (__call__ (len, null, __getitem__ (morph, 'features')), 2)) && __t__ ((__t__ (__eq__ (__getitem__ (__getitem__ (morph, 'features'), 2), '数')) || __t__ (__in__ (__getitem__ (morph, 'surface'), tuple (['〇', '○']))) && __eq__ (__getitem__ (__getitem__ (morph, 'features'), 1), '記号'))) && (__t__ (__in__ (__getitem__ (morph, 'surface'), _NJD_NUMBER_MORPH_SURFACE_KEYS)) || __t__ (__call__ (_is_njd_number_surface, null, __getitem__ (morph, 'surface')) === true) || __t__ (is_group_separator_allowed === true) && __in__ (__getitem__ (morph, 'surface'), tuple ([',', '，'])));
};
export var _njd_number_leading_length = function (surface) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'surface': var surface = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var leading_length = 0;
	var __iterable0__ = surface;
	__iterable0__ = __i__ (__iterable0__);
	for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
		var character = __getitem__ (__iterable0__, __index0__);
		if (__t__ (!__in__ (character, _KANJI_NUMBER_SURFACES))) {
			break;
		}
		var leading_length = __call__ (__iadd__, null, leading_length, 1);
	}
	return leading_length;
};
export var _njd_number_alignment_key = function (surface) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'surface': var surface = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	return (function () {
		var __accu0__ = _NJD_NUMBER_MORPH_SURFACE_KEYS;
		return __call__ (__accu0__.py_get, __accu0__, surface, __call__ (translate, null, surface, _NJD_NUMBER_ALIGNMENT_TRANSLATION));
	}) ();
};
export var _collect_njd_number_morphs = function (morphs, morph_start, feature_surfaces, next_surface) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'morphs': var morphs = __allkwargs0__ [__attrib0__]; break;
					case 'morph_start': var morph_start = __allkwargs0__ [__attrib0__]; break;
					case 'feature_surfaces': var feature_surfaces = __allkwargs0__ [__attrib0__]; break;
					case 'next_surface': var next_surface = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var number_morph_indices = [];
	var number_block_end_morph_idx = morph_start;
	var last_number_morph_end_idx = morph_start;
	var is_stopped_before_spaced_compound = false;
	var is_group_separator_allowed = !__in__ (next_surface, tuple ([',', '，']));
	while (__t__ (__lt__ (number_block_end_morph_idx, __call__ (len, null, morphs)))) {
		var number_morph = __getitem__ (morphs, number_block_end_morph_idx);
		if (__t__ (__getitem__ (number_morph, 'is_ignored') === true)) {
			if (__t__ (__ne__ (next_surface, ''))) {
				var following = __add__ (number_block_end_morph_idx, 1);
				while (__t__ (__t__ (__lt__ (following, __call__ (len, null, morphs))) && __getitem__ (__getitem__ (morphs, following), 'is_ignored') === true)) {
					var following = __call__ (__iadd__, null, following, 1);
				}
				var compound_surface = next_surface;
				var compound_range = __call__ (_njd_digit_compound_morph_range, null, morphs, following, compound_surface);
				if (__t__ (__gt__ (__getitem__ (compound_range, 1), __add__ (following, 1)))) {
					var leading_length = __call__ (_njd_number_leading_length, null, compound_surface);
					var leading_key = __call__ (_njd_number_alignment_key, null, __getslice__ (compound_surface, null, leading_length, 1));
					if (__t__ ((function () {
						var __accu0__ = __getslice__ (compound_surface, leading_length, null, 1);
						return __call__ (__accu0__.startswith, __accu0__, '日');
					}) () === true)) {
						var leading_key = (function () {
							var __accu0__ = dict ({'十': '一〇', '二十': '二〇'});
							return __call__ (__accu0__.py_get, __accu0__, leading_key, leading_key);
						}) ();
					}
					var number_key = '';
					var __iterable0__ = __getslice__ (morphs, following, __getitem__ (compound_range, 1), 1);
					__iterable0__ = __i__ (__iterable0__);
					for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
						var following_morph = __getitem__ (__iterable0__, __index0__);
						if (__t__ (__call__ (_is_njd_number_morph, null, following_morph) === false)) {
							break;
						}
						var number_key = __call__ (__iadd__, null, number_key, __call__ (_njd_number_alignment_key, null, __getitem__ (following_morph, 'surface')));
					}
					if (__t__ (__eq__ ((function () {
						var __accu0__ = number_key;
						return __call__ (__accu0__.lstrip, __accu0__, '〇');
					}) (), leading_key))) {
						var is_stopped_before_spaced_compound = true;
						break;
					}
				}
			}
			var number_block_end_morph_idx = __call__ (__iadd__, null, number_block_end_morph_idx, 1);
			continue;
		}
		if (__t__ (__call__ (_is_njd_number_morph, null, number_morph, __kwargtrans__ ({is_group_separator_allowed: is_group_separator_allowed})) === false)) {
			break;
		}
		(function () {
			var __accu0__ = number_morph_indices;
			return __call__ (__accu0__.append, __accu0__, number_block_end_morph_idx);
		}) ();
		var number_block_end_morph_idx = __call__ (__iadd__, null, number_block_end_morph_idx, 1);
		var last_number_morph_end_idx = number_block_end_morph_idx;
	}
	var reserved_number_morph_count = 0;
	if (__t__ (__t__ (__ne__ (next_surface, '')) && is_stopped_before_spaced_compound === false)) {
		var next_number_length = __call__ (_njd_number_leading_length, null, next_surface);
		var next_morph_surface = __call__ (py_next, null, __call__ (py_iter, null, (function () {
			var __accu0__ = [];
			for (var index = last_number_morph_end_idx; index < __call__ (len, null, morphs); index++) {
				if (__t__ (__getitem__ (__getitem__ (morphs, index), 'is_ignored') === false)) {
					(function () {
						var __accu1__ = __accu0__;
						return __call__ (__accu1__.append, __accu1__, __getitem__ (__getitem__ (morphs, index), 'surface'));
					}) ();
				}
			}
			return __accu0__;
		}) ()), '');
		if (__t__ (__t__ ((__lt__ (0, next_number_length) && __lt__ (next_number_length, __call__ (len, null, (function () {
			var __accu0__ = next_surface;
			return __call__ (__accu0__.rstrip, __accu0__, 'ー');
		}) ())))) && (function () {
			var __accu0__ = next_morph_surface;
			return __call__ (__accu0__.startswith, __accu0__, next_surface);
		}) () === false)) {
			var next_number_key = __call__ (_njd_number_alignment_key, null, __getslice__ (next_surface, null, next_number_length, 1));
			var trailing_number_key = '';
			var __iterable0__ = __call__ (py_reversed, null, number_morph_indices);
			__iterable0__ = __i__ (__iterable0__);
			for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
				var number_morph_index = __getitem__ (__iterable0__, __index0__);
				var trailing_number_key = __add__ (__call__ (_njd_number_alignment_key, null, __getitem__ (__getitem__ (morphs, number_morph_index), 'surface')), trailing_number_key);
				var reserved_number_morph_count = __call__ (__iadd__, null, reserved_number_morph_count, 1);
				if (__t__ (__eq__ (trailing_number_key, next_number_key))) {
					break;
				}
				if (__t__ ((function () {
					var __accu0__ = next_number_key;
					return __call__ (__accu0__.endswith, __accu0__, trailing_number_key);
				}) () === false)) {
					var reserved_number_morph_count = 0;
					break;
				}
			}
			if (__t__ (__ne__ (trailing_number_key, next_number_key))) {
				var reserved_number_morph_count = 0;
			}
		}
	}
	if (__t__ (__gt__ (reserved_number_morph_count, 0))) {
		var first_reserved_morph_idx = __getitem__ (number_morph_indices, __neg__ (reserved_number_morph_count));
		var number_morph_indices = __getslice__ (number_morph_indices, null, __neg__ (reserved_number_morph_count), 1);
		var number_block_end_morph_idx = first_reserved_morph_idx;
	}
	else {
		var number_block_end_morph_idx = last_number_morph_end_idx;
	}
	var long_vowel_suffix = __getitem__ (feature_surfaces, __neg__ (1));
	var long_vowel_suffix = __getslice__ (long_vowel_suffix, __call__ (len, null, (function () {
		var __accu0__ = long_vowel_suffix;
		return __call__ (__accu0__.rstrip, __accu0__, 'ー');
	}) ()), null, 1);
	if (__t__ (__ne__ (long_vowel_suffix, ''))) {
		var long_vowel_end = number_block_end_morph_idx;
		var remaining_long_vowels = long_vowel_suffix;
		while (__t__ (__t__ (__lt__ (long_vowel_end, __call__ (len, null, morphs))) && __ne__ (remaining_long_vowels, ''))) {
			var long_morph = __getitem__ (morphs, long_vowel_end);
			if (__t__ (__getitem__ (long_morph, 'is_ignored') === true)) {
				var long_vowel_end = __call__ (__iadd__, null, long_vowel_end, 1);
				continue;
			}
			if (__t__ ((function () {
				var __accu0__ = remaining_long_vowels;
				return __call__ (__accu0__.startswith, __accu0__, __getitem__ (long_morph, 'surface'));
			}) () === false)) {
				break;
			}
			var remaining_long_vowels = __getslice__ (remaining_long_vowels, __call__ (len, null, __getitem__ (long_morph, 'surface')), null, 1);
			var long_vowel_end = __call__ (__iadd__, null, long_vowel_end, 1);
		}
		if (__t__ (__eq__ (remaining_long_vowels, ''))) {
			(function () {
				var __accu0__ = number_morph_indices;
				return __call__ (__accu0__.extend, __accu0__, (function () {
					var __accu1__ = [];
					for (var index = number_block_end_morph_idx; index < long_vowel_end; index++) {
						if (__t__ (__getitem__ (__getitem__ (morphs, index), 'is_ignored') === false)) {
							(function () {
								var __accu2__ = __accu1__;
								return __call__ (__accu2__.append, __accu2__, index);
							}) ();
						}
					}
					return __accu1__;
				}) ());
			}) ();
			var number_block_end_morph_idx = long_vowel_end;
		}
	}
	return tuple ([number_morph_indices, number_block_end_morph_idx]);
};
export var _align_njd_number_block = function (feature_surfaces, morphs, morph_indices) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'feature_surfaces': var feature_surfaces = __allkwargs0__ [__attrib0__]; break;
					case 'morphs': var morphs = __allkwargs0__ [__attrib0__]; break;
					case 'morph_indices': var morph_indices = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var source_keys = (function () {
		var __accu0__ = [];
		var __iterable0__ = morph_indices;
		__iterable0__ = __i__ (__iterable0__);
		for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
			var morph_index = __getitem__ (__iterable0__, __index0__);
			(function () {
				var __accu1__ = __accu0__;
				return __call__ (__accu1__.append, __accu1__, __call__ (_njd_number_alignment_key, null, __getitem__ (__getitem__ (morphs, morph_index), 'surface')));
			}) ();
		}
		return __accu0__;
	}) ();
	var target_keys = (function () {
		var __accu0__ = [];
		var __iterable0__ = feature_surfaces;
		__iterable0__ = __i__ (__iterable0__);
		for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
			var surface = __getitem__ (__iterable0__, __index0__);
			(function () {
				var __accu1__ = __accu0__;
				return __call__ (__accu1__.append, __accu1__, __call__ (_njd_number_alignment_key, null, surface));
			}) ();
		}
		return __accu0__;
	}) ();
	var source_count = __call__ (len, null, source_keys);
	var target_count = __call__ (len, null, target_keys);
	var assignments = (function () {
		var __accu0__ = [];
		var __iterable0__ = feature_surfaces;
		__iterable0__ = __i__ (__iterable0__);
		for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
			var _ = __getitem__ (__iterable0__, __index0__);
			(function () {
				var __accu1__ = __accu0__;
				return __call__ (__accu1__.append, __accu1__, []);
			}) ();
		}
		return __accu0__;
	}) ();
	if (__t__ (__t__ (__gt__ (source_count, _MAX_NUMBER_ALIGNMENT_BLOCK_LENGTH)) || __gt__ (target_count, _MAX_NUMBER_ALIGNMENT_BLOCK_LENGTH))) {
		var __iterable0__ = __call__ (py_enumerate, null, morph_indices);
		__iterable0__ = __i__ (__iterable0__);
		for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
			var __left0__ = __getitem__ (__iterable0__, __index0__);
			var source_index = __left0__ [0];
			var morph_index = __left0__ [1];
			(function () {
				var __accu0__ = __getitem__ (assignments, __call__ (min, null, source_index, __sub__ (target_count, 1)));
				return __call__ (__accu0__.append, __accu0__, morph_index);
			}) ();
		}
		return assignments;
	}
	var edit_costs = (function () {
		var __accu0__ = [];
		for (var _ = 0; _ < __add__ (source_count, 1); _++) {
			(function () {
				var __accu1__ = __accu0__;
				return __call__ (__accu1__.append, __accu1__, __mul__ ([0], __add__ (target_count, 1)));
			}) ();
		}
		return __accu0__;
	}) ();
	var edit_actions = (function () {
		var __accu0__ = [];
		for (var _ = 0; _ < __add__ (source_count, 1); _++) {
			(function () {
				var __accu1__ = __accu0__;
				return __call__ (__accu1__.append, __accu1__, __mul__ ([''], __add__ (target_count, 1)));
			}) ();
		}
		return __accu0__;
	}) ();
	for (var source_index = 1; source_index < __add__ (source_count, 1); source_index++) {
		__setitem__ (__getitem__ (edit_costs, source_index), 0, source_index);
		__setitem__ (__getitem__ (edit_actions, source_index), 0, 'delete');
	}
	for (var target_index = 1; target_index < __add__ (target_count, 1); target_index++) {
		__setitem__ (__getitem__ (edit_costs, 0), target_index, target_index);
		__setitem__ (__getitem__ (edit_actions, 0), target_index, 'insert');
	}
	for (var source_index = 1; source_index < __add__ (source_count, 1); source_index++) {
		for (var target_index = 1; target_index < __add__ (target_count, 1); target_index++) {
			var substitution_cost = __call__ (int, null, __ne__ (__getitem__ (source_keys, __sub__ (source_index, 1)), __getitem__ (target_keys, __sub__ (target_index, 1))));
			var candidates = [tuple ([__add__ (__getitem__ (__getitem__ (edit_costs, __sub__ (source_index, 1)), __sub__ (target_index, 1)), substitution_cost), 0, 'align']), tuple ([__add__ (__getitem__ (__getitem__ (edit_costs, __sub__ (source_index, 1)), target_index), 1), 1, 'delete']), tuple ([__add__ (__getitem__ (__getitem__ (edit_costs, source_index), __sub__ (target_index, 1)), 1), 2, 'insert'])];
			var __left0__ = __call__ (min, null, candidates);
			var best_cost = __left0__ [0];
			var _priority = __left0__ [1];
			var best_action = __left0__ [2];
			__setitem__ (__getitem__ (edit_costs, source_index), target_index, best_cost);
			__setitem__ (__getitem__ (edit_actions, source_index), target_index, best_action);
		}
	}
	var reversed_actions = [];
	var source_index = source_count;
	var target_index = target_count;
	while (__t__ (__t__ (__gt__ (source_index, 0)) || __gt__ (target_index, 0))) {
		var action = __getitem__ (__getitem__ (edit_actions, source_index), target_index);
		if (__t__ (__eq__ (action, 'align'))) {
			(function () {
				var __accu0__ = reversed_actions;
				return __call__ (__accu0__.append, __accu0__, tuple ([action, __sub__ (source_index, 1), __sub__ (target_index, 1)]));
			}) ();
			var source_index = __call__ (__isub__, null, source_index, 1);
			var target_index = __call__ (__isub__, null, target_index, 1);
		}
		else if (__t__ (__eq__ (action, 'delete'))) {
			(function () {
				var __accu0__ = reversed_actions;
				return __call__ (__accu0__.append, __accu0__, tuple ([action, __sub__ (source_index, 1), null]));
			}) ();
			var source_index = __call__ (__isub__, null, source_index, 1);
		}
		else {
			(function () {
				var __accu0__ = reversed_actions;
				return __call__ (__accu0__.append, __accu0__, tuple (['insert', null, __sub__ (target_index, 1)]));
			}) ();
			var target_index = __call__ (__isub__, null, target_index, 1);
		}
	}
	var pending_morph_indices = [];
	var previous_target_index = null;
	var __iterable0__ = __call__ (py_reversed, null, reversed_actions);
	__iterable0__ = __i__ (__iterable0__);
	for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
		var __left0__ = __getitem__ (__iterable0__, __index0__);
		var action = __left0__ [0];
		var aligned_source_index = __left0__ [1];
		var aligned_target_index = __left0__ [2];
		if (__t__ (__eq__ (action, 'delete'))) {
			if (__t__ (previous_target_index === null)) {
				(function () {
					var __accu0__ = pending_morph_indices;
					return __call__ (__accu0__.append, __accu0__, __getitem__ (morph_indices, aligned_source_index));
				}) ();
			}
			else {
				(function () {
					var __accu0__ = __getitem__ (assignments, previous_target_index);
					return __call__ (__accu0__.append, __accu0__, __getitem__ (morph_indices, aligned_source_index));
				}) ();
			}
			continue;
		}
		if (__t__ (__eq__ (action, 'insert'))) {
			continue;
		}
		(function () {
			var __accu0__ = __getitem__ (assignments, aligned_target_index);
			return __call__ (__accu0__.extend, __accu0__, pending_morph_indices);
		}) ();
		var pending_morph_indices = [];
		(function () {
			var __accu0__ = __getitem__ (assignments, aligned_target_index);
			return __call__ (__accu0__.append, __accu0__, __getitem__ (morph_indices, aligned_source_index));
		}) ();
		var previous_target_index = aligned_target_index;
	}
	if (__t__ (__gt__ (__call__ (len, null, pending_morph_indices), 0))) {
		var fallback_target_index = (__t__ (previous_target_index !== null) ? previous_target_index : 0);
		(function () {
			var __accu0__ = __getitem__ (assignments, fallback_target_index);
			return __call__ (__accu0__.extend, __accu0__, pending_morph_indices);
		}) ();
	}
	var __iterable0__ = assignments;
	__iterable0__ = __i__ (__iterable0__);
	for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
		var assignment = __getitem__ (__iterable0__, __index0__);
		(function () {
			var __accu0__ = assignment;
			return __call__ (__accu0__.py_sort, __accu0__);
		}) ();
	}
	return assignments;
};
export var _is_split_morph = function (entries, start_idx, morph_surface) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'entries': var entries = __allkwargs0__ [__attrib0__]; break;
					case 'start_idx': var start_idx = __allkwargs0__ [__attrib0__]; break;
					case 'morph_surface': var morph_surface = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var concatenated = '';
	var __iterable0__ = __getslice__ (entries, start_idx, null, 1);
	__iterable0__ = __i__ (__iterable0__);
	for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
		var entry = __getitem__ (__iterable0__, __index0__);
		var concatenated = __call__ (__iadd__, null, concatenated, __getitem__ (entry, 'surface'));
		if (__t__ (__ge__ (__call__ (len, null, concatenated), __call__ (len, null, morph_surface)))) {
			break;
		}
	}
	return __t__ (__eq__ (concatenated, morph_surface)) && __lt__ (__call__ (len, null, __getitem__ (__getitem__ (entries, start_idx), 'surface')), __call__ (len, null, morph_surface));
};
export var _njd_digit_compound_morph_range = function (morphs, morph_index, feature_surface) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'morphs': var morphs = __allkwargs0__ [__attrib0__]; break;
					case 'morph_index': var morph_index = __allkwargs0__ [__attrib0__]; break;
					case 'feature_surface': var feature_surface = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	if (__t__ (__t__ (__lt__ (morph_index, __call__ (len, null, morphs))) && __t__ (__eq__ (__getitem__ (__getitem__ (morphs, morph_index), 'surface'), '０')) && (function () {
		var __accu0__ = feature_surface;
		return __call__ (__accu0__.endswith, __accu0__, '月');
	}) ())) {
		var following = __add__ (morph_index, 1);
		while (__t__ (__t__ (__lt__ (following, __call__ (len, null, morphs))) && __getitem__ (__getitem__ (morphs, following), 'is_ignored'))) {
			var following = __call__ (__iadd__, null, following, 1);
		}
		if (__t__ (__t__ (__lt__ (following, __call__ (len, null, morphs))) && __eq__ (__getitem__ (__getitem__ (morphs, following), 'surface'), feature_surface))) {
			return tuple ([morph_index, __add__ (following, 1)]);
		}
	}
	var leading_number_length = __call__ (_njd_number_leading_length, null, feature_surface);
	var suffix = __getslice__ (feature_surface, leading_number_length, null, 1);
	if (__t__ (__t__ (__eq__ (leading_number_length, 0)) || __t__ (__eq__ (suffix, '')) || __ge__ (morph_index, __call__ (len, null, morphs)))) {
		return tuple ([morph_index, __add__ (morph_index, 1)]);
	}
	if (__t__ (__t__ (__eq__ (__getitem__ (__getitem__ (morphs, morph_index), 'surface'), suffix)) && __t__ (__gt__ (morph_index, 0)) && __call__ (_is_njd_number_morph, null, __getitem__ (morphs, __sub__ (morph_index, 1))) === true)) {
		return tuple ([__sub__ (morph_index, 1), __add__ (morph_index, 1)]);
	}
	if (__t__ (__call__ (_is_njd_number_morph, null, __getitem__ (morphs, morph_index)) === false)) {
		return tuple ([morph_index, __add__ (morph_index, 1)]);
	}
	var morph_end = __add__ (morph_index, 1);
	while (__t__ (__t__ (__lt__ (morph_end, __call__ (len, null, morphs))) && __call__ (_is_njd_number_morph, null, __getitem__ (morphs, morph_end)) === true)) {
		var morph_end = __call__ (__iadd__, null, morph_end, 1);
	}
	var consumed_suffix = '';
	while (__t__ (__t__ (__lt__ (morph_end, __call__ (len, null, morphs))) && __lt__ (__call__ (len, null, consumed_suffix), __call__ (len, null, suffix)))) {
		var candidate_morph = __getitem__ (morphs, morph_end);
		if (__t__ (__getitem__ (candidate_morph, 'is_ignored') === true)) {
			var morph_end = __call__ (__iadd__, null, morph_end, 1);
			continue;
		}
		var remaining_suffix = __getslice__ (suffix, __call__ (len, null, consumed_suffix), null, 1);
		if (__t__ ((function () {
			var __accu0__ = remaining_suffix;
			return __call__ (__accu0__.startswith, __accu0__, __getitem__ (candidate_morph, 'surface'));
		}) () === false)) {
			break;
		}
		var consumed_suffix = __call__ (__iadd__, null, consumed_suffix, __getitem__ (candidate_morph, 'surface'));
		var morph_end = __call__ (__iadd__, null, morph_end, 1);
	}
	if (__t__ (__eq__ (consumed_suffix, suffix))) {
		return tuple ([morph_index, morph_end]);
	}
	return tuple ([morph_index, __add__ (morph_index, 1)]);
};

