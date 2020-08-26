import { takeLatest, put, call } from 'redux-saga/effects';
import { CreateTakeOut } from 'store/craete-take-out/action';
import { createTakeOutFailed, createTakeOutSuccess } from './action';
import { createTakeOut, Status } from 'api';
import { push } from 'connected-react-router';

export function* createTakeOutFlow() {
  yield takeLatest('CreateTakeOut', createTakeOutSaga);
}

function* createTakeOutSaga(action: CreateTakeOut) {
  try {
    const {
      data,
      status,
    }: {
      data?: {
        id: string;
      };
      status: Status;
    } = yield call(createTakeOut, { ...action });

    if (status.code === 'ERROR') {
      yield put(createTakeOutFailed({ message: status.msg }));
    }

    yield put(createTakeOutSuccess({ ...data }));
    yield put(push('/take-out-management'));
  } catch (e) {
    console.error(e);
    yield put(createTakeOutFailed({ message: e.message }));
  }
}
