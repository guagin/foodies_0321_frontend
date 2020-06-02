import { all, fork } from 'redux-saga/effects';

import { signUpFlow } from './me/saga/sign-up';

export const rootSaga = function* root() {
  yield all([fork(signUpFlow)]);
};
