import { Action, ActionCreator } from '@reduxjs/toolkit';

import { Meal, Order, User } from './reducer';

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

export interface FetchUserOfIds extends Action<'FetchUserOfIds'> {
  token: string;
  ids: string[];
}

export interface FetchUserOfIdsSuccess extends Action<'FetchUserOfIdsSuccess'> {
  users: User[];
}

export interface FetchUserOfIdsFailure extends Action<'FetchUserOfIdsFailure'> {
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

export const fetchUserOfIds: ActionCreator<FetchUserOfIds> = ({
  token,
  ids,
}: FetchUserOfIds) => {
  return {
    type: 'FetchUserOfIds',
    token,
    ids,
  };
};

export const fetchUserOfIdsSuccess: ActionCreator<FetchUserOfIdsSuccess> = ({
  users,
}: FetchUserOfIdsSuccess) => {
  return {
    type: 'FetchUserOfIdsSuccess',
    users,
  };
};

export const fetchUserOfIdsFailure: ActionCreator<FetchUserOfIdsFailure> = ({
  message,
}: FetchUserOfIdsFailure) => {
  return {
    type: 'FetchUserOfIdsFailure',
    message,
  };
};
