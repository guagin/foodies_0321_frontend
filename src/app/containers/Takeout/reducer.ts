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
  FETCH_TAKEOUT_USER,
  FETCH_TAKEOUT_USER_SUCCESS,
  FETCH_TAKEOUT_USER_FAILURE,
  FETCH_ORDER_USERS,
  FETCH_ORDER_USERS_SUCCESS,
  FETCH_ORDER_USERS_FAILURE,
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
  FetchTakeoutUser,
  FetchTakeoutUserSuccess,
  FetchTakeoutUserFailure,
  FetchOrderUsers,
  FetchOrderUsersSuccess,
  FetchOrderUsersFailure,
} from './action';

export interface User {
  id: string;
  name: string;
}

export interface Provider {
  _id: string;
  name: string;
  description: string;
  phone: number;
  createdBy: string;
}

export interface Order {
  id: string;
  createdBy: string;
  products: {
    id: string;
    amount: number;
    note: string;
  }[];
  status: number;
  takeOutId: string;
}

export interface Takeout {
  id: string;
  title: string;
  createdBy: string;
  description: string;
  startedAt: string;
  endAt: string;
  enabled: boolean;
  providerId: string;
}

export type TakeoutState = {
  isRequest: boolean;
  message: string;
  takeout?: Takeout;
  orders: Order[];
  provider?: Provider;
  takeoutUser?: User;
  orderUsers: User[];
};

export const initTakeoutState: TakeoutState = {
  isRequest: true,
  message: '',
  orders: [],
  orderUsers: [],
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
      // isRequest: false,
      takeout,
    };
  },

  [FETCH_TAKEOUT_OF_ID_FAILURE]: (
    state,
    { message }: FetchTakeoutOfIdFailure,
  ) => {
    return {
      ...state,
      message,
    };
  },

  [FETCH_ORDER_OF_TAKEOUT_ID]: (state, action: FetchOrderOfTakeoutId) => {
    return {
      ...state,
    };
  },

  [FETCH_ORDER_OF_TAKEOUT_ID_SUCCESS]: (
    state,
    { orders }: FetchOrderOfTakeoutIdSuccess,
  ) => {
    return {
      ...state,
      orders,
    };
  },

  [FETCH_ORDER_OF_TAKEOUT_ID_FAILURE]: (
    state,
    { message }: FetchOrderOfTakeoutIdFailure,
  ) => {
    return {
      ...state,
      message,
    };
  },

  [FETCH_PROVIDER_OF_ID]: (state, action: FetchProviderOfId) => {
    return {
      ...state,
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

  [FETCH_TAKEOUT_USER]: (state, action: FetchTakeoutUser) => {
    return {
      ...state,
    };
  },
  [FETCH_TAKEOUT_USER_SUCCESS]: (state, { user }: FetchTakeoutUserSuccess) => {
    return {
      ...state,
      takeoutUser: user,
    };
  },

  [FETCH_TAKEOUT_USER_FAILURE]: (
    state,
    { message }: FetchTakeoutUserFailure,
  ) => {
    return {
      ...state,
      message,
    };
  },

  [FETCH_ORDER_USERS]: (state, action: FetchOrderUsers) => {
    return {
      ...state,
    };
  },
  [FETCH_ORDER_USERS_SUCCESS]: (state, { users }: FetchOrderUsersSuccess) => {
    return {
      ...state,
      orderUsers: users,
    };
  },
  [FETCH_ORDER_USERS_FAILURE]: (state, { message }: FetchOrderUsersFailure) => {
    return {
      ...state,
      message,
    };
  },
});
