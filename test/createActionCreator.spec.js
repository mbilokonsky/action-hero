var expect = require("chai").expect;
var subject = require("../src/createActionCreator");
var util = require("util");

describe("The createActionCreator function", function() {
  it("throws an error if called without a type.", function() {
    expect(subject).to.throw("Must specify a type.");
  });

  it("throws an error if the type is not a string.", function() {
    expect(subject.bind(null, {})).to.throw("Type must be a string.");
  });

  describe("returns a function", function() {

    it("which returns new actions with the type set to the actionCreator's specified type", function() {
      var actionCreator = subject("type");
      expect(actionCreator().type).to.equal("type");
    });

    it("which takes a payload and, if no payload parser is provided, passes it directly to the action", function() {
      var actionCreator = subject("type");
      expect(actionCreator("payload").payload).to.equal("payload");
    });

    it("which, if a payload parser is provided, converts arguments into a payload", function() {
      var actionCreator = subject("type", function(foo, bar) { return foo + bar; });
      expect(actionCreator(2, 2).payload).to.equal(4);
    });
  });
});