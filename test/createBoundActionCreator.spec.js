var expect = require("chai").expect;
var sinon = require("sinon");

var subject = require("../src/createBoundActionCreator");
var util = require("util");

describe("The createBoundActionCreator function", function() {
  it("throws an error if called with less than two arguments.", function() {
    expect(subject).to.throw("You must provide a type and a dispatcher.");
  });

  it("throws an error if the type is not a string.", function() {
    expect(subject.bind(null, {}, function() {})).to.throw("Type must be a string.");
  });

  it("throws an error if the payload parser is present but is not a function", function() {
    expect(subject.bind(null, "type", "whatever", function() {})).to.throw("Payload parser must be a function.");
  });

  it("does not throw an error if the payload parser is omitted.", function() {
    expect(subject.bind(null, "type", function() {})).not.to.throw();
  });

  it("throws an error if the dispatcher is not a function.", function() {
    expect(subject.bind(null, "type", function() {}, "whatever")).to.throw("Dispatcher must be a function.");
  });

  describe("returns a function", function() {
    var dispatcher;
    beforeEach(function() {
      dispatcher = sinon.spy();
    });

    it("calls the dispatcher with the action it creates.", function() {
      var boundActionCreator = subject("myType", dispatcher);
      boundActionCreator("myPayload");
      expect(dispatcher.calledWith({type: "myType", payload: "myPayload"})).to.be.true;
    });

    it("works as expected with the optional payload parser function", function() {
      var boundActionCreator = subject("myType", function(a, b) { return a+b }, dispatcher);
      boundActionCreator(2, 5);
      expect(dispatcher.calledWith({type: "myType", payload: 7})) .to.be.true;
    });
  });

});