import { call, put, takeEvery } from 'redux-saga/effects';
import { SignUp } from '../action';
import { signUp } from 'api';
import { ResponseStatus } from '../reducer';

export function* signUpFlow() {
  yield takeEvery('SignUp', signUpSaga);
}

function* signUpSaga(action: SignUp) {
  try {
    const {
      id,
      status,
    }: {
      id: string;
      status: ResponseStatus;
    } = yield call(signUp, {
      ...action,
    });
    console.log(`id: ${id}. status: ${JSON.stringify(status)}`);
    yield put({ type: 'SignUpSuccess', id: '123456' });
  } catch (e) {
    yield put({ type: 'SignUpFailure', msg: e.msg });
  }
}
