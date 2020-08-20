import { takeLatest, call, put } from 'redux-saga/effects';
import { signIn, Status } from 'api';
import { SignIn, SignInFailedCreator, SignInSuccessCreator } from './action';
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
