import { initCreateProviderState } from './reducer';
import { createSelector } from 'reselect';

const selectCreateProviderPageDomain = state =>
  state.CreateProvider || initCreateProviderState;

export const makeSelectIsRequest = () =>
  createSelector(
    selectCreateProviderPageDomain,
    subState => subState.isRequest,
  );

export const makeSelectMessage = () =>
  createSelector(selectCreateProviderPageDomain, subState => subState.message);
