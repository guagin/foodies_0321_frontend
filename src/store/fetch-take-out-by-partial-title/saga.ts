import { takeLatest, delay, call, put } from 'redux-saga/effects';
import {
  FetchTakeOutByPartialTitle,
  createFetchtakeOutByPartialTitleFailure,
  createFetchTakeOutByPartialTitleSuccess,
} from './action';
import { TakeOut } from 'store/take-out-of-page/reducer';
import { Status, fetchTakeOutByPartialTitle } from 'api';

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
      yield put(
        createFetchtakeOutByPartialTitleFailure({ message: status.msg }),
      );
      return;
    }

    yield put(createFetchTakeOutByPartialTitleSuccess({ ...data }));
  } catch (e) {
    yield put(createFetchtakeOutByPartialTitleFailure({ message: e.message }));
  }
}
