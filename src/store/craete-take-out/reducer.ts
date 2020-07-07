import { createReducer } from '@reduxjs/toolkit';
import {
  CreateTakeOut,
  CreateTakeOutSuccess,
  CreateTakeOutFailure,
} from './action';

export type CreateTakeOutState = {
  isRequest: boolean;
  message: string;
  createdTakeOut?: {
    title: string;
    description: string;
    startedAt: Date;
    endAt: Date;
    enabled: boolean;
  };
};

const initState: CreateTakeOutState = {
  isRequest: false,
  message: '',
};

export const createTakeOutReducer = createReducer(initState, {
  CreateTakeOut: (state, action: CreateTakeOut) => {
    return {
      ...state,
      isRequest: true,
      message: '',
    };
  },

  CreateTakeOutSuccess: (
    state,
    { title, description, startedAt, endAt, enabled }: CreateTakeOutSuccess,
  ) => {
    return {
      ...state,
      isRequest: false,
      createdTakeOut: {
        title,
        description,
        startedAt,
        endAt,
        enabled,
      },
      message: '',
    };
  },

  CreateTakeOutFailure: (state, { message }: CreateTakeOutFailure) => {
    return {
      ...state,
      message,
      isRequest: false,
    };
  },
});
