import { fetchMealOfId, Meal, Status } from 'api';
import { put, takeLatest } from 'redux-saga/effects';
import * as Effects from 'redux-saga/effects';
import {
  FetchMealOfId,
  fetchMealOfIdFailure,
  fetchMealOfIdSuccess,
} from './action';
import { fetchUserOfIdsCreator } from 'store/users-of-ids/action/fetch-users-of-id';

const call: any = Effects.call;

export function* MealFlow() {
  yield takeLatest('FetchMealOfId', fetchMealSaga);
  // TODO: fetchProvider.
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
  } catch (e) {
    yield put(fetchMealOfIdFailure({ message: e.message }));
  }
}
