import {
  fetchMealOfIds as fetchMealOfIdsAPI,
  fetchOrderOfId,
  Status,
} from 'api';
import { call, put, takeLatest } from 'redux-saga/effects';
import {
  fetchMealOfIds,
  FetchMealOfIds,
  fetchMealOfIdsFailure,
  fetchMealOfIdsSuccess,
  FetchOrderOfId,
  fetchOrderOfIdFailure,
  fetchOrderOfIdSuccess,
} from './action';
import { Order } from './reducer';

export function* fetchOrderDetailFlow() {
  yield takeLatest('FetchOrderOfId', fetchOrderDetailSaga);
  yield takeLatest('FetchMealOfIds', fetchMealOfIdsSaga);
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

    if (status.code !== 'SUCCESS' || !data) {
      yield put(fetchOrderOfIdFailure({ message: status.msg }));
      return;
    }

    yield put(fetchOrderOfIdSuccess({ ...data }));

    const mealIds = data.order.products.map(e => e.id);

    yield put(fetchMealOfIds({ token, ids: mealIds }));
  } catch (e) {
    yield put(fetchOrderOfIdFailure({ message: e.message }));
  }
}

export function* fetchMealOfIdsSaga({ token, ids }: FetchMealOfIds) {
  console.log(token, ids);
  try {
    const {
      data,
      status,
    }: {
      data?: {
        meals;
      };
      status: Status;
    } = yield call(fetchMealOfIdsAPI, {
      token,
      ids,
    });

    if (status.code !== 'SUCCESS') {
      yield put(fetchMealOfIdsFailure({ message: status.msg }));
      return;
    }

    yield put(fetchMealOfIdsSuccess({ ...data }));
  } catch (e) {
    console.log(e);
    yield put(fetchMealOfIdsFailure({ message: e.message }));
  }
}
