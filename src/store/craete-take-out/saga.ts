import { call, put, takeLatest } from 'redux-saga/effects';
import {
  CreateTakeOut,
  createCreateTakeOutFailure,
  createCreateTakeOutSuccess,
} from './action';
import { createTakeOut, Status } from 'api';

export function* createTakeOutFlow() {
  yield takeLatest('CreateTakeOut', CreateTakeOutSage);
}

function* CreateTakeOutSage(action: CreateTakeOut) {
  try {
    const {
      data,
      status,
    }: {
      data?: {
        id: string;
        title: string;
        description: string;
        startedAt: Date;
        endAt: Date;
        enabled: boolean;
      };
      status: Status;
    } = yield call(createTakeOut, { ...action });

    if (status.code === 'ERROR') {
      yield put(createCreateTakeOutFailure({ message: status.msg }));
    }

    yield put(createCreateTakeOutSuccess({ ...data }));
  } catch (e) {
    console.error(e);
    yield put(createCreateTakeOutFailure({ message: e.message }));
  }
}
