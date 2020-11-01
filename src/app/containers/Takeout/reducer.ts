import { createReducer } from '@reduxjs/toolkit';
import {
  FETCH_TAKEOUT_OF_ID,
  FETCH_TAKEOUT_OF_ID_SUCCESS,
  FETCH_TAKEOUT_OF_ID_FAILURE,
  FETCH_ORDER_OF_TAKEOUT_ID,
  FETCH_ORDER_OF_TAKEOUT_ID_SUCCESS,
  FETCH_ORDER_OF_TAKEOUT_ID_FAILURE,
  FETCH_PROVIDER_OF_ID,
  FETCH_PROVIDER_OF_ID_SUCCESS,
  FETCH_PROVIDER_OF_ID_FAILURE,
} from './constants';
import {
  FetchTakeoutOfId,
  FetchTakeoutOfIdSuccess,
  FetchTakeoutOfIdFailure,
  FetchOrderOfTakeoutId,
  FetchOrderOfTakeoutIdSuccess,
  FetchOrderOfTakeoutIdFailure,
  FetchProviderOfId,
  FetchProviderOfIdSuccess,
  FetchProviderOfIdFailure,
} from './action';

export interface Provider {
  _id: string;
  name: string;
  description: string;
  phone: number;
  createdBy: string;
}

export interface Product {
  id: string;
  amount: number;
  note: string;
}

export interface Order {
  id: string;
  createdBy: string;
  products: Product[];
  status: number;
  takeOutId: string;
}

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

export type TakeoutState = {
  isRequest: boolean;
  message: string;
  takeout?: Takeout;
  orders: Order[];
  provider?: Provider;
};

export const initTakeoutState: TakeoutState = {
  isRequest: true,
  message: '',
  orders: [],
};

export const takeoutReducer = createReducer(initTakeoutState, {
  [FETCH_TAKEOUT_OF_ID]: (state, action: FetchTakeoutOfId) => {
    return {
      ...state,
      isRequest: true,
    };
  },

  [FETCH_TAKEOUT_OF_ID_SUCCESS]: (
    state,
    { takeout }: FetchTakeoutOfIdSuccess,
  ) => {
    return {
      ...state,
      isRequest: false,
      takeout,
    };
  },

  [FETCH_TAKEOUT_OF_ID_FAILURE]: (
    state,
    { message }: FetchTakeoutOfIdFailure,
  ) => {
    return {
      ...state,
      isRequest: false,
      message,
    };
  },

  [FETCH_ORDER_OF_TAKEOUT_ID]: (state, action: FetchOrderOfTakeoutId) => {
    return {
      ...state,
      isRequest: true,
    };
  },

  [FETCH_ORDER_OF_TAKEOUT_ID_SUCCESS]: (
    state,
    { orders }: FetchOrderOfTakeoutIdSuccess,
  ) => {
    return {
      ...state,
      isRequest: false,
      orders,
    };
  },

  [FETCH_ORDER_OF_TAKEOUT_ID_FAILURE]: (
    state,
    { message }: FetchOrderOfTakeoutIdFailure,
  ) => {
    return {
      ...state,
      isRequest: false,
      message,
    };
  },

  [FETCH_PROVIDER_OF_ID]: (state, action: FetchProviderOfId) => {
    return {
      ...state,
      isRequest: true,
    };
  },

  [FETCH_PROVIDER_OF_ID_SUCCESS]: (
    state,
    { provider }: FetchProviderOfIdSuccess,
  ) => {
    return {
      ...state,
      provider,
    };
  },

  [FETCH_PROVIDER_OF_ID_FAILURE]: (
    state,
    { message }: FetchProviderOfIdFailure,
  ) => {
    return {
      ...state,
      message,
    };
  },
});
