import { call, put, takeEvery } from 'redux-saga/effects';
import { SignUp } from '../action';
import { signUp } from 'api';

export function* signUpFlow() {
  yield takeEvery('SignUp', signUpSaga);
}

function* signUpSaga(action: SignUp) {
  try {
    const { id, status } = yield call(signUp, { ...action });
    console.log(`id: ${id}. status: ${status}`);
    yield put({ type: 'SignUpSuccess', id: '123456' });
  } catch (e) {
    yield put({ type: 'SignUpFailure', msg: e.msg });
  }
}
