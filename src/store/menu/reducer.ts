import {
  FetchMeals,
  FetchMealSuccess,
  FetchMealFailure,
} from './action/fetch-meal';
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
};

const initState: MenuState = {
  isRequest: false,
  meals: [],
  hasPrevious: false,
  hasNext: false,
  message: '',
};

export const menuReducer = createReducer(initState, {
  FetchMeal: (state, action: FetchMeals) => {
    return {
      ...state,
      isRequest: true,
    };
  },
  FetchMealSuccess: (
    state,
    { meals, hasNext, hasPrevious }: FetchMealSuccess,
  ) => {
    return {
      ...state,
      meals,
      hasNext,
      hasPrevious,
      isRequest: false,
    };
  },
  FetchMealFailure: (state, { message }: FetchMealFailure) => {
    return {
      ...state,
      isRequest: false,
      message,
    };
  },
});
