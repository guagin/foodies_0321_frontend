import { call, put, takeLatest } from 'redux-saga/effects';
import { SignUp, SignUpSuccessCreator, SignUpFailedCreator } from './action';
import { signUp, Status } from 'api';

import { push } from 'connected-react-router';

export function* signUpFlow() {
  yield takeLatest('SignUp', signUpSaga);
}

function* signUpSaga(action: SignUp) {
  try {
    const {
      data,
      status,
    }: {
      data: {
        id: string;
      };
      status: Status;
    } = yield call(signUp, {
      ...action,
    });
    if (status.code === 'SUCCESS') {
      yield put(
        SignUpSuccessCreator({
          id: data.id,
        }),
      );

      // redirect to home page.
      yield put(push('/'));
    } else {
      yield put(
        SignUpFailedCreator({
          message: status.msg,
        }),
      );
    }
  } catch (e) {
    yield put(
      SignUpFailedCreator({
        message: e.message,
      }),
    );
  }
}
