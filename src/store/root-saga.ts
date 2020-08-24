import { all, fork } from 'redux-saga/effects';

import { fetchMeFlow } from './me/saga/fetch-me';
import { fetchMealsFlow } from './menu/saga/fetch-meals';
import { fetchProviderFlow } from './provider/saga/fetch-provider';
import { FetchUserOfIdsFlow } from './users-of-ids/saga/fetch-user-of-ids';
import { fetchOrderOfPageFlow } from './order/saga/fetch-order-of-page';
import { createTakeOutFlow } from './craete-take-out/saga';
import { fetchProviderByPartialNameFlow } from './fetch-provider-of-partial-name/saga';
import { fetchTakeOutByPartialTitleFlow } from './fetch-take-out-by-partial-title/saga';

export const rootSaga = function* root() {
  yield all([
    fork(fetchMeFlow),
    fork(fetchMealsFlow),
    fork(fetchProviderFlow),
    fork(FetchUserOfIdsFlow),
    fork(fetchOrderOfPageFlow),
    fork(createTakeOutFlow),
    fork(fetchProviderByPartialNameFlow),
    fork(fetchTakeOutByPartialTitleFlow),
  ]);
};
