import { Action, ActionCreator } from '@reduxjs/toolkit';

export interface CreateProvider extends Action<'CreateProvider'> {
  name: string;
  description: string;
  phone: string;
  token: string;
}

export interface CreateProviderSuccess
  extends Action<'CreateCreateProviderSuccess'> {
  id: string;
}

export interface CreateProviderFailed extends Action<'CreateProviderFailed'> {
  message: string;
}

export type CreateProviderActions =
  | CreateProvider
  | CreateProviderSuccess
  | CreateProviderFailed;

export const createProvider: ActionCreator<CreateProvider> = (
  input: CreateProvider,
) => ({
  ...input,
  type: 'CreateProvider',
});

export const createProviderSuccess: ActionCreator<CreateProviderSuccess> = (
  input: CreateProviderSuccess,
) => ({
  ...input,
  type: 'CreateCreateProviderSuccess',
});

export const createProviderFailed: ActionCreator<CreateProviderFailed> = (
  input: CreateProviderFailed,
) => ({
  ...input,
  type: 'CreateProviderFailed',
});
