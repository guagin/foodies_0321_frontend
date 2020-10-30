import { createReducer } from '@reduxjs/toolkit';
import {
  FetchMealOfId,
  FetchMealOfIdFailure,
  FetchMealOfIdSuccess,
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

export type MealState = {
  isRequest: boolean;
  message: string;
  meal?: Meal;
  provider?: Provider;
};

export const initMealState: MealState = {
  isRequest: true,
  message: '',
};

export const mealReducer = createReducer(initMealState, {
  FetchMealOfId: (state, action: FetchMealOfId) => {
    return {
      ...state,
      isRequest: true,
    };
  },

  FetchMealOfIdSuccess: (state, { meal }: FetchMealOfIdSuccess) => {
    return {
      ...state,
      meal,
    };
  },

  FetchMealOfIdFailure: (state, { message }: FetchMealOfIdFailure) => {
    return {
      ...state,
      message,
    };
  },

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
});
