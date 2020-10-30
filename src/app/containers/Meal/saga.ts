import {
  fetchMealOfId,
  fetchProviderOfId as fetchProviderOfIdAPI,
  Meal,
  Status,
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
} from './action';
import { fetchUserOfIdsCreator } from 'store/users-of-ids/action/fetch-users-of-id';
import { Provider } from './reducer';

const call: any = Effects.call;

export function* MealFlow() {
  yield takeLatest('FetchMealOfId', fetchMealSaga);
  // TODO: fetchProvider.
  yield takeLatest('FetchProviderOfId', fetchProviderOfIdSaga);
}

function* fetchMealSaga({ token, id }: FetchMealOfId) {
  try {
    // fetch meal ofid
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
