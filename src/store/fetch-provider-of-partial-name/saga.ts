import { takeLatest, put, call } from 'redux-saga/effects';
import {
  FetchProviderByPartialName,
  CreateFetchProviderByPartialNameFailure,
  CreateFetchProviderByPartialNameSuccess,
} from './action';
import { Provider } from 'store/model/provider';
import { Status, fetchProviderByPartialName } from 'api';

export function* fetchProviderByPartialNameFlow() {
  yield takeLatest(
    'FetchProviderByPartialName',
    fetchProviderByPartialNameSaga,
  );
}

function* fetchProviderByPartialNameSaga({
  name,
  token,
}: FetchProviderByPartialName) {
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
    } = yield call(fetchProviderByPartialName, { name, token });

    if (status.code === 'ERROR') {
      yield put(
        CreateFetchProviderByPartialNameFailure({ message: status.msg }),
      );
      return;
    }

    yield put(CreateFetchProviderByPartialNameSuccess({ ...data }));
  } catch (e) {
    yield put(CreateFetchProviderByPartialNameFailure({ message: e.message }));
  }
}
