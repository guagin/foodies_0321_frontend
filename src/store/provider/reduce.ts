import { createReducer } from '@reduxjs/toolkit';
import {
  FetchProvider,
  FetchProviderSuccess,
  FetchProviderFailure,
} from './action/fetch-provider';

export interface Provider {
  id: string;
  name: string;
  description: string;
  phone: number;
  provider: string;
  createdBy: string;
}

export type ProviderState = {
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

export const providerReducer = createReducer(initState, {
  FetchProvider: (state, action: FetchProvider) => {
    return {
      ...state,
      isRequest: true,
    };
  },
  FetchProviderSuccess: (
    state,
    {
      providers,
      hasPrevious,
      hasNext,
      page,
      totalPage,
      totalCount,
    }: FetchProviderSuccess,
  ) => {
    return {
      ...state,
      isRequest: false,
      providers,
      hasPrevious,
      hasNext,
      page,
      totalPage,
      totalCount,
    };
  },
  FetchProviderFailure: (state, { message }: FetchProviderFailure) => {
    return {
      ...state,
      isRequest: false,
      message,
    };
  },
});
