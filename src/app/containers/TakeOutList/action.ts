import { Action, ActionCreator } from '@reduxjs/toolkit';
import { TakeOut } from './take-out';

export interface FetchTakeOut extends Action<'FetchTakeOut'> {
  token: string;
  page: number;
  count: number;
}

export interface FetchTakeOutSuccess extends Action<'FetchTakeOutSuccess'> {
  takeOuts: TakeOut[];
  page: number;
  totalPages: number;
  totalCount: number;
  hasPrevious: boolean;
  hasNext: boolean;
}

export interface FetchTakeOutFailed extends Action<'FetchTakeOutFailed'> {
  message: string;
}

export type FetchTakeOutActions =
  | FetchTakeOut
  | FetchTakeOutSuccess
  | FetchTakeOutFailed;

export const fetchTakeOut: ActionCreator<FetchTakeOut> = (
  input: FetchTakeOut,
) => ({
  ...input,
  type: 'FetchTakeOut',
});

export const fetchTakeOutSuccess: ActionCreator<FetchTakeOutSuccess> = (
  input: FetchTakeOutSuccess,
) => ({
  ...input,
  type: 'FetchTakeOutSuccess',
});

export const fetchTakeOutFailed: ActionCreator<FetchTakeOutFailed> = (
  input: FetchTakeOutFailed,
) => ({
  ...input,
  type: 'FetchTakeOutFailed',
});
