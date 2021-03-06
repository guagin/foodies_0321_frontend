import { createReducer } from '@reduxjs/toolkit';
import {
  FetchMealOfId,
  FetchMealOfIdSuccess,
  FetchMealOfIdFailure,
  FetchProviderOfId,
  FetchProviderOfIdSuccess,
  FetchProviderOfIdFailure,
  ActionType,
} from './action';
import {
  FETCH_MEAL_OF_ID,
  FETCH_MEAL_OF_ID_SUCCESS,
  FETCH_MEAL_OF_ID_FAILURE,
  FETCH_PROVIDER_OF_ID,
  FETCH_PROVIDER_OF_ID_SUCCESS,
  FETCH_PROVIDER_OF_ID_FAILURE,
} from './constants';

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

export const mealReducer = createReducer<MealState>(initMealState, {
  [FETCH_MEAL_OF_ID]: (state, action: FetchMealOfId) => {
    return {
      ...state,
      isRequest: true,
    };
  },

  [FETCH_MEAL_OF_ID_SUCCESS]: (state, { meal }: FetchMealOfIdSuccess) => {
    return {
      ...state,
      meal,
    };
  },

  [FETCH_MEAL_OF_ID_FAILURE]: (state, { message }: FetchMealOfIdFailure) => {
    return {
      ...state,
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
      isRequest: false,
      provider,
    };
  },

  [FETCH_PROVIDER_OF_ID_FAILURE]: (
    state,
    { message }: FetchProviderOfIdFailure,
  ) => {
    return {
      ...state,
      isRequest: false,
      message,
    };
  },
});
