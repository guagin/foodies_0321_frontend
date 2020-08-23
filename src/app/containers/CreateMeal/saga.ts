import { takeLatest, put } from 'redux-saga/effects';
import { CreateMeal, createMealSuccess, createMealFailed } from './action';
import { Status, createMeal } from 'api';
import { push } from 'connected-react-router';

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
        ids: string[];
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
      yield put(createMealSuccess({ ...data }));

      yield put(push('/meal-management'));
      return;
    }

    yield put(createMealFailed({ ...data }));
  } catch (e) {
    yield put(createMealFailed({ message: e.messge }));
  }
}
