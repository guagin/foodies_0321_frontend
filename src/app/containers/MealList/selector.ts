import { createSelector } from 'reselect';
import { initialFetchMealsState } from './reducer';

const selectorFetchMealsDomain = state =>
  state.fetchMeals || initialFetchMealsState;

export const makeSelectIsRequest = () =>
  createSelector(selectorFetchMealsDomain, subState => subState.isRequest);

export const makeSelectMessage = () =>
  createSelector(selectorFetchMealsDomain, subState => subState.message);

export const makeSelectMeals = () =>
  createSelector(selectorFetchMealsDomain, subState => subState.meals);

export const makeTotalSelectTotalCount = () =>
  createSelector(selectorFetchMealsDomain, subState => subState.totalCount);

export const makeProviders = () =>
  createSelector(selectorFetchMealsDomain, subState => subState.providers);
