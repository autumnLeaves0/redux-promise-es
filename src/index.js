import isPromise from 'is-promise';
import { isFSA, isError } from './flux-standard-action';

export { isFSA, isError };

export function createPromiseMiddleware(dispatchLoading) {
  return function promiseMiddleware({ dispatch }) {
    return next => action => {
      if (!isFSA(action)) {
        return isPromise(action) ? action.then(dispatch) : next(action);
      }

      if (isPromise(action.payload)) {
        if (dispatchLoading) {
          const loadingAction = { ...action, loading: true };
          delete loadingAction.payload;
          dispatch(loadingAction);
        }
        return action.payload
          .then(result => dispatch({ ...action, payload: result }))
          .catch(error => {
            dispatch({ ...action, payload: error, error: true });
            return Promise.reject(error);
          });
      }

      return next(action);
    };
  };
}

export default createPromiseMiddleware(false);
