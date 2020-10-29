import { createSelector } from 'reselect';
import { initProviderState } from './reducer';

const selectProviderDomain = state => state.provider || initProviderState;

export const makeSelectProvider = () =>
  createSelector(selectProviderDomain, subState => subState.provider);

export const makeSelectIsRequest = () =>
  createSelector(selectProviderDomain, subState => subState.isRequest);

export const makeSelectMessage = () =>
  createSelector(selectProviderDomain, subState => subState.message);
