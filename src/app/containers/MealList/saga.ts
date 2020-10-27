import { takeLatest, put } from 'redux-saga/effects';
import * as Effects from 'redux-saga/effects';

import {
  fetchMealsFailed,
  FetchMeals,
  fetchMealsSuccess,
  FetchProviderOfIds,
  fetchProviderOfIds,
  fetchProviderOfIdsFailure,
  fetchProviderOfIdsSuccess,
} from './action';
import {
  Status,
  fetchMeals,
  fetchProviderOfIds as fetchProviderOfIdsAPI,
} from 'api';
import { map } from 'lodash';
import { Meal, Provider } from './reducer';

const call: any = Effects.call;

export function* fetchMealsFlow() {
  yield takeLatest('FetchMeals', fetchMealsSaga);
  yield takeLatest('FetchProviderOfIds', fetchProviderOfIdsSaga);
}

function* fetchMealsSaga({ page, count, token, name }: FetchMeals) {
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

    if (status.code === 'SUCCESS' && data) {
      yield put(fetchMealsSuccess({ ...data }));
      const { meals } = data;
      yield put(
        fetchProviderOfIds({ token, providerIds: map(meals, e => e.provider) }),
      );
      return;
    }
    yield put(fetchMealsFailed({ message: status.msg }));
  } catch (e) {
    yield put(fetchMealsFailed({ message: e.message }));
  }
}

function* fetchProviderOfIdsSaga({ token, providerIds }: FetchProviderOfIds) {
  try {
    const {
      data,
      status,
    }: {
      data?: {
        providers: Provider[];
      };
      status: Status;
    } = yield call(fetchProviderOfIdsAPI, { token, ids: providerIds });

    if (status.code === 'SUCCESS' && data) {
      yield put(fetchProviderOfIdsSuccess({ ...data }));
      return;
    }

    yield put(
      fetchProviderOfIdsFailure({
        message: status.msg,
      }),
    );
  } catch (e) {
    yield put(fetchProviderOfIdsFailure({ message: e.message }));
  }
}
