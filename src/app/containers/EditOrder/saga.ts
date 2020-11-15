import {
  fetchOrderOfId,
  Order,
  Takeout,
  fetchTakeoutOfId,
  fetchProviderOfId,
  Provider,
  Meal,
  mealsOfProvider,
  fetchUserOfIds,
  User,
  updateMeal,
} from 'api';
import { Status } from 'api/status';
import { put, takeLatest } from 'redux-saga/effects';
import * as Effects from 'redux-saga/effects';
import {
  FetchCreateMealUsers,
  fetchCreateMealUsersFailure,
  fetchCreateMealUserSuccess,
  fetchMeals,
  FetchMeals,
  fetchMealsFailure,
  fetchMealsSuccess,
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
  UpdateMealAmount,
  updateMealAmountFailure,
  updateMealAmountSuccess,
  fetchOrder,
} from './actions';
import {
  FETCH_MEALS,
  FETCH_MEALS_FAILURE,
  FETCH_ORDER,
  FETCH_PROVIDER,
  FETCH_TAKEOUT,
  UPDATE_MEAL_AMOUNT,
} from './constants';

const call: any = Effects.call;

export function* editOrderFlow() {
  yield takeLatest(FETCH_ORDER, fetchOrderSaga);
  yield takeLatest(FETCH_TAKEOUT, fetchTakeoutSaga);
  yield takeLatest(FETCH_PROVIDER, fetchProviderSaga);
  yield takeLatest(FETCH_MEALS, fetchMealsSaga);
  yield takeLatest(FETCH_MEALS_FAILURE, fetchCreateMealUsersSaga);
  yield takeLatest(UPDATE_MEAL_AMOUNT, updateMealAmountSaga);
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
    yield put(fetchMeals({ token, providerId }));
  } catch (e) {
    yield put(fetchProviderFailure({ message: e.message }));
  }
}

export function* fetchMealsSaga({ token, providerId }: FetchMeals) {
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
    } = yield call(mealsOfProvider, {
      token,
      page: 1,
      count: 500,
      providerId,
    });

    if (status.code !== 'SUCCESS' || !data) {
      yield put(fetchMealsFailure({ message: status.msg }));
      return;
    }

    yield put(fetchMealsSuccess({ ...data }));
  } catch (e) {
    yield put(fetchMealsFailure({ message: e.message }));
  }
}

export function* fetchCreateMealUsersSaga({
  token,
  userIds,
}: FetchCreateMealUsers) {
  try {
    const {
      data,
      status,
    }: {
      data?: {
        users: User[];
      };
      status: Status;
    } = yield call(fetchUserOfIds, {
      token,
      userIds,
    });

    if (status.code === 'ERROR' || !data) {
      yield put(fetchCreateMealUsersFailure({ message: status.msg }));
      return;
    }

    yield put(fetchCreateMealUserSuccess({ ...data }));
  } catch (e) {
    yield put(fetchCreateMealUsersFailure({ message: e.message }));
  }
}

export function* updateMealAmountSaga({
  token,
  id,
  index,
  amount,
}: UpdateMealAmount) {
  try {
    const {
      data,
      status,
    }: {
      data?: {};
      status: Status;
    } = yield call(updateMeal, {
      token,
      id,
      index,
      amount,
    });

    if (status.code === 'ERROR' || !data) {
      yield put(
        updateMealAmountFailure({
          message: status.msg,
        }),
      );
      return;
    }

    yield put(updateMealAmountSuccess({}));
    yield put(fetchOrder({ token, orderId: id }));
  } catch (e) {}
}
