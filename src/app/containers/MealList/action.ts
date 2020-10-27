import { Action, ActionCreator } from '@reduxjs/toolkit';
import { Meal, Provider } from './reducer';

export interface FetchMeals extends Action<'FetchMeals'> {
  page: number;
  count: number;
  token: string;
  name: string;
}

export interface FetchMealsSuccess extends Action<'FetchMealsSuccess'> {
  meals: Meal[];
  hasPrevious: boolean;
  hasNext: boolean;
  totalPage: number;
  totalCount: number;
  page: number;
}

export interface FetchMealsFailed extends Action<'FetchMealsFailed'> {
  message: string;
}

export interface FetchProviderOfIds extends Action<'FetchProviderOfIds'> {
  token: string;
  providerIds: string;
}

export interface FetchProviderOfIdsSuccess
  extends Action<'FetchProviderOfIdsSuccess'> {
  providers: Provider[];
}

export interface FetchProviderOfIdsFailure
  extends Action<'FetchProviderOfIdsFailure'> {
  message: string;
}

export const fetchMeals: ActionCreator<FetchMeals> = (input: FetchMeals) => ({
  ...input,
  type: 'FetchMeals',
});

export const fetchMealsSuccess: ActionCreator<FetchMealsSuccess> = (
  input: FetchMealsSuccess,
) => ({
  ...input,
  type: 'FetchMealsSuccess',
});

export const fetchMealsFailed: ActionCreator<FetchMealsFailed> = (
  input: FetchMealsFailed,
) => ({
  ...input,
  type: 'FetchMealsFailed',
});

export const fetchProviderOfIds: ActionCreator<FetchProviderOfIds> = (
  input: FetchProviderOfIds,
) => ({
  ...input,
  type: 'FetchProviderOfIds',
});

export const fetchProviderOfIdsSuccess: ActionCreator<FetchProviderOfIdsSuccess> = (
  input: FetchProviderOfIdsSuccess,
) => ({
  ...input,
  type: 'FetchProviderOfIdsSuccess',
});

export const fetchProviderOfIdsFailure: ActionCreator<FetchProviderOfIdsFailure> = (
  input: FetchProviderOfIdsFailure,
) => ({
  ...input,
  type: 'FetchProviderOfIdsFailure',
});
