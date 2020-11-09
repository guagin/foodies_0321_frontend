import { takeLatest, put } from 'redux-saga/effects';
import * as Effects from 'redux-saga/effects';
import {
  FetchTakeout,
  fetchTakeoutFailure,
  fetchTakeoutSuccess,
  fetchUsers,
  FetchUsers,
  fetchUsersFailure,
  fetchUsersSuccess,
} from './action';

import { Status, fetchTakeOutList, fetchUserOfIds, User } from 'api';
import { Takeout } from './take-out';
import { FETCH_TAKEOUT, FETCH_USERS } from './constants';

const call: any = Effects.call;

export function* FetchTakeOutFlow() {
  yield takeLatest(FETCH_TAKEOUT, fetchTakeOutSaga);
  yield takeLatest(FETCH_USERS, fetchUsersSaga);
}

export function* fetchTakeOutSaga({ token, page, count }: FetchTakeout) {
  try {
    const {
      data,
      status,
    }: {
      data?: {
        takeOuts: Takeout[];
        hasPrevious: boolean;
        hasNext: boolean;
        page: number;
        totalPages: number;
        totalCount: number;
      };
      status: Status;
    } = yield call(fetchTakeOutList, { token, page, count });

    if (status.code === 'ERROR' || !data) {
      yield put(fetchTakeoutFailure({ message: status.msg }));
      return;
    }
    yield put(fetchTakeoutSuccess({ ...data }));
    yield put(
      fetchUsers({ token, userIds: data.takeOuts.map(e => e.createdBy) }),
    );
  } catch (e) {
    yield put(fetchTakeoutFailure({ message: e.message }));
  }
}

function* fetchUsersSaga({ token, userIds }: FetchUsers) {
  try {
    const {
      data,
      status,
    }: {
      data?: {
        users: User[];
      };
      status: Status;
    } = yield call(fetchUserOfIds, { token, ids: userIds });

    if (status.code === 'ERROR' || !data) {
      yield put(fetchUsersFailure({ message: status.msg }));
      return;
    }

    yield put(fetchUsersSuccess({ ...data }));
  } catch (e) {
    yield put(fetchUsersFailure({ message: e.message }));
  }
}
