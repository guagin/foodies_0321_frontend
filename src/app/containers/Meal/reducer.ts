import { createReducer } from '@reduxjs/toolkit';
import {
  FetchMealOfId,
  FetchMealOfIdFailure,
  FetchMealOfIdSuccess,
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
      isRequest: false,
      meal,
    };
  },

  FetchMealOfIdFailure: (state, { message }: FetchMealOfIdFailure) => {
    return {
      ...state,
      isRequest: false,
      message,
    };
  },

  // TODO: fetchProvider.
});
