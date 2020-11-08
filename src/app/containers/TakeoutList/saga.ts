import { takeLatest, put, call } from 'redux-saga/effects';
import {
  FetchTakeout,
  fetchTakeoutFailure,
  fetchTakeoutSuccess,
} from './action';

import { Status, fetchTakeOutList } from 'api';
import { Takeout } from './take-out';
import { FETCH_TAKEOUT } from './constants';

export function* FetchTakeOutFlow() {
  yield takeLatest(FETCH_TAKEOUT, FetchTakeOutSaga);
}

export function* FetchTakeOutSaga({ token, page, count }: FetchTakeout) {
  try {
    const {
      data,
      status,
    }: {
      data?: {
        takeOuts: Takeout[];
        hasPrevious: boolean;
        hasNext: boolean;
        page: number;
        totalPages: number;
        totalCount: number;
      };
      status: Status;
    } = yield call(fetchTakeOutList, { token, page, count });

    if (status.code === 'SUCCESS') {
      yield put(fetchTakeoutSuccess({ ...data }));
      return;
    }

    yield put(fetchTakeoutFailure({ message: status.msg }));
  } catch (e) {
    yield put(fetchTakeoutFailure({ message: e.message }));
  }
}
