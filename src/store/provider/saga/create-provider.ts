import { takeLatest, put } from 'redux-saga/effects';
import {
  CreateProvider,
  createProviderSuccessCreator,
  createProviderFailureCreator,
} from '../action/create-provider';
import { createProvider, Status } from 'api';
import { push } from 'connected-react-router';

export function* createProviderFlow() {
  yield takeLatest('CreateProvider', createProviderSaga);
}

export function* createProviderSaga({
  name,
  description,
  phone,
  token,
}: CreateProvider) {
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
      token,
      name,
      description,
      phone,
    });

    if (status.code === 'SUCCESS') {
      yield put(createProviderSuccessCreator({ id: data?.id }));
      yield put(push('/provider-management'));
    } else {
      yield put(createProviderFailureCreator({ message: status.msg }));
    }
  } catch (e) {
    yield put(createProviderFailureCreator({ message: e.message }));
  }
}
