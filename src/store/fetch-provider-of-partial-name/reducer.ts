import { Provider } from 'store/model/provider';
import { createReducer } from '@reduxjs/toolkit';
import {
  FetchProviderByPartialName,
  FetchProviderByPartialNameSuccess,
  FetchProviderByPartialNameFailure,
} from './action';

export type FetchProviderByPartialNameState = {
  isRequest: boolean;
  providers: Provider[];
  message: string;
};

const initState: FetchProviderByPartialNameState = {
  isRequest: false,
  providers: [],
  message: '',
};

export const fetchProviderByPartialNameReducer = createReducer(initState, {
  FetchProviderByPartialName: (state, action: FetchProviderByPartialName) => {
    return {
      ...state,
      isRequest: true,
      mesage: '',
    };
  },
  FetchProviderByPartialNameSuccess: (
    state,
    { providers }: FetchProviderByPartialNameSuccess,
  ) => {
    return {
      ...state,
      isRequest: false,
      message: '',
      providers,
    };
  },

  FetchProviderByPartialNameFailure: (
    state,
    { message }: FetchProviderByPartialNameFailure,
  ) => {
    return {
      ...state,
      isRequest: false,
      message,
    };
  },
});
