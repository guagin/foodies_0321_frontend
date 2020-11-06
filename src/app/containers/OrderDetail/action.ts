import { Action, ActionCreator } from '@reduxjs/toolkit';

import { Meal, Order, User, Takeout } from './reducer';
import {
  FETCH_ORDER,
  FETCH_MEALS,
  FETCH_ORDER_SUCCESS,
  FETCH_ORDER_FAILURE,
  FETCH_MEALS_SUCCESS,
  FETCH_MEALS_FAILURE,
  FETCH_USERS,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
  FETCH_TAKEOUT,
  FETCH_TAKEOUT_SUCCESS,
  FETCH_TAKEOUT_FAILURE,
} from './constants';

export interface FetchOrderOfId extends Action<typeof FETCH_ORDER> {
  token: string;
  id: string;
}

export const fetchOrderOfId: ActionCreator<FetchOrderOfId> = ({
  token,
  id,
}: FetchOrderOfId) => {
  return {
    type: FETCH_ORDER,
    token,
    id,
  };
};

export interface FetchOrderOfIdSuccess
  extends Action<typeof FETCH_ORDER_SUCCESS> {
  order: Order;
}

export const fetchOrderOfIdSuccess: ActionCreator<FetchOrderOfIdSuccess> = ({
  order,
}: {
  order: Order;
}) => {
  return {
    type: FETCH_ORDER_SUCCESS,
    order,
  };
};

export interface FetchOrderOfIdFailure
  extends Action<typeof FETCH_ORDER_FAILURE> {
  message: string;
}

export const fetchOrderOfIdFailure: ActionCreator<FetchOrderOfIdFailure> = ({
  message,
}: {
  message: string;
}) => {
  return {
    type: FETCH_ORDER_FAILURE,
    message,
  };
};

export interface FetchMealOfIds extends Action<typeof FETCH_MEALS> {
  token: string;
  ids: string[];
}

export const fetchMealOfIds: ActionCreator<FetchMealOfIds> = ({
  token,
  ids,
}: FetchMealOfIds) => {
  return {
    type: FETCH_MEALS,
    token,
    ids,
  };
};

export interface FetchMealOfIdsSuccess
  extends Action<typeof FETCH_MEALS_SUCCESS> {
  meals: Meal[];
}

export const fetchMealOfIdsSuccess: ActionCreator<FetchMealOfIdsSuccess> = ({
  meals,
}: FetchMealOfIdsSuccess) => {
  return {
    type: FETCH_MEALS_SUCCESS,
    meals,
  };
};

export interface FetchMealOfIdsFailure
  extends Action<typeof FETCH_MEALS_FAILURE> {
  message: string;
}

export const fetchMealOfIdsFailure: ActionCreator<FetchMealOfIdsFailure> = ({
  message,
}: FetchMealOfIdsFailure) => {
  return {
    type: FETCH_MEALS_FAILURE,
    message,
  };
};

export interface FetchUserOfIds extends Action<typeof FETCH_USERS> {
  token: string;
  ids: string[];
}

export const fetchUserOfIds: ActionCreator<FetchUserOfIds> = ({
  token,
  ids,
}: FetchUserOfIds) => {
  return {
    type: FETCH_USERS,
    token,
    ids,
  };
};

export interface FetchUserOfIdsSuccess
  extends Action<typeof FETCH_USERS_SUCCESS> {
  users: User[];
}

export const fetchUserOfIdsSuccess: ActionCreator<FetchUserOfIdsSuccess> = ({
  users,
}: FetchUserOfIdsSuccess) => {
  return {
    type: FETCH_USERS_SUCCESS,
    users,
  };
};

export interface FetchUserOfIdsFailure
  extends Action<typeof FETCH_USERS_FAILURE> {
  message: string;
}

export const fetchUserOfIdsFailure: ActionCreator<FetchUserOfIdsFailure> = ({
  message,
}: FetchUserOfIdsFailure) => {
  return {
    type: FETCH_USERS_FAILURE,
    message,
  };
};

export interface FetchTakeout extends Action<typeof FETCH_TAKEOUT> {
  token: string;
  takeoutId: string;
}

export const fetchTakeout: ActionCreator<FetchTakeout> = (
  input: FetchTakeout,
) => ({
  ...input,
  type: FETCH_TAKEOUT,
});

export interface FetchTakeoutSuccess
  extends Action<typeof FETCH_TAKEOUT_SUCCESS> {
  takeout: Takeout;
}

export const fetchTakeoutSuccess: ActionCreator<FetchTakeoutSuccess> = (
  input: FetchTakeoutSuccess,
) => ({
  ...input,
  type: FETCH_TAKEOUT_SUCCESS,
});

export interface FetchTakeoutFailure
  extends Action<typeof FETCH_TAKEOUT_FAILURE> {
  message: string;
}

export const fetchTakeoutFailure: ActionCreator<FetchTakeoutFailure> = (
  input: FetchTakeoutFailure,
) => ({
  ...input,
  type: FETCH_TAKEOUT_FAILURE,
});
