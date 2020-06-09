import { Action, ActionCreator } from '@reduxjs/toolkit';
import { Meal } from '../reducer';

export interface FetchMeals extends Action<'FetchMeals'> {
  page: number;
  count: number;
  token: string;
}

export interface FetchMealsSuccess extends Action<'FetchMealsSuccess'> {
  meals: Meal[];
  hasPrevious: boolean;
  hasNext: boolean;
  page: number;
  totalPage: number;
  totalCount: number;
}

export interface FetchMealsFailure extends Action<'FetchMealsFailure'> {
  message: string;
}

export type FetchMealActions =
  | FetchMeals
  | FetchMealsSuccess
  | FetchMealsFailure;

export const fetchMealsCreator: ActionCreator<FetchMeals> = ({
  page,
  count,
  token,
}: {
  page: number;
  count: number;
  token: string;
}) => ({
  page,
  count,
  token,
  type: 'FetchMeals',
});

export const fetchMealsSuccessCreator: ActionCreator<FetchMealsSuccess> = ({
  meals,
  hasPrevious,
  hasNext,
  page,
  totalPage,
  totalCount,
}: {
  meals: Meal[];
  hasPrevious: boolean;
  hasNext: boolean;
  page: number;
  totalPage: number;
  totalCount: number;
}) => ({
  type: 'FetchMealsSuccess',
  meals,
  hasPrevious,
  hasNext,
  page,
  totalPage,
  totalCount,
});

export const fetchMealsFailureCreator: ActionCreator<FetchMealsFailure> = ({
  message,
}: {
  message: string;
}) => ({
  type: 'FetchMealsFailure',
  message,
});
