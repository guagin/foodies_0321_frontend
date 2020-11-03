import { takeLatest, put } from 'redux-saga/effects';
import * as Effects from 'redux-saga/effects';
import {
  createOrderFailure,
  CreateOrder,
  createOrderSuccess,
  FetchMeals,
  fetchMealsFailed,
  FetchTakeout,
  fetchTakeoutFailure,
  fetchTakeoutSuccess,
  fetchMeals,
  fetchMealsSuccess,
} from './action';

import {
  Status,
  createOrder,
  mealsOfProvider,
  fetchTakeoutOfId,
  Takeout,
  Meal,
} from 'api';
import { push } from 'connected-react-router';

import { CREATE_ORDER, FETCH_MEALS, FETCH_TAKEOUT } from './constants';

const call: any = Effects.call;

export function* createOrderFlow() {
  yield takeLatest(FETCH_TAKEOUT, fetchTakeoutSaga);
  yield takeLatest(FETCH_MEALS, fetchMealsSaga);
  yield takeLatest(CREATE_ORDER, createOrderSaga);
}

function* fetchTakeoutSaga({ token, id }: FetchTakeout) {
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

    if (status.code === 'ERROR' || !data) {
      yield put(fetchTakeoutFailure({ message: status.msg }));
      return;
    }

    yield put(fetchTakeoutSuccess({ ...data }));
    yield put(
      fetchMeals({
        token,
        page: 1,
        count: 500,
        providerId: data.takeout.providerId,
      }),
    );
  } catch (e) {
    yield put(fetchTakeoutFailure({ messge: e.messge }));
  }
}

function* fetchMealsSaga({ token, providerId, page, count }: FetchMeals) {
  try {
    const {
      data,
      status,
    }: {
      data?: {
        meals: Meal[];
        hasNext: boolean;
        hasPrevious: boolean;
        totalPages: number;
        page: number;
        totalCount: number;
      };
      status: Status;
    } = yield call(mealsOfProvider, { token, providerId, page, count });

    if (status.code === 'ERROR') {
      yield put(fetchMealsFailed({ message: status.msg }));
      return;
    }

    yield put(fetchMealsSuccess({ ...data }));
  } catch (e) {
    yield put(createOrderFailure({ messge: e.messge }));
  }
}

function* createOrderSaga({ token, takeOutId, meals }: CreateOrder) {
  try {
    const {
      data,
      status,
    }: {
      data?: {
        id: string;
      };
      status: Status;
    } = yield call(createOrder, { token, takeOutId, meals });

    if (status.code === 'ERROR') {
      yield put(createOrderFailure({ message: status.msg }));
      yield put(push('/order-list'));
      return;
    }

    yield put(createOrderSuccess({ ...data }));
  } catch (e) {
    yield put(createOrderFailure({ messge: e.messge }));
  }
}
