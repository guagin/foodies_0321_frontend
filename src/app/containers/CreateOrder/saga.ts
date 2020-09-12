import { takeLatest, delay, call, put } from 'redux-saga/effects';
import {
  FetchTakeOutByPartialTitle,
  fetchTakeOutByPartialTitleFailed,
  fetchTakeOutByPartialTitleSuccess,
  createOrderFailed,
  CreateOrder,
  createOrderSuccess,
  PickTakeOutId,
} from './action';
import { TakeOut } from '../TakeOutList/take-out';
import { fetchTakeOutByPartialTitle, Status, createOrder } from 'api';
import { push } from 'connected-react-router';

export function* fetchTakeOutByPartialTitleFlow() {
  yield takeLatest(
    'FetchTakeOutByPartialTitle',
    fetchTakeOutByPartialTitleSaga,
  );
  yield takeLatest('PickTakeOutId', pickedTakeOutIdSaga);
}

function* pickedTakeOutIdSaga({ takeOutId }: PickTakeOutId) {
  yield put(push('/order/create/detailPage'));
}

function* fetchTakeOutByPartialTitleSaga({
  title,
  token,
}: FetchTakeOutByPartialTitle) {
  yield delay(1500);

  try {
    const {
      data,
      status,
    }: {
      data?: {
        takeOuts: TakeOut[];
      };
      status: Status;
    } = yield call(fetchTakeOutByPartialTitle, { title, token });

    if (status.code === 'ERROR') {
      yield put(fetchTakeOutByPartialTitleFailed({ message: status.msg }));
      return;
    }

    yield put(fetchTakeOutByPartialTitleSuccess({ ...data }));
  } catch (e) {
    yield put(fetchTakeOutByPartialTitleFailed({ message: e.message }));
  }
}

export function* createOrderFlow() {
  // fetch take out
  // pick take out id
  yield takeLatest('CreateOrder', createOrderSaga);
  // pick meal
}

function* createOrderSaga({ token, userId, takeOutId }: CreateOrder) {
  yield delay(1500);

  try {
    const {
      data,
      status,
    }: {
      data?: {
        id: string;
      };
      status: Status;
    } = yield call(createOrder, { token, userId, takeOutId });

    if (status.code === 'ERROR') {
      yield put(createOrderFailed({ message: status.msg }));
      return;
    }

    yield put(createOrderSuccess({ ...data }));
  } catch (e) {
    yield put(createOrderFailed({ messge: e.messge }));
  }
}
