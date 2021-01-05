# redux-promise-es

```js
npm install --save redux-promise-es
```

## Usage

```js
import promiseMiddleware from 'redux-promise-es';
import { createPromiseMiddleware } from 'redux-promise-es';

dispatch(
  new Promise(resolve => {
    resolve({
      type: 'ACTION_TYPE',
      payload: new Promise()
    });
  })
);
//or
dispatch({
  type: 'ACTION_TYPE',
  payload: new Promise()
});
```

The default export is a middleware function. If it receives a promise, it will dispatch the resolved value of the promise. It will not dispatch anything if the promise rejects.

If it receives an Flux Standard Action whose `payload` is a promise, it will either

- when register middleware use `createPromiseMiddleware(true)`, immediately dispatch a copy of the action.
- dispatch a copy of the action with the resolved value of the promise, and set `status` to `success`.
- dispatch a copy of the action with the rejected value of the promise, and set `status` to `error`.

The middleware returns a promise to the caller so that it can wait for the operation to finish before continuing. This is especially useful for server-side rendering. If you find that a promise is not being returned, ensure that all middleware before it in the chain is also returning its `next()` call to the caller.

## Different from redux-promise

- use `lodash-es`, build size package reduce 60kb (redux-promise will package the entire lodash).
- when register middleware use `createPromiseMiddleware(true)`, immediately dispatch a copy of the action (`{ type, loading: true }`).
