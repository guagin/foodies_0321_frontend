import { Action, ActionCreator } from '@reduxjs/toolkit';
import { Provider } from './reducer';

export interface FetchProviderOfPage extends Action<'FetchProviderOfPage'> {
  page: number;
  count: number;
  token: string;
}

export interface FetchProviderOfPageSuccess
  extends Action<'FetchProviderOfPageSuccess'> {
  providers: Provider[];
  hasPrevious: boolean;
  hasNext: boolean;
  page: number;
  totalPage: number;
  totalCount: number;
}

export interface FetchProviderOfPageFailure
  extends Action<'FetchProviderOfPageFailure'> {
  message: string;
}

export const fetchProviderOfPage: ActionCreator<FetchProviderOfPage> = (
  input: FetchProviderOfPage,
) => ({
  ...input,
  type: 'FetchProviderOfPage',
});

export const fetchProviderOfPageSuccess: ActionCreator<FetchProviderOfPageSuccess> = (
  input: FetchProviderOfPageSuccess,
) => ({
  ...input,
  type: 'FetchProviderOfPageSuccess',
});

export const fetchProviderOfPageFailure: ActionCreator<FetchProviderOfPageFailure> = (
  input: FetchProviderOfPageFailure,
) => ({
  ...input,
  type: 'FetchProviderOfPageFailure',
});
