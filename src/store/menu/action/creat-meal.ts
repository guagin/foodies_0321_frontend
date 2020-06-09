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

export interface CreateMealFailure extends Action<'CreateMealFailure'> {
  message: string;
}

export type CreateMealActions =
  | CreateMeal
  | CreateMealSuccess
  | CreateMealFailure;

export const createMealCreator: ActionCreator<CreateMeal> = ({
  name,
  provider,
  price,
  description,
  pictures,
  token,
}: {
  name: string;
  provider: string;
  price: number;
  description: string;
  pictures: string[];
  token: string;
}) => ({
  type: 'CreateMeal',
  name,
  provider,
  price,
  description,
  pictures,
  token,
});

export const createMealSuccessCreator: ActionCreator<CreateMealSuccess> = ({
  id,
}: {
  id: string;
}) => ({
  type: 'CreateMealSuccess',
  id,
});

export const createMealFailureCreator: ActionCreator<CreateMealFailure> = ({
  message,
}: {
  message: string;
}) => ({
  type: 'CreateMealFailure',
  message,
});
