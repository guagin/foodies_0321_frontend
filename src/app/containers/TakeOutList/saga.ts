import { takeLatest, put, call } from 'redux-saga/effects';
import {
  FetchTakeOut,
  fetchTakeOutFailed,
  fetchTakeOutSuccess,
} from './action';

import { Status, fetchTakeOutList } from 'api';
import { TakeOut } from './take-out';

export function* FetchTakeOutFlow() {
  yield takeLatest('FetchTakeOut', FetchTakeOutSaga);
}

export function* FetchTakeOutSaga({ token, page, count }: FetchTakeOut) {
  try {
    const {
      data,
      status,
    }: {
      data?: {
        takeOuts: TakeOut[];
        hasPrevious: boolean;
        hasNext: boolean;
        page: number;
        totalPages: number;
        totalCount: number;
      };
      status: Status;
    } = yield call(fetchTakeOutList, { token, page, count });

    if (status.code === 'SUCCESS') {
      yield put(fetchTakeOutSuccess({ ...data }));
      return;
    }

    yield put(fetchTakeOutFailed({ message: status.msg }));
  } catch (e) {
    yield put(fetchTakeOutFailed({ message: e.message }));
  }
}
