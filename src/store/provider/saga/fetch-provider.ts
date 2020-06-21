import { takeLatest, put } from 'redux-saga/effects';

import {
  FetchProvider,
  fetchProviderSuccessCreator,
  fetchProviderFailureCreator,
} from '../action/fetch-provider';
import { Status, fetchProvider } from 'api';
import { Provider } from '../reduce';

export function* fetchProviderFlow() {
  yield takeLatest('FetchProvider', fetchProviderSaga);
}

function* fetchProviderSaga({ page, count, token }: FetchProvider) {
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
    } = yield fetchProvider({ token, page, count });

    if (status.code === 'SUCCESS') {
      yield put(fetchProviderSuccessCreator({ ...data }));
    } else {
      yield put(fetchProviderFailureCreator({ message: status.msg }));
    }
  } catch (e) {
    console.error(e);
    yield put(fetchProviderFailureCreator({ message: e.message }));
  }
}
