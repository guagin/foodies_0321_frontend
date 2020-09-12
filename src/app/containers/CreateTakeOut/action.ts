import { Action, ActionCreator } from '@reduxjs/toolkit';
import { Provider } from 'store/model/provider';

export interface FetchProvidersByPartialName
  extends Action<'FetchProvidersByPartialName'> {
  token: string;
  name: string;
}

export interface FetchProvidersByPartialNameSuccess
  extends Action<'FetchProvidersByPartialNameSuccess'> {
  providers: Provider[];
}

export interface FetchProvidersByPartialNameFailed
  extends Action<'FetchProvidersByPartialNameFailed'> {
  message: string;
}

export interface CreateTakeOut extends Action<'CreateTakeOut'> {
  token: string;
  title: string;
  description: string;
  startedAt: Date;
  endAt: Date;
  enabled: boolean;
  providerId: string;
}

export interface CreateTakeOutSuccess extends Action<'CreateTakeOutSuccess'> {
  id: string;
}

export interface CreateTakeOutFailed extends Action<'CreateTakeOutFailed'> {
  message: string;
}

export interface PickProvider extends Action<'PickProvider'> {
  providerId: string;
}

export type CreateTakeOutActions =
  | FetchProvidersByPartialName
  | FetchProvidersByPartialNameSuccess
  | FetchProvidersByPartialNameFailed
  | CreateTakeOut
  | CreateTakeOutSuccess
  | CreateTakeOutFailed
  | PickProvider;

export const FetchProvidersByPartialName: ActionCreator<FetchProvidersByPartialName> = (
  input: FetchProvidersByPartialName,
) => ({
  ...input,
  type: 'FetchProvidersByPartialName',
});

export const FetchProvidersByPartialNameSuccess: ActionCreator<FetchProvidersByPartialNameSuccess> = (
  input: FetchProvidersByPartialNameSuccess,
) => ({
  ...input,
  type: 'FetchProvidersByPartialNameSuccess',
});

export const FetchProvidersByPartialNameFailed: ActionCreator<FetchProvidersByPartialNameFailed> = (
  input: FetchProvidersByPartialNameFailed,
) => ({
  ...input,
  type: 'FetchProvidersByPartialNameFailed',
});

export const PickProvider: ActionCreator<PickProvider> = (
  input: PickProvider,
) => ({
  ...input,
  type: 'PickProvider',
});

export const createTakeOut: ActionCreator<CreateTakeOut> = (
  input: CreateTakeOut,
) => ({
  ...input,
  type: 'CreateTakeOut',
});

export const createTakeOutSuccess: ActionCreator<CreateTakeOutSuccess> = (
  input: CreateTakeOutSuccess,
) => ({
  ...input,
  type: 'CreateTakeOutSuccess',
});

export const createTakeOutFailed: ActionCreator<CreateTakeOutFailed> = (
  input: CreateTakeOutFailed,
) => ({
  ...input,
  type: 'CreateTakeOutFailed',
});
