import { initCreateMealState } from './reducer';
import { createSelector } from 'reselect';

const selectCreateMealDomain = state => state.createMeal || initCreateMealState;

export const makeSelectId = () =>
  createSelector(selectCreateMealDomain, subState => subState.id);

export const makeSelectIsRequest = () =>
  createSelector(selectCreateMealDomain, subState => subState.isRequest);

export const makeSelectMessage = () =>
  createSelector(selectCreateMealDomain, subState => subState.message);

export const makeSelectProviders = () =>
  createSelector(selectCreateMealDomain, subState => subState.providers);

export const makeSelectPickedProvider = () =>
  createSelector(selectCreateMealDomain, subState => subState.pickedProvider);
