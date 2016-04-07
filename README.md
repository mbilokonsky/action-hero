### Action Hero

Action Hero is a utility library for creating action objects. These can be used with flux architectures like Redux, or more generally any time you need a convenient way to instantiate objects of the form `{type: "myType", payload: {...}}`.

Action Hero currently exposes three functions.

`createAction` simply returns a new action with `type` and `payload` properties:
```
import {createAction} from "action-hero";

var mySimpleAction = createAction("myType", "myPayload");
// gives you {type: "myType", payload: "myPayload"};

var noPayload = createAction("noPayload");
// gives you {type: "noPayload"};

var thisDoesNotWork = createAction();
// throws error requesting a type.

var neitherDoesThis = createAction({foo: "bar"});
// throws error requesting a string type.
```

`createActionCreator` returns an actionCreator function whose type property has been bound to the provided type and which takes, as an optional paramter, a `payload parser` function that allows you to pass multiple arguments in and synthesizes them into a single valid payload.
```

import {createActionCreator} from "action-hero";

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

Finally, `createBoundActionCreator` allows you to specify a dispatcher into which created actions should be automatically piped. Use this if every time you create an action you simply apply it to the same dispatcher function - this way, that application gets handled seamlessly behind the scenes for you.
```
import {createBoundActionCreator} from "action-hero";

var dispatcher = function(action) {
  console.log("An action was just dispatched into me.");
  console.log("type:", action.type);
  console.log("payload:", action.payload);
};

var payloadParser = function(a, b) {
  return a + b;
};

var boundActionCreator = createBoundActionCreator("myType", payloadParser, dispatcher);

boundActionCreator(2, 5);
// An action was just dispatched into me.
// type: "myType"
// payload: 7

// as in our previous example, the payloadParser is optional
var simpleBoundActionCreator = createBoundActionCreator("myType", dispatcher);
simpleBoundActionCreator("myPayload");
// An action was just dispatched into me.
// type: "myType"
// payload: 7
```