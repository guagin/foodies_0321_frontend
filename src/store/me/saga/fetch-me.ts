import { put, takeLatest, call } from 'redux-saga/effects';
import {
  FetchMe,
  FetchMeSuccessCreator,
  FetchMeFailureCreator,
} from '../action/fetch-me';
import { fetchMe, Status } from 'api';

export function* fetchMeFlow() {
  yield takeLatest('FetchMe', fetchMeSaga);
}

function* fetchMeSaga(action: FetchMe) {
  try {
    const {
      name,
      email,
      status,
    }: {
      name: string;
      email: string;
      status: Status;
    } = yield call(fetchMe, { token: action.token });
    console.log(`fetchMeSaga: ${name} ${email} ${status}`);
    if (status.code === 'SUCCESS') {
      yield put(
        FetchMeSuccessCreator({
          name,
          email,
        }),
      );
    } else {
      yield put(
        FetchMeFailureCreator({
          message: status.msg,
        }),
      );
    }
  } catch (e) {
    yield put(
      FetchMeFailureCreator({
        message: e.msg,
      }),
    );
  }
}
