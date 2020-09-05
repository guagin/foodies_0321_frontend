import { TakeOut } from '../TakeOutList/take-out';
import { createReducer } from '@reduxjs/toolkit';
import {
  FetchTakeOutByPartialTitleSuccess,
  FetchTakeOutByPartialTitleFailed,
  CreateOrder,
  CreateOrderSuccess,
  CreateOrderFailed,
  FetchTakeOutByPartialTitle,
  PickTakeOutId,
} from './action';

export type CreateOrderState = {
  isRequest: boolean;
  takeOuts: TakeOut[];
  message: string;
  takeOutId: string;
};

export const initCreateOrderState: CreateOrderState = {
  isRequest: false,
  takeOuts: [],
  message: '',
  takeOutId: '',
};

export const createOrderReducer = createReducer(initCreateOrderState, {
  FetchTakeOutByPartialTitle: (state, action: FetchTakeOutByPartialTitle) => {
    return {
      ...state,
      isRequest: true,
      message: '',
    };
  },

  FetchTakeOutByPartialTitleSuccess: (
    state,
    { takeOuts }: FetchTakeOutByPartialTitleSuccess,
  ) => {
    return {
      ...state,
      isRequest: false,
      message: '',
      takeOuts,
    };
  },

  FetchTakeOutByPartialTitleFailed: (
    state,
    { message }: FetchTakeOutByPartialTitleFailed,
  ) => {
    return {
      ...state,
      isRequest: false,
      message,
    };
  },

  PickTakeOutId: (state, { takeOutId }: PickTakeOutId) => {
    return {
      ...state,
      isRequest: false,
      message: '',
      takeOutId,
    };
  },

  CreateOrder: (state, action: CreateOrder) => {
    return {
      ...state,
      isRequest: true,
      message: '',
    };
  },

  CreateOrderSuccess: (state, action: CreateOrderSuccess) => {
    return {
      ...state,
      isRequest: false,
      message: '',
    };
  },

  CreateOrderFailed: (state, { message }: CreateOrderFailed) => {
    return {
      ...state,
      isRequest: false,
      message,
    };
  },
});
