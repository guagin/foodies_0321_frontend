import { put, takeLatest } from 'redux-saga/effects';
import {
  FetchUserOfIds,
  fetchUserOfIdsFailureCreator,
  fetchUserOfIdsSuccessCreator,
} from '../action/fetch-users-of-id';
import { User } from '../reducer';
import { Status, fetchUserOfIds } from 'api';

export function* FetchUserOfIdsFlow() {
  yield takeLatest('FetchUserOfIds', fetchUserOfIdsSaga);
}

function* fetchUserOfIdsSaga({ token, ids }: FetchUserOfIds) {
  try {
    const {
      data,
      status,
    }: { data?: { users: User[] }; status: Status } = yield fetchUserOfIds({
      token,
      ids,
    });

    if (status.code !== 'SUCCESS') {
      yield put(
        fetchUserOfIdsFailureCreator({
          message: status.msg,
        }),
      );
      return;
    }

    yield put(
      fetchUserOfIdsSuccessCreator({
        ...data,
      }),
    );
  } catch (e) {
    yield put(
      fetchUserOfIdsFailureCreator({
        message: e.message,
      }),
    );
  }
}
