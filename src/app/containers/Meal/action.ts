import { Action, ActionCreator } from '@reduxjs/toolkit';
import { Meal, Provider } from './reducer';

export interface FetchMealOfId extends Action<'FetchMealOfId'> {
  token: string;
  id: string;
}

export interface FetchMealOfIdSuccess extends Action<'FetchMealOfIdSuccess'> {
  meal: Meal;
}

export interface FetchMealOfIdFailure extends Action<'FetchMealOfIdFailure'> {
  message: string;
}

export interface FetchProviderOfId extends Action<'FetchProviderOfId'> {
  token: string;
  id: string;
}

export interface FetchProviderOfIdSuccess
  extends Action<'FetchProviderOfIdSuccess'> {
  provider: Provider;
}

export interface FetchProviderOfIdFailure
  extends Action<'FetchProviderOfIdFailure'> {
  message: string;
}

export const fetchMealOfId: ActionCreator<FetchMealOfId> = (
  input: FetchMealOfId,
) => ({
  ...input,
  type: 'FetchMealOfId',
});

export const fetchMealOfIdSuccess: ActionCreator<FetchMealOfIdSuccess> = (
  input: FetchMealOfIdSuccess,
) => ({
  ...input,
  type: 'FetchMealOfIdSuccess',
});

export const fetchMealOfIdFailure: ActionCreator<FetchMealOfIdFailure> = (
  input: FetchMealOfIdFailure,
) => ({
  ...input,
  type: 'FetchMealOfIdFailure',
});

export const fetchProviderOfId: ActionCreator<FetchProviderOfId> = (
  input: FetchProviderOfId,
) => ({
  ...input,
  type: 'FetchProviderOfId',
});

export const fetchProviderOfIdSuccess: ActionCreator<FetchProviderOfIdSuccess> = (
  input: FetchProviderOfIdSuccess,
) => ({
  ...input,
  type: 'FetchProviderOfIdSuccess',
});

export const fetchProviderOfIdFailure: ActionCreator<FetchProviderOfIdFailure> = (
  input: FetchProviderOfIdFailure,
) => ({
  ...input,
  type: 'FetchProviderOfIdFailure',
});
