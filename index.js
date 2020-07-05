function createLib (execlib) {
  var lib = execlib.lib,
    ret = {};
  require('./asyncmapcreator')(lib, ret);
  require('./asyncreducecreator')(lib, ret);

  return ret;
}
module.exports = createLib;
