import { takeLatest, put, call } from 'redux-saga/effects';
import {
  CreateMeal,
  createMealSuccess,
  createMealFailed,
  FetchProviderOfPartialName,
  fetchProviderOfPartialNameFailure,
  fetchProviderOfPartialNameSuccess,
} from './action';
import { Status, createMeal } from 'api';
import { push } from 'connected-react-router';
import { Provider } from './reducer';
import { fetchProvidersByPartialName } from 'api/provider';
import { PickProvider } from '../CreateTakeOut/action';

export function* createMealFlow() {
  yield takeLatest(
    'FetchProviderOfPartialName',
    fetchProviderOfPartialNameSaga,
  );
  yield takeLatest('PickProvider', pickProviderSaga);
  yield takeLatest('CreateMeal', createMealSaga);
}

export function* fetchProviderOfPartialNameSaga({
  token,
  name,
}: FetchProviderOfPartialName) {
  try {
    const {
      data,
      status,
    }: {
      data?: {
        providers: Provider[];
        hasNext: boolean;
        hasPrevious: boolean;
        totalPages: number;
        page: number;
        totalCount: number;
      };
      status: Status;
    } = yield call(fetchProvidersByPartialName, {
      token,
      name,
    });

    if (status.code !== 'SUCCESS') {
      yield put(fetchProviderOfPartialNameFailure({ messge: status.msg }));
    }

    yield put(fetchProviderOfPartialNameSuccess({ ...data }));
  } catch (e) {
    yield put(fetchProviderOfPartialNameFailure({ messge: e.messge }));
  }
}

export function* pickProviderSaga({ providerId }: PickProvider) {
  yield put(push('/create-meal/form'));
}

export function* createMealSaga({
  name,
  provider,
  price,
  description,
  pictures,
  token,
}: CreateMeal) {
  try {
    const {
      data,
      status,
    }: {
      data?: {
        ids: string[];
      };
      status: Status;
    } = yield createMeal({
      token,
      name,
      provider,
      price,
      description,
      pictures,
    });

    if (status.code === 'SUCCESS') {
      yield put(createMealSuccess({ ...data }));

      yield put(push('/meal-list'));
      return;
    }

    yield put(createMealFailed({ ...data }));
  } catch (e) {
    yield put(createMealFailed({ message: e.messge }));
  }
}
