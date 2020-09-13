import { all, fork } from 'redux-saga/effects';

import { fetchMeFlow } from './me/saga/fetch-me';
import { fetchProviderFlow } from './provider/saga/fetch-provider';
import { FetchUserOfIdsFlow } from './users-of-ids/saga/fetch-user-of-ids';
import { fetchOrderOfPageFlow } from './order/saga/fetch-order-of-page';

export const rootSaga = function* root() {
  yield all([
    fork(fetchMeFlow),
    fork(fetchProviderFlow),
    fork(FetchUserOfIdsFlow),
    fork(fetchOrderOfPageFlow),
  ]);
};
