var createAction = require("./createAction");
var util = require("util");

module.exports = function createActionGenerator(type, payload_parser) {
  if (!type) {
    throw new Error("Must specify a type.");
  }

  if (!util.isString(type)) {
    throw new Error("Type must be a string.");
  }

  return function actionGenerator(payload_input) {
    var payload_output;
    if (payload_parser && util.isFunction(payload_parser)) {
      payload_output = payload_parser.apply(null, arguments);
    } else {
      payload_output = payload_input;
    }

    return createAction(type, payload_output);
  }
}