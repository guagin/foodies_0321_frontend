import { TakeOut } from '../TakeOutList/take-out';
import { createReducer } from '@reduxjs/toolkit';
import {
  FetchTakeOutByPartialTitleSuccess,
  FetchTakeOutByPartialTitleFailed,
  CreateOrder,
  CreateOrderSuccess,
  CreateOrderFailed,
  FetchTakeOutByPartialTitle,
  FetchMeals,
  PickTakeOut,
} from './action';
import { Meal } from '../MealList/meal';

export type CreateOrderState = {
  isRequest: boolean;
  takeOuts: TakeOut[];
  message: string;
  takeOutId: string;
  providerId: string;
  meals: Meal[];
};

export const initCreateOrderState: CreateOrderState = {
  isRequest: false,
  takeOuts: [],
  message: '',
  takeOutId: '',
  providerId: '',
  meals: [],
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

  PickTakeOut: (state, { takeOutId, providerId }: PickTakeOut) => {
    return {
      ...state,
      isRequest: false,
      message: '',
      takeOutId,
      providerId,
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

  FetchMeals: (state, { providerId }: FetchMeals) => {
    return {
      ...state,
      isRequest: true,
      providerId,
    };
  },
});
