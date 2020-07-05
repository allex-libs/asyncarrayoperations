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
