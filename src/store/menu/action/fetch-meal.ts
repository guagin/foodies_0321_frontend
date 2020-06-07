import { Action, ActionCreator } from '@reduxjs/toolkit';
import { Meal } from '../reducer';

export interface FetchMeals extends Action<'FetchMeals'> {
  after: string;
  count: number;
  before: string;
}

export interface FetchMealSuccess extends Action<'FetchMealSuccess'> {
  meals: Meal[];
  hasPrevious: boolean;
  hasNext: boolean;
  page: number;
  totalPage: number;
}

export interface FetchMealFailure extends Action<'FetchMealFailure'> {
  message: string;
}

export type MealActions = FetchMeals | FetchMealSuccess | FetchMealFailure;

export const fetchMealCreator: ActionCreator<FetchMeals> = ({
  after,
  count,
  before,
}: {
  after: string;
  count: number;
  before: string;
}) => ({
  after,
  count,
  before,
  type: 'FetchMeals',
});

export const fetchMealSuccessCreator: ActionCreator<FetchMealSuccess> = ({
  meals,
  hasPrevious,
  hasNext,
  page,
  totalPage,
}: {
  meals: Meal[];
  hasPrevious: boolean;
  hasNext: boolean;
  page: number;
  totalPage: number;
}) => ({
  type: 'FetchMealSuccess',
  meals,
  hasPrevious,
  hasNext,
  page,
  totalPage,
});

export const fetchMealFailure: ActionCreator<FetchMealFailure> = ({
  message,
}: {
  message: string;
}) => ({
  type: 'FetchMealFailure',
  message,
});
