import { Action, ActionCreator } from 'redux';
import { Provider } from 'store/model/provider';

export interface FetchProvider extends Action<'FetchProvider'> {
  page: number;
  count: number;
  token: string;
}

export interface FetchProviderSuccess extends Action<'FetchProviderSuccess'> {
  providers: Provider[];
  hasPrevious: boolean;
  hasNext: boolean;
  page: number;
  totalPage: number;
  totalCount: number;
}

export interface FetchProviderFailure extends Action<'FetchProviderFailure'> {
  message: string;
}

export type FetchProviderAction =
  | FetchProvider
  | FetchProviderSuccess
  | FetchProviderFailure;

export const fetchProviderCreator: ActionCreator<FetchProvider> = ({
  page,
  count,
  token,
}: {
  page: number;
  count: number;
  token: string;
}) => ({
  page,
  count,
  token,
  type: 'FetchProvider',
});

export const fetchProviderSuccessCreator: ActionCreator<FetchProviderSuccess> = ({
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
  type: 'FetchProviderSuccess',
  providers,
  hasPrevious,
  hasNext,
  page,
  totalPage,
  totalCount,
});

export const fetchProviderFailureCreator: ActionCreator<FetchProviderFailure> = ({
  message,
}: {
  message: string;
}) => ({
  type: 'FetchProviderFailure',
  message,
});
