import { Provider } from 'store/model/provider';
import { ProviderState } from 'store/provider/reducer';
import { createReducer } from '@reduxjs/toolkit';
import {
  FetchProviderByPartialName,
  FetchProviderByPartialNameSuccess,
  FetchProviderByPartialNameFailure,
} from './action';

export type FetchProviderByPartialNameState = {
  isRequest: boolean;
  providers: Provider[];
  hasPrevious: boolean;
  hasNext: boolean;
  message: string;
  page: number;
  totalCount: number;
};

const initState: ProviderState = {
  isRequest: false,
  providers: [],
  hasPrevious: false,
  hasNext: false,
  message: '',
  page: 1,
  totalCount: 0,
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
    {
      providers,
      hasPrevious,
      hasNext,
      page,
      totalPage,
      totalCount,
    }: FetchProviderByPartialNameSuccess,
  ) => {
    return {
      ...state,
      isRequest: false,
      message: '',
      providers,
      hasPrevious,
      hasNext,
      page,
      totalPage,
      totalCount,
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
