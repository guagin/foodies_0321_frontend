import { Action, ActionCreator } from '@reduxjs/toolkit';
import { Provider } from './reducer';

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
