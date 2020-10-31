import {
  fetchMealOfId,
  fetchProviderOfId as fetchProviderOfIdAPI,
  Meal,
  Status,
  updateMealProps,
} from 'api';
import { put, takeLatest } from 'redux-saga/effects';
import * as Effects from 'redux-saga/effects';
import {
  FetchMealOfId,
  fetchMealOfIdFailure,
  fetchMealOfIdSuccess,
  fetchProviderOfId,
  FetchProviderOfId,
  fetchProviderOfIdFailure,
  fetchProviderOfIdSuccess,
  UpdateMeal,
  updateMealFailure,
  updateMealSuccess,
} from './action';
import { fetchUserOfIdsCreator } from 'store/users-of-ids/action/fetch-users-of-id';
import { Provider } from './reducer';
import {
  FETCH_MEAL_OF_ID,
  FETCH_PROVIDER_OF_ID,
  UPDATE_MEAL,
} from './constants';
import { push } from 'connected-react-router';

const call: any = Effects.call;

export function* MealFlow() {
  yield takeLatest(FETCH_MEAL_OF_ID, fetchMealSaga);
  yield takeLatest(FETCH_PROVIDER_OF_ID, fetchProviderOfIdSaga);
  yield takeLatest(UPDATE_MEAL, updateMealSaga);
}

function* fetchMealSaga({ token, id }: FetchMealOfId) {
  try {
    const {
      data,
      status,
    }: {
      data?: {
        meal: Meal;
      };
      status: Status;
    } = yield call(fetchMealOfId, {
      token,
      id,
    });

    if (status.code !== 'SUCCESS' || !data) {
      yield put(fetchMealOfIdFailure({ message: status.msg }));
      return;
    }

    yield put(fetchMealOfIdSuccess({ ...data }));
    yield put(fetchUserOfIdsCreator({ token, ids: [data.meal.createdBy] }));
    yield put(fetchProviderOfId({ token, id: data.meal.provider }));
  } catch (e) {
    yield put(fetchMealOfIdFailure({ message: e.message }));
  }
}

function* fetchProviderOfIdSaga({ token, id }: FetchProviderOfId) {
  try {
    const {
      data,
      status,
    }: {
      data?: {
        provider: Provider;
      };
      status: Status;
    } = yield call(fetchProviderOfIdAPI, { token, id });

    if (status.code !== 'SUCCESS' || !data) {
      yield put(fetchProviderOfIdFailure({ message: status.msg }));
    }

    yield put(fetchProviderOfIdSuccess({ ...data }));
  } catch (e) {
    yield put(fetchProviderOfIdFailure({ message: e.message }));
  }
}

function* updateMealSaga(input: UpdateMeal) {
  try {
    const {
      data,
      status,
    }: {
      data?: {};
      status: Status;
    } = yield call(updateMealProps, { ...input });

    if (status.code === 'ERROR') {
      yield put(updateMealFailure({ message: status.msg }));
      return;
    }

    yield put(updateMealSuccess({ ...data }));
    yield put(push(`/meal/ofId/${input.id}`));
  } catch (e) {
    yield put(updateMealFailure({ message: e.message }));
  }
}
