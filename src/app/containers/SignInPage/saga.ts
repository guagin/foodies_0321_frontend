import { takeLatest, call, put } from 'redux-saga/effects';
import { signIn, Status } from 'api';
import {
  SignIn,
  SignInFailedCreator,
  SignInSuccessCreator,
  SignInByToken,
} from './action';
import { push } from 'connected-react-router';
import { FetchMeCreator } from 'store/me/action';

export function* signInFlow() {
  yield takeLatest('SignIn', signInSaga);
}

function* signInSaga(action: SignIn) {
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
      localStorage.setItem('token', data.token);
      yield put(
        SignInSuccessCreator({
          token: data.token,
        }),
      );

      yield put(FetchMeCreator({ token: data.token }));
      yield put(push(action.from.pathname));
      return;
    }

    yield put(SignInFailedCreator({ message: status.msg }));
  } catch (e) {
    yield put(SignInFailedCreator({ message: e.message }));
  }
}

export function* signInByTokenFlow() {
  yield takeLatest('SignInByToken', signInByToken);
}

function* signInByToken({ token, from }: SignInByToken) {
  yield put(FetchMeCreator({ token }));
  yield put(push(from.pathname));
}
