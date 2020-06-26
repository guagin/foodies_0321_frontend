import { Action, ActionCreator } from '@reduxjs/toolkit';

export interface CreateProvider extends Action<'CreateProvider'> {
  token: string;
  name: string;
  description: string;
  phone: string;
}

export interface CreateProviderSuccess extends Action<'CreateProviderSuccess'> {
  id: string;
}

export interface CreateProviderFailure extends Action<'CreateProviderFailure'> {
  message: string;
}

export type CreateProviderActrions =
  | CreateProvider
  | CreateProviderSuccess
  | CreateProviderFailure;

export const createProviderCreator: ActionCreator<CreateProvider> = ({
  token,
  name,
  description,
  phone,
}: {
  token: string;
  name: string;
  description: string;
  phone: string;
}) => ({
  type: 'CreateProvider',
  token,
  name,
  description,
  phone,
});

export const createProviderSuccessCreator: ActionCreator<CreateProviderSuccess> = ({
  id,
}: {
  id: string;
}) => ({
  type: 'CreateProviderSuccess',
  id,
});

export const createProviderFailureCreator: ActionCreator<CreateProviderFailure> = ({
  message,
}: {
  message: string;
}) => ({
  type: 'CreateProviderFailure',
  message,
});
