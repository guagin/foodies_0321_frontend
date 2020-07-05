// watch dispatcher

import { put, takeLatest } from 'redux-saga/effects';
import {
  createFetchTakeOutOfPageFailure,
  FetchTakeOutOfPage,
  createFetchTakeOutOfPageSuccess,
} from './action';
import { fetchTakeOutOfPage, Status } from 'api';
import { TakeOut } from './reducer';

export function* FetchTakeOutOfPageFlow() {
  yield takeLatest('FetchTakeOutOfPage', fetchTakeOutOfPageSaga);
}

function* fetchTakeOutOfPageSaga({ token, page, count }: FetchTakeOutOfPage) {
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
        totalPage: number;
        totalCount: number;
      };
      status: Status;
    } = yield fetchTakeOutOfPage({
      token,
      page,
      count,
    });

    if (status.code === 'ERROR') {
      yield put(
        createFetchTakeOutOfPageFailure({
          message: status.msg,
        }),
      );
      return;
    }

    yield put(
      createFetchTakeOutOfPageSuccess({
        ...data,
      }),
    );
  } catch (e) {
    yield put(
      createFetchTakeOutOfPageFailure({
        message: e.message,
      }),
    );
  }
}
