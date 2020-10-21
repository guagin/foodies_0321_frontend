import { createReducer } from '@reduxjs/toolkit';
import { TakeOut } from '../TakeOutList/take-out';
import { FetchOrderOfId, FetchOrderOfIdSuccess } from './action';

export interface Order {
  id: string;
  createdBy: string;
  products: Product[];
  status: number;
  takeOutId: string;
}

// meal.
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
};

export const initOrderDetailState: OrderDetailState = {
  isRequest: true,
  message: '',
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
});
