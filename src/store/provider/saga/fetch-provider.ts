import { takeLatest, put } from 'redux-saga/effects';

import {
  FetchProvider,
  fetchProviderSuccessCreator,
  fetchProviderFailureCreator,
} from '../action/fetch-provider';
import { Status, fetchProvider } from 'api';
import { Provider } from '../reducer';

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

    if (status.code !== 'SUCCESS') {
      yield put(fetchProviderFailureCreator({ message: status.msg }));
      return;
    }

    yield put(fetchProviderSuccessCreator({ ...data }));
  } catch (e) {
    yield put(fetchProviderFailureCreator({ message: e.message }));
  }
}
