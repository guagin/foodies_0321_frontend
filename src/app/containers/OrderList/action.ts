import { Action, ActionCreator } from '@reduxjs/toolkit';
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
