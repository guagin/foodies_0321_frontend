import { takeLatest, put } from 'redux-saga/effects';
import * as Effects from 'redux-saga/effects';
import {
  FETCH_TAKEOUT_OF_ID,
  FETCH_ORDER_OF_TAKEOUT_ID,
  FETCH_PROVIDER_OF_ID,
  FETCH_TAKEOUT_USER,
  FETCH_ORDER_USERS,
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
  fetchTakeoutUser,
  FetchTakeoutUser,
  fetchTakeoutUserSuccess,
  fetchTakeoutUserFailure,
  FetchOrderUsers,
  fetchOrderUsers,
  fetchOrderUsersFailure,
  fetchOrderUsersSuccess,
} from './action';
import {
  Takeout,
  Status,
  fetchTakeoutOfId,
  fetchProviderOfId as fetchProviderOfIdAPI,
  fetchUserOfId,
  User,
  fetchUserOfIds,
} from 'api';
import {
  Order,
  fetchOrderOfTakeoutId as fetchOrderOfTakeoutIdAPI,
} from 'api/order';

const call: any = Effects.call;

export function* TakeoutFlow() {
  yield takeLatest(FETCH_TAKEOUT_OF_ID, takeoutOfIdSaga);
  yield takeLatest(FETCH_TAKEOUT_USER, takeoutUserSaga);
  yield takeLatest(FETCH_ORDER_OF_TAKEOUT_ID, orderOfIdSaga);
  yield takeLatest(FETCH_PROVIDER_OF_ID, providerOfIdSaga);
  yield takeLatest(FETCH_ORDER_USERS, orderUsersSaga);
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

    yield put(fetchTakeoutUser({ token, id: data.takeout.createdBy }));
    yield put(fetchTakeoutOfIdSuccess({ ...data }));
    yield put(fetchProviderOfId({ token, id: data.takeout.providerId }));
    yield put(fetchOrderOfTakeoutId({ token, takeoutId: data.takeout.id }));
  } catch (e) {
    yield put(fetchTakeoutOfIdFailure({ message: e.message }));
  }
}

function* takeoutUserSaga({ token, id }: FetchTakeoutUser) {
  try {
    const {
      data,
      status,
    }: {
      data?: {
        user: User;
      };
      status: Status;
    } = yield call(fetchUserOfId, { token, id });

    if (status.code === 'ERROR' || !data) {
      yield put(fetchTakeoutUserSuccess({ message: status.msg }));
      return;
    }

    yield put(fetchTakeoutUserSuccess({ ...data }));
  } catch (e) {
    yield put(fetchTakeoutUserFailure({ message: e.message }));
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

    if (status.code === 'ERROR' || !data) {
      yield put(fetchOrderOfTakeoutIdFailure({ message: status.msg }));
      return;
    }

    yield put(fetchOrderOfTakeoutIdSuccess({ ...data }));

    yield put(
      fetchOrderUsers({ token, userIds: data.orders.map(e => e.createdBy) }),
    );
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

function* orderUsersSaga({ token, userIds }: FetchOrderUsers) {
  try {
    const {
      data,
      status,
    }: {
      data?: {
        users: User[];
      };
      status: Status;
    } = yield call(fetchUserOfIds, { token, ids: userIds });

    if (status.code === 'ERROR') {
      yield put(fetchOrderUsersFailure({ message: status.msg }));
      return;
    }

    yield put(fetchOrderUsersSuccess({ ...data }));
  } catch (e) {
    yield put(fetchOrderUsersFailure({ message: e.message }));
  }
}
