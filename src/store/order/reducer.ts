import { createReducer } from '@reduxjs/toolkit';
import {
  FetchOrderOfPage,
  FetchOrderOfPageSuccess,
  FetchOrderOfPageFailure,
} from './action/fetch-order-of-page';

export interface Order {
  id: string;
  createdBy: string;
  products: Product[];
  status: number;
  takeOutId: string;
}

export interface Product {
  id: string;
  amount: number;
  note: string;
}

export type OrderOfPageState = {
  isRequest: boolean;
  orders: Order[];
  page: number;
  hasNext: boolean;
  hasPrevious: boolean;
  totalPage: number;
  totalCount: number;
  message: string;
};

const initialState: OrderOfPageState = {
  isRequest: false,
  orders: [],
  page: 1,
  hasNext: false,
  hasPrevious: false,
  totalPage: 0,
  totalCount: 0,
  message: '',
};

export const orderOfPageReducer = createReducer(initialState, {
  FetchOrderOfPage: (state, action: FetchOrderOfPage) => {
    return {
      ...state,
      isRequest: true,
    };
  },
  FetchOrderOfPageSuccess: (state, action: FetchOrderOfPageSuccess) => {
    return {
      ...state,
      message: '',
      isRequest: false,
      ...action,
    };
  },
  FetchOrderOfPageFailure: (state, { message }: FetchOrderOfPageFailure) => {
    return {
      ...state,
      message,
    };
  },
});
