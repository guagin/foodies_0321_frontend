import { Action, ActionCreator } from '@reduxjs/toolkit';
import { Takeout } from '../TakeoutList/take-out';
import { Order } from './reducer';

export interface FetchOrderOfPage extends Action<'FetchOrderOfPage'> {
  token: string;
  page: number;
  count: number;
}

export interface FetchOrderOfPageSuccess
  extends Action<'FetchOrderOfPageSuccess'> {
  orders: Order[];
  hasPrevious: boolean;
  hasNext: boolean;
  page: number;
  totalPage: number;
  totalCount: number;
}

export interface FetchOrderOfPageFailure
  extends Action<'FetchOrderOfPageFailure'> {
  message: string;
}

export interface FetchTakeOutOfIds extends Action<'FetchTakeOutOfIds'> {
  token: string;
  ids: string[];
}

export interface FetchTakeOutOfIdsSuccess
  extends Action<'FetchTakeOutOfIdsSuccess'> {
  takeOuts: Takeout[];
}

export interface FetchTakeOutOfIdsFailure
  extends Action<'FetchTakeOutOfIdsFailure'> {
  message: string;
}

export const fetchOrderOfPage: ActionCreator<FetchOrderOfPage> = ({
  token,
  page,
  count,
}: {
  token: string;
  page: number;
  count: number;
}) => {
  return {
    type: 'FetchOrderOfPage',
    token,
    page,
    count,
  };
};

export const fetchOrderOfPageSuccess: ActionCreator<FetchOrderOfPageSuccess> = ({
  orders,
  hasPrevious,
  hasNext,
  page,
  totalPage,
  totalCount,
}: {
  orders: Order[];
  hasPrevious: boolean;
  hasNext: boolean;
  page: number;
  totalPage: number;
  totalCount: number;
}) => {
  return {
    type: 'FetchOrderOfPageSuccess',
    orders,
    hasPrevious,
    hasNext,
    page,
    totalPage,
    totalCount,
  };
};

export const fetchOrderOfPageFailure: ActionCreator<FetchOrderOfPageFailure> = ({
  message,
}: {
  message: string;
}) => {
  return {
    type: 'FetchOrderOfPageFailure',
    message,
  };
};

export const fetchTakeOutOfIds: ActionCreator<FetchTakeOutOfIds> = ({
  token,
  ids,
}: {
  token: string;
  ids: string[];
}) => {
  return {
    type: 'FetchTakeOutOfIds',
    ids,
    token,
  };
};

export const fetchTakeOutOfIdsSuccess: ActionCreator<FetchTakeOutOfIdsSuccess> = ({
  takeOuts,
}: {
  takeOuts: Takeout[];
}) => {
  return {
    type: 'FetchTakeOutOfIdsSuccess',
    takeOuts,
  };
};

export const fetchTakeOutOfIdsFailure: ActionCreator<FetchTakeOutOfIdsFailure> = ({
  message,
}: {
  message: string;
}) => {
  return {
    type: 'FetchTakeOutOfIdsFailure',
    message,
  };
};
