import { initFetchTakeOutByPartialTitle } from './reducer';
import { createSelector } from 'reselect';

const selectFetchTakeOutByPartialTitlePageDomain = state =>
  state.fetchTakeOutByPartialTitle || initFetchTakeOutByPartialTitle;

export const makeSelectIsRequest = () =>
  createSelector(
    selectFetchTakeOutByPartialTitlePageDomain,
    subState => subState.isRequest,
  );

export const makeSelectMessage = () =>
  createSelector(
    selectFetchTakeOutByPartialTitlePageDomain,
    subState => subState.message,
  );

export const makeSelectTakeOuts = () =>
  createSelector(
    selectFetchTakeOutByPartialTitlePageDomain,
    subState => subState.takeOuts,
  );
