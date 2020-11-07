import { takeLatest, call, put } from 'redux-saga/effects';
import { signIn, Status } from 'api';

import { push } from 'connected-react-router';
import { FetchMeCreator } from 'store/me/action';
import { SIGN_IN, SIGN_OUT, SIGN_IN_BY_TOKEN } from './constants';
import {
  SignIn,
  signInSuccess,
  signInFailure,
  SignInByToken,
  SignOut,
} from './action';

export function* signInFlow() {
  yield takeLatest(SIGN_IN, signInSaga);
  yield takeLatest(SIGN_OUT, signOutSaga);
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
        signInSuccess({
          token: data.token,
        }),
      );

      yield put(FetchMeCreator({ token: data.token }));
      yield put(push(action.from.pathname));
      return;
    }

    yield put(signInFailure({ message: status.msg }));
  } catch (e) {
    yield put(signInFailure({ message: e.message }));
  }
}

export function* signInByTokenFlow() {
  yield takeLatest(SIGN_IN_BY_TOKEN, signInByToken);
  yield takeLatest(SIGN_OUT, signOutSaga);
}

function* signInByToken({ token, from }: SignInByToken) {
  if (!token) {
    return;
  }
  yield put(FetchMeCreator({ token }));
  yield put(push(from.pathname));
}

function* signOutSaga(action: SignOut) {
  yield localStorage.clear();
  yield put(push('/sign-in'));
}
