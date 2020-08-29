import { takeLatest, delay, call, put } from 'redux-saga/effects';
import {
  FetchTakeOutByPartialTitle,
  fetchTakeOutByPartialTitleFailed,
  fetchTakeOutByPartialTitleSuccess,
} from './action';
import { TakeOut } from '../TakeOutList/take-out';
import { fetchTakeOutByPartialTitle, Status } from 'api';

export function* fetchTakeOutByPartialTitleFlow() {
  yield takeLatest(
    'FetchTakeOutByPartialTitle',
    fetchTakeOutByPartialTitleSaga,
  );
}

function* fetchTakeOutByPartialTitleSaga({
  title,
  token,
}: FetchTakeOutByPartialTitle) {
  yield delay(1500);

  try {
    const {
      data,
      status,
    }: {
      data?: {
        takeOuts: TakeOut[];
      };
      status: Status;
    } = yield call(fetchTakeOutByPartialTitle, { title, token });

    if (status.code === 'ERROR') {
      yield put(fetchTakeOutByPartialTitleFailed({ message: status.msg }));
      return;
    }

    yield put(fetchTakeOutByPartialTitleSuccess({ ...data }));
  } catch (e) {
    yield put(fetchTakeOutByPartialTitleFailed({ message: e.message }));
  }
}
