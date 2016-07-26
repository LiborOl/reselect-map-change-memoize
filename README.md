Reselect Map Change Memoize
=======================

A simple memoize function for reselect-map which performs a callback every time the result changes.
This is to reselect-map the same as reselect-change-memoize is for reselect.

This is **alpha** software, use at your own risk.

```js
import { createSelectorWithChangeCallback } from 'reselect-map-change-memoize';

  // eslint-disable-next-line no-unused-vars
  function myCallback(lastArgs, lastResult, newArgs, newResult) {
    // Your code
  }

  const selector = createArraySelectorWithChangeCallback(
    myCallback,
    (state) => state.arrayState,
    (state) => state.id,
    (arrayState, id) => { // eslint-disable-line arrow-body-style
      return {arrayState, id};
    }
  );

  selector({arrayState: [1, 2, 3], initial: 'state'});
```

Alternatively, using the basic logging create selector

```js
import { createSelector } from 'reselect-change-memoize'
import { createArraySelector } from 'reselect-map-change-memoize';

  const selector1 = createArraySelector(
    'An awesome array selector',
    (state) => state.arrayState,
    (state) => state.id,
    (arrayItem, id) => {
      return {arrayItem, id};
    }
  );
  const selector2 = createSelector(
    'A second awesome selector which uses the first awesome selector',
    selector1,
    (selector1Array) => {
      return {selector2: selector1Array};
    }
  );
  // The name doesn't not have to be provided
  const selector3 = createArraySelector(
    selector1,
    (selector1Item) => {
      return {selector2ArrayItem: selector1Item};
    }
  );

  const state = {arrayState: [1, 2, 3], id: 'id'};
  selector2(state);
  selector1(state);
  selector3(state);
```

produces

```
- An awesome array selector
	lastArgs: {}
	lastResult: {}
	newArgs: [ [ 1, 2, 3 ], 'id' ]
	newResult: [ { arrayItem: 1, id: 'id' }, { arrayItem: 2, id: 'id' }, { arrayItem: 3, id: 'id' } ]
- A second awesome selector which uses the first awesome selector
	lastArgs: {}
	lastResult: {}
	newArgs: [ [ { arrayItem: 1, id: 'id' },
    { arrayItem: 2, id: 'id' },
    { arrayItem: 3, id: 'id' } ] ]
	newResult: { selector2:
        [ { arrayItem: 1, id: 'id' }, { arrayItem: 2, id: 'id' }, { arrayItem: 3, id: 'id' } ]
   }
- unknown
	lastArgs: {}
	lastResult: {}
	newArgs: [ [ { arrayItem: 1, id: 'id' },
    { arrayItem: 2, id: 'id' },
    { arrayItem: 3, id: 'id' } ] ]
	newResult: [ { selector2ArrayItem: { arrayItem: 1, id: 'id' } }, { selector2ArrayItem: { arrayItem: 2, id: 'id' } }, { selector2ArrayItem: { arrayItem: 3, id: 'id' } } ]
```
