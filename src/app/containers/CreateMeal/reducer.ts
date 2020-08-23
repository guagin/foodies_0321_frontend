import { createReducer } from '@reduxjs/toolkit';

import { CreateMealFailed, CreateMeal, CreateMealSuccess } from './action';

// TODO: maybe extract this to model
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
}

export const initCreateMealState: CreateMealState = {
  isRequest: false,
  id: '',
  message: '',
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
});
