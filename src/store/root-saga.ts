import { all, fork } from 'redux-saga/effects';

import { signUpFlow } from './me/saga/sign-up';
import { signInFlow } from './me/saga/sign-in';

export const rootSaga = function* root() {
  yield all([fork(signUpFlow), fork(signInFlow)]);
};
