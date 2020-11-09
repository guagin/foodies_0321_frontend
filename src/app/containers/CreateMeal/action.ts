import { Action, ActionCreator } from '@reduxjs/toolkit';
import { Provider } from './reducer';

export interface FetchProviderOfPartialName
  extends Action<'FetchProviderOfPartialName'> {
  name: string;
  token: string;
}

export interface FetchProviderOfPartialNameSuccess
  extends Action<'FetchProviderOfPartialNameSuccess'> {
  providers: Provider[];
}

export interface FetchProviderOfPartialNameFailure
  extends Action<'FetchProviderOfPartialNameFailure'> {
  message: string;
}

export interface PickProvider extends Action<'PickProvider'> {
  providerId: string;
}

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

export interface PickProvider extends Action<'PickProvider'> {
  pickedProvider: Provider;
}

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

export const fetchProviderOfPartialName: ActionCreator<FetchProviderOfPartialName> = (
  input: FetchProviderOfPartialName,
) => ({
  ...input,
  type: 'FetchProviderOfPartialName',
});

export const fetchProviderOfPartialNameSuccess: ActionCreator<FetchProviderOfPartialNameSuccess> = (
  input: FetchProviderOfPartialNameSuccess,
) => ({
  ...input,
  type: 'FetchProviderOfPartialNameSuccess',
});

export const fetchProviderOfPartialNameFailure: ActionCreator<FetchProviderOfPartialNameFailure> = (
  input: FetchProviderOfPartialNameFailure,
) => ({
  ...input,
  type: 'FetchProviderOfPartialNameFailure',
});

export const pickProvider: ActionCreator<PickProvider> = (
  input: PickProvider,
) => ({
  ...input,
  type: 'PickProvider',
});
