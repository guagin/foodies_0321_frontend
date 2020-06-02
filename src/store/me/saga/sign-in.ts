import { SignIn, SignInSuccessCreator, SignInFailureCreator } from '../action';
import { takeLatest, call, put } from 'redux-saga/effects';
import { signIn, Status } from 'api';

export function* signInFlow() {
  yield takeLatest('SignIn', signInSage);
}

function* signInSage(action: SignIn) {
  try {
    const {
      token,
      status,
    }: {
      token: string;
      status: Status;
    } = yield call(signIn, { ...action });

    if (status.code === 'SUCCESS') {
      yield put(
        SignInSuccessCreator({
          token,
        }),
      );
    } else {
      yield put(SignInFailureCreator({ message: status.msg }));
    }
  } catch (e) {
    yield put(SignInFailureCreator({ message: e.message }));
  }
}
