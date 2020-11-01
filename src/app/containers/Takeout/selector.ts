import { initTakeoutState } from './reducer';
import { createSelector } from 'reselect';

const selectTakeoutDomain = state => state.takeout || initTakeoutState;

export const makeSelectIsRequest = () =>
  createSelector(selectTakeoutDomain, subState => subState.isRequest);

export const makeSelectMessage = () =>
  createSelector(selectTakeoutDomain, subState => subState.message);

export const makeSelectTakeout = () =>
  createSelector(selectTakeoutDomain, subState => subState.takeout);
