import { initFetchTakeOutState } from './reducer';
import { createSelector } from 'reselect';

const selectFetchTakeOutPageDomain = state =>
  state.fetchTakeOutState || initFetchTakeOutState;

export const makeSelectIsRequest = () =>
  createSelector(selectFetchTakeOutPageDomain, subState => subState.isRequest);

export const makeSelectMessage = () =>
  createSelector(selectFetchTakeOutPageDomain, subState => subState.message);

export const makeSelectTakeOuts = () =>
  createSelector(selectFetchTakeOutPageDomain, subState => subState.takeOuts);

export const makeSelectHasPrevious = () =>
  createSelector(
    selectFetchTakeOutPageDomain,
    subState => subState.hasPrevious,
  );

export const makeSelectHasNext = () =>
  createSelector(selectFetchTakeOutPageDomain, subState => subState.hasNext);

export const makeSelectTotalCount = () =>
  createSelector(selectFetchTakeOutPageDomain, subState => subState.totalCount);

export const makeSelectTotalPages = () =>
  createSelector(
    selectFetchTakeOutPageDomain,
    subState => subState.selectTotalPages,
  );

export const makeSelectPage = () =>
  createSelector(selectFetchTakeOutPageDomain, subState => subState.page);
