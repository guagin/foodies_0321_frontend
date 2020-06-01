import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import delay from 'delay';

export const rootSaga = function* root() {
  yield all([fork(watchSignUpFlow)]);
};

function* watchSignUpFlow() {
  yield takeEvery('SignUp', SignUp);
}

function* SignUp(action) {
  yield call(delay, 1000);
  console.log(action);
  yield put({ type: 'SignUpSuccess', id: '123456' });
}
