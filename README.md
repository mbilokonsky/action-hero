### Action Hero

Action Hero is a utility library for creating action objects. These can be used with flux architectures like Redux, or more generally any time you need a convenient way to instantiate objects of the form `{type: "myType", payload: {...}}`.

Action Hero currently exposes two functions.

```
import {createAction, createActionCreator} from "action-hero";

var mySimpleAction = createAction("myType", "myPayload");
// gives you {type: "myType", payload: "myPayload"};

var noPayload = createAction("noPayload");
// gives you {type: "noPayload"};

var thisDoesNotWork = createAction();
// throws error requesting a type.

var neitherDoesThis = createAction({foo: "bar"});
// throws error requesting a string type.

// createActionCreator has some helpful features:

// in its most vanilla mode, it works like this:
var myActionCreator = createActionCreator("myType");

var action = myActionCreator();
// returns {type: "myType"};

var action2 = myActionCreator("payload");
// returns {type: "myType", payload: "payload"};

var action3 = myActionCreator("payload", "some", "other", "args");
// returns {type: "myType", payload: "payload"}
// the other args are ignored.

// however, createActionCreator takes an optional argument which is a payload parser
// if you provide it, you'll be able to call the resulting action creator with
// whatever arguments you want.
var complexActionCreator = createActionCreator("myType", function(a, b) {
  return a + b;
});

var action = complexActionCreator(2, 2);
// returns {type: "myType", payload: 4};
```

I'd like to add some utility hooks here which autowire your action creators to a dispatcher (in much the same way that reduce offers autobinding syntax to wire up actionCreators to `store.dispatch`).

The larger goal here is to provide a base from which highly customized action creators can be built. Allowing payload parsers in the action creator means that users can do all sorts of stuff, like automatically timestamping actions or filtering which inputs get turned into actions.