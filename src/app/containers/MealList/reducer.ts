import { createReducer } from '@reduxjs/toolkit';
import { FetchMealsFailed, FetchMeals, FetchMealsSuccess } from './action';
import { Meal } from './meal';

export type FetchMealState = {
  message: string;
  isRequest: boolean;
  meals: Meal[];
  hasPrevious: boolean;
  hasNext: boolean;
  totalPage: number;
  totalCount: number;
  page: number;
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
});
