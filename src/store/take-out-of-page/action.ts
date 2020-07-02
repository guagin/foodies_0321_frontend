import { Action, ActionCreator } from '@reduxjs/toolkit';
import { TakeOut } from './reducer';

export interface FetchTakeOutOfPage extends Action<'FetchTakeOutOfPage'> {
  token: string;
  page: number;
  count: number;
}

export interface FetchTakeOutOfPageSuccess
  extends Action<'FetchTakeOutOfPageSuccess'> {
  takeOuts: TakeOut[];
  hasPrevious: boolean;
  hasNext: boolean;
  page: number;
  totalCount: number;
  totalPage: number;
}

export interface FetchTakeOutOfPageFailure
  extends Action<'FetchTakeOutOfPageFailure'> {
  message: string;
}

export type FetchTakeOutOfPageActions =
  | FetchTakeOutOfPage
  | FetchTakeOutOfPageFailure
  | FetchTakeOutOfPageSuccess;

export const createFetchTakeOutOfPage: ActionCreator<FetchTakeOutOfPage> = ({
  token,
  page,
  count,
}: {
  token: string;
  page: number;
  count: number;
}) => {
  return {
    type: 'FetchTakeOutOfPage',
    token,
    page,
    count,
  };
};

export const createFetchTakeOutOfPageSuccess: ActionCreator<FetchTakeOutOfPageSuccess> = ({
  takeOuts,
  hasPrevious,
  hasNext,
  page,
  totalCount,
  totalPage,
}: {
  takeOuts: TakeOut[];
  hasPrevious: boolean;
  hasNext: boolean;
  page: number;
  totalCount: number;
  totalPage: number;
}) => {
  return {
    type: 'FetchTakeOutOfPageSuccess',
    takeOuts,
    hasPrevious,
    hasNext,
    page,
    totalCount,
    totalPage,
  };
};

export const createFetchTakeOutOfPageFailure: ActionCreator<FetchTakeOutOfPageFailure> = ({
  message,
}: {
  message: string;
}) => {
  return {
    type: 'FetchTakeOutOfPageFailure',
    message,
  };
};
