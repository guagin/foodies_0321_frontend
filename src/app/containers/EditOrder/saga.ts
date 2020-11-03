import {
  fetchOrderOfId,
  Order,
  Takeout,
  fetchTakeoutOfId,
  fetchProviderOfId,
  Provider,
} from 'api';
import { Status } from 'api/status';
import { call, put, takeLatest } from 'redux-saga/effects';
import {
  FetchOrder,
  fetchOrderFailure,
  fetchOrderSuccess,
  FetchProvider,
  fetchProvider,
  fetchProviderFailure,
  fetchProviderSuccess,
  FetchTakeout,
  fetchTakeout,
  fetchTakeoutFailure,
  fetchTakeoutSuccess,
} from './actions';
import { FETCH_ORDER, FETCH_PROVIDER, FETCH_TAKEOUT } from './constants';

export function* editOrderFlow() {
  yield takeLatest(FETCH_ORDER, fetchOrderSaga);
  yield takeLatest(FETCH_TAKEOUT, fetchTakeoutSaga);
  yield takeLatest(FETCH_PROVIDER, fetchProviderSaga);
}

export function* fetchOrderSaga({ token, orderId }: FetchOrder) {
  try {
    const {
      data,
      status,
    }: {
      data?: {
        order: Order;
      };
      status: Status;
    } = yield call(fetchOrderOfId, { token, id: orderId });

    if (status.code === 'ERROR' || !data) {
      yield put(fetchOrderFailure({ message: status.msg }));
      return;
    }

    yield put(fetchOrderSuccess({ ...data }));
    const { order } = data;
    yield put(fetchTakeout({ token, takeoutId: order.takeOutId }));
  } catch (e) {
    yield put(fetchOrderFailure({ message: e.message }));
  }
}

export function* fetchTakeoutSaga({ token, takeoutId }: FetchTakeout) {
  try {
    const {
      data,
      status,
    }: {
      data?: {
        takeout: Takeout;
      };
      status: Status;
    } = yield call(fetchTakeoutOfId, { token, id: takeoutId });

    if (status.code === 'ERROR' || !data) {
      yield put(fetchTakeoutFailure({ message: status.msg }));
      return;
    }

    const { takeout } = data;
    yield put(fetchTakeoutSuccess({ takeout }));
    yield put(fetchProvider({ token, providerId: takeout.providerId }));
  } catch (e) {
    yield put(fetchTakeoutFailure({ message: e.message }));
  }
}

export function* fetchProviderSaga({ token, providerId }: FetchProvider) {
  try {
    const {
      data,
      status,
    }: {
      data?: {
        provider: Provider;
      };
      status: Status;
    } = yield call(fetchProviderOfId, { token, id: providerId });

    if (status.code === 'ERROR' || !data) {
      yield put(fetchProviderFailure({ message: status.msg }));
      return;
    }

    yield put(fetchProviderSuccess({ ...data }));
  } catch (e) {
    yield put(fetchProviderFailure({ message: e.message }));
  }
}
