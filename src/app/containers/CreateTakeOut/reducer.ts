import { createReducer } from '@reduxjs/toolkit';
import {
  CreateTakeOut,
  CreateTakeOutSuccess,
  CreateTakeOutFailed,
} from './action';

export type CreateTakeOutState = {
  isRequest: boolean;
  message: string;
};

export const initState: CreateTakeOutState = {
  isRequest: false,
  message: '',
};

export const createTakeOutReducer = createReducer(initState, {
  CreateTake: (state, action: CreateTakeOut) => {
    return {
      ...state,
      isRequest: true,
      message: '',
    };
  },

  CreateTakeOutSuccess: (state, action: CreateTakeOutSuccess) => {
    return {
      ...state,
      isRequest: false,
      message: '',
    };
  },

  CreateTakeOutFailed: (state, { message }: CreateTakeOutFailed) => {
    return {
      ...state,
      isRequest: false,
      message,
    };
  },
});
