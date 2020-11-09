import { Action, ActionCreator } from '@reduxjs/toolkit';
import { Provider } from 'store/model/provider';
import {
  CREATE_TAKEOUT,
  CREATE_TAKEOUT_FAILURE,
  CREATE_TAKEOUT_SUCCESS,
  FETCH_PROVIDER_BY_PARTIALNAME,
  FETCH_PROVIDER_BY_PARTIALNAME_FAILURE,
  FETCH_PROVIDER_BY_PARTIALNAME_SUCCESS,
  PICK_PROVIDER,
} from './constants';

export interface FetchProvidersByPartialName
  extends Action<typeof FETCH_PROVIDER_BY_PARTIALNAME> {
  token: string;
  name: string;
}

export const FetchProvidersByPartialName: ActionCreator<FetchProvidersByPartialName> = (
  input: FetchProvidersByPartialName,
) => ({
  ...input,
  type: FETCH_PROVIDER_BY_PARTIALNAME,
});

export interface FetchProvidersByPartialNameSuccess
  extends Action<typeof FETCH_PROVIDER_BY_PARTIALNAME_SUCCESS> {
  providers: Provider[];
}

export const FetchProvidersByPartialNameSuccess: ActionCreator<FetchProvidersByPartialNameSuccess> = (
  input: FetchProvidersByPartialNameSuccess,
) => ({
  ...input,
  type: FETCH_PROVIDER_BY_PARTIALNAME_SUCCESS,
});

export interface FetchProvidersByPartialNameFailed
  extends Action<typeof FETCH_PROVIDER_BY_PARTIALNAME_FAILURE> {
  message: string;
}

export const FetchProvidersByPartialNameFailed: ActionCreator<FetchProvidersByPartialNameFailed> = (
  input: FetchProvidersByPartialNameFailed,
) => ({
  ...input,
  type: FETCH_PROVIDER_BY_PARTIALNAME_FAILURE,
});

export interface CreateTakeOut extends Action<typeof CREATE_TAKEOUT> {
  token: string;
  title: string;
  description: string;
  startedAt: Date;
  endAt: Date;
  enabled: boolean;
  providerId: string;
}
export const createTakeOut: ActionCreator<CreateTakeOut> = (
  input: CreateTakeOut,
) => ({
  ...input,
  type: CREATE_TAKEOUT,
});

export interface CreateTakeOutSuccess
  extends Action<typeof CREATE_TAKEOUT_SUCCESS> {
  id: string;
}

export const createTakeOutSuccess: ActionCreator<CreateTakeOutSuccess> = (
  input: CreateTakeOutSuccess,
) => ({
  ...input,
  type: CREATE_TAKEOUT_SUCCESS,
});

export interface CreateTakeOutFailed
  extends Action<typeof CREATE_TAKEOUT_FAILURE> {
  message: string;
}

export const createTakeOutFailed: ActionCreator<CreateTakeOutFailed> = (
  input: CreateTakeOutFailed,
) => ({
  ...input,
  type: CREATE_TAKEOUT_FAILURE,
});

export interface PickProvider extends Action<typeof PICK_PROVIDER> {
  providerId: string;
}

export const PickProvider: ActionCreator<PickProvider> = (
  input: PickProvider,
) => ({
  ...input,
  type: PICK_PROVIDER,
});
