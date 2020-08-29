import { Action, ActionCreator } from '@reduxjs/toolkit';
import { TakeOut } from '../TakeOutList/take-out';

export interface FetchTakeOutByPartialTitle
  extends Action<'FetchTakeOutByPartialTitle'> {
  token: string;
  title: string;
}

export interface FetchTakeOutByPartialTitleSuccess
  extends Action<'FetchTakeOutByPartialTitleSuccess'> {
  takeOuts: TakeOut[];
}

export interface FetchTakeOutByPartialTitleFailed
  extends Action<'FetchTakeOutByPartialFailed'> {
  message: string;
}

export type FetchTakeOutByPartialTitleActions =
  | FetchTakeOutByPartialTitle
  | FetchTakeOutByPartialTitleSuccess
  | FetchTakeOutByPartialTitleFailed;

export const fetchTakeOutByPartialTitle: ActionCreator<FetchTakeOutByPartialTitle> = (
  input: FetchTakeOutByPartialTitle,
) => ({
  ...input,
  type: 'FetchTakeOutByPartialTitle',
});

export const fetchTakeOutByPartialTitleSuccess: ActionCreator<FetchTakeOutByPartialTitleSuccess> = (
  input: FetchTakeOutByPartialTitleSuccess,
) => ({
  ...input,
  type: 'FetchTakeOutByPartialTitleSuccess',
});

export const fetchTakeOutByPartialTitleFailed: ActionCreator<FetchTakeOutByPartialTitleFailed> = (
  input: FetchTakeOutByPartialTitleFailed,
) => ({
  ...input,
  type: 'FetchTakeOutByPartialFailed',
});
