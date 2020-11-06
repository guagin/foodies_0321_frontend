import { createReducer } from '@reduxjs/toolkit';
import { TakeOut } from '../TakeOutList/take-out';
import {
  FetchMealOfIds,
  FetchMealOfIdsFailure,
  FetchMealOfIdsSuccess,
  FetchOrderOfId,
  FetchOrderOfIdSuccess,
  FetchUserOfIds,
  FetchUserOfIdsFailure,
  FetchUserOfIdsSuccess,
} from './action';
import {
  FETCH_ORDER,
  FETCH_ORDER_SUCCESS,
  FETCH_ORDER_FAILURE,
  FETCH_MEALS,
  FETCH_MEALS_SUCCESS,
  FETCH_MEALS_FAILURE,
  FETCH_USERS,
  FETCH_USERS_FAILURE,
  FETCH_USERS_SUCCESS,
} from './constants';

export interface Takeout {
  id: string;
  title: string;
  createdBy: string;
  description: string;
  startedAt: Date;
  endAt: Date;
  enabled: boolean;
  providerId: string;
}

export interface Order {
  id: string;
  createdBy: string;
  products: Product[];
  status: number;
  takeOutId: string;
}

export interface Meal {
  id: string;
  name: string;
  description: string;
  price: number;
  provider: string;
  createdBy: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Product {
  id: string;
  amount: number;
  note: string;
}

export type OrderDetailState = {
  isRequest: boolean;
  order?: Order;
  message: string;
  takeOut?: TakeOut;
  meals: Meal[];
  users: User[];
  Takeout?: Takeout;
};

export const initOrderDetailState: OrderDetailState = {
  isRequest: true,
  message: '',
  meals: [],
  users: [],
};

export const orderDetailReducer = createReducer(initOrderDetailState, {
  [FETCH_ORDER]: (state, { id }: FetchOrderOfId) => {
    return {
      ...state,
      isRequest: true,
      id,
    };
  },

  [FETCH_ORDER_SUCCESS]: (state, { order }: FetchOrderOfIdSuccess) => {
    return {
      ...state,
      isRequest: false,
      order,
    };
  },

  [FETCH_ORDER_FAILURE]: (state, { message }) => {
    return {
      ...state,
      isRequest: false,
      message,
    };
  },

  [FETCH_MEALS]: (state, action: FetchMealOfIds) => {
    return {
      ...state,
      isRequest: true,
    };
  },

  [FETCH_MEALS_SUCCESS]: (state, { meals }: FetchMealOfIdsSuccess) => {
    return {
      ...state,
      isRequest: false,
      meals,
    };
  },

  [FETCH_MEALS_FAILURE]: (state, { message }: FetchMealOfIdsFailure) => {
    return {
      ...state,
      isRequest: false,
      message,
    };
  },

  [FETCH_USERS]: (state, action: FetchUserOfIds) => {
    return {
      ...state,
      isRequest: true,
    };
  },

  [FETCH_USERS_SUCCESS]: (state, { users }: FetchUserOfIdsSuccess) => {
    return {
      ...state,
      isRequest: false,
      users,
    };
  },

  [FETCH_USERS_FAILURE]: (state, { message }: FetchUserOfIdsFailure) => {
    return {
      ...state,
      isRequest: false,
      message,
    };
  },
});
