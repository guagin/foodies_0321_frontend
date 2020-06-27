import { takeLatest, put } from 'redux-saga/effects';
import {
  FetchOrderOfPage,
  createFetchOrderOfPageFailure,
  createFetchOrderOfPageSuccess,
} from '../action/fetch-order-of-page';
import { fetchOrderOfPage, Status } from 'api';
import { Order } from '../reducer';

export function* fetchOrderOfPageFlow() {
  yield takeLatest('FetchOrderOfPage', fetchOrderOfPageSaga);
}

export function* fetchOrderOfPageSaga({
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
      yield put(createFetchOrderOfPageFailure({ message: status.msg }));
      return;
    }
    yield put(
      createFetchOrderOfPageSuccess({
        ...data,
      }),
    );
  } catch (e) {
    yield put(createFetchOrderOfPageFailure({ message: e.message }));
  }
}
