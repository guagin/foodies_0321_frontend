import { takeLatest, put } from 'redux-saga/effects';
import { Status, createProvider } from 'api';
import {
  CreateProvider,
  createProviderSuccess,
  createProviderFailed,
} from './action';
import { push } from 'connected-react-router';

export function* createProviderFlow() {
  yield takeLatest('CreateProvider', createProviderSaga);
}

function* createProviderSaga(action: CreateProvider) {
  try {
    const {
      data,
      status,
    }: {
      data?: {
        id: string;
      };
      status: Status;
    } = yield createProvider({
      ...action,
    });

    if (status.code === 'SUCCESS') {
      yield put(createProviderSuccess({ ...data }));
      yield put(push('/provider-list'));
      return;
    }
    yield put(createProviderFailed({ message: status.msg }));
  } catch (e) {
    yield put(createProviderFailed({ message: e.message }));
  }
}
