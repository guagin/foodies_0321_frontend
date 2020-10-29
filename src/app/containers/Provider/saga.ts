import { fetchProviderOfId, Meal, mealsOfProvider, Status } from 'api';
import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchUserOfIdsCreator } from 'store/users-of-ids/action/fetch-users-of-id';
import {
  FetchMealOfProviderId,
  fetchMealOfProviderId,
  fetchMealOfProviderIdFailure,
  fetchMealOfProviderIdSuccess,
  FetchProviderOfId,
  fetchProviderOfIdFailure,
  fetchProviderOfIdSuccess,
} from './action';
import { Provider } from './reducer';

export function* providerFlow() {
  yield takeLatest('FetchProviderOfId', ProviderOfIdSaga);
  yield takeLatest('FetchMealOfProviderId', MealOfProviderIdSaga);
}

export function* ProviderOfIdSaga({ token, id }: FetchProviderOfId) {
  try {
    const {
      data,
      status,
    }: {
      data?: {
        provider: Provider;
      };
      status: Status;
    } = yield call(fetchProviderOfId, { token, id });

    if (status.code !== 'SUCCESS' || !data) {
      yield put(fetchProviderOfIdFailure({ message: status.msg }));
      return;
    }

    yield put(fetchProviderOfIdSuccess({ ...data }));

    const { createdBy } = data.provider;

    yield put(fetchUserOfIdsCreator({ token, ids: createdBy }));
    yield put(fetchMealOfProviderId({ token, id, count: 50 }));
  } catch (e) {
    yield put(fetchProviderOfIdFailure({ message: e.message }));
  }
}

export function* MealOfProviderIdSaga({
  token,
  id,
  page,
  count,
}: FetchMealOfProviderId) {
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
    } = yield call(mealsOfProvider, { token, providerId: id, page, count });

    if (status.code !== 'SUCCESS' || !data) {
      yield put(fetchMealOfProviderIdFailure({ message: status.msg }));
    }

    yield put(fetchMealOfProviderIdSuccess({ ...data }));
  } catch (e) {
    yield put(fetchMealOfProviderIdFailure({ message: e.message }));
  }
}
