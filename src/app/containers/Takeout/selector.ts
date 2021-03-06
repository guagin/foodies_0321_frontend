import { initTakeoutState, Takeout } from './reducer';
import { createSelector } from 'reselect';

const selectTakeoutDomain = state => state.takeout || initTakeoutState;

export const makeSelectMessage = () =>
  createSelector(selectTakeoutDomain, subState => subState.message);

export const makeSelectTakeout = () =>
  createSelector(selectTakeoutDomain, subState => subState.takeout as Takeout);

export const makeSelectOrders = () =>
  createSelector(selectTakeoutDomain, subState => subState.orders);

export const makeSelectProvider = () =>
  createSelector(selectTakeoutDomain, subState => subState.provider);

export const makeSelectTakeoutUser = () =>
  createSelector(selectTakeoutDomain, subState => subState.takeoutUser);

export const makeSelectOrderUsers = () =>
  createSelector(selectTakeoutDomain, subState => subState.orderUsers);
