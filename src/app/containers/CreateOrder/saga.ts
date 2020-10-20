import { takeLatest, delay, call, put } from 'redux-saga/effects';
import {
  FetchTakeOutByPartialTitle,
  fetchTakeOutByPartialTitleFailed,
  fetchTakeOutByPartialTitleSuccess,
  createOrderFailed,
  CreateOrder,
  createOrderSuccess,
  FetchMeals,
  fetchMealsFailed,
  PickTakeOut,
} from './action';
import { TakeOut } from '../TakeOutList/take-out';
import {
  fetchTakeOutByPartialTitle,
  Status,
  createOrder,
  mealsOfProvider,
} from 'api';
import { push } from 'connected-react-router';
import { fetchMealsSuccess } from '../MealList/action';
import { Meal } from '../MealList/meal';

export function* pickTakeOutFlow() {
  yield takeLatest(
    'FetchTakeOutByPartialTitle',
    fetchTakeOutByPartialTitleSaga,
  );
  yield takeLatest('PickTakeOut', pickedTakeOutSaga);
}

function* fetchTakeOutByPartialTitleSaga({
  title,
  token,
}: FetchTakeOutByPartialTitle) {
  yield delay(1500);

  try {
    const {
      data,
      status,
    }: {
      data?: {
        takeOuts: TakeOut[];
      };
      status: Status;
    } = yield call(fetchTakeOutByPartialTitle, { title, token });

    if (status.code === 'ERROR') {
      yield put(fetchTakeOutByPartialTitleFailed({ message: status.msg }));
      return;
    }

    yield put(fetchTakeOutByPartialTitleSuccess({ ...data }));
  } catch (e) {
    yield put(fetchTakeOutByPartialTitleFailed({ message: e.message }));
  }
}

function* pickedTakeOutSaga({ takeOutId }: PickTakeOut) {
  yield put(push('/order/create/detail'));
}

export function* createOrderFlow() {
  yield takeLatest('FetchMeals', fetchMealsSaga);
  yield takeLatest('CreateOrder', createOrderSaga);
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
    yield put(createOrderFailed({ messge: e.messge }));
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
      yield put(createOrderFailed({ message: status.msg }));
      yield put(push('/order-list'));
      return;
    }

    yield put(createOrderSuccess({ ...data }));
  } catch (e) {
    yield put(createOrderFailed({ messge: e.messge }));
  }
}
