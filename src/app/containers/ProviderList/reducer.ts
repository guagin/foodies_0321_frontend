import { createReducer } from '@reduxjs/toolkit';
import {
  FetchProviderOfPage,
  FetchProviderOfPageFailure,
  FetchProviderOfPageSuccess,
} from './action';

export interface Provider {
  id: string;
  name: string;
  description: string;
  phone: number;
  createdBy: string;
}

export type ProviderListState = {
  isRequest: boolean;
  providers: Provider[];
  hasPrevious: boolean;
  hasNext: boolean;
  message: string;
  page: number;
  totalCount: number;
  totalPages: number;
};

export const initProviderListState: ProviderListState = {
  isRequest: false,
  providers: [],
  hasPrevious: false,
  hasNext: false,
  message: '',
  page: 1,
  totalCount: 0,
  totalPages: 0,
};

export const providerListReducer = createReducer(initProviderListState, {
  FetchProviderOfPage: (state, action: FetchProviderOfPage) => {
    return {
      ...state,
      isRequest: true,
    };
  },

  FetchProviderOfPageSuccess: (
    state,
    {
      providers,
      totalCount,
      totalPage,
      page,
      hasNext,
      hasPrevious,
    }: FetchProviderOfPageSuccess,
  ) => {
    return {
      ...state,
      isRequest: false,
      providers,
      totalCount,
      totalPage,
      hasNext,
      hasPrevious,
    };
  },

  FetchProviderOfPageFailure: (
    state,
    { message }: FetchProviderOfPageFailure,
  ) => {
    return {
      ...state,
      isRequest: false,
      message,
    };
  },
});
