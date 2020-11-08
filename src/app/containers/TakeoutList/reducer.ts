import { Takeout } from './take-out';
import { createReducer } from '@reduxjs/toolkit';
import {
  FetchTakeout,
  FetchTakeoutSuccess,
  FetchTakeoutFailure,
} from './action';

export interface FetchTakeOutState {
  isRequest: boolean;
  message: string;
  takeOuts: Takeout[];
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
  FetchTakeOut: (state, action: FetchTakeout) => {
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
    }: FetchTakeoutSuccess,
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
  FetchTakeOutFailed: (state, { message }: FetchTakeoutFailure) => {
    return {
      ...state,
      isRequest: false,
      message,
    };
  },
});
