import { Action, ActionCreator } from '@reduxjs/toolkit';
import { Takeout } from './take-out';
import {
  FETCH_TAKEOUT,
  FETCH_TAKEOUT_SUCCESS,
  FETCH_TAKEOUT_FAILURE,
  FETCH_USERS,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
} from './constants';

import { User } from './reducer';

export interface FetchTakeout extends Action<typeof FETCH_TAKEOUT> {
  token: string;
  page: number;
  count: number;
}

export const fetchTakeout: ActionCreator<FetchTakeout> = (
  input: FetchTakeout,
) => ({
  ...input,
  type: FETCH_TAKEOUT,
});

export interface FetchTakeoutSuccess
  extends Action<typeof FETCH_TAKEOUT_SUCCESS> {
  takeOuts: Takeout[];
  page: number;
  totalPages: number;
  totalCount: number;
  hasPrevious: boolean;
  hasNext: boolean;
}

export const fetchTakeoutSuccess: ActionCreator<FetchTakeoutSuccess> = (
  input: FetchTakeoutSuccess,
) => ({
  ...input,
  type: FETCH_TAKEOUT_SUCCESS,
});

export interface FetchTakeoutFailure
  extends Action<typeof FETCH_TAKEOUT_FAILURE> {
  message: string;
}

export const fetchTakeoutFailure: ActionCreator<FetchTakeoutFailure> = (
  input: FetchTakeoutFailure,
) => ({
  ...input,
  type: FETCH_TAKEOUT_FAILURE,
});

export interface FetchUsers extends Action<typeof FETCH_USERS> {
  token: string;
  userIds: string[];
}

export const fetchUsers: ActionCreator<FetchUsers> = (input: FetchUsers) => ({
  ...input,
  type: FETCH_USERS,
});

export interface FetchUsersSuccess extends Action<typeof FETCH_USERS_SUCCESS> {
  users: User[];
}

export const fetchUsersSuccess: ActionCreator<FetchUsersSuccess> = (
  input: FetchUsersSuccess,
) => ({
  ...input,
  type: FETCH_USERS_SUCCESS,
});

export interface FetchUsersFailure extends Action<typeof FETCH_USERS_FAILURE> {
  message: string;
}

export const fetchUsersFailure: ActionCreator<FetchUsersFailure> = (
  input: FetchUsersFailure,
) => ({
  ...input,
  type: FETCH_USERS_FAILURE,
});
