import { call, put, takeEvery } from 'redux-saga/effects';
import { SignUp } from '../action';
import { signUp } from 'api';

export function* signUpFlow() {
  yield takeEvery('SignUp', signUpSaga);
}

function* signUpSaga(action: SignUp) {
  yield call(signUp, { ...action });
  try {
    yield put({ type: 'SignUpSuccess', id: '123456' });
  } catch (e) {
    yield put({ type: 'SignUpFailure', msg: e.msg });
  }
}
