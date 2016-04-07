var expect = require("chai").expect;
var subject = require("../src/createAction");

describe("createAction", function() {
  it("throws an error if called without a type.", function() {
    expect(subject).to.throw("Must specify a type.");
  });

  it("throws an error if the type is not a string.", function() {
    expect(subject.bind(null, {})).to.throw("Type must be a string.");
  });

  it("returns an object with two keys, type and payload, when called with both.", function() {
    var action = subject("type", "payload");
    expect(action.type).to.equal("type");
    expect(action.payload).to.equal("payload");
    expect(Object.keys(action).length).to.equal(2);
  });

  it("returns an object with one key, type, when called with no payload.", function() {
    var action = subject("type");
    expect(action.type).to.equal("type");
    expect(Object.keys(action).length).to.equal(1);
  });
});