import { createSelector } from 'reselect';
import { initEditOrderState } from './reducer';

const selectEditOrderDomain = state => state.editOrder || initEditOrderState;

export const makeSelectOrder = () =>
  createSelector(selectEditOrderDomain, subState => subState.order);

export const makeSelectTakeout = () =>
  createSelector(selectEditOrderDomain, subState => subState.takeout);

export const makeSelectProvider = () =>
  createSelector(selectEditOrderDomain, subState => subState.provider);

export const makeSelectUser = () =>
  createSelector(selectEditOrderDomain, subState => subState.user);

export const makeSelectMeals = () =>
  createSelector(selectEditOrderDomain, subState => subState.meals);

export const makeSelectCreateMealUsers = () =>
  createSelector(selectEditOrderDomain, subState => subState.createMealUsers);
