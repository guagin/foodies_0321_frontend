import { all, fork } from 'redux-saga/effects';

import { signUpFlow } from './me/saga/sign-up';
import { signInFlow } from './me/saga/sign-in';
import { fetchMeFlow } from './me/saga/fetch-me';
import { fetchMealsFlow } from './menu/saga/fetch-meals';
import { createMealFlow } from './menu/saga/create-meal';
import { fetchProviderFlow } from './provider/saga/fetch-provider';
import { createProviderFlow } from './provider/saga/create-provider';
import { FetchUserOfIdsFlow } from './users-of-ids/saga/fetch-user-of-ids';
import { fetchOrderOfPageFlow } from './order/saga/fetch-order-of-page';
import { FetchTakeOutOfPageFlow } from './take-out-of-page/saga';
import { createTakeOutFlow } from './craete-take-out/saga';
import { fetchProviderByPartialNameFlow } from './fetch-provider-of-partial-name/saga';

export const rootSaga = function* root() {
  yield all([
    fork(signUpFlow),
    fork(signInFlow),
    fork(fetchMeFlow),
    fork(fetchMealsFlow),
    fork(createMealFlow),
    fork(fetchProviderFlow),
    fork(createProviderFlow),
    fork(FetchUserOfIdsFlow),
    fork(fetchOrderOfPageFlow),
    fork(FetchTakeOutOfPageFlow),
    fork(createTakeOutFlow),
    fork(fetchProviderByPartialNameFlow),
  ]);
};
