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
  fetchUserOfIds,
  FetchUserOfIds,
  fetchUserOfIdsFailure,
  fetchUserOfIdsSuccess,
} from './action';
import { Order, User } from './reducer';
import { FETCH_ORDER, FETCH_USERS, FETCH_MEALS } from './constants';

export function* fetchOrderDetailFlow() {
  yield takeLatest(FETCH_ORDER, fetchOrderDetailSaga);
  yield takeLatest(FETCH_MEALS, fetchMealOfIdsSaga);
  yield takeLatest(FETCH_USERS, fetchUserOfIdsSaga);
  // yield takeLatest('FtechTakeout');
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

    yield put(
      fetchMealOfIds({ token, ids: data.order.products.map(e => e.id) }),
    );

    yield put(fetchUserOfIds({ token, ids: [data.order.createdBy] }));
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

function* fetchUserOfIdsSaga({ token, ids }: FetchUserOfIds) {
  try {
    const {
      data,
      status,
    }: { data?: { users: User[] }; status: Status } = yield fetchUserOfIds({
      token,
      ids,
    });

    if (status.code !== 'SUCCESS') {
      yield put(
        fetchUserOfIdsFailure({
          message: status.msg,
        }),
      );
      return;
    }

    yield put(
      fetchUserOfIdsSuccess({
        ...data,
      }),
    );
  } catch (e) {
    yield put(
      fetchUserOfIdsFailure({
        message: e.message,
      }),
    );
  }
}
