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
import {
  CREATE_TAKEOUT,
  CREATE_TAKEOUT_FAILURE,
  CREATE_TAKEOUT_SUCCESS,
  FETCH_PROVIDER_BY_PARTIALNAME,
  FETCH_PROVIDER_BY_PARTIALNAME_FAILURE,
  FETCH_PROVIDER_BY_PARTIALNAME_SUCCESS,
  PICK_PROVIDER,
} from './constants';

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
  [FETCH_PROVIDER_BY_PARTIALNAME]: (
    state,
    action: FetchProvidersByPartialName,
  ) => {
    return {
      ...state,
      isRequest: true,
      message: '',
    };
  },

  [FETCH_PROVIDER_BY_PARTIALNAME_SUCCESS]: (
    state,
    { providers }: FetchProvidersByPartialNameSuccess,
  ) => {
    return {
      ...state,
      isRequest: false,
      message: '',
      providers,
    };
  },

  [FETCH_PROVIDER_BY_PARTIALNAME_FAILURE]: (
    state,
    { message }: FetchProvidersByPartialNameFailed,
  ) => {
    return {
      ...state,
      isRequest: false,
      message,
    };
  },

  [PICK_PROVIDER]: (state, { providerId }: PickProvider) => {
    return {
      ...state,
      isReqeust: false,
      message: '',
      providerId,
    };
  },

  [CREATE_TAKEOUT]: (state, action: CreateTakeOut) => {
    return {
      ...state,
      isRequest: true,
      message: '',
    };
  },

  [CREATE_TAKEOUT_SUCCESS]: (state, action: CreateTakeOutSuccess) => {
    return {
      ...state,
      isRequest: false,
      message: '',
    };
  },

  [CREATE_TAKEOUT_FAILURE]: (state, { message }: CreateTakeOutFailed) => {
    return {
      ...state,
      isRequest: false,
      message,
    };
  },
});
