import { Action, ActionCreator } from '@reduxjs/toolkit';
import { TakeOut } from 'app/containers/TakeOutList/take-out';

export interface FetchTakeOutByPartialTitle
  extends Action<'FetchTakeOutByPartialTitle'> {
  token: string;
  title: string;
}

export interface FetchTakeOutByPartialTitleSuccess
  extends Action<'FetchTakeOutByPartialTitleSuccess'> {
  takeOuts: TakeOut[];
}

export interface FetchTakeOutByPartialTitleFailure
  extends Action<'FetchTakeOutByPartialTitleFailure'> {
  message: string;
}

export type FetchtakeOutByPartialTitleActions =
  | FetchTakeOutByPartialTitle
  | FetchTakeOutByPartialTitleSuccess
  | FetchTakeOutByPartialTitleFailure;

export const createFetchTakeOutByPartialTitle: ActionCreator<FetchTakeOutByPartialTitle> = ({
  token,
  title,
}: {
  token: string;
  title: string;
}) => ({
  type: 'FetchTakeOutByPartialTitle',
  token,
  title,
});

export const createFetchTakeOutByPartialTitleSuccess: ActionCreator<FetchTakeOutByPartialTitleSuccess> = ({
  takeOuts,
}: {
  takeOuts: TakeOut[];
}) => ({
  type: 'FetchTakeOutByPartialTitleSuccess',
  takeOuts,
});

export const createFetchtakeOutByPartialTitleFailure: ActionCreator<FetchTakeOutByPartialTitleFailure> = ({
  message,
}: {
  message: string;
}) => ({
  type: 'FetchTakeOutByPartialTitleFailure',
  message,
});
