import { initFetchTakeOutState } from './reducer';
import { createSelector } from 'reselect';

const selectFetchTakeoutPageDomain = state =>
  state.fetchTakeOut || initFetchTakeOutState;

export const makeSelectIsRequest = () =>
  createSelector(selectFetchTakeoutPageDomain, subState => subState.isRequest);

export const makeSelectMessage = () =>
  createSelector(selectFetchTakeoutPageDomain, subState => subState.message);

export const makeSelectTakeOuts = () =>
  createSelector(selectFetchTakeoutPageDomain, subState => subState.takeOuts);

export const makeSelectHasPrevious = () =>
  createSelector(
    selectFetchTakeoutPageDomain,
    subState => subState.hasPrevious,
  );

export const makeSelectHasNext = () =>
  createSelector(selectFetchTakeoutPageDomain, subState => subState.hasNext);

export const makeSelectTotalCount = () =>
  createSelector(selectFetchTakeoutPageDomain, subState => subState.totalCount);

export const makeSelectTotalPages = () =>
  createSelector(
    selectFetchTakeoutPageDomain,
    subState => subState.selectTotalPages,
  );

export const makeSelectPage = () =>
  createSelector(selectFetchTakeoutPageDomain, subState => subState.page);

export const makeSelectUsers = () =>
  createSelector(selectFetchTakeoutPageDomain, subState => subState.users);
