import {
  FetchMeals,
  fetchMealsSuccessCreator,
  fetchMealsFailureCreator,
} from '../action/fetch-meals';
import { Meal } from '../reducer';
import { Status, fetchMeals } from 'api';
import { put, takeLatest } from 'redux-saga/effects';

export function* fetchMealsFlow() {
  yield takeLatest('FetchMeals', fetchMealsSaga);
}

function* fetchMealsSaga({ page, count, token }: FetchMeals) {
  try {
    const {
      data,
      status,
    }: {
      data?: {
        meal: Meal[];
        hasNext: boolean;
        hasPrevious: boolean;
        totalPages: number;
        pages: number;
      };
      status: Status;
    } = yield fetchMeals({
      token,
      page,
      count,
    });

    console.log(status);

    if (status.code === 'SUCCESS') {
      yield put(fetchMealsSuccessCreator({ ...data }));
    } else {
      yield put(fetchMealsFailureCreator({ message: status.msg }));
    }
  } catch (e) {
    yield put(fetchMealsFailureCreator({ message: e.message }));
  }
}
