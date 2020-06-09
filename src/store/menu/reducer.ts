import {
  FetchMeals,
  FetchMealsSuccess,
  FetchMealsFailure,
} from './action/fetch-meals';
import { createReducer } from '@reduxjs/toolkit';

export interface Meal {
  id: string;
  name: string;
  description: string;
  price: number;
  provider: string;
  createdBy: string;
}

export type MenuState = {
  isRequest: boolean;
  meals: Meal[];
  hasPrevious: boolean;
  hasNext: boolean;
  message: string;
  page: number;
  totalCount: number;
};

const initState: MenuState = {
  isRequest: false,
  meals: [],
  hasPrevious: false,
  hasNext: false,
  message: '',
  page: 1,
  totalCount: 0,
};

export const menuReducer = createReducer(initState, {
  FetchMeals: (state, action: FetchMeals) => {
    return {
      ...state,
      isRequest: true,
    };
  },
  FetchMealsSuccess: (
    state,
    { meals, hasNext, hasPrevious, page, totalCount }: FetchMealsSuccess,
  ) => {
    return {
      ...state,
      meals,
      hasNext,
      hasPrevious,
      isRequest: false,
      page,
      totalCount,
    };
  },
  FetchMealsFailure: (state, { message }: FetchMealsFailure) => {
    return {
      ...state,
      isRequest: false,
      message,
    };
  },
});
