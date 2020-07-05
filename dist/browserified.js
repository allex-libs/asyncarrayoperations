(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
function createAsyncMap (lib, mylib) {
  'use strict';

  var q = lib.q;

  function asyncmapstep (arry, func, defer, result, index) {
    var el;
    index = index || 0;
    if (index>=arry.length) {
      defer.resolve(result);
      return;
    }
    el = arry[index];
    result.push(func(el, index, arry));
    lib.runNext(asyncmapstep.bind(null, arry, func, defer, result, index+1));
    arry = null;
    func = null;
    defer = null;
    result = null;
    index = null;
  }

  function asyncmap (arry, func) {
    var res, d = q.defer(), ret = d.promise;
    if (!lib.isArray(arry)) {
      return null;
    }
    res = [];
    asyncmapstep(arry, func, d, res, 0);
    return ret;
  }

  mylib.asyncmap = asyncmap;
}
module.exports = createAsyncMap;

},{}],2:[function(require,module,exports){
function createAsyncReduce (lib, mylib) {
  'use strict';

  var q = lib.q;

  function asyncreducestep (arry, func, d, accumulator, index) {
    var el;
    index = index || 0;
    if (index>=arry.length) {
      d.resolve(accumulator);
      return;
    }
    el = arry[index];
    accumulator = func(accumulator, el, index, arry);
    lib.runNext(asyncreducestep.bind(null, arry, func, d, accumulator, index+1));
    arry = null;
    func = null;
    d = null;
    accumulator = null;
    index = null;
  }

  function asyncreduce (arry, func, accumulator) {
    var d = q.defer(), ret = d.promise;
    if (!lib.isArray(arry)) {
      return null;
    }
    asyncreducestep(arry, func, d, accumulator, 0);
    return ret;
  }

  mylib.asyncreduce = asyncreduce;
}
module.exports = createAsyncReduce;

},{}],3:[function(require,module,exports){
var lR = ALLEX.execSuite.libRegistry;
lR.register('allex_asynarrayoperationslib', require('./index')(ALLEX));

},{"./index":4}],4:[function(require,module,exports){
function createLib (execlib) {
  var lib = execlib.lib,
    ret = {};
  require('./asyncmapcreator')(lib, ret);
  require('./asyncreducecreator')(lib, ret);

  return ret;
}
module.exports = createLib;

},{"./asyncmapcreator":1,"./asyncreducecreator":2}]},{},[3]);
