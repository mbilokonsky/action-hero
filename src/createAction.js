var util = require("util");

module.exports = function createAction(type, payload) {
  if (!type) {
    throw new Error("Must specify a type.");
  }

  if (!util.isString(type)) {
    throw new Error("Type must be a string.");
  }

  var output = {type: type};

  if (payload) {
    output.payload = payload;
  }

  return output;
}