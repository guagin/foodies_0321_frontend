import { Takeout } from './take-out';
import { createReducer } from '@reduxjs/toolkit';
import {
  FetchTakeout,
  FetchTakeoutSuccess,
  FetchTakeoutFailure,
} from './action';
import {
  FETCH_TAKEOUT,
  FETCH_TAKEOUT_FAILURE,
  FETCH_TAKEOUT_SUCCESS,
} from './constants';

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
  [FETCH_TAKEOUT]: (state, action: FetchTakeout) => {
    return {
      ...state,
      isRequest: true,
      message: '',
    };
  },
  [FETCH_TAKEOUT_SUCCESS]: (
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
  [FETCH_TAKEOUT_FAILURE]: (state, { message }: FetchTakeoutFailure) => {
    return {
      ...state,
      isRequest: false,
      message,
    };
  },
});
