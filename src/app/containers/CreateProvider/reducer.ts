import { createReducer } from '@reduxjs/toolkit';
import {
  CreateProvider,
  CreateProviderSuccess,
  CreateProviderFailed,
} from './action';

export interface CreateProviderState {
  isRequest: boolean;
  message: string;
}

export const initCreateProviderState: CreateProviderState = {
  isRequest: false,
  message: '',
};

export const createProviderReducer = createReducer(initCreateProviderState, {
  CreateProvider: (state, action: CreateProvider) => {
    return {
      ...state,
      isReqeust: true,
      message: '',
    };
  },

  CreateProviderSuccess: (state, action: CreateProviderSuccess) => {
    return {
      ...state,
      isRequest: false,
      message: '',
    };
  },

  CreateProviderFailed: (state, { message }: CreateProviderFailed) => {
    return {
      ...state,
      isReqeust: false,
      message,
    };
  },
});
