import { takeLatest, put, call, delay } from 'redux-saga/effects';
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
  yield delay(1500);
  try {
    const {
      data,
      status,
    }: {
      data?: {
        providers: Provider[];
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
