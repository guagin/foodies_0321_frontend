import { takeLatest, put } from 'redux-saga/effects';

import { Status, fetchProviderOfPage } from 'api';
import { Provider } from 'store/model/provider';
import {
  FetchProviderOfPage,
  fetchProviderOfPageFailure,
  fetchProviderOfPageSuccess,
} from './action';

export function* providerListFlow() {
  yield takeLatest('FetchProviderOfPage', fetchProviderOfPageSaga);
}

function* fetchProviderOfPageSaga({ page, count, token }: FetchProviderOfPage) {
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
    } = yield fetchProviderOfPage({ token, page, count });

    if (status.code !== 'SUCCESS') {
      yield put(fetchProviderOfPageFailure({ message: status.msg }));
      return;
    }

    yield put(fetchProviderOfPageSuccess({ ...data }));
  } catch (e) {
    yield put(fetchProviderOfPageFailure({ message: e.message }));
  }
}
