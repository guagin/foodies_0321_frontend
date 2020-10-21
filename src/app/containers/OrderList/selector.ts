import { createSelector } from 'reselect';
import { initialOrderOfPageState } from './reducer';

const selectOrderOfPageDomain = state =>
  state.orderOfPage || initialOrderOfPageState;

export const makeSelectIsRequest = () =>
  createSelector(selectOrderOfPageDomain, subState => subState.isRequest);

export const makeSelectOrders = () =>
  createSelector(selectOrderOfPageDomain, subState => subState.orders);

export const makeSelectPage = () =>
  createSelector(selectOrderOfPageDomain, subState => subState.page);

export const makeSelectHasNext = () =>
  createSelector(selectOrderOfPageDomain, subState => subState.hasNext);

export const makeSelectHasPrevious = () =>
  createSelector(selectOrderOfPageDomain, subState => subState.hasPrevious);

export const makeSelectTotalPage = () =>
  createSelector(selectOrderOfPageDomain, subState => subState.totalPage);

export const makeSelectTotalCount = () =>
  createSelector(selectOrderOfPageDomain, subState => subState.totalCount);

export const makeSelectMessage = () =>
  createSelector(selectOrderOfPageDomain, subState => subState.message);

export const makeSelectTakeOuts = () =>
  createSelector(selectOrderOfPageDomain, subState => subState.takeOuts);
