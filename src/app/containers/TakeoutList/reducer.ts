import { Takeout } from './take-out';
import { createReducer } from '@reduxjs/toolkit';
import {
  FetchTakeout,
  FetchTakeoutSuccess,
  FetchTakeoutFailure,
  FetchUsers,
  FetchUsersSuccess,
  FetchUsersFailure,
} from './action';
import {
  FETCH_TAKEOUT,
  FETCH_TAKEOUT_FAILURE,
  FETCH_TAKEOUT_SUCCESS,
  FETCH_USERS,
  FETCH_USERS_FAILURE,
  FETCH_USERS_SUCCESS,
} from './constants';

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface FetchTakeOutState {
  isRequest: boolean;
  message: string;
  takeOuts: Takeout[];
  hasPrevious: boolean;
  hasNext: boolean;
  totalPages: number;
  page: number;
  totalCount: number;
  users: User[];
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
  users: [],
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

  [FETCH_USERS]: (state, action: FetchUsers) => {
    return {
      ...state,
    };
  },
  [FETCH_USERS_SUCCESS]: (state, { users }: FetchUsersSuccess) => {
    return {
      ...state,
      users,
    };
  },
  [FETCH_USERS_FAILURE]: (state, { message }: FetchUsersFailure) => {
    return {
      ...state,
      message,
    };
  },
});
