// Generated from pyopenjtalk-plus e7713f2d6d91f392f595df5e8998ff2b62c3b6f5; see tools/build_rules.py.
var unicodedata = {};
import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __mergefields__, __mergekwargtrans__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __pyUseJsNext__, __rshift__, __setitem__, __setproperty__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __withblock__, __xor__, _sort, abs, all, any, assert, bin, bool, bytearray, bytes, callable, chr, delattr, dict, dir, divmod, filter, float, getattr, hasattr, hex, input, int, isinstance, issubclass, len, list, map, max, min, object, oct, ord, pow, print, property, py_TypeError, py_enumerate, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
import {build_caller_text_spans_by_mecab_character, njd_feature_char_spans} from './_mapping.js';
import * as __module_unicodedata__ from './unicodedata.js';
__nest__ (unicodedata, '', __module_unicodedata__);
import {join_strings, maketrans, merge_dict, translate} from './compatibility.js';
var __name__ = '_kaomoji';
export var _EYES = "・･ﾟ゜°•●○◕╹>＞<＜≧≦∩＾^;；'＇‘’｀´`￣-˘ಠ◉б≖⌒ゝゞ〃ﾉノ/／＼\\˙◔◠◡☉⊙꒪ↀ⩌òóŏÒÓìíˊˋ˃˂❛◍º＝=╯╰◞◟☋☌☍✹☆★へつ↑↓◜◝՞Φ¯‾ᴖ⁰Ծ✖✘l*+ーಥ눈╮╭ಲ൭ˇᵕᴗ";
export var _MOUTHS = 'ω∀▽∇Ддεз﹏ヮ◡ㅅ益皿_＿‿ーｰ-～〜~︿ᵕᴗᗜ⊖△◇○〇口ρڡڼਊة㉦⌓³₃⊱ᯅ⤚。oｏOＯㅂ‸︶⌣⁀Δ∧ᆺ▿﹃꒳Θワx0.ȏᗨへエළ╯ᴥｪェꞈˬ';
export var _ARMS = 'ヾヽゞゝﾉノつっ⊂⊃∩╰╯╭╮┌┐└┘┗┛┏┓」｢｣⌒✌☝☛☚٩۶งว੭ʅʃᕦᕤ＼／ιυщوΣ∑mopqdbcvεσρぅ彡卍ฅ∪լ∠_「ｼﾞ';
export var _ORNAMENTS = ' \u3000*＊｡。.,，､、:：♡♥❤✧✿❀๑〃＠@ｰー̀́͜ิﾞ゛゙ˇ▔▰灬˶⸝︶⌣|＃#∗❁〄☞☜̵ุ̣̥̑⁾ั∞⋈✗ㆀ†ूु∽͟͞~';
export var _PAIRS = dict ({'(': ')', '（': '）', '⎛': '⎞', '꒰': '꒱', '₍': '₎', 'ʕ': 'ʔ', '∪': '∪', '⎝': '⎠', '|': ')', '｜': '）'});
export var _STRONG_MOUTHS = 'ω∀▽∇Ддεз﹏ヮᴥｪェᵕ꒳';
export var _BARS = '-－−ーｰ―─━═╌┄';
export var exclude_kaomoji_from_numeral_processing = function (raw_text, text, mecab_features, morphs, normalize_mode) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'raw_text': var raw_text = __allkwargs0__ [__attrib0__]; break;
					case 'text': var text = __allkwargs0__ [__attrib0__]; break;
					case 'mecab_features': var mecab_features = __allkwargs0__ [__attrib0__]; break;
					case 'morphs': var morphs = __allkwargs0__ [__attrib0__]; break;
					case 'normalize_mode': var normalize_mode = __allkwargs0__ [__attrib0__]; break;
					case 'jtalk': var jtalk = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var __left0__ = __call__ (silence_kaomoji, null, raw_text, text, [], morphs, normalize_mode, __kwargtrans__ ({jtalk: jtalk}));
	var _ = __left0__ [0];
	var accepted_morphs = __left0__ [1];
	var face_spans = (function () {
		var __accu0__ = [];
		var __iterable0__ = accepted_morphs;
		__iterable0__ = __i__ (__iterable0__);
		for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
			var morph = __getitem__ (__iterable0__, __index0__);
			if (__t__ (__eq__ (__getitem__ (__getitem__ (morph, 'features'), 1), '顔文字'))) {
				(function () {
					var __accu1__ = __accu0__;
					return __call__ (__accu1__.append, __accu1__, __getitem__ (morph, 'char_span'));
				}) ();
			}
		}
		return __accu0__;
	}) ();
	var result = [];
	var normalized = (function () {
		var __accu0__ = jtalk;
		return __call__ (__accu0__.normalize_for_mecab, __accu0__, text);
	}) ();
	var character_positions = (function () {
		var __accu0__ = [];
		var __iterable0__ = __call__ (py_enumerate, null, normalized);
		__iterable0__ = __i__ (__iterable0__);
		for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
			var __left0__ = __getitem__ (__iterable0__, __index0__);
			var i = __left0__ [0];
			var character = __left0__ [1];
			if (__t__ (__ne__ (character, '\u3000'))) {
				(function () {
					var __accu1__ = __accu0__;
					return __call__ (__accu1__.append, __accu1__, i);
				}) ();
			}
		}
		return __accu0__;
	}) ();
	var matching_text = __call__ (join_strings, null, '', (function () {
		var __accu0__ = [];
		var __iterable0__ = character_positions;
		__iterable0__ = __i__ (__iterable0__);
		for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
			var i = __getitem__ (__iterable0__, __index0__);
			(function () {
				var __accu1__ = __accu0__;
				return __call__ (__accu1__.append, __accu1__, __getitem__ (normalized, i));
			}) ();
		}
		return __accu0__;
	}) ());
	var position = 0;
	var __iterable0__ = mecab_features;
	__iterable0__ = __i__ (__iterable0__);
	for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
		var feature = __getitem__ (__iterable0__, __index0__);
		var fields = (function () {
			var __accu0__ = feature;
			return __call__ (__accu0__.py_split, __accu0__, ',');
		}) ();
		var surface = __getitem__ (fields, 0);
		var matching_surface = (function () {
			var __accu0__ = surface;
			return __call__ (__accu0__.py_replace, __accu0__, '\u3000', '');
		}) ();
		var matching_start = (function () {
			var __accu0__ = matching_text;
			return __call__ (__accu0__.index, __accu0__, matching_surface, position);
		}) ();
		var matching_end = __add__ (matching_start, __call__ (len, null, matching_surface));
		var position = matching_end;
		var start = __getitem__ (character_positions, matching_start);
		var end = __add__ (__getitem__ (character_positions, __sub__ (matching_end, 1)), 1);
		if (__t__ (__t__ (__call__ (any, null, (function () {
			var __accu0__ = [];
			var __iterable1__ = face_spans;
			__iterable1__ = __i__ (__iterable1__);
			for (var __index1__ = 0; __index1__ < len (__iterable1__); __index1__++) {
				var __left0__ = __getitem__ (__iterable1__, __index1__);
				var a = __left0__ [0];
				var b = __left0__ [1];
				(function () {
					var __accu1__ = __accu0__;
					return __call__ (__accu1__.append, __accu1__, __t__ (__le__ (a, start)) && __le__ (end, b));
				}) ();
			}
			return __accu0__;
		}) ())) && (__t__ (__in__ (__getitem__ (fields, 2), tuple (['数', 'アルファベット']))) || __eq__ (__getitem__ (fields, 3), '助数詞')))) {
			var feature = '{},記号,読点,顔文字,*,*,*,{},、,、,0/0,*'.format (surface, surface);
		}
		(function () {
			var __accu0__ = result;
			return __call__ (__accu0__.append, __accu0__, feature);
		}) ();
	}
	return result;
};
export var silence_kaomoji = function (raw_text, text, features, morphs, normalize_mode) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'raw_text': var raw_text = __allkwargs0__ [__attrib0__]; break;
					case 'text': var text = __allkwargs0__ [__attrib0__]; break;
					case 'features': var features = __allkwargs0__ [__attrib0__]; break;
					case 'morphs': var morphs = __allkwargs0__ [__attrib0__]; break;
					case 'normalize_mode': var normalize_mode = __allkwargs0__ [__attrib0__]; break;
					case 'jtalk': var jtalk = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var parts = __call__ (find_kaomoji_parts, null, raw_text);
	if (__t__ (__eq__ (__call__ (len, null, parts), 0))) {
		return tuple ([features, morphs]);
	}
	var normalized = (function () {
		var __accu0__ = jtalk;
		return __call__ (__accu0__.normalize_for_mecab, __accu0__, text);
	}) ();
	var source_spans = __call__ (build_caller_text_spans_by_mecab_character, null, normalized, raw_text, normalize_mode, __kwargtrans__ ({inference_jtalk: jtalk}));
	var features = __call__ (_split_symbol_features, null, features, morphs);
	var feature_spans = __call__ (njd_feature_char_spans, null, features, morphs);
	var accepted = [];
	var __iterable0__ = parts;
	__iterable0__ = __i__ (__iterable0__);
	for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
		var __left0__ = __getitem__ (__iterable0__, __index0__);
		var core_start = __left0__ [0];
		var core_end = __left0__ [1];
		var start = __left0__ [2];
		var end = __left0__ [3];
		var core_indices = (function () {
			var __accu0__ = [];
			var __iterable1__ = __call__ (py_enumerate, null, source_spans);
			__iterable1__ = __i__ (__iterable1__);
			for (var __index1__ = 0; __index1__ < len (__iterable1__); __index1__++) {
				var __left0__ = __getitem__ (__iterable1__, __index1__);
				var i = __left0__ [0];
				var a = __left0__ [1][0];
				var b = __left0__ [1][1];
				if (__t__ (__t__ (__lt__ (a, core_end)) && __lt__ (core_start, b))) {
					(function () {
						var __accu1__ = __accu0__;
						return __call__ (__accu1__.append, __accu1__, i);
					}) ();
				}
			}
			return __accu0__;
		}) ();
		var extent_indices = (function () {
			var __accu0__ = [];
			var __iterable1__ = __call__ (py_enumerate, null, source_spans);
			__iterable1__ = __i__ (__iterable1__);
			for (var __index1__ = 0; __index1__ < len (__iterable1__); __index1__++) {
				var __left0__ = __getitem__ (__iterable1__, __index1__);
				var i = __left0__ [0];
				var a = __left0__ [1][0];
				var b = __left0__ [1][1];
				if (__t__ (__t__ (__lt__ (a, end)) && __lt__ (start, b))) {
					(function () {
						var __accu1__ = __accu0__;
						return __call__ (__accu1__.append, __accu1__, i);
					}) ();
				}
			}
			return __accu0__;
		}) ();
		if (__t__ (__t__ (!__t__ ((core_indices))) || !__t__ ((extent_indices)))) {
			continue;
		}
		var __left0__ = tuple ([__getitem__ (core_indices, 0), __add__ (__getitem__ (core_indices, __neg__ (1)), 1)]);
		var core_start = __left0__ [0];
		var core_end = __left0__ [1];
		var __left0__ = tuple ([__getitem__ (extent_indices, 0), __add__ (__getitem__ (extent_indices, __neg__ (1)), 1)]);
		var start = __left0__ [0];
		var end = __left0__ [1];
		var is_rejected = false;
		var __iterable1__ = morphs;
		__iterable1__ = __i__ (__iterable1__);
		for (var __index1__ = 0; __index1__ < len (__iterable1__); __index1__++) {
			var morph = __getitem__ (__iterable1__, __index1__);
			var __left0__ = __getitem__ (morph, 'char_span');
			var a = __left0__ [0];
			var b = __left0__ [1];
			if (__t__ (__t__ (__le__ (b, start)) || __ge__ (a, end))) {
				continue;
			}
			var is_registered = (__lt__ (0, __getitem__ (morph, 'dictionary_index')) && __lt__ (__getitem__ (morph, 'dictionary_index'), 255));
			var intersects_core = __t__ (__lt__ (a, core_end)) && __lt__ (core_start, b);
			if (__t__ (__t__ (intersects_core) && (__t__ (is_registered) || __t__ (__lt__ (a, start)) || __gt__ (b, end)))) {
				var is_rejected = true;
				break;
			}
			var is_lexical = __t__ (__getitem__ (morph, 'is_unknown') === false) && __t__ (__ne__ (__getitem__ (__getitem__ (morph, 'features'), 0), '記号')) && __t__ (__gt__ (__call__ (len, null, __getitem__ (morph, 'surface')), 1)) && !__t__ ((__t__ (__in__ (__getitem__ (__getitem__ (morph, 'surface'), 0), _ARMS)) && __call__ (all, null, (function () {
				var __accu0__ = [];
				var __iterable2__ = __getslice__ (__getitem__ (morph, 'surface'), 1, null, 1);
				__iterable2__ = __i__ (__iterable2__);
				for (var __index2__ = 0; __index2__ < len (__iterable2__); __index2__++) {
					var c = __getitem__ (__iterable2__, __index2__);
					(function () {
						var __accu1__ = __accu0__;
						return __call__ (__accu1__.append, __accu1__, __in__ (c, _BARS));
					}) ();
				}
				return __accu0__;
			}) ())));
			if (__t__ (__t__ (intersects_core === false) && (__t__ (is_registered) || __t__ (is_lexical) || __t__ (__lt__ (a, start)) || __gt__ (b, end)))) {
				if (__t__ (__le__ (b, core_start))) {
					var start = __call__ (max, null, start, b);
				}
				else if (__t__ (__ge__ (a, core_end))) {
					var end = __call__ (min, null, end, a);
				}
			}
		}
		if (__t__ (__t__ (is_rejected) || __call__ (any, null, (function () {
			var __accu0__ = [];
			var __iterable1__ = feature_spans;
			__iterable1__ = __i__ (__iterable1__);
			for (var __index1__ = 0; __index1__ < len (__iterable1__); __index1__++) {
				var __left0__ = __getitem__ (__iterable1__, __index1__);
				var a = __left0__ [0];
				var b = __left0__ [1];
				(function () {
					var __accu1__ = __accu0__;
					return __call__ (__accu1__.append, __accu1__, __t__ (__lt__ (a, end)) && __t__ (__lt__ (start, b)) && (__t__ (__lt__ (a, start)) || __gt__ (b, end)));
				}) ();
			}
			return __accu0__;
		}) ()))) {
			continue;
		}
		if (__t__ (__t__ (accepted) && __lt__ (start, __getitem__ (__getitem__ (accepted, __neg__ (1)), 1)))) {
			__setitem__ (accepted, __neg__ (1), tuple ([__getitem__ (__getitem__ (accepted, __neg__ (1)), 0), __call__ (max, null, end, __getitem__ (__getitem__ (accepted, __neg__ (1)), 1))]));
		}
		else {
			(function () {
				var __accu0__ = accepted;
				return __call__ (__accu0__.append, __accu0__, tuple ([start, end]));
			}) ();
		}
	}
	var result_features = [];
	var result_morphs = [];
	var __left0__ = 0;
	var feature_index = __left0__;
	var morph_index = __left0__;
	var __iterable0__ = accepted;
	__iterable0__ = __i__ (__iterable0__);
	for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
		var __left0__ = __getitem__ (__iterable0__, __index0__);
		var start = __left0__ [0];
		var end = __left0__ [1];
		while (__t__ (__t__ (__lt__ (feature_index, __call__ (len, null, features))) && __le__ (__getitem__ (__getitem__ (feature_spans, feature_index), 1), start))) {
			(function () {
				var __accu0__ = result_features;
				return __call__ (__accu0__.append, __accu0__, __getitem__ (features, feature_index));
			}) ();
			var feature_index = __call__ (__iadd__, null, feature_index, 1);
		}
		while (__t__ (__t__ (__lt__ (feature_index, __call__ (len, null, features))) && __lt__ (__getitem__ (__getitem__ (feature_spans, feature_index), 0), end))) {
			var feature_index = __call__ (__iadd__, null, feature_index, 1);
		}
		while (__t__ (__t__ (__lt__ (morph_index, __call__ (len, null, morphs))) && __le__ (__getitem__ (__getitem__ (__getitem__ (morphs, morph_index), 'char_span'), 1), start))) {
			(function () {
				var __accu0__ = result_morphs;
				return __call__ (__accu0__.append, __accu0__, __getitem__ (morphs, morph_index));
			}) ();
			var morph_index = __call__ (__iadd__, null, morph_index, 1);
		}
		var template = (function () {
			var __accu0__ = __getitem__ (morphs, morph_index);
			return __call__ (__accu0__.py_copy, __accu0__);
		}) ();
		while (__t__ (__t__ (__lt__ (morph_index, __call__ (len, null, morphs))) && __lt__ (__getitem__ (__getitem__ (__getitem__ (morphs, morph_index), 'char_span'), 0), end))) {
			var morph_index = __call__ (__iadd__, null, morph_index, 1);
		}
		var surface = __getslice__ (normalized, start, end, 1);
		(function () {
			var __accu0__ = result_features;
			return __call__ (__accu0__.append, __accu0__, __call__ (dict, null, __kwargtrans__ ({string: surface, orig: surface, pos: 'その他', pos_group1: '顔文字', pos_group2: '*', pos_group3: '*', ctype: '*', cform: '*', read: '', pron: '', acc: 0, mora_size: 0, chain_rule: '*', chain_flag: 1, is_reading_protected: false, is_reading_rewritten: true})));
		}) ();
		(function () {
			var __accu0__ = template;
			return __call__ (__accu0__.py_update, __accu0__, __kwargtrans__ ({surface: surface, char_span: tuple ([start, end]), is_unknown: false, is_ignored: false, dictionary_index: 255, is_tsqyomi_selected: false, is_tsqyomi_target: false, features: ['その他', '顔文字', '*', '*', '*', '*', surface, '', '', '0/0', '*', '1']}));
		}) ();
		(function () {
			var __accu0__ = result_morphs;
			return __call__ (__accu0__.append, __accu0__, template);
		}) ();
	}
	(function () {
		var __accu0__ = result_features;
		return __call__ (__accu0__.extend, __accu0__, __getslice__ (features, feature_index, null, 1));
	}) ();
	(function () {
		var __accu0__ = result_morphs;
		return __call__ (__accu0__.extend, __accu0__, __getslice__ (morphs, morph_index, null, 1));
	}) ();
	return tuple ([result_features, result_morphs]);
};
export var _split_symbol_features = function (features, morphs) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'features': var features = __allkwargs0__ [__attrib0__]; break;
					case 'morphs': var morphs = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var spans = __call__ (njd_feature_char_spans, null, features, morphs);
	var result = [];
	var morph_index = 0;
	var __iterable0__ = __call__ (zip, null, features, spans);
	__iterable0__ = __i__ (__iterable0__);
	for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
		var __left0__ = __getitem__ (__iterable0__, __index0__);
		var feature = __left0__ [0];
		var start = __left0__ [1][0];
		var end = __left0__ [1][1];
		while (__t__ (__t__ (__lt__ (morph_index, __call__ (len, null, morphs))) && __le__ (__getitem__ (__getitem__ (__getitem__ (morphs, morph_index), 'char_span'), 1), start))) {
			var morph_index = __call__ (__iadd__, null, morph_index, 1);
		}
		var end_index = morph_index;
		while (__t__ (__t__ (__lt__ (end_index, __call__ (len, null, morphs))) && __lt__ (__getitem__ (__getitem__ (__getitem__ (morphs, end_index), 'char_span'), 0), end))) {
			var end_index = __call__ (__iadd__, null, end_index, 1);
		}
		var parts = __getslice__ (morphs, morph_index, end_index, 1);
		if (__t__ (__t__ (__ne__ (__getitem__ (feature, 'pos'), '記号')) || __t__ (__ne__ (__getitem__ (feature, 'pron'), '、')) || __t__ (__lt__ (__call__ (len, null, parts), 2)) || __ne__ ((function () {
			var __accu0__ = __call__ (join_strings, null, '', (function () {
				var __accu1__ = [];
				var __iterable1__ = parts;
				__iterable1__ = __i__ (__iterable1__);
				for (var __index1__ = 0; __index1__ < len (__iterable1__); __index1__++) {
					var morph = __getitem__ (__iterable1__, __index1__);
					(function () {
						var __accu2__ = __accu1__;
						return __call__ (__accu2__.append, __accu2__, __getitem__ (morph, 'surface'));
					}) ();
				}
				return __accu1__;
			}) ());
			return __call__ (__accu0__.py_replace, __accu0__, '\u3000', '');
		}) (), (function () {
			var __accu0__ = __getitem__ (feature, 'string');
			return __call__ (__accu0__.py_replace, __accu0__, '\u3000', '');
		}) ()))) {
			(function () {
				var __accu0__ = result;
				return __call__ (__accu0__.append, __accu0__, feature);
			}) ();
			continue;
		}
		var __iterable1__ = parts;
		__iterable1__ = __i__ (__iterable1__);
		for (var __index1__ = 0; __index1__ < len (__iterable1__); __index1__++) {
			var morph = __getitem__ (__iterable1__, __index1__);
			if (__t__ (__getitem__ (morph, 'is_ignored') === true)) {
				continue;
			}
			var part = (function () {
				var __accu0__ = feature;
				return __call__ (__accu0__.py_copy, __accu0__);
			}) ();
			var __left0__ = __getitem__ (morph, 'surface');
			__setitem__ (part, 'string', __left0__);
			__setitem__ (part, 'orig', __left0__);
			(function () {
				var __accu0__ = result;
				return __call__ (__accu0__.append, __accu0__, part);
			}) ();
		}
	}
	return result;
};
export var find_kaomoji_parts = function (text) {
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
	var parts = [];
	var consumed = 0;
	var quotes = __call__ (set, null);
	var __iterable0__ = __call__ (py_enumerate, null, text);
	__iterable0__ = __i__ (__iterable0__);
	for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
		var __left0__ = __getitem__ (__iterable0__, __index0__);
		var index = __left0__ [0];
		var original = __left0__ [1];
		if (__t__ (__lt__ (index, consumed))) {
			continue;
		}
		var end = __call__ (_extra_face_end, null, text, index);
		if (__t__ (__t__ (end === null) && __in__ (original, _PAIRS))) {
			var depth = 0;
			for (var at = __add__ (index, 1); at < __call__ (min, null, __call__ (len, null, text), __add__ (index, 50)); at++) {
				var c = __call__ (_fold, null, __getitem__ (text, at));
				if (__t__ (__in__ (c, '⎛꒰₍\n\r'))) {
					break;
				}
				if (__t__ (__eq__ (c, '('))) {
					var depth = __call__ (__iadd__, null, depth, 1);
				}
				if (__t__ (__t__ (__in__ (c, ')⎞꒱₎ʔ⎠')) || __t__ (__eq__ (original, '∪')) && __eq__ (c, '∪'))) {
					if (__t__ (__t__ (__eq__ (c, ')')) && __gt__ (depth, 0))) {
						var depth = __call__ (__isub__, null, depth, 1);
					}
					else {
						if (__t__ (__t__ (__eq__ (__getitem__ (text, at), __getitem__ (_PAIRS, original))) || __t__ (__eq__ (original, '⎝')) && __eq__ (c, '⎞'))) {
							var end = __add__ (at, 1);
						}
						break;
					}
				}
			}
		}
		if (__t__ (end === null)) {
			continue;
		}
		var __left0__ = tuple ([index, end]);
		var start = __left0__ [0];
		var extent_end = __left0__ [1];
		for (var at = __sub__ (index, 1); at > __call__ (max, null, __sub__ (consumed, 1), __sub__ (index, 17)); at--) {
			var c = __getitem__ (text, at);
			if (__t__ (__t__ (!__t__ ((__call__ (_arm, null, c)))) || __t__ (__in__ (c, 'ｼﾞ')) || __t__ (__call__ (_letter, null, c)) && (__t__ (__t__ (__gt__ (at, 0)) && __call__ (_letter, null, __getitem__ (text, __sub__ (at, 1)))) || __call__ (_letter, null, __getitem__ (text, __add__ (at, 1)))))) {
				break;
			}
			var start = at;
		}
		var last = '';
		for (var at = end; at < __call__ (min, null, __call__ (len, null, text), __add__ (end, 16)); at++) {
			var c = __getitem__ (text, at);
			if (__t__ (__t__ (!__t__ ((__t__ (__call__ (_arm, null, c)) || __t__ (__in__ (c, 'ｼﾞ')) && __in__ (last, 'ﾉｼ')))) || __t__ (__call__ (_letter, null, c)) && (__t__ (__call__ (_letter, null, __getitem__ (text, __sub__ (at, 1)))) || __t__ (__lt__ (__add__ (at, 1), __call__ (len, null, text))) && __call__ (_letter, null, __getitem__ (text, __add__ (at, 1)))))) {
				break;
			}
			var extent_end = __add__ (at, 1);
			var last = c;
		}
		if (__t__ (__t__ (__ne__ (__call__ (_extra_face_end, null, text, index), end)) && !__t__ ((__call__ (_body, null, __call__ (join_strings, null, '', (function () {
			var __accu0__ = [];
			var __iterable1__ = __getslice__ (text, __add__ (index, 1), __sub__ (end, 1), 1);
			__iterable1__ = __i__ (__iterable1__);
			for (var __index1__ = 0; __index1__ < len (__iterable1__); __index1__++) {
				var c = __getitem__ (__iterable1__, __index1__);
				(function () {
					var __accu1__ = __accu0__;
					return __call__ (__accu1__.append, __accu1__, __call__ (_fold, null, c));
				}) ();
			}
			return __accu0__;
		}) ()), __t__ (__ne__ (start, index)) || __t__ (__ne__ (extent_end, end)) || __in__ (original, '|｜')))))) {
			continue;
		}
		while (__t__ (__t__ (__lt__ (extent_end, __call__ (len, null, text))) && __call__ (_decoration, null, __getitem__ (text, extent_end)))) {
			var extent_end = __call__ (__iadd__, null, extent_end, 1);
		}
		if (__t__ (__t__ (__eq__ (__getitem__ (text, __sub__ (extent_end, 1)), '\u200d')) || __t__ (__gt__ (start, 0)) && __eq__ (__getitem__ (text, __sub__ (start, 1)), '\u200d'))) {
			continue;
		}
		var __left0__ = __call__ (_extend_objects, null, text, index, end, start, extent_end);
		var start = __left0__ [0];
		var extent_end = __left0__ [1];
		(function () {
			var __accu0__ = parts;
			return __call__ (__accu0__.append, __accu0__, tuple ([index, end, start, extent_end]));
		}) ();
		var consumed = end;
	}
	var stack = [];
	var __iterable0__ = __call__ (py_enumerate, null, text);
	__iterable0__ = __i__ (__iterable0__);
	for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
		var __left0__ = __getitem__ (__iterable0__, __index0__);
		var index = __left0__ [0];
		var c = __left0__ [1];
		if (__t__ (__call__ (any, null, (function () {
			var __accu0__ = [];
			var __iterable1__ = parts;
			__iterable1__ = __i__ (__iterable1__);
			for (var __index1__ = 0; __index1__ < len (__iterable1__); __index1__++) {
				var __left0__ = __getitem__ (__iterable1__, __index1__);
				var a = __left0__ [0];
				var b = __left0__ [1];
				var _ = __left0__ [2];
				var _ = __left0__ [3];
				(function () {
					var __accu1__ = __accu0__;
					return __call__ (__accu1__.append, __accu1__, (__le__ (a, index) && __lt__ (index, b)));
				}) ();
			}
			return __accu0__;
		}) ()))) {
			continue;
		}
		if (__t__ (__in__ (c, '「『'))) {
			(function () {
				var __accu0__ = stack;
				return __call__ (__accu0__.append, __accu0__, tuple ([index, c]));
			}) ();
		}
		else if (__t__ (__t__ (stack) && __in__ (tuple ([__getitem__ (__getitem__ (stack, __neg__ (1)), 1), c]), tuple ([tuple (['「', '」']), tuple (['『', '』'])])))) {
			(function () {
				var __accu0__ = quotes;
				return __call__ (__accu0__.py_update, __accu0__, tuple ([__getitem__ ((function () {
					var __accu1__ = stack;
					return __call__ (__accu1__.py_pop, __accu1__);
				}) (), 0), index]));
			}) ();
		}
	}
	return (function () {
		var __accu0__ = [];
		var __iterable0__ = parts;
		__iterable0__ = __i__ (__iterable0__);
		for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
			var __left0__ = __getitem__ (__iterable0__, __index0__);
			var a = __left0__ [0];
			var b = __left0__ [1];
			var s = __left0__ [2];
			var e = __left0__ [3];
			(function () {
				var __accu1__ = __accu0__;
				return __call__ (__accu1__.append, __accu1__, tuple ([a, b, __call__ (max, null, [s, (function () {
					var __accu2__ = [];
					var __iterable1__ = quotes;
					__iterable1__ = __i__ (__iterable1__);
					for (var __index1__ = 0; __index1__ < len (__iterable1__); __index1__++) {
						var q = __getitem__ (__iterable1__, __index1__);
						if (__t__ ((__le__ (s, q) && __lt__ (q, a)))) {
							(function () {
								var __accu3__ = __accu2__;
								return __call__ (__accu3__.append, __accu3__, __add__ (q, 1));
							}) ();
						}
					}
					return __accu2__;
				}) ()]), __call__ (min, null, [e, (function () {
					var __accu2__ = [];
					var __iterable1__ = quotes;
					__iterable1__ = __i__ (__iterable1__);
					for (var __index1__ = 0; __index1__ < len (__iterable1__); __index1__++) {
						var q = __getitem__ (__iterable1__, __index1__);
						if (__t__ ((__le__ (b, q) && __lt__ (q, e)))) {
							(function () {
								var __accu3__ = __accu2__;
								return __call__ (__accu3__.append, __accu3__, q);
							}) ();
						}
					}
					return __accu2__;
				}) ()])]));
			}) ();
		}
		return __accu0__;
	}) ();
};
export var _extra_face_end = function (text, start) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'text': var text = __allkwargs0__ [__attrib0__]; break;
					case 'start': var start = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	if (__t__ (!__in__ (__getitem__ (text, start), '>＞눈ᓀ/(（ʕ'))) {
		return null;
	}
	var tail = __getslice__ (text, start, __add__ (start, 100), 1);
	var __iterable0__ = tuple (['>ω<', '＞ω＜', '눈_눈', 'ᓀ‸ᓂ', '/ᐠ｡ꞈ｡ᐟ\\']);
	__iterable0__ = __i__ (__iterable0__);
	for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
		var form = __getitem__ (__iterable0__, __index0__);
		if (__t__ ((function () {
			var __accu0__ = tail;
			return __call__ (__accu0__.startswith, __accu0__, form);
		}) ())) {
			return __add__ (start, __call__ (len, null, form));
		}
	}
	var __iterable0__ = tuple (['(:3[', '(¦3[', "('､3[", "('、3["]);
	__iterable0__ = __i__ (__iterable0__);
	for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
		var head = __getitem__ (__iterable0__, __index0__);
		if (__t__ ((function () {
			var __accu0__ = tail;
			return __call__ (__accu0__.startswith, __accu0__, head);
		}) ())) {
			var __iterable1__ = __call__ (py_enumerate, null, __getslice__ (tail, __call__ (len, null, head), __add__ (__call__ (len, null, head), 9), 1));
			__iterable1__ = __i__ (__iterable1__);
			for (var __index1__ = 0; __index1__ < len (__iterable1__); __index1__++) {
				var __left0__ = __getitem__ (__iterable1__, __index1__);
				var index = __left0__ [0];
				var c = __left0__ [1];
				if (__t__ (__t__ (__eq__ (c, ']')) && (__le__ (2, index) && __le__ (index, 8)))) {
					return __add__ (__add__ (__add__ (start, __call__ (len, null, head)), index), 1);
				}
				if (__t__ (!__in__ (c, '_＿▓'))) {
					break;
				}
			}
		}
	}
	if (__t__ (!__t__ (((function () {
		var __accu0__ = tail;
		return __call__ (__accu0__.startswith, __accu0__, tuple (['(', '（', 'ʕ']));
	}) ())))) {
		return null;
	}
	var folded = __call__ (join_strings, null, '', (function () {
		var __accu0__ = [];
		var __iterable0__ = __getslice__ (tail, null, 100, 1);
		__iterable0__ = __i__ (__iterable0__);
		for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
			var c = __getitem__ (__iterable0__, __index0__);
			(function () {
				var __accu1__ = __accu0__;
				return __call__ (__accu1__.append, __accu1__, __call__ (_fold, null, c));
			}) ();
		}
		return __accu0__;
	}) ());
	if (__t__ (__t__ (__gt__ (__call__ (len, null, folded), 5)) && __t__ (__in__ (__getitem__ (folded, 1), 'ﾉノ/')) && __eq__ (__getitem__ (folded, 2), ')'))) {
		var opening = (function () {
			var __accu0__ = folded;
			return __call__ (__accu0__.find, __accu0__, '(', 3, 20);
		}) ();
		if (__t__ (__t__ (__ge__ (opening, 0)) && __t__ (__lt__ (__add__ (opening, 2), __call__ (len, null, folded))) && __t__ (__call__ (_covering_pair, null, __getitem__ (folded, 1), __getitem__ (folded, __add__ (opening, 1)))) && __eq__ (__getitem__ (folded, __add__ (opening, 2)), ')'))) {
			var middle = __getslice__ (folded, 3, opening, 1);
			if (__t__ (__t__ (__t__ (__eq__ (__call__ (len, null, middle), 1)) && __in__ (middle, _STRONG_MOUTHS)) || __call__ (_body, null, middle, true))) {
				return __add__ (__add__ (start, opening), 3);
			}
		}
	}
	var cursor = 1;
	var last_end = null;
	var left_end = __call__ (py_next, null, __call__ (py_iter, null, (function () {
		var __accu0__ = [];
		for (var i = cursor; i < __call__ (min, null, __call__ (len, null, folded), __add__ (cursor, 21)); i++) {
			if (__t__ (__in__ (__getitem__ (folded, i), '()人'))) {
				(function () {
					var __accu1__ = __accu0__;
					return __call__ (__accu1__.append, __accu1__, i);
				}) ();
			}
		}
		return __accu0__;
	}) ()), null);
	if (__t__ (__t__ (left_end === null) || !__t__ ((__call__ (_social_body, null, __getslice__ (folded, cursor, left_end, 1), false, __eq__ (__getitem__ (folded, left_end), '(')))))) {
		return null;
	}
	var delimiter = __getitem__ (folded, left_end);
	var cursor = __add__ (left_end, 1);
	for (var _ = 0; _ < 7; _++) {
		var missing_left = __eq__ (delimiter, ')');
		if (__t__ (__eq__ (delimiter, ')'))) {
			if (__t__ (__eq__ (__getslice__ (folded, cursor, __add__ (cursor, 2), 1), '人('))) {
				var cursor = __call__ (__iadd__, null, cursor, 2);
				var missing_left = false;
			}
			else if (__t__ (__t__ (__lt__ (cursor, __call__ (len, null, folded))) && __in__ (__getitem__ (folded, cursor), 'σっ'))) {
				var cursor = __call__ (__iadd__, null, cursor, 1);
				if (__t__ (__t__ (__lt__ (cursor, __call__ (len, null, folded))) && __in__ (__getitem__ (folded, cursor), '"”'))) {
					var cursor = __call__ (__iadd__, null, cursor, 1);
				}
				if (__t__ (__t__ (__ge__ (cursor, __call__ (len, null, folded))) || __ne__ (__getitem__ (folded, cursor), ')'))) {
					break;
				}
				var cursor = __call__ (__iadd__, null, cursor, 1);
			}
			else if (__t__ (__eq__ (__getslice__ (folded, cursor, __add__ (cursor, 1), 1), ')'))) {
				var cursor = __call__ (__iadd__, null, cursor, 1);
			}
		}
		var right_end = __call__ (py_next, null, __call__ (py_iter, null, (function () {
			var __accu0__ = [];
			for (var i = cursor; i < __call__ (min, null, __call__ (len, null, folded), __add__ (cursor, 21)); i++) {
				if (__t__ (__in__ (__getitem__ (folded, i), '()人'))) {
					(function () {
						var __accu1__ = __accu0__;
						return __call__ (__accu1__.append, __accu1__, i);
					}) ();
				}
			}
			return __accu0__;
		}) ()), null);
		if (__t__ (__t__ (right_end === null) || __t__ (__ne__ (__getitem__ (folded, right_end), ')')) || !__t__ ((__call__ (_social_body, null, __getslice__ (folded, cursor, right_end, 1), missing_left, false))))) {
			break;
		}
		var cursor = __add__ (right_end, 1);
		var last_end = __add__ (start, cursor);
		var delimiter = ')';
	}
	return last_end;
};
export var _social_body = function (text, missing_left, missing_right) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'text': var text = __allkwargs0__ [__attrib0__]; break;
					case 'missing_left': var missing_left = __allkwargs0__ [__attrib0__]; break;
					case 'missing_right': var missing_right = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	if (__t__ (__t__ (!__t__ ((text))) || __gt__ (__call__ (len, null, text), 20))) {
		return false;
	}
	if (__t__ (__call__ (any, null, (function () {
		var __accu0__ = [];
		var __iterable0__ = text;
		__iterable0__ = __i__ (__iterable0__);
		for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
			var c = __getitem__ (__iterable0__, __index0__);
			(function () {
				var __accu1__ = __accu0__;
				return __call__ (__accu1__.append, __accu1__, __t__ ((function () {
					var __accu2__ = c;
					return __call__ (__accu2__.isascii, __accu2__);
				}) ()) && (function () {
					var __accu2__ = c;
					return __call__ (__accu2__.isalnum, __accu2__);
				}) ());
			}) ();
		}
		return __accu0__;
	}) ()))) {
		return __t__ (!__t__ ((missing_left))) && __t__ (!__t__ ((missing_right))) && __call__ (_body, null, text, false);
	}
	if (__t__ (__t__ ((__t__ (missing_left) || missing_right)) && !__t__ ((__call__ (any, null, (function () {
		var __accu0__ = [];
		var __iterable0__ = text;
		__iterable0__ = __i__ (__iterable0__);
		for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
			var c = __getitem__ (__iterable0__, __index0__);
			(function () {
				var __accu1__ = __accu0__;
				return __call__ (__accu1__.append, __accu1__, __in__ (c, _STRONG_MOUTHS));
			}) ();
		}
		return __accu0__;
	}) ()))))) {
		return false;
	}
	if (__t__ (__call__ (_body, null, text, true))) {
		return true;
	}
	var clean = (function () {
		var __accu0__ = text;
		return __call__ (__accu0__.strip, __accu0__, ' *｡');
	}) ();
	if (__t__ (!__t__ ((clean)))) {
		return false;
	}
	return __t__ (__t__ (missing_left) && __t__ (__in__ (__getitem__ (clean, 0), _STRONG_MOUTHS)) && __t__ (__call__ (all, null, (function () {
		var __accu0__ = [];
		var __iterable0__ = __getslice__ (clean, 1, null, 1);
		__iterable0__ = __i__ (__iterable0__);
		for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
			var c = __getitem__ (__iterable0__, __index0__);
			(function () {
				var __accu1__ = __accu0__;
				return __call__ (__accu1__.append, __accu1__, __call__ (_allowed, null, c));
			}) ();
		}
		return __accu0__;
	}) ())) && __call__ (any, null, (function () {
		var __accu0__ = [];
		var __iterable0__ = __getslice__ (clean, 1, null, 1);
		__iterable0__ = __i__ (__iterable0__);
		for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
			var c = __getitem__ (__iterable0__, __index0__);
			(function () {
				var __accu1__ = __accu0__;
				return __call__ (__accu1__.append, __accu1__, __in__ (c, _EYES));
			}) ();
		}
		return __accu0__;
	}) ())) || __t__ (missing_right) && __t__ (__in__ (__getitem__ (clean, __neg__ (1)), _STRONG_MOUTHS)) && __t__ (__call__ (all, null, (function () {
		var __accu0__ = [];
		var __iterable0__ = __getslice__ (clean, null, __neg__ (1), 1);
		__iterable0__ = __i__ (__iterable0__);
		for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
			var c = __getitem__ (__iterable0__, __index0__);
			(function () {
				var __accu1__ = __accu0__;
				return __call__ (__accu1__.append, __accu1__, __call__ (_allowed, null, c));
			}) ();
		}
		return __accu0__;
	}) ())) && __call__ (any, null, (function () {
		var __accu0__ = [];
		var __iterable0__ = __getslice__ (clean, null, __neg__ (1), 1);
		__iterable0__ = __i__ (__iterable0__);
		for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
			var c = __getitem__ (__iterable0__, __index0__);
			(function () {
				var __accu1__ = __accu0__;
				return __call__ (__accu1__.append, __accu1__, __in__ (c, _EYES));
			}) ();
		}
		return __accu0__;
	}) ());
};
export var _body = function (text, has_arms) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'text': var text = __allkwargs0__ [__attrib0__]; break;
					case 'has_arms': var has_arms = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	if (__t__ (!__t__ (((__le__ (2, __call__ (len, null, text)) && __le__ (__call__ (len, null, text), 48)))))) {
		return false;
	}
	var t = (function () {
		var __accu0__ = text;
		return __call__ (__accu0__.strip, __accu0__);
	}) ();
	var clean = __call__ (join_strings, null, '', (function () {
		var __accu0__ = [];
		var __iterable0__ = t;
		__iterable0__ = __i__ (__iterable0__);
		for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
			var c = __getitem__ (__iterable0__, __index0__);
			if (__t__ (!__in__ (c, ' *｡´`｀〃ᐢ′‵๑'))) {
				(function () {
					var __accu1__ = __accu0__;
					return __call__ (__accu1__.append, __accu1__, c);
				}) ();
			}
		}
		return __accu0__;
	}) ());
	if (__t__ (__t__ (__ge__ (__call__ (len, null, clean), 2)) && __call__ (_covering_pair, null, __getitem__ (clean, 0), __getitem__ (clean, __neg__ (1))))) {
		if (__t__ (__t__ (__eq__ (__call__ (len, null, clean), 2)) && !__t__ (((function () {
			var __accu0__ = __getitem__ (clean, 0);
			return __call__ (__accu0__.isascii, __accu0__);
		}) ())))) {
			return true;
		}
		if (__t__ (__t__ (__gt__ (__call__ (len, null, clean), 3)) && __t__ (!__t__ (((function () {
			var __accu0__ = __getitem__ (clean, 0);
			return __call__ (__accu0__.isascii, __accu0__);
		}) ()))) && __call__ (_body, null, __getslice__ (clean, 1, __neg__ (1), 1), false))) {
			return true;
		}
		if (__t__ (__t__ (__eq__ (__call__ (len, null, clean), 3)) && (__t__ (__in__ (__getitem__ (clean, 1), _STRONG_MOUTHS)) || __t__ (!__t__ (((function () {
			var __accu0__ = __getitem__ (clean, 0);
			return __call__ (__accu0__.isascii, __accu0__);
		}) ()))) && __in__ (__getitem__ (clean, 1), '-_ー')))) {
			return true;
		}
	}
	if (__t__ (__call__ (all, null, (function () {
		var __accu0__ = [];
		var __iterable0__ = t;
		__iterable0__ = __i__ (__iterable0__);
		for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
			var c = __getitem__ (__iterable0__, __index0__);
			(function () {
				var __accu1__ = __accu0__;
				return __call__ (__accu1__.append, __accu1__, __in__ (c, '-ー= '));
			}) ();
		}
		return __accu0__;
	}) ()))) {
		return false;
	}
	if (__t__ (__in__ ('三', t))) {
		return __t__ (__le__ ((function () {
			var __accu0__ = t;
			return __call__ (__accu0__.count, __accu0__, '三');
		}) (), 2)) && __call__ (all, null, (function () {
			var __accu0__ = [];
			var __iterable0__ = (function () {
				var __accu1__ = t;
				return __call__ (__accu1__.py_split, __accu1__, '三');
			}) ();
			__iterable0__ = __i__ (__iterable0__);
			for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
				var part = __getitem__ (__iterable0__, __index0__);
				(function () {
					var __accu1__ = __accu0__;
					return __call__ (__accu1__.append, __accu1__, __call__ (_body, null, part, has_arms));
				}) ();
			}
			return __accu0__;
		}) ());
	}
	if (__t__ (__t__ (__eq__ (__call__ (len, null, t), 3)) && __t__ (__in__ (__getitem__ (t, 0), 'TtOo0xXQq3')) && __t__ (__eq__ ((function () {
		var __accu0__ = __getitem__ (t, 0);
		return __call__ (__accu0__.lower, __accu0__);
	}) (), (function () {
		var __accu0__ = __getitem__ (t, 2);
		return __call__ (__accu0__.lower, __accu0__);
	}) ())) && (__t__ (__eq__ (__getitem__ (t, 1), '_')) || __t__ (__t__ (__in__ (__getitem__ (t, 0), 'TtOoXxQq')) && __in__ (__getitem__ (t, 1), 'ω﹏')) || __t__ (__in__ (__getitem__ (t, 0), 'TtQq')) && __eq__ (__getitem__ (t, 1), '.')))) {
		return true;
	}
	if (__t__ (__t__ (__eq__ (t, '><')) || __t__ (has_arms) && __in__ (t, tuple (['・・', '･･', '・・。', '。。', '_ _'])))) {
		return true;
	}
	var eyes = __call__ (join_strings, null, '', (function () {
		var __accu0__ = [];
		var __iterable0__ = t;
		__iterable0__ = __i__ (__iterable0__);
		for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
			var c = __getitem__ (__iterable0__, __index0__);
			if (__t__ (!__in__ (c, ' *｡'))) {
				(function () {
					var __accu1__ = __accu0__;
					return __call__ (__accu1__.append, __accu1__, c);
				}) ();
			}
		}
		return __accu0__;
	}) ());
	if (__t__ (__t__ (__ge__ (__call__ (len, null, eyes), 4)) && (__eq__ (__getitem__ (eyes, 0), __getitem__ (eyes, __neg__ (1))) && __eq__ (__getitem__ (eyes, __neg__ (1)), 'o')))) {
		var eyes = __getslice__ (eyes, 1, __neg__ (1), 1);
	}
	if (__t__ (__t__ (__eq__ (__call__ (len, null, eyes), 2)) && __t__ (__eq__ (__getitem__ (eyes, 0), __getitem__ (eyes, 1))) && (__t__ (__in__ (__getitem__ (eyes, 0), '^˘ˇ')) || __t__ (has_arms) && __in__ (__getitem__ (eyes, 0), '･・')))) {
		return true;
	}
	if (__t__ (__t__ (__in__ ('ε:', t)) && __call__ (all, null, (function () {
		var __accu0__ = [];
		var __iterable0__ = (function () {
			var __accu1__ = t;
			return __call__ (__accu1__.py_replace, __accu1__, 'ε:', '');
		}) ();
		__iterable0__ = __i__ (__iterable0__);
		for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
			var c = __getitem__ (__iterable0__, __index0__);
			(function () {
				var __accu1__ = __accu0__;
				return __call__ (__accu1__.append, __accu1__, __t__ (__call__ (_arm, null, c)) || __eq__ (c, ' '));
			}) ();
		}
		return __accu0__;
	}) ()))) {
		return true;
	}
	var __iterable0__ = tuple ([':3', ':D', ':0', 'ε:', "'､3", "'、3"]);
	__iterable0__ = __i__ (__iterable0__);
	for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
		var head = __getitem__ (__iterable0__, __index0__);
		if (__t__ (__t__ ((function () {
			var __accu0__ = t;
			return __call__ (__accu0__.startswith, __accu0__, head);
		}) ()) && __call__ (all, null, (function () {
			var __accu0__ = [];
			var __iterable1__ = __getslice__ (t, __call__ (len, null, head), null, 1);
			__iterable1__ = __i__ (__iterable1__);
			for (var __index1__ = 0; __index1__ < len (__iterable1__); __index1__++) {
				var c = __getitem__ (__iterable1__, __index1__);
				(function () {
					var __accu1__ = __accu0__;
					return __call__ (__accu1__.append, __accu1__, __t__ (__call__ (_arm, null, c)) || __eq__ (c, ' '));
				}) ();
			}
			return __accu0__;
		}) ()))) {
			return true;
		}
	}
	if (__t__ (__t__ (__in__ ('(', t)) || __in__ (')', t))) {
		return __call__ (_body, null, (function () {
			var __accu0__ = (function () {
				var __accu1__ = t;
				return __call__ (__accu1__.py_replace, __accu1__, '(', '');
			}) ();
			return __call__ (__accu0__.py_replace, __accu0__, ')', '');
		}) (), has_arms);
	}
	if (__t__ (__call__ (any, null, (function () {
		var __accu0__ = [];
		var __iterable0__ = text;
		__iterable0__ = __i__ (__iterable0__);
		for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
			var c = __getitem__ (__iterable0__, __index0__);
			(function () {
				var __accu1__ = __accu0__;
				return __call__ (__accu1__.append, __accu1__, __t__ ((function () {
					var __accu2__ = c;
					return __call__ (__accu2__.isascii, __accu2__);
				}) ()) && (function () {
					var __accu2__ = c;
					return __call__ (__accu2__.isalnum, __accu2__);
				}) ());
			}) ();
		}
		return __accu0__;
	}) ()))) {
		var is_hands = __call__ (all, null, (function () {
			var __accu0__ = [];
			var __iterable0__ = t;
			__iterable0__ = __i__ (__iterable0__);
			for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
				var c = __getitem__ (__iterable0__, __index0__);
				(function () {
					var __accu1__ = __accu0__;
					return __call__ (__accu1__.append, __accu1__, __t__ (__call__ (_allowed, null, c)) || __t__ (__in__ (c, _MOUTHS)) || __in__ (c, 'opcqbdl'));
				}) ();
			}
			return __accu0__;
		}) ());
		var is_o_mouth = __t__ (__in__ ('o', t)) && __t__ (__call__ (all, null, (function () {
			var __accu0__ = [];
			var __iterable0__ = t;
			__iterable0__ = __i__ (__iterable0__);
			for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
				var c = __getitem__ (__iterable0__, __index0__);
				(function () {
					var __accu1__ = __accu0__;
					return __call__ (__accu1__.append, __accu1__, __t__ (__call__ (_allowed, null, c)) || __eq__ (c, 'o'));
				}) ();
			}
			return __accu0__;
		}) ())) && __call__ (any, null, (function () {
			var __accu0__ = [];
			var __iterable0__ = t;
			__iterable0__ = __i__ (__iterable0__);
			for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
				var c = __getitem__ (__iterable0__, __index0__);
				(function () {
					var __accu1__ = __accu0__;
					return __call__ (__accu1__.append, __accu1__, __in__ (c, '^＾'));
				}) ();
			}
			return __accu0__;
		}) ());
		if (__t__ (__t__ (!__t__ ((is_hands))) && !__t__ ((is_o_mouth)))) {
			return false;
		}
		var other_mouth = __call__ (any, null, (function () {
			var __accu0__ = [];
			var __iterable0__ = text;
			__iterable0__ = __i__ (__iterable0__);
			for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
				var c = __getitem__ (__iterable0__, __index0__);
				(function () {
					var __accu1__ = __accu0__;
					return __call__ (__accu1__.append, __accu1__, __t__ (__ne__ (c, 'o')) && __in__ (c, _MOUTHS));
				}) ();
			}
			return __accu0__;
		}) ());
		var text = __call__ (join_strings, null, '', (function () {
			var __accu0__ = [];
			var __iterable0__ = text;
			__iterable0__ = __i__ (__iterable0__);
			for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
				var c = __getitem__ (__iterable0__, __index0__);
				if (__t__ (!__t__ ((__t__ (is_hands) && (__t__ (__in__ (c, 'pcqbdP')) || __t__ (__eq__ (c, 'o')) && other_mouth))))) {
					(function () {
						var __accu1__ = __accu0__;
						return __call__ (__accu1__.append, __accu1__, c);
					}) ();
				}
			}
			return __accu0__;
		}) ());
	}
	if (__t__ (__call__ (any, null, (function () {
		var __accu0__ = [];
		var __iterable0__ = text;
		__iterable0__ = __i__ (__iterable0__);
		for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
			var c = __getitem__ (__iterable0__, __index0__);
			(function () {
				var __accu1__ = __accu0__;
				return __call__ (__accu1__.append, __accu1__, __in__ (c, '≡Ξ三'));
			}) ();
		}
		return __accu0__;
	}) ()))) {
		var chunks = (function () {
			var __accu0__ = (function () {
				var __accu1__ = (function () {
					var __accu2__ = text;
					return __call__ (__accu2__.py_replace, __accu2__, 'Ξ', '≡');
				}) ();
				return __call__ (__accu1__.py_replace, __accu1__, '三', '≡');
			}) ();
			return __call__ (__accu0__.py_split, __accu0__, '≡');
		}) ();
		return __t__ (__le__ (__call__ (len, null, chunks), 3)) && __call__ (all, null, (function () {
			var __accu0__ = [];
			var __iterable0__ = chunks;
			__iterable0__ = __i__ (__iterable0__);
			for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
				var part = __getitem__ (__iterable0__, __index0__);
				(function () {
					var __accu1__ = __accu0__;
					return __call__ (__accu1__.append, __accu1__, __call__ (_body, null, part, has_arms));
				}) ();
			}
			return __accu0__;
		}) ());
	}
	var one_eye = __t__ (has_arms) || __call__ (any, null, (function () {
		var __accu0__ = [];
		var __iterable0__ = text;
		__iterable0__ = __i__ (__iterable0__);
		for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
			var c = __getitem__ (__iterable0__, __index0__);
			(function () {
				var __accu1__ = __accu0__;
				return __call__ (__accu1__.append, __accu1__, __in__ (c, 'ヾヽゞゝﾉノつっ⊂⊃'));
			}) ();
		}
		return __accu0__;
	}) ());
	var __iterable0__ = __call__ (py_enumerate, null, text);
	__iterable0__ = __i__ (__iterable0__);
	for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
		var __left0__ = __getitem__ (__iterable0__, __index0__);
		var index = __left0__ [0];
		var c = __left0__ [1];
		if (__t__ (__t__ (__in__ (c, _MOUTHS)) && __call__ (all, null, (function () {
			var __accu0__ = [];
			var __iterable1__ = __add__ (__getslice__ (text, null, index, 1), __getslice__ (text, __add__ (index, 1), null, 1));
			__iterable1__ = __i__ (__iterable1__);
			for (var __index1__ = 0; __index1__ < len (__iterable1__); __index1__++) {
				var x = __getitem__ (__iterable1__, __index1__);
				(function () {
					var __accu1__ = __accu0__;
					return __call__ (__accu1__.append, __accu1__, __call__ (_allowed, null, x));
				}) ();
			}
			return __accu0__;
		}) ()))) {
			var before = __call__ (any, null, (function () {
				var __accu0__ = [];
				var __iterable1__ = __getslice__ (text, null, index, 1);
				__iterable1__ = __i__ (__iterable1__);
				for (var __index1__ = 0; __index1__ < len (__iterable1__); __index1__++) {
					var x = __getitem__ (__iterable1__, __index1__);
					(function () {
						var __accu1__ = __accu0__;
						return __call__ (__accu1__.append, __accu1__, __in__ (x, _EYES));
					}) ();
				}
				return __accu0__;
			}) ());
			var after = __call__ (any, null, (function () {
				var __accu0__ = [];
				var __iterable1__ = __getslice__ (text, __add__ (index, 1), null, 1);
				__iterable1__ = __i__ (__iterable1__);
				for (var __index1__ = 0; __index1__ < len (__iterable1__); __index1__++) {
					var x = __getitem__ (__iterable1__, __index1__);
					(function () {
						var __accu1__ = __accu0__;
						return __call__ (__accu1__.append, __accu1__, __in__ (x, _EYES));
					}) ();
				}
				return __accu0__;
			}) ());
			if (__t__ (__t__ (__t__ (before) && after) || __t__ (one_eye) && __t__ (__in__ (c, 'ω∀▽∇Ддεзヮ益皿◡')) && (__t__ (before) || after))) {
				return true;
			}
		}
	}
	return false;
};
export var _covering_pair = function (a, b) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'a': var a = __allkwargs0__ [__attrib0__]; break;
					case 'b': var b = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	return __t__ (__in__ (tuple ([a, b]), tuple ([tuple (['⊃', '⊂']), tuple (['つ', '⊂']), tuple (['っ', 'c']), tuple (['p', 'q']), tuple (['q', 'p']), tuple (['∩', '∩']), tuple (['ฅ', 'ฅ'])]))) || __t__ (__in__ (a, 'ﾉノ/')) && __in__ (b, 'ﾉノヾ\\');
};
export var _fold = function (c) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'c': var c = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	return (__t__ ((__le__ ('！', c) && __le__ (c, '～'))) ? __call__ (chr, null, __sub__ (__call__ (ord, null, c), 65248)) : (function () {
		var __accu0__ = dict ({'−': '-', '\u3000': ' '});
		return __call__ (__accu0__.py_get, __accu0__, c, c);
	}) ());
};
export var _arm = function (c) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'c': var c = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	return __t__ (__in__ (c, _ARMS)) || __t__ (__in__ (__call__ (_fold, null, c), _ARMS)) || __in__ (c, '/\\');
};
export var _letter = function (c) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'c': var c = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var c = __call__ (_fold, null, c);
	return __t__ (__t__ ((function () {
		var __accu0__ = c;
		return __call__ (__accu0__.isascii, __accu0__);
	}) ()) && (__t__ ((function () {
		var __accu0__ = c;
		return __call__ (__accu0__.isalnum, __accu0__);
	}) ()) || __eq__ (c, '_'))) || __t__ ((__le__ ('Ͱ', c) && __le__ (c, 'ԯ'))) && (function () {
		var __accu0__ = c;
		return __call__ (__accu0__.isalpha, __accu0__);
	}) ();
};
export var _allowed = function (c) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'c': var c = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	return __t__ (__in__ (c, _EYES)) || __t__ (__call__ (_arm, null, c)) || __t__ (__in__ (c, _ORNAMENTS)) || __t__ (__call__ (_decoration, null, c)) || __in__ (c, '🎀💢💦\u200bლᐢˇP');
};
export var _decoration = function (c) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'c': var c = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	return __t__ ((function () {
		var __accu0__ = (function () {
			var __accu1__ = unicodedata;
			return __call__ (__accu1__.category, __accu1__, c);
		}) ();
		return __call__ (__accu0__.startswith, __accu0__, 'M');
	}) ()) || __t__ (__in__ (c, 'ﾞﾟ\u200d')) || (__le__ ('︀', c) && __le__ (c, '️'));
};
export var _extend_objects = function (text, core_start, core_end, start, end) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'text': var text = __allkwargs0__ [__attrib0__]; break;
					case 'core_start': var core_start = __allkwargs0__ [__attrib0__]; break;
					case 'core_end': var core_end = __allkwargs0__ [__attrib0__]; break;
					case 'start': var start = __allkwargs0__ [__attrib0__]; break;
					case 'end': var end = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var __iterable0__ = tuple ([false, true]);
	__iterable0__ = __i__ (__iterable0__);
	for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
		var is_left = __getitem__ (__iterable0__, __index0__);
		var boundary = (__t__ (is_left) ? start : end);
		var existing = (__t__ (is_left) ? __getslice__ (text, start, core_start, 1) : __getslice__ (text, core_end, end, 1));
		var tail = (__t__ (is_left) ? __getslice__ (__getslice__ (text, null, boundary, 1), null, null, __neg__ (1)) : __getslice__ (text, boundary, null, 1));
		var count = __call__ (_object_length, null, tail, __call__ (any, null, (function () {
			var __accu0__ = [];
			var __iterable1__ = existing;
			__iterable1__ = __i__ (__iterable1__);
			for (var __index1__ = 0; __index1__ < len (__iterable1__); __index1__++) {
				var c = __getitem__ (__iterable1__, __index1__);
				(function () {
					var __accu1__ = __accu0__;
					return __call__ (__accu1__.append, __accu1__, __in__ (c, 'つっ⊂⊃ﾉノヾヽoｏcｃ_＿/／＼\\'));
				}) ();
			}
			return __accu0__;
		}) ()));
		if (__t__ (__gt__ (count, 0))) {
			if (__t__ (is_left)) {
				var start = __call__ (__isub__, null, start, count);
			}
			else {
				var end = __call__ (__iadd__, null, end, count);
			}
		}
	}
	return tuple ([start, end]);
};
export var _object_length = function (text, has_hand) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'text': var text = __allkwargs0__ [__attrib0__]; break;
					case 'has_hand': var has_hand = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	if (__t__ (__t__ (has_hand === false) && !__t__ (((function () {
		var __accu0__ = (function () {
			var __accu1__ = text;
			return __call__ (__accu1__.lstrip, __accu1__, ' \u3000');
		}) ();
		return __call__ (__accu0__.startswith, __accu0__, '︻');
	}) ())))) {
		return 0;
	}
	var index = 0;
	while (__t__ (__t__ (__lt__ (index, __call__ (len, null, text))) && __t__ (__lt__ (index, 2)) && __in__ (__getitem__ (text, index), ' \u3000'))) {
		var index = __call__ (__iadd__, null, index, 1);
	}
	var bars_start = index;
	while (__t__ (__t__ (__lt__ (index, __call__ (len, null, text))) && __t__ (__lt__ (__sub__ (index, bars_start), 12)) && __in__ (__getitem__ (text, index), _BARS))) {
		var index = __call__ (__iadd__, null, index, 1);
	}
	var bars = __sub__ (index, bars_start);
	var shape_start = index;
	if (__t__ (__ge__ (index, __call__ (len, null, text)))) {
		return 0;
	}
	if (__t__ (__t__ (bars) && __in__ (__getitem__ (text, index), '○●◎〇◯￮'))) {
		while (__t__ (__t__ (__lt__ (index, __call__ (len, null, text))) && __t__ (__in__ (__getitem__ (text, index), '○●◎〇◯￮')) && __lt__ (__sub__ (index, shape_start), 6))) {
			var index = __call__ (__iadd__, null, index, 1);
		}
		if (__t__ (__t__ (__lt__ (__sub__ (index, shape_start), 2)) || __t__ (__lt__ (index, __call__ (len, null, text))) && __in__ (__getitem__ (text, index), '○●◎〇◯￮'))) {
			return 0;
		}
		if (__t__ (__t__ (__lt__ (index, __call__ (len, null, text))) && __in__ (__getitem__ (text, index), _BARS))) {
			var index = __call__ (__iadd__, null, index, 1);
		}
	}
	else if (__t__ (__t__ (bars) && __in__ (__getitem__ (text, index), '☆★✿❀'))) {
		while (__t__ (__t__ (__lt__ (index, __call__ (len, null, text))) && __t__ (__in__ (__getitem__ (text, index), '☆★✿❀')) && __lt__ (__sub__ (index, shape_start), 8))) {
			var index = __call__ (__iadd__, null, index, 1);
		}
		if (__t__ (__t__ (__lt__ (index, __call__ (len, null, text))) && __in__ (__getitem__ (text, index), '☆★✿❀'))) {
			return 0;
		}
		var ornament_start = index;
		while (__t__ (__t__ (__lt__ (index, __call__ (len, null, text))) && __t__ (__lt__ (__sub__ (index, ornament_start), 8)) && __in__ (__getitem__ (text, index), '。｡.ﾟ゜*＊･・:：✧✨'))) {
			var index = __call__ (__iadd__, null, index, 1);
		}
	}
	else if (__t__ (__t__ (bars) && __eq__ (__getitem__ (text, index), '>'))) {
		var index = __call__ (__iadd__, null, index, 1);
		if (__t__ (__t__ (__ge__ (index, __call__ (len, null, text))) || !__in__ (__getitem__ (text, index), 'ﾟ゜'))) {
			return 0;
		}
		var index = __call__ (__iadd__, null, index, 1);
		var gills_start = index;
		while (__t__ (__t__ (__lt__ (index, __call__ (len, null, text))) && __t__ (__lt__ (__sub__ (index, gills_start), 8)) && __eq__ (__getitem__ (text, index), ')'))) {
			var index = __call__ (__iadd__, null, index, 1);
		}
		if (__t__ (__t__ (__eq__ (index, gills_start)) || __t__ (__ge__ (__add__ (index, 1), __call__ (len, null, text))) || __t__ (!__in__ (__getitem__ (text, index), '≫>')) || __ne__ (__getitem__ (text, __add__ (index, 1)), '彡'))) {
			return 0;
		}
		var index = __call__ (__iadd__, null, index, 2);
		var __left0__ = index;
		var tail_end = __left0__;
		var last_wave = __left0__;
		while (__t__ (__t__ (__lt__ (index, __call__ (len, null, text))) && __t__ (__lt__ (__sub__ (index, tail_end), 8)) && __in__ (__getitem__ (text, index), '~ \u3000'))) {
			if (__t__ (__eq__ (__getitem__ (text, index), '~'))) {
				var last_wave = __add__ (index, 1);
			}
			var index = __call__ (__iadd__, null, index, 1);
		}
		var index = last_wave;
	}
	else if (__t__ (__t__ (bars) && (function () {
		var __accu0__ = text;
		return __call__ (__accu0__.startswith, __accu0__, '[二二]', index);
	}) ())) {
		var index = __call__ (__iadd__, null, index, 4);
	}
	else if (__t__ (__t__ (bars) && (function () {
		var __accu0__ = text;
		return __call__ (__accu0__.startswith, __accu0__, '{}', index);
	}) ())) {
		var index = __call__ (__iadd__, null, index, 2);
		var count = 1;
		while (__t__ (__t__ ((function () {
			var __accu0__ = text;
			return __call__ (__accu0__.startswith, __accu0__, '@{}', index);
		}) ()) && __lt__ (count, 4))) {
			var index = __call__ (__iadd__, null, index, 3);
			var count = __call__ (__iadd__, null, count, 1);
		}
		if (__t__ (__lt__ (count, 2))) {
			return 0;
		}
		if (__t__ (__t__ (__lt__ (index, __call__ (len, null, text))) && __in__ (__getitem__ (text, index), _BARS))) {
			var index = __call__ (__iadd__, null, index, 1);
		}
	}
	else if (__t__ (__t__ (!__t__ ((bars))) && __eq__ (__getitem__ (text, index), '︻'))) {
		var index = __call__ (__iadd__, null, index, 1);
		if (__t__ (__t__ (__lt__ (index, __call__ (len, null, text))) && __eq__ (__getitem__ (text, index), '┻'))) {
			var index = __call__ (__iadd__, null, index, 1);
		}
		if (__t__ (__t__ (__ge__ (index, __call__ (len, null, text))) || !__in__ (__getitem__ (text, index), '┳デ'))) {
			return 0;
		}
		var index = __call__ (__iadd__, null, index, 1);
		var barrel_start = index;
		while (__t__ (__t__ (__lt__ (index, __call__ (len, null, text))) && __t__ (__lt__ (__sub__ (index, barrel_start), 8)) && __in__ (__getitem__ (text, index), '═━'))) {
			var index = __call__ (__iadd__, null, index, 1);
		}
		if (__t__ (__t__ (__eq__ (index, barrel_start)) || __t__ (__ge__ (index, __call__ (len, null, text))) || __ne__ (__getitem__ (text, index), '一'))) {
			return 0;
		}
		var index = __call__ (__iadd__, null, index, 1);
	}
	else if (__t__ (__t__ (!__t__ ((bars))) && __t__ (__lt__ (__add__ (index, 1), __call__ (len, null, text))) && (__t__ (__t__ (__in__ (__getitem__ (text, index), '￭■□')) && __in__ (__getitem__ (text, __add__ (index, 1)), 'PDCＰＤＣ')) || __t__ (__in__ (__getitem__ (text, index), 'PDCＰＤＣ')) && __in__ (__getitem__ (text, __add__ (index, 1)), '￭■□')))) {
		var index = __call__ (__iadd__, null, index, 2);
		var steam_start = index;
		while (__t__ (__t__ (__lt__ (index, __call__ (len, null, text))) && __t__ (__lt__ (__sub__ (index, steam_start), 4)) && __in__ (__getitem__ (text, index), '~～〜”"'))) {
			var index = __call__ (__iadd__, null, index, 1);
		}
	}
	else if (__t__ (__t__ (!__t__ ((bars))) && __in__ (__getitem__ (text, index), '旦且🍡☕🍵'))) {
		var cup = __getitem__ (text, index);
		var index = __call__ (__iadd__, null, index, 1);
		if (__t__ (__t__ (__lt__ (index, __call__ (len, null, text))) && __in__ (__getitem__ (text, index), '︎️'))) {
			var index = __call__ (__iadd__, null, index, 1);
		}
		var steam_start = index;
		while (__t__ (__t__ (__lt__ (index, __call__ (len, null, text))) && __t__ (__lt__ (__sub__ (index, steam_start), 4)) && __in__ (__getitem__ (text, index), '~～〜”"'))) {
			var index = __call__ (__iadd__, null, index, 1);
		}
		if (__t__ (__t__ (__in__ (cup, '旦且')) && __eq__ (index, steam_start))) {
			return 0;
		}
	}
	else {
		return 0;
	}
	if (__t__ (__t__ (__lt__ (index, __call__ (len, null, text))) && __in__ (__getitem__ (text, index), '︎️'))) {
		var index = __call__ (__iadd__, null, index, 1);
	}
	if (__t__ (__t__ (__lt__ (index, __call__ (len, null, text))) && __call__ (_decoration, null, __getitem__ (text, index)))) {
		return 0;
	}
	if (__t__ (__t__ (__lt__ (index, __call__ (len, null, text))) && (__le__ ('🏻', __getitem__ (text, index)) && __le__ (__getitem__ (text, index), '🏿')))) {
		return 0;
	}
	var following = (function () {
		var __accu0__ = __getslice__ (text, index, null, 1);
		return __call__ (__accu0__.lstrip, __accu0__, ' \u3000');
	}) ();
	if (__t__ (__t__ (following) && (__t__ ((function () {
		var __accu0__ = __getitem__ (following, 0);
		return __call__ (__accu0__.isnumeric, __accu0__);
	}) ()) || __t__ (__t__ ((function () {
		var __accu0__ = __getitem__ (following, 0);
		return __call__ (__accu0__.isascii, __accu0__);
	}) ()) && (function () {
		var __accu0__ = __getitem__ (following, 0);
		return __call__ (__accu0__.isalnum, __accu0__);
	}) ()) || __in__ (__getitem__ (following, 0), '円件個点番号年月日時分秒割％%式項口人台本桁')))) {
		return 0;
	}
	return index;
};

