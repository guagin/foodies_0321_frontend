import { createSelector } from 'reselect';
import { initOrderDetailState } from './reducer';

const selectOrderDetailDomain = state =>
  state.orderDetail || initOrderDetailState;

export const makeSelectIsRequest = () =>
  createSelector(selectOrderDetailDomain, subState => subState.isRequest);

export const makeSelectOrder = () =>
  createSelector(selectOrderDetailDomain, subState => subState.order);

export const makeSelectTakeOut = () =>
  createSelector(selectOrderDetailDomain, substate => substate.takeOut);

export const makeSelectMessage = () =>
  createSelector(selectOrderDetailDomain, subState => subState.message);
