import { fetchProviderOfId, Status } from 'api';
import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchUserOfIdsCreator } from 'store/users-of-ids/action/fetch-users-of-id';
import {
  FetchProviderOfId,
  fetchProviderOfIdFailure,
  fetchProviderOfIdSuccess,
} from './action';
import { Provider } from './reducer';

export function* providerFlow() {
  yield takeLatest('FetchProviderOfId', ProviderOfIdSaga);
}

export function* ProviderOfIdSaga({ token, id }: FetchProviderOfId) {
  try {
    const {
      data,
      status,
    }: {
      data?: {
        provider: Provider;
      };
      status: Status;
    } = yield call(fetchProviderOfId, { token, id });

    if (status.code !== 'SUCCESS' || !data) {
      yield put(fetchProviderOfIdFailure({ message: status.msg }));
      return;
    }

    yield put(fetchProviderOfIdSuccess({ ...data }));

    const { createdBy } = data.provider;

    yield put(fetchUserOfIdsCreator({ token, id: createdBy }));
  } catch (e) {
    yield put(fetchProviderOfIdFailure({ message: e.message }));
  }
}
