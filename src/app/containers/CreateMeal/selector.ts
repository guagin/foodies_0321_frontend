import { initCreateMealState } from './reducer';
import { createSelector } from 'reselect';

const selectCreateMealPageDomain = state =>
  state.CreateMeal || initCreateMealState;

export const makeSelectId = () =>
  createSelector(selectCreateMealPageDomain, subState => subState.id);

export const makeSelectIsRequest = () =>
  createSelector(selectCreateMealPageDomain, subState => subState.isRequest);

export const makeSelectMessage = () =>
  createSelector(selectCreateMealPageDomain, subState => subState.message);
