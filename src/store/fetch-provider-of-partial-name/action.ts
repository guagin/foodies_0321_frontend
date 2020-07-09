import { Action, ActionCreator } from '@reduxjs/toolkit';
import { Provider } from 'store/model/provider';

export interface FetchProviderByPartialName
  extends Action<'FetchProviderByPartialName'> {
  token: string;
  name: string;
}

export interface FetchProviderByPartialNameSuccess
  extends Action<'FetchProviderByPartialNameSuccess'> {
  providers: Provider[];
  hasPrevious: boolean;
  hasNext: boolean;
  page: number;
  totalPage: number;
  totalCount: number;
}

export interface FetchProviderByPartialNameFailure
  extends Action<'FetchProviderByPartialNameFailure'> {
  message: string;
}

export type FetchProviderByPartialNameActions =
  | FetchProviderByPartialName
  | FetchProviderByPartialNameSuccess
  | FetchProviderByPartialNameFailure;

export const CreateFetchProviderByPartialName: ActionCreator<FetchProviderByPartialName> = ({
  token,
  name,
}: {
  token: string;
  name: string;
}) => ({
  type: 'FetchProviderByPartialName',
  token,
  name,
});

export const CreateFetchProviderByPartialNameSuccess: ActionCreator<FetchProviderByPartialNameSuccess> = ({
  providers,
  hasPrevious,
  hasNext,
  page,
  totalPage,
  totalCount,
}: {
  providers: Provider[];
  hasPrevious: boolean;
  hasNext: boolean;
  page: number;
  totalPage: number;
  totalCount: number;
}) => ({
  type: 'FetchProviderByPartialNameSuccess',
  providers,
  hasPrevious,
  hasNext,
  page,
  totalPage,
  totalCount,
});

export const CreateFetchProviderByPartialNameFailure: ActionCreator<FetchProviderByPartialNameFailure> = ({
  message,
}: {
  message: string;
}) => ({
  type: 'FetchProviderByPartialNameFailure',
  message,
});
