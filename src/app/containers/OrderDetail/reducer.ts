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
};

export const initOrderDetailState: OrderDetailState = {
  isRequest: true,
  message: '',
  meals: [],
  users: [],
};

export const orderDetailReducer = createReducer(initOrderDetailState, {
  FetchOrderOfId: (state, { id }: FetchOrderOfId) => {
    return {
      ...state,
      isRequest: true,
      id,
    };
  },

  FetchOrderOfIdSuccess: (state, { order }: FetchOrderOfIdSuccess) => {
    return {
      ...state,
      isRequest: false,
      order,
    };
  },

  FetchOrderOfIdFailure: (state, { message }) => {
    return {
      ...state,
      isRequest: false,
      message,
    };
  },

  FetchMealOfIds: (state, action: FetchMealOfIds) => {
    return {
      ...state,
      isRequest: true,
    };
  },

  FetchMealOfIdsSuccess: (state, { meals }: FetchMealOfIdsSuccess) => {
    return {
      ...state,
      isRequest: false,
      meals,
    };
  },

  FetchMealOfIdFailure: (state, { message }: FetchMealOfIdsFailure) => {
    return {
      ...state,
      isRequest: false,
      message,
    };
  },

  FetchUserOfIds: (state, action: FetchUserOfIds) => {
    return {
      ...state,
      isRequest: true,
    };
  },

  FetchUserOfIdsSuccess: (state, { users }: FetchUserOfIdsSuccess) => {
    return {
      ...state,
      isRequest: false,
      users,
    };
  },

  FetchUserOfIdsFailure: (state, { message }: FetchUserOfIdsFailure) => {
    return {
      ...state,
      isRequest: false,
      message,
    };
  },
});
