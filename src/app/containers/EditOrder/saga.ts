import { takeLatest } from 'redux-saga/effects';
import { FETCH_TAKEOUT } from '../CreateOrder/constants';
import { FETCH_ORDER, FETCH_PROVIDER } from './constants';

export function* editOrderFlow() {
  yield takeLatest(FETCH_ORDER, fetchOrderSaga);
  yield takeLatest(FETCH_TAKEOUT, fetchTakeoutSaga);
  yield takeLatest(FETCH_PROVIDER, fetchProviderSaga);
}

export function* fetchOrderSaga() {}

export function* fetchTakeoutSaga() {}

export function* fetchProviderSaga() {}
