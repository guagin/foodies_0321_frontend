import { createReducer } from '@reduxjs/toolkit';
import { Takeout } from '../TakeoutList/take-out';
import {
  FetchOrderOfPage,
  FetchOrderOfPageFailure,
  FetchOrderOfPageSuccess,
  FetchTakeOutOfIds,
  FetchTakeOutOfIdsFailure,
  FetchTakeOutOfIdsSuccess,
} from './action';

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

export type OrderOfPageState = {
  isRequest: boolean;
  orders: Order[];
  page: number;
  hasNext: boolean;
  hasPrevious: boolean;
  totalPage: number;
  totalCount: number;
  message: string;
  takeOuts: Takeout[];
};

export const initialOrderOfPageState: OrderOfPageState = {
  isRequest: false,
  orders: [],
  page: 1,
  hasNext: false,
  hasPrevious: false,
  totalPage: 0,
  totalCount: 0,
  message: '',
  takeOuts: [],
};

export const orderOfPageReducer = createReducer(initialOrderOfPageState, {
  FetchOrderOfPage: (state, action: FetchOrderOfPage) => {
    return {
      ...state,
      isRequest: true,
    };
  },

  FetchOrderOfPageSuccess: (
    state,
    {
      orders,
      hasPrevious,
      hasNext,
      page,
      totalPage,
      totalCount,
    }: FetchOrderOfPageSuccess,
  ) => {
    return {
      ...state,
      isRequest: false,
      orders,
      hasPrevious,
      hasNext,
      page,
      totalPage,
      totalCount,
    };
  },

  FetchOrderOfPageFailure: (state, { message }: FetchOrderOfPageFailure) => {
    return {
      ...state,
      isRequest: false,
      message,
    };
  },

  FetchTakeOutOfIds: (state, action: FetchTakeOutOfIds) => {
    return {
      ...state,
      isRequest: true,
    };
  },

  FetchTakeOutOfIdsSuccess: (state, { takeOuts }: FetchTakeOutOfIdsSuccess) => {
    return {
      ...state,
      isRequest: false,
      takeOuts,
    };
  },

  FetchTakeOutIdFailure: (state, { message }: FetchTakeOutOfIdsFailure) => {
    return {
      ...state,
      message,
      isRequest: false,
    };
  },
});
