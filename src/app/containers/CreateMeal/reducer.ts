import { createReducer } from '@reduxjs/toolkit';

import {
  CreateMealFailed,
  CreateMeal,
  CreateMealSuccess,
  FetchProviderOfPartialName,
  FetchProviderOfPartialNameSuccess,
  FetchProviderOfPartialNameFailure,
  PickProvider,
} from './action';

export interface Provider {
  id: string;
  name: string;
  description: string;
  phone: number;
  createdBy: string;
}

export interface Meal {
  id: string;
  name: string;
  description: string;
  price: number;
  picture: string[];
  provider: string;
  createBy: string;
}

export interface CreateMealState {
  isRequest: boolean;
  id: string;
  message: string;
  providers: Provider[];
  pickedProvider?: Provider;
}

export const initCreateMealState: CreateMealState = {
  isRequest: false,
  id: '',
  message: '',
  providers: [],
};

export const createMealReducer = createReducer(initCreateMealState, {
  CreateMeal: (state, action: CreateMeal) => {
    return {
      ...state,
      isRequest: true,
      message: '',
    };
  },

  CreateMealSuccess: (state, { id }: CreateMealSuccess) => {
    return {
      ...state,
      isRequest: false,
      message: '',
      id,
    };
  },

  CreateMealFailed: (state, { message }: CreateMealFailed) => {
    return {
      ...state,
      isRequest: false,
      message,
      id: '',
    };
  },

  FetchProviderOfPartialName: (state, action: FetchProviderOfPartialName) => {
    return {
      ...state,
      isRequest: true,
    };
  },

  FetchProviderOfPartialNameSuccess: (
    state,
    { providers }: FetchProviderOfPartialNameSuccess,
  ) => {
    return {
      ...state,
      isRequest: false,
      providers,
    };
  },

  FetchProvidersOfPartialNameFailure: (
    state,
    { message }: FetchProviderOfPartialNameFailure,
  ) => {
    return {
      ...state,
      isReques: false,
      message,
    };
  },

  PickProvider: (state, { pickedProvider }: PickProvider) => {
    return {
      ...state,
      pickedProvider,
    };
  },
});
