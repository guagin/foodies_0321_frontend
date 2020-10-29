import { createSelector } from 'reselect';
import { initProviderListState } from './reducer';

const selectorProviderListDomain = state =>
  state.ProviderList || initProviderListState;

export const makeSelectIsRequest = () =>
  createSelector(selectorProviderListDomain, subState => subState.isRequest);

export const makeSelectProviders = () =>
  createSelector(selectorProviderListDomain, subState => subState.providers);

export const makeSelectTotalCount = () =>
  createSelector(selectorProviderListDomain, subState => subState.totalCount);

export const makeSelectMessage = () =>
  createSelector(selectorProviderListDomain, subState => subState.message);
