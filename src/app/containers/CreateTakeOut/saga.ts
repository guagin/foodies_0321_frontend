import { takeLatest, put, call } from 'redux-saga/effects';

import {
  createTakeOutFailed,
  createTakeOutSuccess,
  CreateTakeOut,
  FetchProvidersByPartialName,
  FetchProvidersByPartialNameFailed,
  FetchProvidersByPartialNameSuccess,
  PickProvider,
} from './action';
import { createTakeOut, Status, fetchProvidersByPartialName } from 'api';
import { push } from 'connected-react-router';
import { Provider } from 'store/model/provider';
import {
  CREATE_TAKEOUT,
  FETCH_PROVIDER_BY_PARTIALNAME,
  PICK_PROVIDER,
} from './constants';

export function* createTakeOutFlow() {
  yield takeLatest(
    FETCH_PROVIDER_BY_PARTIALNAME,
    fetchProvidersByPartialNameSaga,
  );
  yield takeLatest(PICK_PROVIDER, pickProviderSaga);
  yield takeLatest(CREATE_TAKEOUT, createTakeOutSaga);
}

function* fetchProvidersByPartialNameSaga(action: FetchProvidersByPartialName) {
  try {
    const {
      data,
      status,
    }: {
      data?: {
        providers: Provider[];
      };
      status: Status;
    } = yield call(fetchProvidersByPartialName, {
      ...action,
    });

    if (status.code === 'ERROR') {
      yield put(FetchProvidersByPartialNameFailed({ message: status.msg }));
      return;
    }

    yield put(FetchProvidersByPartialNameSuccess({ ...data }));
  } catch (e) {
    yield put(FetchProvidersByPartialNameFailed({ message: e.message }));
  }
}

function* pickProviderSaga(action: PickProvider) {
  yield put(push('/take-out/create'));
}

function* createTakeOutSaga(action: CreateTakeOut) {
  try {
    const {
      data,
      status,
    }: {
      data?: {
        id: string;
      };
      status: Status;
    } = yield call(createTakeOut, { ...action });

    if (status.code === 'ERROR') {
      yield put(createTakeOutFailed({ message: status.msg }));
    }

    yield put(createTakeOutSuccess({ ...data }));
    yield put(push('/take-out/list'));
  } catch (e) {
    console.error(e);
    yield put(createTakeOutFailed({ message: e.message }));
  }
}
