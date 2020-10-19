import { initCreateOrderState } from './reducer';
import { createSelector } from 'reselect';

const selectCreateOrderPageDomain = state =>
  state.createOrder || initCreateOrderState;

export const makeSelectIsRequest = () =>
  createSelector(selectCreateOrderPageDomain, subState => subState.isRequest);

export const makeSelectMessage = () =>
  createSelector(selectCreateOrderPageDomain, subState => subState.message);

export const makeSelectTakeOuts = () =>
  createSelector(selectCreateOrderPageDomain, subState => subState.takeOuts);

export const makeSelectTakeOutId = () =>
  createSelector(selectCreateOrderPageDomain, subState => subState.takeOutId);

export const makeSelectProviderId = () =>
  createSelector(selectCreateOrderPageDomain, subState => subState.providerId);
