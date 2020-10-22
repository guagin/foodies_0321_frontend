import { createReducer } from '@reduxjs/toolkit';
import { TakeOut } from '../TakeOutList/take-out';
import {
  FetchMealOfIds,
  FetchMealOfIdsFailure,
  FetchMealOfIdsSuccess,
  FetchOrderOfId,
  FetchOrderOfIdSuccess,
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
};

export const initOrderDetailState: OrderDetailState = {
  isRequest: true,
  message: '',
  meals: [],
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
});
