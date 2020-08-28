import { Action, ActionCreator } from '@reduxjs/toolkit';
import { Meal } from './meal';

export interface FetchMeals extends Action<'FetchMeals'> {
  page: number;
  count: number;
  token: string;
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

export type FetchMealsActions =
  | FetchMeals
  | FetchMealsSuccess
  | FetchMealsFailed;

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
