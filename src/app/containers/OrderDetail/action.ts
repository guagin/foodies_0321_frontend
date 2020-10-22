import { Action, ActionCreator } from '@reduxjs/toolkit';

import { Meal, Order } from './reducer';

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

export interface FetchMealOfIds extends Action<'FetchMealOfIds'> {
  token: string;
  ids: string[];
}

export interface FetchMealOfIdsSuccess extends Action<'FetchMealOfIdsSuccess'> {
  meals: Meal[];
}

export interface FetchMealOfIdsFailure extends Action<'FetchMealOfIdsFailure'> {
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

export const fetchMealOfIds: ActionCreator<FetchMealOfIds> = ({
  token,
  ids,
}: FetchMealOfIds) => {
  return {
    type: 'FetchMealOfIds',
    token,
    ids,
  };
};

export const fetchMealOfIdsSuccess: ActionCreator<FetchMealOfIdsSuccess> = ({
  meals,
}: FetchMealOfIdsSuccess) => {
  return {
    type: 'FetchMealOfIdsSuccess',
    meals,
  };
};

export const fetchMealOfIdsFailure: ActionCreator<FetchMealOfIdsFailure> = ({
  message,
}: FetchMealOfIdsFailure) => {
  return {
    type: 'FetchMealOfIdsFailure',
    message,
  };
};
