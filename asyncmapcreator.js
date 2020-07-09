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
      d.reject(new Error('Array was not provided to asyncmap'));
      return ret;
    }
    res = [];
    asyncmapstep(arry, func, d, res, 0);
    return ret;
  }

  mylib.asyncmap = asyncmap;
}
module.exports = createAsyncMap;
