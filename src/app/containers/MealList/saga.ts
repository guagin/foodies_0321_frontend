import { takeLatest, put, call } from 'redux-saga/effects';
import { fetchMealsFailed, FetchMeals, fetchMealsSuccess } from './action';
import { Meal } from './meal';
import { Status, fetchMeals } from 'api';

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
        meals: Meal[];
        hasNext: boolean;
        hasPrevious: boolean;
        totalPage: number;
        page: number;
        totalCount: number;
      };
      status: Status;
    } = yield call(fetchMeals, {
      token,
      page,
      count,
    });

    if (status.code === 'SUCCESS') {
      yield put(fetchMealsSuccess({ ...data }));
    } else {
      yield put(fetchMealsFailed({ message: status.msg }));
    }
  } catch (e) {
    yield put(fetchMealsFailed({ message: e.message }));
  }
}
