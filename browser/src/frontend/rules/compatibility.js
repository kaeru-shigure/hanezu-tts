// Generated from pyopenjtalk-plus e7713f2d6d91f392f595df5e8998ff2b62c3b6f5; see tools/build_rules.py.
import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __mergefields__, __mergekwargtrans__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __pyUseJsNext__, __rshift__, __setitem__, __setproperty__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __withblock__, __xor__, _sort, abs, all, any, assert, bin, bool, bytearray, bytes, callable, chr, delattr, dict, dir, divmod, filter, float, getattr, hasattr, hex, input, int, isinstance, issubclass, len, list, map, max, min, object, oct, ord, pow, print, property, py_TypeError, py_enumerate, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
var __name__ = 'compatibility';
export var translate = function (text, table) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'text': var text = __allkwargs0__ [__attrib0__]; break;
					case 'table': var table = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	return __call__ (join_strings, null, '', (function () {
		var __accu0__ = [];
		var __iterable0__ = text;
		__iterable0__ = __i__ (__iterable0__);
		for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
			var c = __getitem__ (__iterable0__, __index0__);
			(function () {
				var __accu1__ = __accu0__;
				return __call__ (__accu1__.append, __accu1__, (function () {
					var __accu2__ = table;
					return __call__ (__accu2__.py_get, __accu2__, c, c);
				}) ());
			}) ();
		}
		return __accu0__;
	}) ());
};
export var merge_dict = function () {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
			}
		}
		var parts = tuple ([].slice.apply (arguments).slice (0, __ilastarg0__ + 1));
	}
	else {
		var parts = tuple ();
	}
	var result = dict ({});
	var __iterable0__ = parts;
	__iterable0__ = __i__ (__iterable0__);
	for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
		var part = __getitem__ (__iterable0__, __index0__);
		(function () {
			var __accu0__ = result;
			return __call__ (__accu0__.py_update, __accu0__, part);
		}) ();
	}
	return result;
};
export var maketrans = function (first, second, third) {
	if (typeof second == 'undefined' || (second != null && second.hasOwnProperty ("__kwargtrans__"))) {;
		var second = null;
	};
	if (typeof third == 'undefined' || (third != null && third.hasOwnProperty ("__kwargtrans__"))) {;
		var third = '';
	};
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'first': var first = __allkwargs0__ [__attrib0__]; break;
					case 'second': var second = __allkwargs0__ [__attrib0__]; break;
					case 'third': var third = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	if (__t__ (second === null)) {
		return first;
	}
	var table = __call__ (dict, null, __call__ (zip, null, first, second));
	var __iterable0__ = third;
	__iterable0__ = __i__ (__iterable0__);
	for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
		var c = __getitem__ (__iterable0__, __index0__);
		__setitem__ (table, c, '');
	}
	return table;
};
export var join_strings = function (separator, fragments) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'separator': var separator = __allkwargs0__ [__attrib0__]; break;
					case 'fragments': var fragments = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	return Array.from(__i__(fragments)).join(separator);
};
export var py_replace = function (obj) {
	var kwargs = dict ();
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'obj': var obj = __allkwargs0__ [__attrib0__]; break;
					default: kwargs [__attrib0__] = __allkwargs0__ [__attrib0__];
				}
			}
			delete kwargs.__kwargtrans__;
		}
	}
	else {
	}
	return Object.assign(Object.create(Object.getPrototypeOf(obj)), obj, kwargs);
};

