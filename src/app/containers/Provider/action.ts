import { Action, ActionCreator } from '@reduxjs/toolkit';
import { Meal, Provider } from './reducer';

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

export interface FetchMealOfProviderId extends Action<'FetchMealOfProviderId'> {
  token: string;
  page: number;
  count: number;
  id: string;
}

export interface FetchMealOfProviderIdSuccess
  extends Action<'FetchMealOfProviderIdSuccess'> {
  meals: Meal[];
}

export interface FetchMealOfProviderIdFailure
  extends Action<'FetchMealOfProviderIdFailure'> {
  message: string;
}

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

export const fetchMealOfProviderId: ActionCreator<FetchMealOfProviderId> = (
  input: FetchMealOfProviderId,
) => ({
  ...input,
  type: 'FetchMealOfProviderId',
});

export const fetchMealOfProviderIdSuccess: ActionCreator<FetchMealOfProviderIdSuccess> = (
  input: FetchMealOfProviderIdSuccess,
) => ({
  ...input,
  type: 'FetchMealOfProviderIdSuccess',
});

export const fetchMealOfProviderIdFailure: ActionCreator<FetchMealOfProviderIdFailure> = (
  input: FetchMealOfProviderIdFailure,
) => ({
  ...input,
  type: 'FetchMealOfProviderIdFailure',
});
