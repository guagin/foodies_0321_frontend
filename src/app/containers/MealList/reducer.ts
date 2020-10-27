import { createReducer } from '@reduxjs/toolkit';
import {
  FetchMealsFailed,
  FetchMeals,
  FetchMealsSuccess,
  FetchProviderOfIds,
  FetchProviderOfIdsSuccess,
  FetchProviderOfIdsFailure,
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

export type FetchMealState = {
  message: string;
  isRequest: boolean;
  meals: Meal[];
  hasPrevious: boolean;
  hasNext: boolean;
  totalPage: number;
  totalCount: number;
  page: number;
  providers: Provider[];
};

export const initialFetchMealsState: FetchMealState = {
  message: '',
  isRequest: false,
  meals: [],
  hasPrevious: false,
  hasNext: false,
  totalCount: 0,
  totalPage: 0,
  page: 1,
  providers: [],
};

export const fetchMealsReducer = createReducer(initialFetchMealsState, {
  FetchMeals: (state, action: FetchMeals) => {
    return {
      ...state,
      isRequest: true,
    };
  },

  FetchMealsSuccess: (
    state,
    { meals, hasPrevious, hasNext, totalPage, totalCount }: FetchMealsSuccess,
  ) => {
    return {
      ...state,
      meals,
      hasPrevious,
      hasNext,
      totalPage,
      totalCount,
      isRequest: false,
      message: '',
    };
  },

  FetchMealsFailed: (state, { message }: FetchMealsFailed) => {
    return {
      ...state,
      isRequest: false,
      message,
    };
  },

  FetchProviderOfIds: (state, action: FetchProviderOfIds) => {
    return {
      ...state,
      isRequest: true,
    };
  },

  FetchProviderOfIdsSuccess: (
    state,
    { providers }: FetchProviderOfIdsSuccess,
  ) => {
    return {
      ...state,
      isRequest: false,
      providers,
    };
  },

  FetchProvidersOfIdsFailure: (
    state,
    { message }: FetchProviderOfIdsFailure,
  ) => {
    return {
      ...state,
      isRequest: false,
      message,
    };
  },
});
