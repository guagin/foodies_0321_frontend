import { createSelector } from 'reselect';
import { initialFetchMealsState } from './reducer';

const selectorFetchMealsPageDomain = state =>
  state.fetchMeals || initialFetchMealsState;

export const makeSelectIsRequest = () =>
  createSelector(selectorFetchMealsPageDomain, subState => subState.isRequest);

export const makeSelectMessage = () =>
  createSelector(selectorFetchMealsPageDomain, subState => subState.message);

export const makeSelectMeals = () =>
  createSelector(selectorFetchMealsPageDomain, subState => subState.meals);

export const makeTotalSelectTotalCount = () =>
  createSelector(selectorFetchMealsPageDomain, subState => subState.totalCount);
