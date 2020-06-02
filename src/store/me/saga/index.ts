import { call, put, takeEvery } from 'redux-saga/effects';
import { SignUp, SignUpSuccessCreator, SignUpFailureCreator } from '../action';
import { signUp } from 'api';
import { ResponseStatus } from '../reducer';
import { push } from 'connected-react-router';

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
    if (status.code === 'SUCCESS') {
      yield put(
        SignUpSuccessCreator({
          id,
        }),
      );

      // redirect to home page.
      yield put(push('/'));
    } else {
      yield put(
        SignUpFailureCreator({
          message: status.msg,
        }),
      );
    }
  } catch (e) {
    yield put(
      SignUpFailureCreator({
        message: e.message,
      }),
    );
  }
}
