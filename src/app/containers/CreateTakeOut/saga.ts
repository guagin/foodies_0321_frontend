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
import { createTakeOut, Status, fetchProviderByPartialName } from 'api';
import { push } from 'connected-react-router';
import { Provider } from 'store/model/provider';

export function* createTakeOutFlow() {
  yield takeLatest(
    'FetchProvidersByPartialName',
    fetchProvidersByPartialNameSaga,
  );
  yield takeLatest('PickProvider', pickProviderSaga);
  yield takeLatest('CreateTakeOut', createTakeOutSaga);
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
    } = yield call(fetchProviderByPartialName, {
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
    yield put(push('/take-out-management'));
  } catch (e) {
    console.error(e);
    yield put(createTakeOutFailed({ message: e.message }));
  }
}
