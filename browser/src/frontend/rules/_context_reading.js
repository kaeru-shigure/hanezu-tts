// Generated from pyopenjtalk-plus e7713f2d6d91f392f595df5e8998ff2b62c3b6f5; see tools/build_rules.py.
import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __mergefields__, __mergekwargtrans__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __pyUseJsNext__, __rshift__, __setitem__, __setproperty__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __withblock__, __xor__, _sort, abs, all, any, assert, bin, bool, bytearray, bytes, callable, chr, delattr, dict, dir, divmod, filter, float, getattr, hasattr, hex, input, int, isinstance, issubclass, len, list, map, max, min, object, oct, ord, pow, print, property, py_TypeError, py_enumerate, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
import {fill_missing_feature_flags, split_kana_mora} from './utils.js';
import {join_strings, maketrans, merge_dict, translate} from './compatibility.js';
var __name__ = '_context_reading';
export var _ABSTRACT_NO_PREDECESSORS = __call__ (set, null, new set (['支配', '統治', '指導', '指揮', '監督', '管理', '監視', '命令', '号令', '庇護', '保護', '援助', '協力', '後援', '統制', '占領', '名', '法', '条件', '前提', '仮定', '原則', '方針', '契約', '規定', '制度', '計画', '設定', '愛情', '信頼', '理解', '合意', '影響', '配慮', '恩師', '陛下', '殿下', '親方']));
export var _BODY_KARADA_SUCCESSORS = dict ({'を': __call__ (set, null, new set (['動かす', '休める', '張る', '持て余す', '冷やす', '鍛える', '洗う', '温める', '持つ', '拭く', '支える', '起こす', '伸び縮む', '触る', '揺する', '見る', '投げ出す', '折り曲げる', 'ずらす', 'かばう', '覆う'])), 'に': __call__ (set, null, new set (['気', '合う', '障る', '残る', '良い', '持つ', 'かなう', '触る'])), 'の': __call__ (set, null, new set (['調子', 'ため', '具合'])), 'が': __call__ (set, null, new set (['資本', '鈍る', '丈夫', '重い', '軽い', '悪い', '弱い', '汚れる', '小さい', '浮く']))});
export var _HONORIFIC_PLURAL_PREDECESSORS = __call__ (set, null, new set (['皆様', '皆', 'みんな', 'あなた', '先生', '奥様', 'お客様', '親御', '殿']));
export var _ZEN_PREDECESSORS = __call__ (set, null, new set (['紀元', '門', '生', '就学', '出生', '公判', '産', '術', '食', '陸', '膝蓋', '祝典', '患難', '停滞', '閉塞', '寒帯', '温暖', '暴露']));
export var _ZEN_SUCCESSORS = __call__ (set, null, new set (['会長', '大統領', '段階', '理事長', '社長', '総裁', '首相']));
export var _BRIDGE_TYPE_PREDECESSORS = __call__ (set, null, new set (['高架', '可動', '水管', '人道', '跨道', '跨線', '連絡', '斜張', '張', '河口', '併用', '吊', '桁', '鉄道', '歩道', '陸', '仮設', '道路', '段', 'ＰＣ', 'アーチ', 'トラス', 'ラーメン']));
export var _DERA_PREDECESSORS = __call__ (set, null, new set (['縁切', '駆け込み', '田舎', '猫', 'だるま', '隠れ', '峯', '山', '花']));
export var _JI_PREDECESSORS = __call__ (set, null, new set (['霊山']));
export var _FUCHI_PREDECESSORS = __call__ (set, null, new set (['カップ', '器', '堀', '崖', '径', '屏風', '内側', '口', '皿', '模様', '火鉢', '金']));
export var _IRU_COMPOUND_PREDECESSORS = __call__ (set, null, new set (['走り', '攻め', '折り', '分け', '視', '駆け', '駈け', '乱れ']));
export var _OO_SUCCESSORS = __call__ (set, null, new set (['にぎわい', '丸髷', '地主', '旦那', '泥坊', '津波', '掃除', '番狂わせ', '番頭', '違い']));
export var _O_SUCCESSORS = __call__ (set, null, new set (['仕置', '屋敷', '帰り', '急ぎ', '手際', '支払い', '楽しみ', '気の毒', '田植祭', '神籤', '粗末', '言葉', '近く', '隣', '嬢']));
export var _TOOL_HANDLE_PREDECESSORS = __call__ (set, null, new set (['うちわ', 'やり', '傘', '剃刀', '団扇', '提灯', '斧', '柄杓', '槍', '洋傘', '箒', '薙刀', '鋏', '鋤', '鋸', '鍬', '錫杖']));
export var _SWORD_HILT_PREDECESSORS = __call__ (set, null, new set (['刀', '剣', '大刀', '太刀', '小剣', '懐剣', '木剣', '短刀', '短剣', '脇差', '軍刀', '長脇差', '鎧通し']));
export var _DISABILITY_ENUMERATION_TERMS = __call__ (set, null, new set (['盲', '聾', 'ろう', '盲学校', '聾学校', 'ろう学校', '養護学校', '視覚障害', '聴覚障害', '知的障害', '肢体不自由', '病弱']));
export var _NEGATIVE_ORIGINALS = __call__ (set, null, new set (['ない', '無い', 'ぬ', 'ん', 'まい', 'ず']));
export var _NANNIMO_PREDICATES = __call__ (set, null, new set (['知る', 'わかる', '分かる', '分る', 'する', '出来る', 'なる', '言う', 'やる', '食べる', '聞く', '答える', 'ある', 'ない', '無い', '面白い']));
export var _COMPOUND_SUFFIX_READINGS = dict ({'不足': tuple (['ブソク', 'ブソク', 'サ変接続']), '焼': tuple (['ヤキ', 'ヤキ', '接尾']), '峡': tuple (['キョウ', 'キョー', '一般']), '屯': tuple (['トン', 'トン', 'サ変接続']), '角形': tuple (['カクケイ', 'カクケー', '一般']), '通': tuple (['ドオリ', 'ドーリ', '固有名詞']), '旗': tuple (['キ', 'キ', '一般']), '環': tuple (['カン', 'カン', null]), '洞': tuple (['ドウ', 'ドー', null]), '湖': tuple (['コ', 'コ', null]), '唇': tuple (['シン', 'シン', null]), '印': tuple (['イン', 'イン', null]), '塚': tuple (['ズカ', 'ズカ', null]), '小屋': tuple (['ゴヤ', 'ゴヤ', null]), '部屋': tuple (['ベヤ', 'ベヤ', null]), '付': tuple (['ツキ', 'ツキ', '接尾']), '金': tuple (['キン', 'キン', '一般']), '公': tuple (['コウ', 'コー', '一般']), '硬': tuple (['コウ', 'コー', null])});
export var _ADJACENT_WORD_READINGS = dict ({'一見': tuple ([tuple ([null, null, __call__ (set, null, new set (['さん'])), 'イチゲン', null])]), '一声': tuple ([tuple ([null, null, __call__ (set, null, new set (['かけ', '掛け', 'かける', '掛ける'])), 'ヒトコエ', null])]), '一行': tuple ([tuple ([null, null, __call__ (set, null, new set (['ごと', '毎'])), 'イチギョウ', 'イチギョー'])]), '町': tuple ([tuple ([null, null, __call__ (set, null, new set (['史'])), 'チョウ', 'チョー'])]), '一': tuple ([tuple ([null, null, __call__ (set, null, new set (['しょ'])), 'イッ', null])]), '兵': tuple ([tuple ([null, null, __call__ (set, null, new set (['ども', '共'])), 'ツワモノ', null])]), '如何': tuple ([tuple ([null, null, __call__ (set, null, new set (['で', 'です', 'でし', 'でしょ'])), 'イカガ', null])]), '房': tuple ([tuple ([null, __call__ (set, null, new set (['保護'])), null, 'ボウ', 'ボー'])]), '五月': tuple ([tuple ([null, null, __call__ (set, null, new set (['期'])), 'ゴガツ', null])]), '都': tuple ([tuple ([null, null, __call__ (set, null, new set (['大会', '戸山', '公安', '副知事'])), 'ト', null])]), '露': tuple ([tuple ([null, null, __call__ (set, null, new set (['対'])), 'ロ', null])]), '十勝': tuple ([tuple ([null, null, __call__ (set, null, new set (['し', 'したん', 'する'])), 'ジュッショウ', 'ジュッショー'])]), '仏': tuple ([tuple ([null, __call__ (set, null, new set (['阿弥陀', '釈迦', '大日', '薬師', '毘盧遮那'])), null, 'ブツ', null])]), '方': tuple ([tuple ([null, _HONORIFIC_PLURAL_PREDECESSORS, null, 'ガタ', null])]), '前': tuple ([tuple ([null, _ZEN_PREDECESSORS, null, 'ゼン', null]), tuple ([null, null, _ZEN_SUCCESSORS, 'ゼン', null])]), '様': tuple ([tuple ([null, __call__ (set, null, new set (['同じ'])), null, 'ヨウ', 'ヨー'])]), '橋': tuple ([tuple ([null, _BRIDGE_TYPE_PREDECESSORS, null, 'キョウ', 'キョー'])]), '寺': tuple ([tuple ([null, _DERA_PREDECESSORS, null, 'デラ', null]), tuple ([null, _JI_PREDECESSORS, null, 'ジ', null])]), '小屋': tuple ([tuple ([null, __call__ (set, null, new set (['寺'])), null, 'コヤ', null])]), '大': tuple ([tuple (['名詞接続', null, _OO_SUCCESSORS, 'オオ', 'オー'])]), '御': tuple ([tuple (['名詞接続', null, _O_SUCCESSORS, 'オ', null])]), '尼': tuple ([tuple ([null, __call__ (set, null, new set (['修道', '比丘'])), null, 'ニ', null])]), '於': tuple ([tuple ([null, null, __call__ (set, null, new set (['て', 'ては', 'ても'])), 'オイ', null])]), '識': tuple ([tuple ([null, null, __call__ (set, null, new set (['って', 'った', 'り'])), 'シ', null])]), '了': tuple ([tuple ([null, __call__ (set, null, new set (['て', 'で'])), null, 'シマ', null])]), '博士': tuple ([tuple ([null, null, __call__ (set, null, new set (['学位', '論文', '号', '課程'])), 'ハクシ', null]), tuple ([null, __call__ (set, null, new set (['医学', '工学', '理学', '農学', '薬学', '文学', '法学', '経済学', '大学院'])), null, 'ハクシ', null])]), '章': tuple ([tuple (['固有名詞', __call__ (set, null, new set (['記念'])), null, 'ショウ', 'ショー'])])});
export var modify_context_reading = function (njd_features) {
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
	__call__ (fill_missing_feature_flags, null, njd_features);
	for (var index = 0; index < __call__ (len, null, njd_features); index++) {
		var __iterable0__ = tuple ([_read_hair_tying_motoyui, _read_verdict_kokubyaku, _read_awakening_kaigen, _read_sonohoka, _read_comparative_yoi, _read_figurative_asu, _read_petal_kaben, _read_dull_niburu, _read_water_surface_omote, _read_ametsuchi, _read_municipal_enumeration, _read_origin_moto, _read_water_master_nushi, _read_musashi_name, _read_old_loom_hata, _read_central_kaname, _read_melodic_fushi, _read_enduring_taeru, _read_shrine_yashiro, _read_impurity_kegare, _read_giving_up_ne, _read_cloth_beniiro, _read_disability_enumeration, _read_ichiban_suki]);
		__iterable0__ = __i__ (__iterable0__);
		for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
			var independent_rule = __getitem__ (__iterable0__, __index0__);
			__call__ (independent_rule, null, njd_features, index);
		}
		var __iterable0__ = tuple ([_read_nannimo, _read_body_karada, _read_face_omote, _read_capsized_kutsugae, _read_edge_kiwa, _read_chanted_shomyo, _read_hemp_cloth_asanuno, _read_age_before_twenty, _read_age_past_twenty, _read_counted_too, _read_all_day_juu, _read_kin, _read_mae_after_sahen_noun, _read_by_adjacent_word, _read_futsu_parenthetical_country, _read_kamei_after_person_name, _read_to_administration, _read_you_auxiliary, _read_kami_era_yo, _read_abstract_moto, _read_digit_position, _read_bashi_suffix, _read_mono, _read_compound_iru, _read_leave_houtte, _read_ooyake, _read_handle_e_or_tsuka, _read_rim_fuchi, _read_teahouse_jaya, _read_honorific_ou, _read_tokoro, _read_shiita, _read_sourou, _read_hoka, _read_compound_suffix, _read_ra_or_tou]);
		__iterable0__ = __i__ (__iterable0__);
		for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
			var exclusive_rule = __getitem__ (__iterable0__, __index0__);
			if (__t__ (__call__ (exclusive_rule, null, njd_features, index))) {
				break;
			}
		}
	}
	return njd_features;
};
export var _feature_at = function (njd_features, position) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'njd_features': var njd_features = __allkwargs0__ [__attrib0__]; break;
					case 'position': var position = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	return (__t__ ((__le__ (0, position) && __lt__ (position, __call__ (len, null, njd_features)))) ? __getitem__ (njd_features, position) : null);
};
export var _set_reading = function (njd_features, index, reading, pronunciation) {
	if (typeof pronunciation == 'undefined' || (pronunciation != null && pronunciation.hasOwnProperty ("__kwargtrans__"))) {;
		var pronunciation = null;
	};
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'njd_features': var njd_features = __allkwargs0__ [__attrib0__]; break;
					case 'index': var index = __allkwargs0__ [__attrib0__]; break;
					case 'reading': var reading = __allkwargs0__ [__attrib0__]; break;
					case 'pronunciation': var pronunciation = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var feature = __getitem__ (njd_features, index);
	if (__t__ (__getitem__ (feature, 'is_reading_protected') === true)) {
		return ;
	}
	var new_pronunciation = (__t__ (pronunciation === null) ? reading : pronunciation);
	if (__t__ (__t__ (__eq__ (__getitem__ (feature, 'read'), reading)) && __eq__ ((function () {
		var __accu0__ = __getitem__ (feature, 'pron');
		return __call__ (__accu0__.py_replace, __accu0__, '’', '');
	}) (), new_pronunciation))) {
		return ;
	}
	var old_mora_size = __getitem__ (feature, 'mora_size');
	var old_pronunciation = (function () {
		var __accu0__ = __getitem__ (feature, 'pron');
		return __call__ (__accu0__.py_replace, __accu0__, '’', '');
	}) ();
	__setitem__ (feature, 'read', reading);
	__setitem__ (feature, 'pron', new_pronunciation);
	__setitem__ (feature, 'mora_size', __call__ (len, null, __call__ (split_kana_mora, null, __getitem__ (feature, 'pron'))));
	if (__t__ (__ne__ (__getitem__ (feature, 'mora_size'), old_mora_size))) {
		var head = index;
		while (__t__ (__t__ (__gt__ (head, 0)) && __eq__ (__getitem__ (__getitem__ (njd_features, head), 'chain_flag'), 1))) {
			var head = __call__ (__isub__, null, head, 1);
		}
		var preceding_mora_size = __call__ (sum, null, (function () {
			var __accu0__ = [];
			var __iterable0__ = __getslice__ (njd_features, head, index, 1);
			__iterable0__ = __i__ (__iterable0__);
			for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
				var node = __getitem__ (__iterable0__, __index0__);
				(function () {
					var __accu1__ = __accu0__;
					return __call__ (__accu1__.append, __accu1__, __getitem__ (node, 'mora_size'));
				}) ();
			}
			return __accu0__;
		}) ());
		var accent = __getitem__ (__getitem__ (njd_features, head), 'acc');
		if (__t__ (__gt__ (accent, __add__ (preceding_mora_size, old_mora_size)))) {
			__setitem__ (__getitem__ (njd_features, head), 'acc', __call__ (__iadd__, null, __getitem__ (__getitem__ (njd_features, head), 'acc'), __sub__ (__getitem__ (feature, 'mora_size'), old_mora_size)));
		}
		else if (__t__ (__gt__ (accent, preceding_mora_size))) {
			if (__t__ (__t__ (__eq__ (__getitem__ (feature, 'string'), '湖')) && __t__ (__eq__ (old_pronunciation, 'ミズウミ')) && __t__ (__eq__ (new_pronunciation, 'コ')) && __t__ (__le__ (__add__ (preceding_mora_size, __getitem__ (feature, 'mora_size')), 3)) && __gt__ (accent, __add__ (preceding_mora_size, __getitem__ (feature, 'mora_size'))))) {
				__setitem__ (__getitem__ (njd_features, head), 'acc', preceding_mora_size);
			}
			else {
				__setitem__ (__getitem__ (njd_features, head), 'acc', __add__ (preceding_mora_size, __call__ (min, null, __sub__ (accent, preceding_mora_size), __getitem__ (feature, 'mora_size'))));
			}
		}
	}
};
export var _set_accent = function (njd_features, index, accent) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'njd_features': var njd_features = __allkwargs0__ [__attrib0__]; break;
					case 'index': var index = __allkwargs0__ [__attrib0__]; break;
					case 'accent': var accent = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var feature = __getitem__ (njd_features, index);
	__setitem__ (feature, 'acc', accent);
	var phrase_mora_size = __getitem__ (feature, 'mora_size');
	for (var cursor = __add__ (index, 1); cursor < __call__ (len, null, njd_features); cursor++) {
		var node = __getitem__ (njd_features, cursor);
		if (__t__ (__t__ (__ne__ (__getitem__ (node, 'chain_flag'), 1)) || !__in__ (__getitem__ (node, 'pos'), new set (['助詞', '助動詞'])))) {
			break;
		}
		var __iterable0__ = (function () {
			var __accu0__ = __getitem__ (node, 'chain_rule');
			return __call__ (__accu0__.py_split, __accu0__, '/');
		}) ();
		__iterable0__ = __i__ (__iterable0__);
		for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
			var rule = __getitem__ (__iterable0__, __index0__);
			var __left0__ = (function () {
				var __accu0__ = rule;
				return __call__ (__accu0__.partition, __accu0__, '%');
			}) ();
			var part_of_speech = __left0__ [0];
			var separator = __left0__ [1];
			var suffix = __left0__ [2];
			if (__t__ (__t__ (separator) && !__in__ (part_of_speech, __getitem__ (__getitem__ (njd_features, __sub__ (cursor, 1)), 'pos')))) {
				continue;
			}
			var __left0__ = (function () {
				var __accu0__ = (__t__ (separator) ? suffix : rule);
				return __call__ (__accu0__.partition, __accu0__, '@');
			}) ();
			var rule_name = __left0__ [0];
			var _ = __left0__ [1];
			var offset = __left0__ [2];
			if (__t__ (__t__ (__t__ (__eq__ (rule_name, 'F2')) && __eq__ (__getitem__ (feature, 'acc'), 0)) || __t__ (__t__ (__eq__ (rule_name, 'F3')) && __ne__ (__getitem__ (feature, 'acc'), 0)) || __eq__ (rule_name, 'F4'))) {
				__setitem__ (feature, 'acc', __add__ (phrase_mora_size, (__t__ (offset) ? __call__ (int, null, offset) : 0)));
			}
			else if (__t__ (__in__ (rule_name, new set (['F5', 'C4'])))) {
				__setitem__ (feature, 'acc', 0);
			}
			break;
		}
		var phrase_mora_size = __call__ (__iadd__, null, phrase_mora_size, __getitem__ (node, 'mora_size'));
	}
};
export var _sentence_words = function (njd_features, index) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'njd_features': var njd_features = __allkwargs0__ [__attrib0__]; break;
					case 'index': var index = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var start = index;
	while (__t__ (__t__ (__gt__ (start, 0)) && !__in__ (__getitem__ (__getitem__ (njd_features, __sub__ (start, 1)), 'string'), new set (['。', '！', '？'])))) {
		var start = __call__ (__isub__, null, start, 1);
	}
	var end = __add__ (index, 1);
	while (__t__ (__t__ (__lt__ (end, __call__ (len, null, njd_features))) && !__in__ (__getitem__ (__getitem__ (njd_features, end), 'string'), new set (['。', '！', '？'])))) {
		var end = __call__ (__iadd__, null, end, 1);
	}
	return (function () {
		var __accu0__ = [];
		var __iterable0__ = __getslice__ (njd_features, start, end, 1);
		__iterable0__ = __i__ (__iterable0__);
		for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
			var node = __getitem__ (__iterable0__, __index0__);
			(function () {
				var __accu1__ = __accu0__;
				return __call__ (__accu1__.append, __accu1__, __getitem__ (node, 'orig'));
			}) ();
		}
		return set (__accu0__);
	}) ();
};
export var _read_hair_tying_motoyui = function (njd_features, index) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'njd_features': var njd_features = __allkwargs0__ [__attrib0__]; break;
					case 'index': var index = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var feature = __getitem__ (njd_features, index);
	var previous = __call__ (_feature_at, null, njd_features, __sub__ (index, 1));
	if (__t__ (__t__ (__eq__ (__getitem__ (feature, 'string'), '元結')) && __t__ (__eq__ (__getitem__ (feature, 'pos'), '名詞')) && __t__ (__eq__ (__getitem__ (feature, 'pos_group1'), '一般')) && __t__ ((__t__ (previous === null) || !__in__ (__getitem__ (previous, 'pos'), new set (['名詞', '接頭詞'])))) && __t__ (!__t__ ((__getitem__ (feature, 'is_reading_protected')))) && __call__ (_is_hair_tying_motoyui, null, njd_features, index))) {
		__call__ (_set_reading, null, njd_features, index, 'モトユイ');
		__call__ (_set_accent, null, njd_features, index, 3);
	}
};
export var _is_hair_tying_motoyui = function (njd_features, position) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'njd_features': var njd_features = __allkwargs0__ [__attrib0__]; break;
					case 'position': var position = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var paragraph = __call__ (join_strings, null, '', (function () {
		var __accu0__ = [];
		var __iterable0__ = njd_features;
		__iterable0__ = __i__ (__iterable0__);
		for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
			var node = __getitem__ (__iterable0__, __index0__);
			(function () {
				var __accu1__ = __accu0__;
				return __call__ (__accu1__.append, __accu1__, __getitem__ (node, 'string'));
			}) ();
		}
		return __accu0__;
	}) ());
	if (__t__ (__t__ (__in__ ('もっとい', paragraph)) || __in__ ('モットイ', paragraph))) {
		return false;
	}
	var boundaries = new set (['。', '？', '！', '?', '!', '\n', '\r', '\r\n']);
	var start = position;
	while (__t__ (__t__ (__gt__ (start, 0)) && !__in__ (__getitem__ (__getitem__ (njd_features, __sub__ (start, 1)), 'string'), boundaries))) {
		var start = __call__ (__isub__, null, start, 1);
	}
	var end = __add__ (position, 1);
	while (__t__ (__t__ (__lt__ (end, __call__ (len, null, njd_features))) && !__in__ (__getitem__ (__getitem__ (njd_features, end), 'string'), boundaries))) {
		var end = __call__ (__iadd__, null, end, 1);
	}
	return __call__ (any, null, (function () {
		var __accu0__ = [];
		var __iterable0__ = __getslice__ (njd_features, start, end, 1);
		__iterable0__ = __i__ (__iterable0__);
		for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
			var node = __getitem__ (__iterable0__, __index0__);
			(function () {
				var __accu1__ = __accu0__;
				return __call__ (__accu1__.append, __accu1__, __in__ (__getitem__ (node, 'orig'), new set (['髷', '髻', '髪', '黒髪', '頭髪', '長髪', '結髪', '髪結い', '髪結', '結う', '侍', '力士'])));
			}) ();
		}
		return __accu0__;
	}) ());
};
export var _read_verdict_kokubyaku = function (njd_features, index) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'njd_features': var njd_features = __allkwargs0__ [__attrib0__]; break;
					case 'index': var index = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var feature = __getitem__ (njd_features, index);
	var following = __call__ (_feature_at, null, njd_features, __add__ (index, 1));
	if (__t__ (__t__ (__eq__ (__getitem__ (feature, 'string'), '黒白')) && __t__ (following !== null) && __t__ (__in__ (__getitem__ (following, 'string'), new set (['を', 'が']))) && __t__ (__lt__ (__add__ (index, 2), __call__ (len, null, njd_features))) && __t__ ((__t__ (__t__ (__eq__ (__getitem__ (following, 'string'), 'を')) && __in__ (__getitem__ (__getitem__ (njd_features, __add__ (index, 2)), 'orig'), new set (['つける', '付ける', '争う', '決める']))) || __eq__ (__getitem__ (__getitem__ (njd_features, __add__ (index, 2)), 'string'), '明らか'))) && !__t__ ((__getitem__ (feature, 'is_reading_protected'))))) {
		__call__ (_set_reading, null, njd_features, index, 'コクビャク');
		__call__ (_set_accent, null, njd_features, index, 0);
	}
};
export var _read_awakening_kaigen = function (njd_features, index) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'njd_features': var njd_features = __allkwargs0__ [__attrib0__]; break;
					case 'index': var index = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var feature = __getitem__ (njd_features, index);
	var previous = __call__ (_feature_at, null, njd_features, __sub__ (index, 1));
	var previous_previous = __call__ (_feature_at, null, njd_features, __sub__ (index, 2));
	var following = __call__ (_feature_at, null, njd_features, __add__ (index, 1));
	if (__t__ (__t__ (__eq__ (__getitem__ (feature, 'string'), '開眼')) && __t__ ((__t__ (following === null) || !__in__ (__getitem__ (following, 'string'), new set (['（', '('])))) && __t__ ((__t__ (__t__ (previous !== null) && __t__ (__eq__ (__getitem__ (previous, 'string'), 'に')) && __t__ (previous_previous !== null) && __in__ (__getitem__ (previous_previous, 'string'), new set (['真髄', '技芸', '悟り', '境地', '禅', '音楽', '芸術', '剣術', '書道', '茶道', 'ワイン', 'ゴルフ']))) || __t__ (previous !== null) && __t__ (__eq__ (__getitem__ (previous, 'string'), 'て')) && __t__ (__ge__ (index, 4)) && __t__ (__eq__ (__getitem__ (__getitem__ (njd_features, __sub__ (index, 2)), 'orig'), '得る')) && __t__ (__eq__ (__getitem__ (__getitem__ (njd_features, __sub__ (index, 3)), 'string'), 'を')) && __eq__ (__getitem__ (__getitem__ (njd_features, __sub__ (index, 4)), 'string'), '悟り'))) && !__t__ ((__getitem__ (feature, 'is_reading_protected'))))) {
		__call__ (_set_reading, null, njd_features, index, 'カイゲン');
		__call__ (_set_accent, null, njd_features, index, 0);
	}
};
export var _read_sonohoka = function (njd_features, index) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'njd_features': var njd_features = __allkwargs0__ [__attrib0__]; break;
					case 'index': var index = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var following = __call__ (_feature_at, null, njd_features, __add__ (index, 1));
	if (__t__ (__t__ (__eq__ (__getitem__ (__getitem__ (njd_features, index), 'string'), 'その他')) && __t__ (following !== null) && __t__ (__eq__ (__getitem__ (following, 'string'), 'に')) && (__t__ (__eq__ (__add__ (index, 2), __call__ (len, null, njd_features))) || !__in__ (__getitem__ (__getitem__ (njd_features, __add__ (index, 2)), 'orig'), new set (['分類', '区分', '分類する', '区分する', '含める', '入れる']))))) {
		__call__ (_set_reading, null, njd_features, index, 'ソノホカ');
	}
};
export var _read_comparative_yoi = function (njd_features, index) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'njd_features': var njd_features = __allkwargs0__ [__attrib0__]; break;
					case 'index': var index = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var surface = __getitem__ (__getitem__ (njd_features, index), 'string');
	var previous = __call__ (_feature_at, null, njd_features, __sub__ (index, 1));
	if (__t__ (__eq__ (surface, 'より良い'))) {
		__call__ (_set_reading, null, njd_features, index, 'ヨリヨイ');
	}
	else if (__t__ (__t__ (__eq__ (surface, '良い')) && __t__ (previous !== null) && __t__ (__eq__ (__getitem__ (previous, 'string'), 'より')) && __eq__ (__getitem__ (previous, 'pos'), '副詞'))) {
		__call__ (_set_reading, null, njd_features, index, 'ヨイ');
	}
};
export var _read_figurative_asu = function (njd_features, index) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'njd_features': var njd_features = __allkwargs0__ [__attrib0__]; break;
					case 'index': var index = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var feature = __getitem__ (njd_features, index);
	var following = __call__ (_feature_at, null, njd_features, __add__ (index, 1));
	if (__t__ (__t__ (__eq__ (__getitem__ (feature, 'string'), '明日')) && __t__ (following !== null) && __t__ (__eq__ (__getitem__ (following, 'string'), 'の')) && __t__ (__lt__ (__add__ (index, 2), __call__ (len, null, njd_features))) && __t__ (__in__ (__getitem__ (__getitem__ (njd_features, __add__ (index, 2)), 'string'), new set (['日本', '社会', '未来', '国', '世界']))) && __t__ ((__t__ (__eq__ (__add__ (index, 3), __call__ (len, null, njd_features))) || __in__ (__getitem__ (__getitem__ (njd_features, __add__ (index, 3)), 'pos'), new set (['助詞', '助動詞', '記号'])))) && !__t__ ((__getitem__ (feature, 'is_reading_protected'))))) {
		__call__ (_set_reading, null, njd_features, index, 'アス');
		__call__ (_set_accent, null, njd_features, index, 2);
	}
};
export var _read_petal_kaben = function (njd_features, index) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'njd_features': var njd_features = __allkwargs0__ [__attrib0__]; break;
					case 'index': var index = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var feature = __getitem__ (njd_features, index);
	var following = __call__ (_feature_at, null, njd_features, __add__ (index, 1));
	if (__t__ (__t__ (__eq__ (__getitem__ (feature, 'string'), '花弁')) && __t__ (following !== null) && __t__ (__in__ (__getitem__ (following, 'pos'), new set (['助詞', '助動詞']))) && !__t__ ((__getitem__ (feature, 'is_reading_protected'))))) {
		var has_particle_accent = __gt__ (__getitem__ (feature, 'acc'), __getitem__ (feature, 'mora_size'));
		__call__ (_set_reading, null, njd_features, index, 'カベン');
		if (__t__ (!__t__ ((has_particle_accent)))) {
			__call__ (_set_accent, null, njd_features, index, 0);
		}
	}
};
export var _read_dull_niburu = function (njd_features, index) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'njd_features': var njd_features = __allkwargs0__ [__attrib0__]; break;
					case 'index': var index = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var feature = __getitem__ (njd_features, index);
	var previous = __call__ (_feature_at, null, njd_features, __sub__ (index, 1));
	var previous_previous = __call__ (_feature_at, null, njd_features, __sub__ (index, 2));
	if (__t__ (__t__ (__eq__ (__getitem__ (feature, 'orig'), '鈍る')) && __t__ (previous !== null) && __t__ (__in__ (__getitem__ (previous, 'string'), new set (['が', 'は', 'も']))) && __t__ (previous_previous !== null) && __t__ (__eq__ (__getitem__ (previous_previous, 'string'), '切れ味')) && (function () {
		var __accu0__ = __getitem__ (feature, 'read');
		return __call__ (__accu0__.startswith, __accu0__, 'ナマ');
	}) ())) {
		__call__ (_set_reading, null, njd_features, index, __add__ ('ニブ', __getslice__ (__getitem__ (feature, 'read'), 2, null, 1)));
	}
};
export var _read_water_surface_omote = function (njd_features, index) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'njd_features': var njd_features = __allkwargs0__ [__attrib0__]; break;
					case 'index': var index = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var feature = __getitem__ (njd_features, index);
	var surface = __getitem__ (feature, 'string');
	var previous = __call__ (_feature_at, null, njd_features, __sub__ (index, 1));
	var previous_previous = __call__ (_feature_at, null, njd_features, __sub__ (index, 2));
	var following = __call__ (_feature_at, null, njd_features, __add__ (index, 1));
	if (__t__ (__t__ ((__t__ (__t__ (__eq__ (surface, '水の面')) && (__t__ (previous === null) || !__in__ (__getitem__ (previous, 'pos'), new set (['名詞', '接頭詞'])))) || __t__ (__eq__ (surface, '面')) && __t__ (previous !== null) && __t__ (__eq__ (__getitem__ (previous, 'string'), 'の')) && __t__ (previous_previous !== null) && __t__ (__eq__ (__getitem__ (previous_previous, 'string'), '水')) && __eq__ (__getitem__ (feature, 'pos_group1'), '一般'))) && __t__ (following !== null) && __t__ (__in__ (__getitem__ (following, 'string'), new set (['に', 'を', 'が', 'は']))) && !__t__ ((__getitem__ (feature, 'is_reading_protected'))))) {
		var __iterable0__ = __getslice__ (njd_features, __add__ (index, 2), null, 1);
		__iterable0__ = __i__ (__iterable0__);
		for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
			var node = __getitem__ (__iterable0__, __index0__);
			if (__t__ (__eq__ (__getitem__ (node, 'pos'), '記号'))) {
				break;
			}
			if (__t__ (__t__ (__eq__ (__getitem__ (node, 'pos'), '動詞')) && __eq__ (__getitem__ (node, 'pos_group1'), '自立'))) {
				if (__t__ (__in__ (__getitem__ (node, 'orig'), new set (['映る', '浮かぶ', '揺れる', '覆う', '蔽う', '見つめる', '眺める'])))) {
					__call__ (_set_reading, null, njd_features, index, (__t__ (__eq__ (surface, '水の面')) ? 'ミズノオモテ' : 'オモテ'));
					__call__ (_set_accent, null, njd_features, index, (__t__ (__eq__ (surface, '水の面')) ? 6 : 3));
				}
				break;
			}
		}
	}
};
export var _read_ametsuchi = function (njd_features, index) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'njd_features': var njd_features = __allkwargs0__ [__attrib0__]; break;
					case 'index': var index = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var feature = __getitem__ (njd_features, index);
	var following = __call__ (_feature_at, null, njd_features, __add__ (index, 1));
	if (__t__ (__t__ (__eq__ (__getitem__ (feature, 'string'), '天地')) && __t__ (following !== null) && __t__ (__eq__ (__getitem__ (following, 'string'), 'の')) && __t__ (__lt__ (__add__ (index, 2), __call__ (len, null, njd_features))) && __t__ (__eq__ (__getitem__ (__getitem__ (njd_features, __add__ (index, 2)), 'string'), '道')) && __t__ (__eq__ (__getitem__ (__getitem__ (njd_features, __add__ (index, 2)), 'pos_group1'), '一般')) && __t__ ((__t__ (__eq__ (__add__ (index, 3), __call__ (len, null, njd_features))) || __in__ (__getitem__ (__getitem__ (njd_features, __add__ (index, 3)), 'pos'), new set (['助詞', '助動詞', '記号'])))) && !__t__ ((__getitem__ (feature, 'is_reading_protected'))))) {
		__call__ (_set_reading, null, njd_features, index, 'アメツチ');
		__call__ (_set_accent, null, njd_features, index, 1);
	}
};
export var _read_municipal_enumeration = function (njd_features, index) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'njd_features': var njd_features = __allkwargs0__ [__attrib0__]; break;
					case 'index': var index = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var feature = __getitem__ (njd_features, index);
	var surface = __getitem__ (feature, 'string');
	if (__t__ (__t__ (__in__ (surface, new set (['町', '村']))) && __t__ (__eq__ (__getitem__ (feature, 'pos_group1'), '一般')) && __t__ (__call__ (_is_municipal_enumeration, null, njd_features, index)) && !__t__ ((__getitem__ (feature, 'is_reading_protected'))))) {
		__call__ (_set_reading, null, njd_features, index, (__t__ (__eq__ (surface, '町')) ? 'チョウ' : 'ソン'), (__t__ (__eq__ (surface, '町')) ? 'チョー' : 'ソン'));
		__call__ (_set_accent, null, njd_features, index, 1);
	}
};
export var _is_municipal_enumeration = function (njd_features, position) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'njd_features': var njd_features = __allkwargs0__ [__attrib0__]; break;
					case 'position': var position = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var names = new set ([__getitem__ (__getitem__ (njd_features, position), 'string')]);
	var __iterable0__ = tuple ([__neg__ (1), 1]);
	__iterable0__ = __i__ (__iterable0__);
	for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
		var step = __getitem__ (__iterable0__, __index0__);
		var cursor = __add__ (position, step);
		while (__t__ ((__le__ (0, __add__ (cursor, step)) && __lt__ (__add__ (cursor, step), __call__ (len, null, njd_features))))) {
			var separator = __getitem__ (njd_features, cursor);
			var node = __getitem__ (njd_features, __add__ (cursor, step));
			if (__t__ (__t__ (!__in__ (__getitem__ (separator, 'string'), new set (['、', '・']))) || __t__ (!__in__ (__getitem__ (node, 'string'), new set (['市', '町', '村']))) || __t__ (__ne__ (__getitem__ (node, 'pos'), '名詞')) || __ne__ (__getitem__ (node, 'pos_group1'), '一般'))) {
				break;
			}
			(function () {
				var __accu0__ = names;
				return __call__ (__accu0__.add, __accu0__, __getitem__ (node, 'string'));
			}) ();
			var cursor = __call__ (__iadd__, null, cursor, __mul__ (2, step));
		}
	}
	return __t__ (__in__ ('市', names)) && __gt__ (__call__ (len, null, names), 1);
};
export var _read_origin_moto = function (njd_features, index) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'njd_features': var njd_features = __allkwargs0__ [__attrib0__]; break;
					case 'index': var index = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var feature = __getitem__ (njd_features, index);
	var following = __call__ (_feature_at, null, njd_features, __add__ (index, 1));
	if (__t__ (__t__ (__eq__ (__getitem__ (feature, 'string'), '本')) && __t__ (__eq__ (__getitem__ (feature, 'pos'), '名詞')) && __t__ (!__t__ ((__getitem__ (feature, 'is_reading_protected')))) && __t__ (following !== null) && __t__ (__eq__ (__getitem__ (following, 'string'), 'を')) && __t__ (__lt__ (__add__ (index, 2), __call__ (len, null, njd_features))) && __eq__ (__getitem__ (__getitem__ (njd_features, __add__ (index, 2)), 'orig'), '正す'))) {
		__call__ (_set_reading, null, njd_features, index, 'モト');
		if (__t__ (__ne__ (__getitem__ (feature, 'chain_flag'), 1))) {
			__call__ (_set_accent, null, njd_features, index, 2);
		}
	}
};
export var _read_water_master_nushi = function (njd_features, index) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'njd_features': var njd_features = __allkwargs0__ [__attrib0__]; break;
					case 'index': var index = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var feature = __getitem__ (njd_features, index);
	var previous = __call__ (_feature_at, null, njd_features, __sub__ (index, 1));
	var previous_previous = __call__ (_feature_at, null, njd_features, __sub__ (index, 2));
	if (__t__ (__t__ (__eq__ (__getitem__ (feature, 'string'), '主として')) && __t__ (__eq__ (__getitem__ (feature, 'pos'), '副詞')) && __t__ (!__t__ ((__getitem__ (feature, 'is_reading_protected')))) && __t__ (previous !== null) && __t__ (__eq__ (__getitem__ (previous, 'string'), 'の')) && __t__ (__eq__ (__getitem__ (previous, 'pos_group1'), '連体化')) && __t__ (previous_previous !== null) && __t__ (__eq__ (__getitem__ (previous_previous, 'pos'), '名詞')) && (__t__ (__in__ (__getitem__ (previous_previous, 'string'), new set (['湖', '沼', '池']))) || (function () {
		var __accu0__ = __getitem__ (previous_previous, 'string');
		return __call__ (__accu0__.endswith, __accu0__, '湖');
	}) ()))) {
		__call__ (_set_reading, null, njd_features, index, 'ヌシトシテ');
		if (__t__ (__ne__ (__getitem__ (feature, 'chain_flag'), 1))) {
			__call__ (_set_accent, null, njd_features, index, 1);
		}
	}
};
export var _read_musashi_name = function (njd_features, index) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'njd_features': var njd_features = __allkwargs0__ [__attrib0__]; break;
					case 'index': var index = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var previous = __call__ (_feature_at, null, njd_features, __sub__ (index, 1));
	var previous_previous = __call__ (_feature_at, null, njd_features, __sub__ (index, 2));
	if (__t__ (__t__ (__eq__ (__getitem__ (__getitem__ (njd_features, index), 'string'), '六')) && __t__ (__lt__ (__add__ (index, 2), __call__ (len, null, njd_features))) && __t__ (__eq__ ((function () {
		var __accu0__ = [];
		var __iterable0__ = __getslice__ (njd_features, index, __add__ (index, 3), 1);
		__iterable0__ = __i__ (__iterable0__);
		for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
			var node = __getitem__ (__iterable0__, __index0__);
			(function () {
				var __accu1__ = __accu0__;
				return __call__ (__accu1__.append, __accu1__, __getitem__ (node, 'string'));
			}) ();
		}
		return __accu0__;
	}) (), ['六', '三', '四'])) && __t__ (__call__ (all, null, (function () {
		var __accu0__ = [];
		var __iterable0__ = __getslice__ (njd_features, index, __add__ (index, 3), 1);
		__iterable0__ = __i__ (__iterable0__);
		for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
			var node = __getitem__ (__iterable0__, __index0__);
			(function () {
				var __accu1__ = __accu0__;
				return __call__ (__accu1__.append, __accu1__, __eq__ (__getitem__ (node, 'pos_group1'), '数'));
			}) ();
		}
		return __accu0__;
	}) ())) && __t__ (!__t__ ((__call__ (any, null, (function () {
		var __accu0__ = [];
		var __iterable0__ = __getslice__ (njd_features, index, __add__ (index, 3), 1);
		__iterable0__ = __i__ (__iterable0__);
		for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
			var node = __getitem__ (__iterable0__, __index0__);
			(function () {
				var __accu1__ = __accu0__;
				return __call__ (__accu1__.append, __accu1__, __getitem__ (node, 'is_reading_protected'));
			}) ();
		}
		return __accu0__;
	}) ())))) && __t__ ((__t__ (previous === null) || __ne__ (__getitem__ (previous, 'pos_group1'), '数'))) && __t__ ((__t__ (__eq__ (__add__ (index, 3), __call__ (len, null, njd_features))) || __ne__ (__getitem__ (__getitem__ (njd_features, __add__ (index, 3)), 'pos_group1'), '数'))) && (__t__ (__t__ (previous !== null) && __t__ (__in__ (__getitem__ (previous, 'string'), new set (['は', 'が']))) && __t__ (previous_previous !== null) && __in__ (__getitem__ (previous_previous, 'string'), new set (['名前', '氏名', '名']))) || __t__ (__t__ (__lt__ (__add__ (index, 3), __call__ (len, null, njd_features))) && __t__ (__in__ (__getitem__ (__getitem__ (njd_features, __add__ (index, 3)), 'string'), new set (['くん', '君', 'さん']))) && __eq__ (__getitem__ (__getitem__ (njd_features, __add__ (index, 3)), 'pos_group1'), '接尾')) || __t__ (__lt__ (__add__ (index, 5), __call__ (len, null, njd_features))) && __t__ (__eq__ (__getitem__ (__getitem__ (njd_features, __add__ (index, 3)), 'string'), 'と')) && __t__ (__eq__ (__getitem__ (__getitem__ (njd_features, __add__ (index, 4)), 'orig'), 'いう')) && __in__ (__getitem__ (__getitem__ (njd_features, __add__ (index, 5)), 'string'), new set (['名前', '氏名', '名']))))) {
		var __iterable0__ = __call__ (py_enumerate, null, tuple (['ム', 'サ', 'シ']));
		__iterable0__ = __i__ (__iterable0__);
		for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
			var __left0__ = __getitem__ (__iterable0__, __index0__);
			var offset = __left0__ [0];
			var reading = __left0__ [1];
			var node = __getitem__ (njd_features, __add__ (index, offset));
			var __left0__ = reading;
			__setitem__ (node, 'read', __left0__);
			__setitem__ (node, 'pron', __left0__);
			__setitem__ (node, 'mora_size', 1);
			__setitem__ (node, 'acc', (__t__ (__eq__ (offset, 0)) ? 1 : 0));
			if (__t__ (__gt__ (offset, 0))) {
				__setitem__ (node, 'chain_flag', 1);
			}
		}
	}
};
export var _read_old_loom_hata = function (njd_features, index) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'njd_features': var njd_features = __allkwargs0__ [__attrib0__]; break;
					case 'index': var index = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var feature = __getitem__ (njd_features, index);
	var previous = __call__ (_feature_at, null, njd_features, __sub__ (index, 1));
	if (__t__ (__t__ (__eq__ (__getitem__ (feature, 'string'), '機')) && __t__ (__eq__ (__getitem__ (feature, 'pos'), '名詞')) && __t__ (__ne__ (__getitem__ (feature, 'pos_group1'), '接尾')) && __t__ (previous !== null) && __t__ (__eq__ (__getitem__ (previous, 'orig'), '古い')) && !__t__ ((__getitem__ (feature, 'is_reading_protected'))))) {
		__call__ (_set_reading, null, njd_features, index, 'ハタ');
		if (__t__ (__ne__ (__getitem__ (feature, 'chain_flag'), 1))) {
			__call__ (_set_accent, null, njd_features, index, 2);
		}
	}
};
export var _read_central_kaname = function (njd_features, index) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'njd_features': var njd_features = __allkwargs0__ [__attrib0__]; break;
					case 'index': var index = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var feature = __getitem__ (njd_features, index);
	var previous = __call__ (_feature_at, null, njd_features, __sub__ (index, 1));
	var previous_previous = __call__ (_feature_at, null, njd_features, __sub__ (index, 2));
	var following = __call__ (_feature_at, null, njd_features, __add__ (index, 1));
	if (__t__ (__t__ (__eq__ (__getitem__ (feature, 'string'), '要')) && __t__ (__eq__ (__getitem__ (feature, 'pos'), '名詞')) && __t__ (previous !== null) && __t__ (__eq__ (__getitem__ (previous, 'string'), 'の')) && __t__ (__eq__ (__getitem__ (previous, 'pos'), '助詞')) && __t__ (previous_previous !== null) && __t__ (__eq__ (__getitem__ (previous_previous, 'pos'), '名詞')) && __t__ (following !== null) && __t__ (__eq__ (__getitem__ (following, 'string'), 'と')) && !__t__ ((__getitem__ (feature, 'is_reading_protected'))))) {
		__call__ (_set_reading, null, njd_features, index, 'カナメ');
		if (__t__ (__ne__ (__getitem__ (feature, 'chain_flag'), 1))) {
			__call__ (_set_accent, null, njd_features, index, 0);
		}
	}
};
export var _read_melodic_fushi = function (njd_features, index) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'njd_features': var njd_features = __allkwargs0__ [__attrib0__]; break;
					case 'index': var index = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var feature = __getitem__ (njd_features, index);
	var previous = __call__ (_feature_at, null, njd_features, __sub__ (index, 1));
	var previous_previous = __call__ (_feature_at, null, njd_features, __sub__ (index, 2));
	if (__t__ (__t__ (__eq__ (__getitem__ (feature, 'string'), '節')) && __t__ (__eq__ (__getitem__ (feature, 'pos'), '名詞')) && __t__ (previous !== null) && __t__ (__eq__ (__getitem__ (previous, 'string'), 'の')) && __t__ (previous_previous !== null) && __t__ (__in__ (__getitem__ (previous_previous, 'string'), new set (['歌', '唄']))) && !__t__ ((__getitem__ (feature, 'is_reading_protected'))))) {
		__call__ (_set_reading, null, njd_features, index, 'フシ');
		if (__t__ (__ne__ (__getitem__ (feature, 'chain_flag'), 1))) {
			__call__ (_set_accent, null, njd_features, index, 2);
		}
	}
};
export var _read_enduring_taeru = function (njd_features, index) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'njd_features': var njd_features = __allkwargs0__ [__attrib0__]; break;
					case 'index': var index = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var feature = __getitem__ (njd_features, index);
	if (__t__ (__t__ (__eq__ (__getitem__ (feature, 'orig'), '堪える')) && __t__ (__eq__ (__getitem__ (feature, 'pos'), '動詞')) && __t__ ((function () {
		var __accu0__ = __getitem__ (feature, 'read');
		return __call__ (__accu0__.startswith, __accu0__, tuple (['コタエ', 'コラエ']));
	}) ()) && !__t__ ((__getitem__ (feature, 'is_reading_protected'))))) {
		var cursor = __sub__ (index, 1);
		while (__t__ (__t__ (__ge__ (cursor, 0)) && (__t__ (__eq__ (__getitem__ (__getitem__ (njd_features, cursor), 'pos'), '副詞')) || __t__ (__eq__ (__getitem__ (__getitem__ (njd_features, cursor), 'string'), 'も')) && __eq__ (__getitem__ (__getitem__ (njd_features, cursor), 'pos'), '助詞')))) {
			var cursor = __call__ (__isub__, null, cursor, 1);
		}
		if (__t__ (__t__ (__gt__ (cursor, 0)) && __t__ (__eq__ (__getitem__ (__getitem__ (njd_features, cursor), 'string'), 'に')) && __t__ (__eq__ (__getitem__ (__getitem__ (njd_features, cursor), 'pos'), '助詞')) && __in__ (__getitem__ (__getitem__ (njd_features, __sub__ (cursor, 1)), 'orig'), new set (['痛み', '苦しみ', '苦痛', '苦難'])))) {
			var original_accent = __getitem__ (feature, 'acc');
			__call__ (_set_reading, null, njd_features, index, __add__ ('タエ', __getslice__ (__getitem__ (feature, 'read'), 3, null, 1)));
			if (__t__ (__t__ (__ne__ (__getitem__ (feature, 'chain_flag'), 1)) && __gt__ (original_accent, 0))) {
				__setitem__ (feature, 'acc', __sub__ (original_accent, 1));
			}
		}
	}
};
export var _read_shrine_yashiro = function (njd_features, index) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'njd_features': var njd_features = __allkwargs0__ [__attrib0__]; break;
					case 'index': var index = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var feature = __getitem__ (njd_features, index);
	var previous = __call__ (_feature_at, null, njd_features, __sub__ (index, 1));
	var following = __call__ (_feature_at, null, njd_features, __add__ (index, 1));
	if (__t__ (__t__ (__eq__ (__getitem__ (feature, 'string'), '社')) && __t__ (__eq__ (__getitem__ (feature, 'pos'), '名詞')) && __t__ (previous !== null) && __t__ (__eq__ (__getitem__ (previous, 'pos'), '連体詞')) && __t__ (__in__ (__getitem__ (previous, 'string'), new set (['この', 'その', 'あの']))) && __t__ (following !== null) && __t__ (__eq__ (__getitem__ (following, 'pos'), '助詞')) && !__t__ ((__getitem__ (feature, 'is_reading_protected'))))) {
		var sentence_words = __call__ (_sentence_words, null, njd_features, index);
		if (__t__ (__t__ (__and__ (sentence_words, new set (['神社', '社殿', '鳥居', '祭祀', '祀る', '神', '屋根神']))) && !__t__ ((__and__ (sentence_words, new set (['会社', '企業', '創業', '社員', '新聞', '出版', '記者', '営業', '売上'])))))) {
			__call__ (_set_reading, null, njd_features, index, 'ヤシロ');
		}
	}
};
export var _read_impurity_kegare = function (njd_features, index) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'njd_features': var njd_features = __allkwargs0__ [__attrib0__]; break;
					case 'index': var index = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var feature = __getitem__ (njd_features, index);
	var following = __call__ (_feature_at, null, njd_features, __add__ (index, 1));
	if (__t__ (__t__ (__eq__ (__getitem__ (feature, 'string'), '汚れ')) && __t__ (__eq__ (__getitem__ (feature, 'pos'), '名詞')) && __t__ (following !== null) && __t__ (__eq__ (__getitem__ (following, 'string'), 'を')) && __t__ (__eq__ (__getitem__ (following, 'pos'), '助詞')) && __t__ (__lt__ (__add__ (index, 2), __call__ (len, null, njd_features))) && __t__ (__eq__ (__getitem__ (__getitem__ (njd_features, __add__ (index, 2)), 'orig'), '祓う')) && !__t__ ((__getitem__ (feature, 'is_reading_protected'))))) {
		__call__ (_set_reading, null, njd_features, index, 'ケガレ');
		if (__t__ (__ne__ (__getitem__ (feature, 'chain_flag'), 1))) {
			__call__ (_set_accent, null, njd_features, index, 0);
		}
	}
};
export var _read_giving_up_ne = function (njd_features, index) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'njd_features': var njd_features = __allkwargs0__ [__attrib0__]; break;
					case 'index': var index = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var feature = __getitem__ (njd_features, index);
	var following = __call__ (_feature_at, null, njd_features, __add__ (index, 1));
	if (__t__ (__t__ (__eq__ (__getitem__ (feature, 'string'), '音')) && __t__ (__eq__ (__getitem__ (feature, 'pos'), '名詞')) && __t__ (following !== null) && __t__ (__eq__ (__getitem__ (following, 'string'), 'を')) && __t__ (__lt__ (__add__ (index, 2), __call__ (len, null, njd_features))) && __t__ (__eq__ (__getitem__ (__getitem__ (njd_features, __add__ (index, 2)), 'orig'), '上げる')) && !__t__ ((__getitem__ (feature, 'is_reading_protected'))))) {
		var sentence_words = __call__ (_sentence_words, null, njd_features, index);
		if (__t__ (__t__ (__and__ (sentence_words, new set (['訓練', '厳しい', '苦しい', '苦痛', '疲れる', '疲れ', '限界', '寒さ', '暑さ', '辛い']))) && !__t__ ((__and__ (sentence_words, new set (['音量', 'ボリューム', 'スピーカー', '録画', '音楽', '雑音', '聞こえる', '鳴る', 'イヤホン', 'オーディオ', 'テレビ', 'ラジオ', '再生', '大音量', 'サウンド', 'BGM'])))))) {
			__call__ (_set_reading, null, njd_features, index, 'ネ');
			if (__t__ (__ne__ (__getitem__ (feature, 'chain_flag'), 1))) {
				__call__ (_set_accent, null, njd_features, index, 0);
			}
		}
	}
};
export var _read_cloth_beniiro = function (njd_features, index) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'njd_features': var njd_features = __allkwargs0__ [__attrib0__]; break;
					case 'index': var index = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var feature = __getitem__ (njd_features, index);
	var previous = __call__ (_feature_at, null, njd_features, __sub__ (index, 1));
	var following = __call__ (_feature_at, null, njd_features, __add__ (index, 1));
	if (__t__ (__t__ (__eq__ (__getitem__ (feature, 'string'), '紅色')) && __t__ (following !== null) && __t__ (__eq__ (__getitem__ (following, 'string'), 'の')) && __t__ (__lt__ (__add__ (index, 2), __call__ (len, null, njd_features))) && __t__ (__in__ (__getitem__ (__getitem__ (njd_features, __add__ (index, 2)), 'string'), new set (['敷物', '着物', '布', '衣', '袴', '旗', '衣装', 'ドレス']))) && !__t__ ((__getitem__ (feature, 'is_reading_protected'))))) {
		__call__ (_set_reading, null, njd_features, index, 'ベニイロ');
		if (__t__ (__ne__ (__getitem__ (feature, 'chain_flag'), 1))) {
			__call__ (_set_accent, null, njd_features, index, 0);
		}
		else if (__t__ (__t__ (previous !== null) && __t__ (__eq__ (__getitem__ (previous, 'string'), '薄')) && __t__ (__eq__ (__getitem__ (previous, 'pos'), '接頭詞')) && __ne__ (__getitem__ (previous, 'chain_flag'), 1))) {
			__setitem__ (previous, 'acc', 0);
		}
	}
};
export var _read_disability_enumeration = function (njd_features, index) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'njd_features': var njd_features = __allkwargs0__ [__attrib0__]; break;
					case 'index': var index = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var feature = __getitem__ (njd_features, index);
	var surface = __getitem__ (feature, 'string');
	if (__t__ (__t__ (__in__ (surface, new set (['盲', '聾']))) && __t__ (__eq__ (__getitem__ (feature, 'pos'), '名詞')) && __t__ (!__t__ ((__getitem__ (feature, 'is_reading_protected')))) && __call__ (_is_disability_enumeration, null, njd_features, index))) {
		__call__ (_set_reading, null, njd_features, index, (__t__ (__eq__ (surface, '盲')) ? 'モウ' : 'ロウ'), (__t__ (__eq__ (surface, '盲')) ? 'モー' : 'ロー'));
		__call__ (_set_accent, null, njd_features, index, 1);
	}
};
export var _is_disability_enumeration = function (njd_features, index) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'njd_features': var njd_features = __allkwargs0__ [__attrib0__]; break;
					case 'index': var index = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var __iterable0__ = tuple ([__neg__ (1), 1]);
	__iterable0__ = __i__ (__iterable0__);
	for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
		var direction = __getitem__ (__iterable0__, __index0__);
		var separator = __add__ (index, direction);
		if (__t__ (__t__ (!__t__ (((__le__ (0, separator) && __lt__ (separator, __call__ (len, null, njd_features)))))) || __t__ (__ne__ (__getitem__ (__getitem__ (njd_features, separator), 'pos'), '記号')) || !__in__ (__getitem__ (__getitem__ (njd_features, separator), 'string'), new set (['・', '、'])))) {
			continue;
		}
		var cursor = __add__ (separator, direction);
		var term = '';
		while (__t__ (__t__ ((__le__ (0, cursor) && __lt__ (cursor, __call__ (len, null, njd_features)))) && __eq__ (__getitem__ (__getitem__ (njd_features, cursor), 'pos'), '名詞'))) {
			var surface = __getitem__ (__getitem__ (njd_features, cursor), 'string');
			var term = (__t__ (__lt__ (direction, 0)) ? __add__ (surface, term) : __add__ (term, surface));
			if (__t__ (__in__ (term, _DISABILITY_ENUMERATION_TERMS))) {
				return true;
			}
			if (__t__ (!__t__ ((__call__ (any, null, (function () {
				var __accu0__ = [];
				var __iterable1__ = _DISABILITY_ENUMERATION_TERMS;
				__iterable1__ = __i__ (__iterable1__);
				for (var __index1__ = 0; __index1__ < len (__iterable1__); __index1__++) {
					var candidate = __getitem__ (__iterable1__, __index1__);
					(function () {
						var __accu1__ = __accu0__;
						return __call__ (__accu1__.append, __accu1__, (__t__ (__lt__ (direction, 0)) ? (function () {
							var __accu2__ = candidate;
							return __call__ (__accu2__.endswith, __accu2__, term);
						}) () : (function () {
							var __accu2__ = candidate;
							return __call__ (__accu2__.startswith, __accu2__, term);
						}) ()));
					}) ();
				}
				return __accu0__;
			}) ()))))) {
				break;
			}
			var cursor = __call__ (__iadd__, null, cursor, direction);
		}
	}
	return false;
};
export var _read_ichiban_suki = function (njd_features, index) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'njd_features': var njd_features = __allkwargs0__ [__attrib0__]; break;
					case 'index': var index = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var feature = __getitem__ (njd_features, index);
	var previous = __call__ (_feature_at, null, njd_features, __sub__ (index, 1));
	if (__t__ (__t__ (__eq__ (__getitem__ (feature, 'string'), '好き')) && __t__ (__eq__ (__getitem__ (feature, 'pos_group1'), '接尾')) && __t__ (__eq__ (__getitem__ (feature, 'pos_group2'), '形容動詞語幹')) && __t__ (previous !== null) && __eq__ (__getitem__ (previous, 'string'), '一番'))) {
		__call__ (_set_reading, null, njd_features, index, 'スキ');
	}
};
export var _read_nannimo = function (njd_features, index) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'njd_features': var njd_features = __allkwargs0__ [__attrib0__]; break;
					case 'index': var index = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var feature = __getitem__ (njd_features, index);
	if (__t__ (__t__ (__eq__ (__getitem__ (feature, 'string'), '何')) && __t__ (__eq__ (__getitem__ (feature, 'pos'), '名詞')) && __t__ (__lt__ (__add__ (index, 2), __call__ (len, null, njd_features))) && __t__ (__eq__ (__getitem__ (__getitem__ (njd_features, __add__ (index, 1)), 'string'), 'に')) && __t__ (__eq__ (__getitem__ (__getitem__ (njd_features, __add__ (index, 1)), 'pos_group1'), '格助詞')) && __t__ (__eq__ (__getitem__ (__getitem__ (njd_features, __add__ (index, 2)), 'string'), 'も')) && __t__ (__eq__ (__getitem__ (__getitem__ (njd_features, __add__ (index, 2)), 'pos_group1'), '係助詞')) && __call__ (_is_negative_nannimo_context, null, njd_features, __add__ (index, 3)))) {
		__call__ (_set_reading, null, njd_features, index, 'ナン');
		return true;
	}
	return false;
};
export var _is_negative_nannimo_context = function (njd_features, start) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'njd_features': var njd_features = __allkwargs0__ [__attrib0__]; break;
					case 'start': var start = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var predicate_found = false;
	var sahen_found = false;
	for (var index = start; index < __call__ (len, null, njd_features); index++) {
		var feature = __getitem__ (njd_features, index);
		if (__t__ (__eq__ (__getitem__ (feature, 'pos'), '記号'))) {
			return false;
		}
		if (__t__ (!__t__ ((predicate_found)))) {
			if (__t__ (__t__ (__eq__ (index, start)) && __t__ (__eq__ (__getitem__ (feature, 'string'), 'しない')) && __eq__ (__getitem__ (feature, 'pos'), '名詞'))) {
				return true;
			}
			if (__t__ (__eq__ (__getitem__ (feature, 'pos_group1'), '接続助詞'))) {
				return false;
			}
			if (__t__ (!__in__ (__getitem__ (feature, 'pos'), new set (['動詞', '形容詞', '助動詞'])))) {
				var sahen_found = __call__ (__ior__, null, sahen_found, __eq__ (__getitem__ (feature, 'pos_group1'), 'サ変接続'));
				continue;
			}
			if (__t__ (__t__ (!__in__ (__getitem__ (feature, 'orig'), _NANNIMO_PREDICATES)) || __t__ (__eq__ (__getitem__ (feature, 'orig'), 'する')) && sahen_found)) {
				return false;
			}
			var predicate_found = true;
		}
		else if (__t__ (__t__ (__in__ (__getitem__ (feature, 'string'), new set (['こと', '事']))) && __t__ (__eq__ (__getitem__ (feature, 'pos_group1'), '非自立')) && __t__ (__lt__ (__add__ (index, 2), __call__ (len, null, njd_features))) && __t__ (__eq__ (__getitem__ (__getitem__ (njd_features, __add__ (index, 1)), 'string'), 'が')) && __in__ (__getitem__ (__getitem__ (njd_features, __add__ (index, 2)), 'string'), new set (['でき', '出来'])))) {
			return __call__ (_is_negative_nannimo_context, null, njd_features, __add__ (index, 2));
		}
		else if (__t__ (!__t__ ((__t__ (__eq__ (__getitem__ (feature, 'pos'), '助動詞')) || __t__ (__t__ (__eq__ (__getitem__ (feature, 'pos'), '動詞')) && __eq__ (__getitem__ (feature, 'pos_group1'), '非自立')) || __t__ (__eq__ (__getitem__ (feature, 'pos'), '助詞')) && __in__ (__getitem__ (feature, 'string'), new set (['て', 'で', 'は', 'も'])))))) {
			return false;
		}
		if (__t__ (__t__ (__in__ (__getitem__ (feature, 'pos'), new set (['助動詞', '形容詞']))) && __in__ (__getitem__ (feature, 'orig'), _NEGATIVE_ORIGINALS))) {
			return true;
		}
	}
	return false;
};
export var _read_body_karada = function (njd_features, index) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'njd_features': var njd_features = __allkwargs0__ [__attrib0__]; break;
					case 'index': var index = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var feature = __getitem__ (njd_features, index);
	var following = __call__ (_feature_at, null, njd_features, __add__ (index, 1));
	var predicate = __call__ (_feature_at, null, njd_features, __add__ (index, 2));
	if (__t__ (!__t__ ((__t__ (__eq__ (__getitem__ (feature, 'string'), '身体')) && __t__ (!__t__ ((__getitem__ (feature, 'is_reading_protected')))) && __t__ (following !== null) && __t__ (__in__ (__getitem__ (following, 'string'), _BODY_KARADA_SUCCESSORS)) && __t__ (predicate !== null) && __in__ (__getitem__ (predicate, 'orig'), __getitem__ (_BODY_KARADA_SUCCESSORS, __getitem__ (following, 'string'))))))) {
		return false;
	}
	__call__ (_set_reading, null, njd_features, index, 'カラダ');
	__call__ (_set_accent, null, njd_features, index, 0);
	return true;
};
export var _read_face_omote = function (njd_features, index) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'njd_features': var njd_features = __allkwargs0__ [__attrib0__]; break;
					case 'index': var index = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var feature = __getitem__ (njd_features, index);
	var previous = __call__ (_feature_at, null, njd_features, __sub__ (index, 1));
	var previous_previous = __call__ (_feature_at, null, njd_features, __sub__ (index, 2));
	var following = __call__ (_feature_at, null, njd_features, __add__ (index, 1));
	if (__t__ (!__t__ ((__t__ (__eq__ (__getitem__ (feature, 'string'), '面')) && __t__ (__eq__ (__getitem__ (feature, 'pos'), '名詞')) && __t__ ((__t__ (__t__ (__eq__ (__getitem__ (feature, 'pos_group1'), '一般')) && __ne__ (__getitem__ (feature, 'chain_flag'), 1)) || __t__ (__eq__ (__getitem__ (feature, 'pos_group1'), '接尾')) && __t__ (previous !== null) && __t__ (__eq__ (__getitem__ (previous, 'string'), 'あまり')) && __t__ (previous_previous !== null) && __eq__ (__getitem__ (previous_previous, 'pos_group1'), '連体化'))) && __t__ (!__t__ ((__getitem__ (feature, 'is_reading_protected')))) && __t__ ((__t__ (previous === null) || __ne__ (__getitem__ (previous, 'pos_group1'), '連体化'))) && __t__ (following !== null) && __t__ (__eq__ (__getitem__ (following, 'string'), 'を')) && __t__ (__eq__ (__getitem__ (following, 'pos_group1'), '格助詞')) && __t__ (__lt__ (__add__ (index, 2), __call__ (len, null, njd_features))) && __t__ (__eq__ (__getitem__ (__getitem__ (njd_features, __add__ (index, 2)), 'pos'), '動詞')) && __in__ (__getitem__ (__getitem__ (njd_features, __add__ (index, 2)), 'orig'), new set (['伏せる', '上げる'])))))) {
		return false;
	}
	var predicate = __getitem__ (njd_features, __add__ (index, 2));
	var is_face_movement = __t__ (__eq__ (__getitem__ (predicate, 'orig'), '上げる')) && __eq__ (__getitem__ (predicate, 'cform'), '命令ｙｏ');
	var __iterable0__ = __call__ (py_reversed, null, __getslice__ (njd_features, null, index, 1));
	__iterable0__ = __i__ (__iterable0__);
	for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
		var preceding = __getitem__ (__iterable0__, __index0__);
		if (__t__ (__in__ (__getitem__ (preceding, 'string'), new set (['。', '！', '？', '!', '?', '「', '」'])))) {
			break;
		}
		if (__t__ (__in__ (__getitem__ (preceding, 'orig'), new set (['恥ずかしい', '恥じる', '恥じらう', '照れる', '号令'])))) {
			var is_face_movement = true;
			break;
		}
	}
	if (__t__ (is_face_movement)) {
		if (__t__ (__eq__ (__getitem__ (feature, 'pos_group1'), '接尾'))) {
			__setitem__ (feature, 'chain_flag', 0);
		}
		__call__ (_set_reading, null, njd_features, index, 'オモテ');
		__call__ (_set_accent, null, njd_features, index, 3);
	}
	return true;
};
export var _read_capsized_kutsugae = function (njd_features, index) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'njd_features': var njd_features = __allkwargs0__ [__attrib0__]; break;
					case 'index': var index = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var feature = __getitem__ (njd_features, index);
	var previous = __call__ (_feature_at, null, njd_features, __sub__ (index, 1));
	var previous_previous = __call__ (_feature_at, null, njd_features, __sub__ (index, 2));
	if (__t__ (!__t__ ((__t__ (__eq__ (__getitem__ (feature, 'string'), '覆っ')) && __t__ (__eq__ (__getitem__ (feature, 'pos'), '動詞')) && __t__ (__eq__ (__getitem__ (feature, 'orig'), '覆う')) && __t__ (previous !== null) && __t__ (__eq__ (__getitem__ (previous, 'string'), 'が')) && __t__ (__eq__ (__getitem__ (previous, 'pos_group1'), '格助詞')) && __t__ (previous_previous !== null) && __t__ (__in__ (__getitem__ (previous_previous, 'string'), new set (['船', '舟', 'ボート']))) && __t__ (__eq__ (__getitem__ (previous_previous, 'pos'), '名詞')) && !__t__ ((__getitem__ (feature, 'is_reading_protected'))))))) {
		return false;
	}
	var is_covering = false;
	var __iterable0__ = __call__ (py_reversed, null, __getslice__ (njd_features, null, __sub__ (index, 2), 1));
	__iterable0__ = __i__ (__iterable0__);
	for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
		var preceding = __getitem__ (__iterable0__, __index0__);
		if (__t__ (__t__ (__in__ (__getitem__ (preceding, 'pos'), new set (['動詞', '形容詞']))) || __in__ (__getitem__ (preceding, 'string'), new set (['。', '！', '？', '!', '?', '「', '」'])))) {
			break;
		}
		if (__t__ (__t__ (__eq__ (__getitem__ (preceding, 'string'), 'を')) && __eq__ (__getitem__ (preceding, 'pos_group1'), '格助詞'))) {
			var is_covering = true;
			break;
		}
	}
	var ending = __add__ (index, 1);
	while (__t__ (__lt__ (ending, __call__ (len, null, njd_features)))) {
		var node = __getitem__ (njd_features, ending);
		if (__t__ (!__t__ ((__t__ (__eq__ (__getitem__ (node, 'pos'), '助動詞')) || __t__ (__t__ (__eq__ (__getitem__ (node, 'pos'), '動詞')) && __eq__ (__getitem__ (node, 'pos_group1'), '非自立')) || __t__ (__eq__ (__getitem__ (node, 'string'), 'て')) && __t__ (__eq__ (__getitem__ (node, 'pos_group1'), '接続助詞')) && __t__ (__lt__ (__add__ (ending, 1), __call__ (len, null, njd_features))) && __t__ (__eq__ (__getitem__ (__getitem__ (njd_features, __add__ (ending, 1)), 'pos'), '動詞')) && __eq__ (__getitem__ (__getitem__ (njd_features, __add__ (ending, 1)), 'pos_group1'), '非自立'))))) {
			break;
		}
		var ending = __call__ (__iadd__, null, ending, 1);
	}
	if (__t__ (__t__ (__lt__ (ending, __call__ (len, null, njd_features))) && __t__ (__eq__ (__getitem__ (__getitem__ (njd_features, ending), 'pos'), '名詞')) && __ne__ (__getitem__ (__getitem__ (njd_features, ending), 'pos_group1'), '非自立'))) {
		var is_covering = true;
	}
	if (__t__ (!__t__ ((is_covering)))) {
		__call__ (_set_reading, null, njd_features, index, 'クツガエッ');
		__setitem__ (feature, 'orig', '覆る');
		__setitem__ (feature, 'ctype', '五段・ラ行');
		__setitem__ (feature, 'acc', 3);
	}
	return true;
};
export var _read_edge_kiwa = function (njd_features, index) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'njd_features': var njd_features = __allkwargs0__ [__attrib0__]; break;
					case 'index': var index = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var feature = __getitem__ (njd_features, index);
	var previous = __call__ (_feature_at, null, njd_features, __sub__ (index, 1));
	var previous_previous = __call__ (_feature_at, null, njd_features, __sub__ (index, 2));
	if (__t__ (!__t__ ((__t__ (__eq__ (__getitem__ (feature, 'string'), '際')) && __t__ (__eq__ (__getitem__ (feature, 'pos'), '名詞')) && __t__ (previous !== null) && __t__ (__eq__ (__getitem__ (previous, 'string'), 'の')) && __t__ (__eq__ (__getitem__ (previous, 'pos_group1'), '連体化')) && __t__ (previous_previous !== null) && __t__ (__in__ (__getitem__ (previous_previous, 'string'), new set (['崖', '淵', '水']))) && __t__ (__eq__ (__getitem__ (previous_previous, 'pos'), '名詞')) && !__t__ ((__getitem__ (feature, 'is_reading_protected'))))))) {
		return false;
	}
	if (__t__ (__eq__ (__getitem__ (feature, 'chain_flag'), 1))) {
		var head = __sub__ (index, 1);
		while (__t__ (__t__ (__gt__ (head, 0)) && __eq__ (__getitem__ (__getitem__ (njd_features, head), 'chain_flag'), 1))) {
			var head = __call__ (__isub__, null, head, 1);
		}
		var preceding_mora_size = __call__ (sum, null, (function () {
			var __accu0__ = [];
			var __iterable0__ = __getslice__ (njd_features, head, index, 1);
			__iterable0__ = __i__ (__iterable0__);
			for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
				var node = __getitem__ (__iterable0__, __index0__);
				(function () {
					var __accu1__ = __accu0__;
					return __call__ (__accu1__.append, __accu1__, __getitem__ (node, 'mora_size'));
				}) ();
			}
			return __accu0__;
		}) ());
		if (__t__ (__gt__ (__getitem__ (__getitem__ (njd_features, head), 'acc'), preceding_mora_size))) {
			__setitem__ (__getitem__ (njd_features, head), 'acc', 0);
		}
	}
	__call__ (_set_reading, null, njd_features, index, 'キワ');
	__setitem__ (feature, 'pos_group1', '一般');
	__setitem__ (feature, 'pos_group2', '*');
	__setitem__ (feature, 'chain_rule', 'C3');
	__setitem__ (feature, 'chain_flag', 0);
	__call__ (_set_accent, null, njd_features, index, 2);
	return true;
};
export var _read_chanted_shomyo = function (njd_features, index) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'njd_features': var njd_features = __allkwargs0__ [__attrib0__]; break;
					case 'index': var index = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var feature = __getitem__ (njd_features, index);
	var following = __call__ (_feature_at, null, njd_features, __add__ (index, 1));
	if (__t__ (!__t__ ((__t__ (__eq__ (__getitem__ (feature, 'string'), '声明')) && __t__ (__eq__ (__getitem__ (feature, 'pos'), '名詞')) && __t__ (following !== null) && __t__ (__in__ (__getitem__ (following, 'string'), new set (['を', 'が']))) && __t__ (__eq__ (__getitem__ (following, 'pos_group1'), '格助詞')) && __t__ (__lt__ (__add__ (index, 2), __call__ (len, null, njd_features))) && __t__ (__eq__ (__getitem__ (__getitem__ (njd_features, __add__ (index, 2)), 'pos'), '動詞')) && __t__ (__eq__ (__getitem__ (__getitem__ (njd_features, __add__ (index, 2)), 'orig'), '唱える')) && __t__ ((__t__ (__eq__ (__getitem__ (following, 'string'), 'を')) || __t__ (__lt__ (__add__ (index, 3), __call__ (len, null, njd_features))) && __t__ (__eq__ (__getitem__ (__getitem__ (njd_features, __add__ (index, 3)), 'orig'), 'られる')) && __eq__ (__getitem__ (__getitem__ (njd_features, __add__ (index, 3)), 'pos_group1'), '接尾'))) && !__t__ ((__getitem__ (feature, 'is_reading_protected'))))))) {
		return false;
	}
	__call__ (_set_reading, null, njd_features, index, 'ショウミョウ', 'ショーミョー');
	__call__ (_set_accent, null, njd_features, index, 1);
	return true;
};
export var _read_hemp_cloth_asanuno = function (njd_features, index) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'njd_features': var njd_features = __allkwargs0__ [__attrib0__]; break;
					case 'index': var index = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var feature = __getitem__ (njd_features, index);
	var previous = __call__ (_feature_at, null, njd_features, __sub__ (index, 1));
	var previous_previous = __call__ (_feature_at, null, njd_features, __sub__ (index, 2));
	var following = __call__ (_feature_at, null, njd_features, __add__ (index, 1));
	if (__t__ (!__t__ ((__t__ (__eq__ (__getitem__ (feature, 'string'), '麻布')) && __t__ (__eq__ (__getitem__ (feature, 'pos'), '名詞')) && !__t__ ((__getitem__ (feature, 'is_reading_protected'))))))) {
		return false;
	}
	var is_cloth_modifier = __t__ (previous !== null) && __t__ (__eq__ (__getitem__ (previous, 'string'), 'の')) && __t__ (__eq__ (__getitem__ (previous, 'pos_group1'), '連体化')) && __t__ (previous_previous !== null) && __in__ (__getitem__ (previous_previous, 'string'), new set (['生成り', '織り']));
	var particle_index = __add__ (index, 1);
	if (__t__ (__t__ (following !== null) && __eq__ (__getitem__ (following, 'string'), 'など'))) {
		var particle_index = __call__ (__iadd__, null, particle_index, 1);
	}
	var is_cloth_processing = false;
	if (__t__ (__t__ (__lt__ (__add__ (particle_index, 1), __call__ (len, null, njd_features))) && __t__ (__eq__ (__getitem__ (__getitem__ (njd_features, particle_index), 'pos'), '助詞')) && __in__ (__getitem__ (__getitem__ (njd_features, particle_index), 'string'), new set (['を', 'は'])))) {
		var predicate = __getitem__ (njd_features, __add__ (particle_index, 1));
		var is_cloth_processing = __t__ (__t__ (__eq__ (__getitem__ (predicate, 'pos'), '動詞')) && __in__ (__getitem__ (predicate, 'orig'), new set (['染める', '織る']))) || __t__ (__t__ (__eq__ (__getitem__ (predicate, 'string'), '染色')) && __t__ (__eq__ (__getitem__ (predicate, 'pos_group1'), 'サ変接続')) && __t__ (__lt__ (__add__ (particle_index, 2), __call__ (len, null, njd_features))) && __t__ (__eq__ (__getitem__ (__getitem__ (njd_features, __add__ (particle_index, 2)), 'orig'), 'する')) && __eq__ (__getitem__ (__getitem__ (njd_features, __add__ (particle_index, 2)), 'pos'), '動詞')) || __t__ (__eq__ (__getitem__ (predicate, 'string'), '漆')) && __t__ (__eq__ (__getitem__ (predicate, 'pos'), '名詞')) && __t__ (__lt__ (__add__ (particle_index, 2), __call__ (len, null, njd_features))) && __t__ (__eq__ (__getitem__ (__getitem__ (njd_features, __add__ (particle_index, 2)), 'string'), 'で')) && __eq__ (__getitem__ (__getitem__ (njd_features, __add__ (particle_index, 2)), 'pos_group1'), '格助詞');
	}
	if (__t__ (__t__ (is_cloth_modifier) || is_cloth_processing)) {
		var old_mora_size = __getitem__ (feature, 'mora_size');
		__call__ (_set_reading, null, njd_features, index, 'アサヌノ');
		if (__t__ (__le__ (__getitem__ (feature, 'acc'), old_mora_size))) {
			__call__ (_set_accent, null, njd_features, index, 0);
		}
	}
	return true;
};
export var _read_age_before_twenty = function (njd_features, index) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'njd_features': var njd_features = __allkwargs0__ [__attrib0__]; break;
					case 'index': var index = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var feature = __getitem__ (njd_features, index);
	var previous = __call__ (_feature_at, null, njd_features, __sub__ (index, 1));
	var following = __call__ (_feature_at, null, njd_features, __add__ (index, 1));
	if (__t__ (!__t__ ((__t__ (__eq__ (__getitem__ (feature, 'string'), '二')) && __t__ (__eq__ (__getitem__ (feature, 'pos_group1'), '数')) && __t__ (following !== null) && __t__ (__eq__ (__getitem__ (following, 'string'), '十')) && __t__ (__eq__ (__getitem__ (following, 'pos_group1'), '数')) && __t__ (__eq__ (__getitem__ (following, 'chain_flag'), 1)) && __t__ (__lt__ (__add__ (index, 2), __call__ (len, null, njd_features))) && __t__ (__eq__ (__getitem__ (__getitem__ (njd_features, __add__ (index, 2)), 'string'), '前')) && __t__ (__eq__ (__getitem__ (__getitem__ (njd_features, __add__ (index, 2)), 'pos_group1'), '接尾')) && __t__ (__eq__ (__getitem__ (__getitem__ (njd_features, __add__ (index, 2)), 'read'), 'マエ')) && __t__ (__eq__ (__getitem__ (__getitem__ (njd_features, __add__ (index, 2)), 'chain_flag'), 1)) && __t__ ((__t__ (previous === null) || __ne__ (__getitem__ (previous, 'pos_group1'), '数'))) && __t__ (!__t__ ((__getitem__ (feature, 'is_reading_protected')))) && __t__ (!__t__ ((__getitem__ (following, 'is_reading_protected')))) && (__t__ (__eq__ (__add__ (index, 3), __call__ (len, null, njd_features))) || !__t__ (((function () {
		var __accu0__ = __getitem__ (__getitem__ (njd_features, __add__ (index, 3)), 'string');
		return __call__ (__accu0__.startswith, __accu0__, tuple (['半', '後']));
	}) ()))))))) {
		return false;
	}
	var __left0__ = 'ハタ';
	__setitem__ (feature, 'read', __left0__);
	__setitem__ (feature, 'pron', __left0__);
	__setitem__ (feature, 'mora_size', 2);
	var __left0__ = 'チ';
	__setitem__ (following, 'read', __left0__);
	__setitem__ (following, 'pron', __left0__);
	__setitem__ (following, 'mora_size', 1);
	return true;
};
export var _read_age_past_twenty = function (njd_features, index) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'njd_features': var njd_features = __allkwargs0__ [__attrib0__]; break;
					case 'index': var index = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var feature = __getitem__ (njd_features, index);
	var previous = __call__ (_feature_at, null, njd_features, __sub__ (index, 1));
	var following = __call__ (_feature_at, null, njd_features, __add__ (index, 1));
	if (__t__ (!__t__ ((__t__ (__eq__ (__getitem__ (feature, 'string'), '二')) && __t__ (__eq__ (__getitem__ (feature, 'pos_group1'), '数')) && __t__ (following !== null) && __t__ (__eq__ (__getitem__ (following, 'string'), '十')) && __t__ (__eq__ (__getitem__ (following, 'pos_group1'), '数')) && __t__ (__eq__ (__getitem__ (following, 'chain_flag'), 1)) && __t__ (__lt__ (__add__ (index, 3), __call__ (len, null, njd_features))) && __t__ (__eq__ (__getitem__ (__getitem__ (njd_features, __add__ (index, 2)), 'string'), 'を')) && __t__ (__eq__ (__getitem__ (__getitem__ (njd_features, __add__ (index, 3)), 'orig'), '過ぎる')) && __t__ ((__t__ (previous === null) || __ne__ (__getitem__ (previous, 'pos_group1'), '数'))) && __t__ (!__t__ ((__getitem__ (feature, 'is_reading_protected')))) && __t__ (!__t__ ((__getitem__ (following, 'is_reading_protected')))) && __call__ (_is_age_past_twenty_context, null, njd_features, index))))) {
		return false;
	}
	var __left0__ = 'ハタ';
	__setitem__ (feature, 'read', __left0__);
	__setitem__ (feature, 'pron', __left0__);
	__setitem__ (feature, 'mora_size', 2);
	__setitem__ (feature, 'acc', 1);
	var __left0__ = 'チ';
	__setitem__ (following, 'read', __left0__);
	__setitem__ (following, 'pron', __left0__);
	__setitem__ (following, 'mora_size', 1);
	return true;
};
export var _is_age_past_twenty_context = function (njd_features, start) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'njd_features': var njd_features = __allkwargs0__ [__attrib0__]; break;
					case 'start': var start = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	if (__t__ (__t__ (__ge__ (start, 2)) && __t__ (__in__ (__getitem__ (__getitem__ (njd_features, __sub__ (start, 1)), 'string'), new set ([':', '：']))) && __eq__ (__getitem__ (__getitem__ (njd_features, __sub__ (start, 2)), 'pos_group1'), '数'))) {
		return false;
	}
	var __iterable0__ = __call__ (py_reversed, null, __getslice__ (njd_features, null, start, 1));
	__iterable0__ = __i__ (__iterable0__);
	for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
		var node = __getitem__ (__iterable0__, __index0__);
		if (__t__ (__eq__ (__getitem__ (node, 'pos'), '記号'))) {
			break;
		}
		if (__t__ (__ne__ (__getitem__ (node, 'pos'), '名詞'))) {
			continue;
		}
		if (__t__ (__in__ (__getitem__ (node, 'string'), new set (['年齢', '齢', '歳', '才'])))) {
			return true;
		}
		if (__t__ (__in__ (__getitem__ (node, 'string'), new set (['回数', '得点', '点数', 'スコア', '数', '人数', '個数', '数量', '件数', '時刻', '時間', '分', '秒', 'カウント', '打数', '失点', '年数', '番号', 'ページ'])))) {
			return false;
		}
	}
	return true;
};
export var _read_counted_too = function (njd_features, index) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'njd_features': var njd_features = __allkwargs0__ [__attrib0__]; break;
					case 'index': var index = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var feature = __getitem__ (njd_features, index);
	var previous = __call__ (_feature_at, null, njd_features, __sub__ (index, 1));
	var previous_previous = __call__ (_feature_at, null, njd_features, __sub__ (index, 2));
	var following = __call__ (_feature_at, null, njd_features, __add__ (index, 1));
	if (__t__ (__t__ (__eq__ (__getitem__ (feature, 'string'), '十')) && __t__ (__eq__ (__getitem__ (feature, 'pos_group1'), '数')) && __t__ (previous !== null) && __t__ ((__t__ (__eq__ (__getitem__ (previous, 'string'), '九つ')) || __t__ (__eq__ (__getitem__ (previous, 'string'), '、')) && __t__ (previous_previous !== null) && __eq__ (__getitem__ (previous_previous, 'string'), '九つ'))) && (__t__ (following === null) || __t__ (__ne__ (__getitem__ (following, 'pos_group1'), '数')) && __ne__ (__getitem__ (following, 'pos_group2'), '助数詞')))) {
		__call__ (_set_reading, null, njd_features, index, 'トオ', 'トー');
		return true;
	}
	return false;
};
export var _read_all_day_juu = function (njd_features, index) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'njd_features': var njd_features = __allkwargs0__ [__attrib0__]; break;
					case 'index': var index = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var feature = __getitem__ (njd_features, index);
	var previous = __call__ (_feature_at, null, njd_features, __sub__ (index, 1));
	var before_day = __call__ (_feature_at, null, njd_features, __sub__ (index, 2));
	if (__t__ (__t__ (__eq__ (__getitem__ (feature, 'string'), '中')) && __t__ (__eq__ (__getitem__ (feature, 'read'), 'チュウ')) && __t__ (previous !== null) && __t__ (__eq__ (__getitem__ (previous, 'string'), '一日')) && __t__ (__eq__ (__getitem__ (previous, 'read'), 'イチニチ')) && (__t__ (before_day === null) || __ne__ (__getitem__ (before_day, 'pos_group1'), '数')))) {
		__call__ (_set_reading, null, njd_features, index, 'ジュウ', 'ジュー');
		return true;
	}
	return false;
};
export var _read_kin = function (njd_features, index) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'njd_features': var njd_features = __allkwargs0__ [__attrib0__]; break;
					case 'index': var index = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	if (__t__ (__ne__ (__getitem__ (__getitem__ (njd_features, index), 'string'), '金'))) {
		return false;
	}
	var previous = __call__ (_feature_at, null, njd_features, __sub__ (index, 1));
	var following = __call__ (_feature_at, null, njd_features, __add__ (index, 1));
	var range_start = __call__ (_feature_at, null, njd_features, __sub__ (index, 2));
	if (__t__ (__t__ (previous !== null) && __t__ (__in__ (__getitem__ (previous, 'string'), new set (['〜', '～', 'ー', '－', '−']))) && __t__ (range_start !== null) && __in__ (__getitem__ (range_start, 'string'), new set (['月', '火', '水', '木', '土', '日'])))) {
		__call__ (_set_reading, null, njd_features, index, 'キン');
		return true;
	}
	if (__t__ (__t__ (following !== null) && __t__ (__eq__ (__getitem__ (following, 'string'), '型')) && (__t__ (previous === null) || __ne__ (__getitem__ (previous, 'string'), '返戻')))) {
		__call__ (_set_reading, null, njd_features, index, 'カナ');
		return true;
	}
	if (__t__ (__t__ (following !== null) && __t__ (__eq__ (__getitem__ (following, 'pos'), '名詞')) && (__t__ (__eq__ (__getitem__ (following, 'pos_group1'), '数')) || __in__ (__getitem__ (following, 'string'), new set (['壱', '参', '伍']))))) {
		__call__ (_set_reading, null, njd_features, index, 'キン');
		return true;
	}
	return false;
};
export var _read_mae_after_sahen_noun = function (njd_features, index) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'njd_features': var njd_features = __allkwargs0__ [__attrib0__]; break;
					case 'index': var index = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var previous = __call__ (_feature_at, null, njd_features, __sub__ (index, 1));
	var following = __call__ (_feature_at, null, njd_features, __add__ (index, 1));
	if (__t__ (__t__ (__eq__ (__getitem__ (__getitem__ (njd_features, index), 'string'), '前')) && __t__ (previous !== null) && __t__ (__eq__ (__getitem__ (previous, 'pos'), '名詞')) && __t__ (__eq__ (__getitem__ (previous, 'pos_group1'), 'サ変接続')) && __t__ (following !== null) && __eq__ (__getitem__ (following, 'pos'), '助詞'))) {
		__call__ (_set_reading, null, njd_features, index, 'マエ');
		return true;
	}
	return false;
};
export var _read_by_adjacent_word = function (njd_features, index) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'njd_features': var njd_features = __allkwargs0__ [__attrib0__]; break;
					case 'index': var index = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var feature = __getitem__ (njd_features, index);
	var previous = __call__ (_feature_at, null, njd_features, __sub__ (index, 1));
	var following = __call__ (_feature_at, null, njd_features, __add__ (index, 1));
	var __iterable0__ = (function () {
		var __accu0__ = _ADJACENT_WORD_READINGS;
		return __call__ (__accu0__.py_get, __accu0__, __getitem__ (feature, 'string'), tuple ([]));
	}) ();
	__iterable0__ = __i__ (__iterable0__);
	for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
		var __left0__ = __getitem__ (__iterable0__, __index0__);
		var pos_group1 = __left0__ [0];
		var previous_words = __left0__ [1];
		var following_words = __left0__ [2];
		var reading = __left0__ [3];
		var pronunciation = __left0__ [4];
		if (__t__ (__t__ ((__t__ (pos_group1 === null) || __eq__ (__getitem__ (feature, 'pos_group1'), pos_group1))) && __t__ ((__t__ (previous_words === null) || __t__ (previous !== null) && __in__ (__getitem__ (previous, 'string'), previous_words))) && (__t__ (following_words === null) || __t__ (following !== null) && __in__ (__getitem__ (following, 'string'), following_words)))) {
			__call__ (_set_reading, null, njd_features, index, reading, pronunciation);
			return true;
		}
	}
	return false;
};
export var _read_futsu_parenthetical_country = function (njd_features, index) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'njd_features': var njd_features = __allkwargs0__ [__attrib0__]; break;
					case 'index': var index = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var previous = __call__ (_feature_at, null, njd_features, __sub__ (index, 1));
	var country_context = __call__ (_feature_at, null, njd_features, __sub__ (index, 2));
	var following = __call__ (_feature_at, null, njd_features, __add__ (index, 1));
	if (__t__ (__t__ (__eq__ (__getitem__ (__getitem__ (njd_features, index), 'string'), '仏')) && __t__ (previous !== null) && __t__ (__in__ (__getitem__ (previous, 'string'), new set (['（', '(']))) && __t__ (country_context !== null) && __t__ (__in__ (__getitem__ (country_context, 'string'), new set (['ルモンド', 'マルセイユ']))) && __t__ (following !== null) && __in__ (__getitem__ (following, 'string'), new set (['）', ')'])))) {
		__call__ (_set_reading, null, njd_features, index, 'フツ');
		__call__ (_set_accent, null, njd_features, index, 1);
		return true;
	}
	return false;
};
export var _read_kamei_after_person_name = function (njd_features, index) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'njd_features': var njd_features = __allkwargs0__ [__attrib0__]; break;
					case 'index': var index = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var previous = __call__ (_feature_at, null, njd_features, __sub__ (index, 1));
	var person_name = __call__ (_feature_at, null, njd_features, __sub__ (index, 2));
	var following = __call__ (_feature_at, null, njd_features, __add__ (index, 1));
	if (__t__ (__t__ (__eq__ (__getitem__ (__getitem__ (njd_features, index), 'string'), '仮名')) && __t__ (previous !== null) && __t__ (__in__ (__getitem__ (previous, 'string'), new set (['（', '(']))) && __t__ (person_name !== null) && __t__ (__eq__ (__getitem__ (person_name, 'pos_group2'), '人名')) && __t__ (following !== null) && __in__ (__getitem__ (following, 'string'), new set (['）', ')'])))) {
		__call__ (_set_reading, null, njd_features, index, 'カメイ', 'カメー');
		return true;
	}
	return false;
};
export var _read_to_administration = function (njd_features, index) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'njd_features': var njd_features = __allkwargs0__ [__attrib0__]; break;
					case 'index': var index = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var previous = __call__ (_feature_at, null, njd_features, __sub__ (index, 1));
	var following = __call__ (_feature_at, null, njd_features, __add__ (index, 1));
	if (__t__ (!__t__ ((__t__ (__eq__ (__getitem__ (__getitem__ (njd_features, index), 'string'), '都')) && __t__ ((__t__ (previous === null) || __in__ (__getitem__ (previous, 'string'), new set (['。', '！', '？', '!', '?'])))) && __t__ (following !== null) && __eq__ (__getitem__ (following, 'string'), 'は'))))) {
		return false;
	}
	var __iterable0__ = __getslice__ (njd_features, __add__ (index, 2), null, 1);
	__iterable0__ = __i__ (__iterable0__);
	for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
		var node = __getitem__ (__iterable0__, __index0__);
		if (__t__ (__in__ (__getitem__ (node, 'string'), new set (['。', '！', '？', '!', '?'])))) {
			break;
		}
		if (__t__ (__eq__ (__getitem__ (node, 'orig'), '助成'))) {
			__call__ (_set_reading, null, njd_features, index, 'ト');
			__call__ (_set_accent, null, njd_features, index, 1);
			return true;
		}
	}
	return false;
};
export var _read_you_auxiliary = function (njd_features, index) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'njd_features': var njd_features = __allkwargs0__ [__attrib0__]; break;
					case 'index': var index = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var previous = __call__ (_feature_at, null, njd_features, __sub__ (index, 1));
	var following = __call__ (_feature_at, null, njd_features, __add__ (index, 1));
	if (__t__ (__t__ (__eq__ (__getitem__ (__getitem__ (njd_features, index), 'string'), '様')) && __t__ (previous !== null) && __t__ (__in__ (__getitem__ (previous, 'pos'), new set (['動詞', '形容詞', '助動詞']))) && __t__ (__in__ (__getitem__ (previous, 'cform'), new set (['基本形', '連体形']))) && __t__ (following !== null) && (__t__ (__t__ (__eq__ (__getitem__ (following, 'string'), 'に')) && __eq__ (__getitem__ (following, 'pos'), '助詞')) || __t__ (__eq__ (__getitem__ (following, 'string'), 'な')) && __eq__ (__getitem__ (following, 'pos'), '助動詞')))) {
		__call__ (_set_reading, null, njd_features, index, 'ヨウ', 'ヨー');
		return true;
	}
	return false;
};
export var _read_kami_era_yo = function (njd_features, index) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'njd_features': var njd_features = __allkwargs0__ [__attrib0__]; break;
					case 'index': var index = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var feature = __getitem__ (njd_features, index);
	var previous = __call__ (_feature_at, null, njd_features, __sub__ (index, 1));
	var previous_previous = __call__ (_feature_at, null, njd_features, __sub__ (index, 2));
	var following = __call__ (_feature_at, null, njd_features, __add__ (index, 1));
	if (__t__ (__t__ (__eq__ (__getitem__ (feature, 'string'), '代')) && __t__ (__eq__ (__getitem__ (feature, 'pos'), '名詞')) && __t__ (__eq__ (__getitem__ (feature, 'pos_group1'), '一般')) && __t__ (previous !== null) && __t__ (__eq__ (__getitem__ (previous, 'string'), 'の')) && __t__ (__eq__ (__getitem__ (previous, 'pos'), '助詞')) && __t__ (__eq__ (__getitem__ (previous, 'pos_group1'), '連体化')) && __t__ (previous_previous !== null) && __t__ (__eq__ (__getitem__ (previous_previous, 'string'), '神')) && __t__ (__eq__ (__getitem__ (previous_previous, 'pos'), '名詞')) && __t__ (__eq__ (__getitem__ (previous_previous, 'pos_group1'), '一般')) && (__t__ (following === null) || __in__ (__getitem__ (following, 'pos'), new set (['助詞', '助動詞', '記号']))))) {
		__call__ (_set_reading, null, njd_features, index, 'ヨ');
		return true;
	}
	return false;
};
export var _read_abstract_moto = function (njd_features, index) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'njd_features': var njd_features = __allkwargs0__ [__attrib0__]; break;
					case 'index': var index = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var feature = __getitem__ (njd_features, index);
	var previous = __call__ (_feature_at, null, njd_features, __sub__ (index, 1));
	var previous_previous = __call__ (_feature_at, null, njd_features, __sub__ (index, 2));
	if (__t__ (__t__ (__eq__ (__getitem__ (feature, 'string'), '下')) && __t__ (__eq__ (__getitem__ (feature, 'pos_group1'), '一般')) && __t__ (previous !== null) && __t__ (__eq__ (__getitem__ (previous, 'string'), 'の')) && __t__ (previous_previous !== null) && __in__ (__getitem__ (previous_previous, 'string'), _ABSTRACT_NO_PREDECESSORS))) {
		__call__ (_set_reading, null, njd_features, index, 'モト');
		return true;
	}
	return false;
};
export var _read_digit_position = function (njd_features, index) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'njd_features': var njd_features = __allkwargs0__ [__attrib0__]; break;
					case 'index': var index = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var surface = __getitem__ (__getitem__ (njd_features, index), 'string');
	var following = __call__ (_feature_at, null, njd_features, __add__ (index, 1));
	if (__t__ (__t__ (__in__ (surface, new set (['下', '上']))) && __t__ (following !== null) && __t__ (__eq__ (__getitem__ (following, 'pos_group1'), '数')) && __t__ (__lt__ (__add__ (index, 2), __call__ (len, null, njd_features))) && __eq__ (__getitem__ (__getitem__ (njd_features, __add__ (index, 2)), 'string'), '桁'))) {
		__call__ (_set_reading, null, njd_features, index, (__t__ (__eq__ (surface, '下')) ? 'シモ' : 'カミ'));
		return true;
	}
	return false;
};
export var _read_bashi_suffix = function (njd_features, index) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'njd_features': var njd_features = __allkwargs0__ [__attrib0__]; break;
					case 'index': var index = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var feature = __getitem__ (njd_features, index);
	var previous = __call__ (_feature_at, null, njd_features, __sub__ (index, 1));
	if (__t__ (__t__ (__eq__ (__getitem__ (feature, 'string'), '橋')) && __t__ (__eq__ (__getitem__ (feature, 'pos_group1'), '接尾')) && __t__ (previous !== null) && __eq__ (__getitem__ (previous, 'pos'), '名詞'))) {
		__call__ (_set_reading, null, njd_features, index, 'バシ');
		return true;
	}
	return false;
};
export var _read_mono = function (njd_features, index) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'njd_features': var njd_features = __allkwargs0__ [__attrib0__]; break;
					case 'index': var index = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var previous = __call__ (_feature_at, null, njd_features, __sub__ (index, 1));
	if (__t__ (__t__ (__eq__ (__getitem__ (__getitem__ (njd_features, index), 'string'), '者')) && __t__ (previous !== null) && __t__ (__eq__ (__getitem__ (previous, 'pos_group1'), '自立')) && __gt__ (__call__ (len, null, __getitem__ (previous, 'string')), 1))) {
		__call__ (_set_reading, null, njd_features, index, 'モノ');
		return true;
	}
	return false;
};
export var _read_compound_iru = function (njd_features, index) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'njd_features': var njd_features = __allkwargs0__ [__attrib0__]; break;
					case 'index': var index = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var previous = __call__ (_feature_at, null, njd_features, __sub__ (index, 1));
	if (__t__ (__t__ (__eq__ (__getitem__ (__getitem__ (njd_features, index), 'string'), '入っ')) && __t__ (previous !== null) && __t__ (__eq__ (__getitem__ (previous, 'pos'), '動詞')) && __t__ (__eq__ (__getitem__ (previous, 'cform'), '連用形')) && __in__ (__getitem__ (previous, 'string'), _IRU_COMPOUND_PREDECESSORS))) {
		__call__ (_set_reading, null, njd_features, index, 'イッ');
		return true;
	}
	return false;
};
export var _read_leave_houtte = function (njd_features, index) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'njd_features': var njd_features = __allkwargs0__ [__attrib0__]; break;
					case 'index': var index = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var following = __call__ (_feature_at, null, njd_features, __add__ (index, 1));
	var auxiliary = __call__ (_feature_at, null, njd_features, __add__ (index, 2));
	if (__t__ (__t__ (__ne__ (__getitem__ (__getitem__ (njd_features, index), 'string'), '放っ')) || following === null)) {
		return false;
	}
	if (__t__ (__t__ (__t__ (__eq__ (__getitem__ (following, 'string'), 'て')) && __t__ (auxiliary !== null) && __t__ (__eq__ (__getitem__ (auxiliary, 'orig'), 'おく')) && __eq__ (__getitem__ (auxiliary, 'pos'), '動詞')) || __t__ (__eq__ (__getitem__ (following, 'orig'), 'とく')) && __eq__ (__getitem__ (following, 'pos'), '動詞'))) {
		__call__ (_set_reading, null, njd_features, index, 'ホウッ', 'ホーッ');
		return true;
	}
	return false;
};
export var _read_ooyake = function (njd_features, index) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'njd_features': var njd_features = __allkwargs0__ [__attrib0__]; break;
					case 'index': var index = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var feature = __getitem__ (njd_features, index);
	var previous = __call__ (_feature_at, null, njd_features, __sub__ (index, 1));
	if (__t__ (__t__ (__eq__ (__getitem__ (feature, 'string'), '公')) && __t__ (__eq__ (__getitem__ (feature, 'pos_group1'), '一般')) && __t__ (previous !== null) && __eq__ (__getitem__ (previous, 'pos_group1'), '副詞可能'))) {
		__call__ (_set_reading, null, njd_features, index, 'オオヤケ', 'オーヤケ');
		return true;
	}
	return false;
};
export var _read_handle_e_or_tsuka = function (njd_features, index) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'njd_features': var njd_features = __allkwargs0__ [__attrib0__]; break;
					case 'index': var index = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var previous = __call__ (_feature_at, null, njd_features, __sub__ (index, 1));
	var previous_previous = __call__ (_feature_at, null, njd_features, __sub__ (index, 2));
	if (__t__ (!__t__ ((__t__ (__eq__ (__getitem__ (__getitem__ (njd_features, index), 'string'), '柄')) && __t__ (previous !== null) && __t__ (__eq__ (__getitem__ (previous, 'string'), 'の')) && previous_previous !== null)))) {
		return false;
	}
	if (__t__ (__in__ (__getitem__ (previous_previous, 'string'), _TOOL_HANDLE_PREDECESSORS))) {
		__call__ (_set_reading, null, njd_features, index, 'エ');
	}
	else if (__t__ (__in__ (__getitem__ (previous_previous, 'string'), _SWORD_HILT_PREDECESSORS))) {
		__call__ (_set_reading, null, njd_features, index, 'ツカ');
	}
	return true;
};
export var _read_rim_fuchi = function (njd_features, index) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'njd_features': var njd_features = __allkwargs0__ [__attrib0__]; break;
					case 'index': var index = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var previous = __call__ (_feature_at, null, njd_features, __sub__ (index, 1));
	var previous_previous = __call__ (_feature_at, null, njd_features, __sub__ (index, 2));
	if (__t__ (__t__ (__eq__ (__getitem__ (__getitem__ (njd_features, index), 'string'), '縁')) && __t__ (previous !== null) && __t__ (__eq__ (__getitem__ (previous, 'string'), 'の')) && __t__ (previous_previous !== null) && __in__ (__getitem__ (previous_previous, 'string'), _FUCHI_PREDECESSORS))) {
		__call__ (_set_reading, null, njd_features, index, 'フチ');
		return true;
	}
	return false;
};
export var _read_teahouse_jaya = function (njd_features, index) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'njd_features': var njd_features = __allkwargs0__ [__attrib0__]; break;
					case 'index': var index = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var previous = __call__ (_feature_at, null, njd_features, __sub__ (index, 1));
	if (__t__ (__t__ (__eq__ (__getitem__ (__getitem__ (njd_features, index), 'string'), '茶屋')) && __t__ (previous !== null) && __t__ (__eq__ (__getitem__ (previous, 'pos'), '名詞')) && __in__ (__getitem__ (previous, 'pos_group1'), new set (['一般', '固有名詞', 'サ変接続'])))) {
		__call__ (_set_reading, null, njd_features, index, 'ジャヤ');
		return true;
	}
	return false;
};
export var _read_honorific_ou = function (njd_features, index) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'njd_features': var njd_features = __allkwargs0__ [__attrib0__]; break;
					case 'index': var index = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var previous = __call__ (_feature_at, null, njd_features, __sub__ (index, 1));
	if (__t__ (__t__ (__eq__ (__getitem__ (__getitem__ (njd_features, index), 'string'), '翁')) && __t__ (previous !== null) && __t__ (__eq__ (__getitem__ (previous, 'pos'), '名詞')) && __in__ (__getitem__ (previous, 'pos_group1'), new set (['一般', '固有名詞', 'サ変接続'])))) {
		__call__ (_set_reading, null, njd_features, index, 'オウ', 'オー');
		return true;
	}
	return false;
};
export var _read_tokoro = function (njd_features, index) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'njd_features': var njd_features = __allkwargs0__ [__attrib0__]; break;
					case 'index': var index = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var previous = __call__ (_feature_at, null, njd_features, __sub__ (index, 1));
	if (__t__ (__t__ (__eq__ (__getitem__ (__getitem__ (njd_features, index), 'string'), '処')) && __t__ (previous !== null) && (__t__ (__eq__ (__getitem__ (previous, 'pos_group1'), '自立')) || __eq__ (__getitem__ (previous, 'pos'), '助動詞')))) {
		__call__ (_set_reading, null, njd_features, index, 'トコロ');
		return true;
	}
	return false;
};
export var _read_shiita = function (njd_features, index) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'njd_features': var njd_features = __allkwargs0__ [__attrib0__]; break;
					case 'index': var index = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var feature = __getitem__ (njd_features, index);
	var following = __call__ (_feature_at, null, njd_features, __add__ (index, 1));
	if (__t__ (__t__ (__eq__ (__getitem__ (feature, 'string'), '強い')) && __t__ (__eq__ (__getitem__ (feature, 'pos'), '形容詞')) && __t__ (following !== null) && __t__ (__eq__ (__getitem__ (following, 'pos'), '助動詞')) && __eq__ (__getitem__ (following, 'string'), 'た'))) {
		__call__ (_set_reading, null, njd_features, index, 'シイ');
		return true;
	}
	return false;
};
export var _read_sourou = function (njd_features, index) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'njd_features': var njd_features = __allkwargs0__ [__attrib0__]; break;
					case 'index': var index = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var previous = __call__ (_feature_at, null, njd_features, __sub__ (index, 1));
	if (__t__ (__t__ (__eq__ (__getitem__ (__getitem__ (njd_features, index), 'string'), '候')) && __t__ (previous !== null) && __t__ (__eq__ (__getitem__ (previous, 'pos'), '動詞')) && __eq__ (__getitem__ (previous, 'cform'), '連用形'))) {
		__call__ (_set_reading, null, njd_features, index, 'ソウロウ', 'ソーロー');
		return true;
	}
	return false;
};
export var _read_hoka = function (njd_features, index) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'njd_features': var njd_features = __allkwargs0__ [__attrib0__]; break;
					case 'index': var index = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var previous = __call__ (_feature_at, null, njd_features, __sub__ (index, 1));
	var previous_previous = __call__ (_feature_at, null, njd_features, __sub__ (index, 2));
	if (__t__ (!__t__ ((__t__ (__eq__ (__getitem__ (__getitem__ (njd_features, index), 'string'), '外')) && __t__ (previous !== null) && __t__ (__eq__ (__getitem__ (previous, 'string'), 'より')) && __t__ (previous_previous !== null) && (__t__ (__eq__ (__getitem__ (previous_previous, 'pos'), '動詞')) || __eq__ (__getitem__ (previous_previous, 'pos_group1'), '代名詞')))))) {
		return false;
	}
	var __iterable0__ = __getslice__ (njd_features, __add__ (index, 1), null, 1);
	__iterable0__ = __i__ (__iterable0__);
	for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
		var later_feature = __getitem__ (__iterable0__, __index0__);
		if (__t__ (__in__ (__getitem__ (later_feature, 'string'), new set (['。', '．', '！', '？'])))) {
			break;
		}
		if (__t__ (__in__ (__getitem__ (later_feature, 'orig'), _NEGATIVE_ORIGINALS))) {
			__call__ (_set_reading, null, njd_features, index, 'ホカ');
			break;
		}
	}
	return true;
};
export var _read_compound_suffix = function (njd_features, index) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'njd_features': var njd_features = __allkwargs0__ [__attrib0__]; break;
					case 'index': var index = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var feature = __getitem__ (njd_features, index);
	var surface = __getitem__ (feature, 'string');
	var previous = __call__ (_feature_at, null, njd_features, __sub__ (index, 1));
	if (__t__ (!__t__ ((__t__ (__in__ (surface, _COMPOUND_SUFFIX_READINGS)) && __t__ (previous !== null) && __t__ (__eq__ (__getitem__ (previous, 'pos'), '名詞')) && __t__ ((__t__ (__ne__ (surface, '部屋')) || __ne__ (__getitem__ (previous, 'pos_group1'), '数'))) && !__t__ ((__t__ (__eq__ (surface, '付')) && __t__ ((function () {
		var __accu0__ = __getitem__ (previous, 'string');
		return __call__ (__accu0__.endswith, __accu0__, '日');
	}) ()) && (__t__ (__eq__ (__getitem__ (previous, 'pos_group2'), '助数詞')) || __t__ (__gt__ (__call__ (len, null, __getitem__ (previous, 'string')), 1)) && __call__ (all, null, (function () {
		var __accu0__ = [];
		var __iterable0__ = __getslice__ (__getitem__ (previous, 'string'), null, __neg__ (1), 1);
		__iterable0__ = __i__ (__iterable0__);
		for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
			var char = __getitem__ (__iterable0__, __index0__);
			(function () {
				var __accu1__ = __accu0__;
				return __call__ (__accu1__.append, __accu1__, __in__ (char, '一二三四五六七八九十〇零0123456789０１２３４５６７８９'));
			}) ();
		}
		return __accu0__;
	}) ())))))))) {
		return false;
	}
	var __left0__ = __getitem__ (_COMPOUND_SUFFIX_READINGS, surface);
	var reading = __left0__ [0];
	var pronunciation = __left0__ [1];
	var required_pos_group1 = __left0__ [2];
	if (__t__ (__t__ (required_pos_group1 === null) || __eq__ (__getitem__ (feature, 'pos_group1'), required_pos_group1))) {
		__call__ (_set_reading, null, njd_features, index, reading, pronunciation);
	}
	return true;
};
export var _read_ra_or_tou = function (njd_features, index) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'njd_features': var njd_features = __allkwargs0__ [__attrib0__]; break;
					case 'index': var index = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var previous = __call__ (_feature_at, null, njd_features, __sub__ (index, 1));
	if (__t__ (__t__ (__ne__ (__getitem__ (__getitem__ (njd_features, index), 'string'), '等')) || previous === null)) {
		return false;
	}
	if (__t__ (__eq__ (__getitem__ (previous, 'pos_group1'), '代名詞'))) {
		__call__ (_set_reading, null, njd_features, index, 'ラ');
		return true;
	}
	if (__t__ (__in__ (__getitem__ (previous, 'pos_group1'), new set (['一般', 'サ変接続', '固有名詞', '接尾'])))) {
		__call__ (_set_reading, null, njd_features, index, 'トウ', 'トー');
		return true;
	}
	return false;
};

