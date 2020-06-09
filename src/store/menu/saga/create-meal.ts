import { takeLatest, put } from 'redux-saga/effects';
import {
  CreateMeal,
  createMealFailureCreator,
  createMealSuccessCreator,
} from '../action/creat-meal';
import { Status, createMeal } from 'api';

export function* createMealFlow() {
  yield takeLatest('CreateMeal', createMealSaga);
}

export function* createMealSaga({
  name,
  provider,
  price,
  description,
  pictures,
  token,
}: CreateMeal) {
  try {
    const {
      data,
      status,
    }: {
      data?: {
        id: string;
      };
      status: Status;
    } = yield createMeal({
      token,
      name,
      provider,
      price,
      description,
      pictures,
    });

    if (status.code === 'SUCCESS') {
      put(createMealSuccessCreator({ ...data }));
    } else {
      put(createMealFailureCreator({ message: status.msg }));
    }
  } catch (e) {
    yield put(createMealFailureCreator({ message: e.message }));
  }
}
