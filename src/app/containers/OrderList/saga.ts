import { fetchOrderOfPage, fetchTakeOutOfIds, Status } from 'api';
import { call, put, takeLatest } from 'redux-saga/effects';
import { TakeOut } from '../TakeOutList/take-out';
import {
  FetchOrderOfPage,
  fetchOrderOfPageFailure,
  fetchOrderOfPageSuccess,
  FetchTakeOutOfIds,
  fetchTakeOutOfIdsFailure,
  fetchTakeOutOfIdsSuccess,
} from './action';
import { Order } from './reducer';

export function* fetchOrderOfPageFlow() {
  yield takeLatest('FetchOrderOfPage', fetchOrderOfPageSaga);
  yield takeLatest('FetchTakeOutOfIds', fetchTakeOutOfIdsSaga);
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
    } = yield call(fetchOrderOfPage, {
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

export function* fetchTakeOutOfIdsSaga({ token, ids }: FetchTakeOutOfIds) {
  try {
    const {
      data,
      status,
    }: {
      data?: {
        takeOuts: TakeOut[];
      };
      status: Status;
    } = yield call(fetchTakeOutOfIds, { token, ids });

    if (status.code !== 'SUCCESS') {
      yield put(fetchTakeOutOfIdsFailure({ message: status.msg }));
      return;
    }

    yield put(
      fetchTakeOutOfIdsSuccess({
        ...data,
      }),
    );
  } catch (e) {
    yield put(fetchTakeOutOfIdsFailure({ message: e.messge }));
  }
}
