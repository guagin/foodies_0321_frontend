import { all, fork } from 'redux-saga/effects';

import { signUpFlow } from './me/saga/sign-up';
import { signInFlow } from './me/saga/sign-in';
import { fetchMeFlow } from './me/saga/fetch-me';
import { fetchMealsFlow } from './menu/saga/fetch-meals';

export const rootSaga = function* root() {
  yield all([
    fork(signUpFlow),
    fork(signInFlow),
    fork(fetchMeFlow),
    fork(fetchMealsFlow),
  ]);
};
