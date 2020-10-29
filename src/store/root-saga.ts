import { all, fork } from 'redux-saga/effects';

import { fetchMeFlow } from './me/saga/fetch-me';
import { FetchUserOfIdsFlow } from './users-of-ids/saga/fetch-user-of-ids';

export const rootSaga = function* root() {
  yield all([fork(fetchMeFlow), fork(FetchUserOfIdsFlow)]);
};
