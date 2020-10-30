import { createSelector } from 'reselect';
import { initMealState } from './reducer';

const selectorMealDomain = state => state.meal || initMealState;

export const makeSelectIsRequest = () =>
  createSelector(selectorMealDomain, subState => subState.isRequest);

export const makeSelectMessage = () =>
  createSelector(selectorMealDomain, subState => subState.message);

export const makeSelectMeal = () =>
  createSelector(selectorMealDomain, subState => subState.meal);

// TODO: fetchProvider.
