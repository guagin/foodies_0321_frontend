import { createReducer } from '@reduxjs/toolkit';
import {
  FetchMealOfProviderId,
  FetchMealOfProviderIdFailure,
  FetchMealOfProviderIdSuccess,
  FetchProviderOfId,
  FetchProviderOfIdFailure,
  FetchProviderOfIdSuccess,
} from './action';

export interface Meal {
  id: string;
  name: string;
  description: string;
  price: number;
  provider: string;
  createdBy: string;
}

export interface Provider {
  id: string;
  name: string;
  description: string;
  phone: number;
  createdBy: string;
}

export type ProviderState = {
  provider?: Provider;
  isRequest: boolean;
  message: string;
  meals: Meal[];
};

export const initProviderState: ProviderState = {
  isRequest: true,
  message: '',
  meals: [],
};

export const providerReducer = createReducer(initProviderState, {
  FetchProviderOfId: (state, action: FetchProviderOfId) => {
    return {
      ...state,
      isRequest: true,
    };
  },

  FetchProviderOfIdSuccess: (state, { provider }: FetchProviderOfIdSuccess) => {
    return {
      ...state,
      isRequest: false,
      provider,
    };
  },

  FetchProviderOfIdFailure: (state, { message }: FetchProviderOfIdFailure) => {
    return {
      ...state,
      isRequest: false,
      message,
    };
  },

  FetchMealOfProviderId: (state, action: FetchMealOfProviderId) => {
    return {
      ...state,
      isRequest: true,
    };
  },

  FetchMealOfProviderIdSuccess: (
    state,
    { meals }: FetchMealOfProviderIdSuccess,
  ) => {
    return {
      ...state,
      isRequest: false,
      meals,
    };
  },

  FetchMealOfProviderIdFailure: (
    state,
    { message }: FetchMealOfProviderIdFailure,
  ) => {
    return {
      ...state,
      isRequest: false,
      message,
    };
  },
});
