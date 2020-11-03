import { initCreateOrderState } from './reducer';
import { createSelector } from 'reselect';

const selectCreateOrderDomain = state =>
  state.createOrder || initCreateOrderState;

export const makeSelectIsRequest = () =>
  createSelector(selectCreateOrderDomain, subState => subState.isRequest);

export const makeSelectMessage = () =>
  createSelector(selectCreateOrderDomain, subState => subState.message);

export const makeSelectProviderId = () =>
  createSelector(selectCreateOrderDomain, subState => subState.providerId);

export const makeSelectMeals = () =>
  createSelector(selectCreateOrderDomain, subState => subState.meals);

export const makeSelectPickedMeals = () =>
  createSelector(selectCreateOrderDomain, subState => subState.pickedMeals);

export const makeSelectTakeout = () =>
  createSelector(selectCreateOrderDomain, subState => subState.takeout);
