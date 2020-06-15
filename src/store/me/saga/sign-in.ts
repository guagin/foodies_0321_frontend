import { SignIn, SignInSuccessCreator, SignInFailureCreator } from '../action';
import { takeLatest, call, put } from 'redux-saga/effects';
import { signIn, Status } from 'api';
import { push } from 'connected-react-router';

export function* signInFlow() {
  yield takeLatest('SignIn', signInSage);
}

function* signInSage(action: SignIn) {
  try {
    const {
      data,
      status,
    }: {
      data: {
        token: string;
      };
      status: Status;
    } = yield call(signIn, { ...action });

    if (status.code === 'SUCCESS') {
      yield put(
        SignInSuccessCreator({
          token: data.token,
        }),
      );

      yield put(push(action.from.pathname));
    } else {
      yield put(SignInFailureCreator({ message: status.msg }));
    }
  } catch (e) {
    yield put(SignInFailureCreator({ message: e.message }));
  }
}
