import { Action, ActionCreator } from '@reduxjs/toolkit';

export interface CreateMeal extends Action<'CreateMeal'> {
  name: string;
  provider: string;
  price: number;
  description: string;
  pictures: string[];
  token: string;
}

export interface CreateMealSuccess extends Action<'CreateMealSuccess'> {
  id: string;
}

export interface CreateMealFailed extends Action<'CreateMealFailed'> {
  message: string;
}

export type CreateMealAtions =
  | CreateMeal
  | CreateMealSuccess
  | CreateMealFailed;

export const createMeal: ActionCreator<CreateMeal> = (input: {
  name: string;
  provider: string;
  price: number;
  description: string;
  pictures: string[];
  token: string;
}) => ({
  ...input,
  type: 'CreateMeal',
});

export const createMealSuccess: ActionCreator<CreateMealSuccess> = (input: {
  id: string;
}) => ({
  ...input,
  type: 'CreateMealSuccess',
});

export const createMealFailed: ActionCreator<CreateMealFailed> = (input: {
  message: string;
}) => ({
  ...input,
  type: 'CreateMealFailed',
});
