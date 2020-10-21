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
      data,
      status,
    }: {
      data: {
        name: string;
        email: string;
      };
      status: Status;
    } = yield call(fetchMe, { token: action.token });

    if (status.code === 'SUCCESS') {
      yield put(
        FetchMeSuccessCreator({
          name: data.name,
          email: data.email,
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
