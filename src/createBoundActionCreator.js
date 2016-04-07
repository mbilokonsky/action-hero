var createActionCreator = require("./createActionCreator");
var util = require("util");

module.exports = function(type, payload_parser, dispatcher) {
  if (arguments.length < 2) {
    throw new Error("You must provide a type and a dispatcher.");
  }

  if(arguments.length === 2) {
    dispatcher = payload_parser;
    payload_parser = null;
  }

  if (!util.isString(type)) {
    throw new Error("Type must be a string.");
  }

  if (!util.isFunction(dispatcher)) {
    throw new Error("Dispatcher must be a function.");
  }

  if (payload_parser && !util.isFunction(payload_parser)) {
    throw new Error("Payload parser must be a function.");
  }

  var actionCreator = createActionCreator(type, payload_parser);

  return function() {
    dispatcher(actionCreator.apply(null, arguments));
  }
}