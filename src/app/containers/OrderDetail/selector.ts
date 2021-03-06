import { createSelector } from 'reselect';
import { Takeout } from '../TakeoutList/take-out';
import { initOrderDetailState } from './reducer';

const selectOrderDetailDomain = state =>
  state.orderDetail || initOrderDetailState;

export const makeSelectIsRequest = () =>
  createSelector(selectOrderDetailDomain, subState => subState.isRequest);

export const makeSelectOrder = () =>
  createSelector(selectOrderDetailDomain, subState => subState.order);

export const makeSelectTakeOut = () =>
  createSelector(
    selectOrderDetailDomain,
    substate => substate.takeout as Takeout,
  );

export const makeSelectMessage = () =>
  createSelector(selectOrderDetailDomain, subState => subState.message);

export const makeSelectMeals = () =>
  createSelector(selectOrderDetailDomain, subState => subState.meals);

export const makeSelectUsers = () =>
  createSelector(selectOrderDetailDomain, subState => subState.users);
