import { fetchOrderOfId, Status } from 'api';
import { call, put, takeLatest } from 'redux-saga/effects';
import {
  FetchOrderOfId,
  fetchOrderOfIdFailure,
  fetchOrderOfIdSuccess,
} from './action';
import { Order } from './reducer';

export function* fetchOrderDetailFlow() {
  yield takeLatest('FetchOrderOfId', fetchOrderDetailSaga);
}

export function* fetchOrderDetailSaga({ token, id }: FetchOrderOfId) {
  try {
    const {
      data,
      status,
    }: {
      data?: {
        order: Order;
      };
      status: Status;
    } = yield call(fetchOrderOfId, {
      token,
      id,
    });

    if (status.code !== 'SUCCESS') {
      yield put(fetchOrderOfIdFailure({ message: status.msg }));
      return;
    }

    yield put(fetchOrderOfIdSuccess({ ...data }));
  } catch (e) {
    yield put(fetchOrderOfIdFailure({ message: e.message }));
  }
}
