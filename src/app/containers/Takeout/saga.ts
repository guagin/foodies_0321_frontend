import { takeLatest, put } from 'redux-saga/effects';
import * as Effects from 'redux-saga/effects';
import {
  FETCH_TAKEOUT_OF_ID,
  FETCH_ORDER_OF_TAKEOUT_ID,
  FETCH_PROVIDER_OF_ID,
} from './constants';
import {
  fetchTakeoutOfIdFailure,
  FetchTakeoutOfId,
  fetchTakeoutOfIdSuccess,
  FetchOrderOfTakeoutId,
  fetchOrderOfTakeoutIdSuccess,
  fetchOrderOfTakeoutId,
  fetchOrderOfTakeoutIdFailure,
  FetchProviderOfId,
  fetchProviderOfIdFailure,
  fetchProviderOfIdSuccess,
  fetchProviderOfId,
} from './action';
import {
  Takeout,
  Status,
  fetchTakeoutOfId,
  fetchProviderOfId as fetchProviderOfIdAPI,
} from 'api';
import {
  Order,
  fetchOrderOfTakeoutId as fetchOrderOfTakeoutIdAPI,
} from 'api/order';

const call: any = Effects.call;

export function* TakeoutFlow() {
  yield takeLatest(FETCH_TAKEOUT_OF_ID, takeoutOfIdSaga);
  yield takeLatest(FETCH_ORDER_OF_TAKEOUT_ID, orderOfIdSaga);
  yield takeLatest(FETCH_PROVIDER_OF_ID, providerOfIdSaga);
}

function* takeoutOfIdSaga({ token, id }: FetchTakeoutOfId) {
  try {
    const {
      data,
      status,
    }: {
      data?: {
        takeout: Takeout;
      };
      status: Status;
    } = yield call(fetchTakeoutOfId, { token, id });

    if (status.code !== 'SUCCESS' || !data) {
      yield put(fetchTakeoutOfIdFailure({ message: status.msg }));
      return;
    }

    yield put(fetchTakeoutOfIdSuccess({ ...data }));

    yield put(fetchOrderOfTakeoutId({ token, takeoutId: data.takeout.id }));
    yield put(fetchProviderOfId({ token, id: data.takeout.providerId }));
  } catch (e) {
    yield put(fetchTakeoutOfIdFailure({ message: e.message }));
  }
}

function* orderOfIdSaga({ token, takeoutId }: FetchOrderOfTakeoutId) {
  try {
    const {
      data,
      status,
    }: {
      data?: {
        orders: Order[];
      };
      status: Status;
    } = yield call(fetchOrderOfTakeoutIdAPI, { token, takeoutId });

    if (status.code === 'ERROR') {
      yield put(fetchOrderOfTakeoutIdFailure({ message: status.msg }));
      return;
    }

    yield put(fetchOrderOfTakeoutIdSuccess({ ...data }));
  } catch (e) {
    yield put(fetchOrderOfTakeoutIdFailure({ message: e.message }));
  }
}

function* providerOfIdSaga({ token, id }: FetchProviderOfId) {
  try {
    const {
      data,
      status,
    }: {
      data?: {
        orders: Order[];
      };
      status: Status;
    } = yield call(fetchProviderOfIdAPI, { token, id });

    if (status.code === 'ERROR') {
      yield put(fetchProviderOfIdFailure({ message: status.msg }));
      return;
    }

    yield put(fetchProviderOfIdSuccess({ ...data }));
  } catch (e) {
    yield put(fetchProviderOfIdFailure({ message: e.message }));
  }
}
