import { fetchOrderOfPage, Status } from 'api';
import { put, takeLatest } from 'redux-saga/effects';
import {
  FetchOrderOfPage,
  fetchOrderOfPageFailure,
  fetchOrderOfPageSuccess,
} from './action';
import { Order } from './reducer';

export function* fetchOrderOfPageFlow() {
  yield takeLatest('FetchOrderOfPage', fetchOrderOfPageSage);
}

export function* fetchOrderOfPageSage({
  token,
  page,
  count,
}: FetchOrderOfPage) {
  try {
    const {
      data,
      status,
    }: {
      data?: {
        orders: Order[];
        hasPrevious: boolean;
        hasNext: boolean;
        page: number;
        totalPage: number;
        totalCount: number;
      };
      status: Status;
    } = yield fetchOrderOfPage({
      token,
      page,
      count,
    });

    if (status.code !== 'SUCCESS') {
      yield put(fetchOrderOfPageFailure({ message: status.msg }));
      return;
    }

    yield put(
      fetchOrderOfPageSuccess({
        ...data,
      }),
    );
  } catch (e) {
    yield put(fetchOrderOfPageFailure({ message: e.message }));
  }
}
