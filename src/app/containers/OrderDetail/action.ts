import { Action, ActionCreator } from '@reduxjs/toolkit';
import { Order } from './reducer';

export interface FetchOrderOfId extends Action<'FetchOrderOfId'> {
  token: string;
  id: string;
}

export interface FetchOrderOfIdSuccess extends Action<'FetchOrderOfIdSuccess'> {
  order: Order;
}

export interface FetchOrderOfIdFailure extends Action<'FetchOrderOfIdFailure'> {
  message: string;
}

export const fetchOrderOfId: ActionCreator<FetchOrderOfId> = ({
  token,
  id,
}: FetchOrderOfId) => {
  return {
    type: 'FetchOrderOfId',
    token,
    id,
  };
};

export const fetchOrderOfIdSuccess: ActionCreator<FetchOrderOfIdSuccess> = ({
  order,
}: {
  order: Order;
}) => {
  return {
    type: 'FetchOrderOfIdSuccess',
    order,
  };
};

export const fetchOrderOfIdFailure: ActionCreator<FetchOrderOfIdFailure> = ({
  message,
}: {
  message: string;
}) => {
  return {
    type: 'FetchOrderOfIdFailure',
    message,
  };
};
