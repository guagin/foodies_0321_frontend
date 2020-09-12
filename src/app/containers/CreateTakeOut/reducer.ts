import { createReducer } from '@reduxjs/toolkit';
import {
  CreateTakeOut,
  CreateTakeOutSuccess,
  CreateTakeOutFailed,
  PickProvider,
  FetchProvidersByPartialName,
  FetchProvidersByPartialNameSuccess,
  FetchProvidersByPartialNameFailed,
} from './action';
import { Provider } from 'store/model/provider';

export type CreateTakeOutState = {
  isRequest: boolean;
  message: string;
  providerId: string;
  providers: Provider[];
};

export const initCreateTakeOutState: CreateTakeOutState = {
  isRequest: false,
  message: '',
  providerId: '',
  providers: [],
};

export const createTakeOutReducer = createReducer(initCreateTakeOutState, {
  FetchProvidersByPartialName: (state, action: FetchProvidersByPartialName) => {
    return {
      ...state,
      isRequest: false,
      message: '',
    };
  },

  FetchProvidersByPartialNameSuccess: (
    state,
    { providers }: FetchProvidersByPartialNameSuccess,
  ) => {
    return {
      ...state,
      isRequest: false,
      message: '',
    };
  },

  FetchProvidersByPartialNameFailed: (
    state,
    { message }: FetchProvidersByPartialNameFailed,
  ) => {
    return {
      ...state,
      isRequest: false,
      message,
    };
  },

  PickProvider: (state, { providerId }: PickProvider) => {
    return {
      ...state,
      isReqeust: false,
      message: '',
      providerId,
    };
  },
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
