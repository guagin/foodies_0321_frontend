import { initCreateTakeOutState } from './reducer';
import { createSelector } from 'reselect';

const selectCreateTakeOutPageDomain = state =>
  state.createTakeOut || initCreateTakeOutState;

export const makeSelectProviderId = () =>
  createSelector(
    selectCreateTakeOutPageDomain,
    subState => subState.providerId1,
  );

export const makeSelectIsRequest = () =>
  createSelector(selectCreateTakeOutPageDomain, subState => subState.isRequest);

export const makeSelectMessage = () =>
  createSelector(selectCreateTakeOutPageDomain, subState => subState.message);

export const makeSelectProviders = () =>
  createSelector(selectCreateTakeOutPageDomain, subState => subState.providers);
