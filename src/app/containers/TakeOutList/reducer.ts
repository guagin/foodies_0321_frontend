import { TakeOut } from './take-out';
import { createReducer } from '@reduxjs/toolkit';
import {
  FetchTakeOut,
  FetchTakeOutSuccess,
  FetchTakeOutFailed,
} from './action';

export interface FetchTakeOutState {
  isRequest: boolean;
  message: string;
  takeOuts: TakeOut[];
  hasPrevious: boolean;
  hasNext: boolean;
  totalPages: number;
  page: number;
  totalCount: number;
}

export const initFetchTakeOutState: FetchTakeOutState = {
  isRequest: false,
  message: '',
  takeOuts: [],
  hasPrevious: false,
  hasNext: false,
  totalPages: 0,
  totalCount: 0,
  page: 0,
};

export const fetchTakeOutReducer = createReducer(initFetchTakeOutState, {
  FetchTakeOut: (state, action: FetchTakeOut) => {
    return {
      ...state,
      isRequest: true,
      message: '',
    };
  },
  FetchTakeOutSuccess: (
    state,
    {
      takeOuts,
      hasPrevious,
      hasNext,
      totalPages,
      totalCount,
      page,
    }: FetchTakeOutSuccess,
  ) => {
    return {
      ...state,
      isRequest: false,
      message: '',
      takeOuts,
      hasPrevious,
      hasNext,
      totalPages,
      totalCount,
      page,
    };
  },
  FetchTakeOutFailed: (state, { message }: FetchTakeOutFailed) => {
    return {
      ...state,
      isRequest: false,
      message,
    };
  },
});
