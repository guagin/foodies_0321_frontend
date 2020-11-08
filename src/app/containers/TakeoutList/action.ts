import {
  Action,
  ActionCreator,
} from 'app/containers/TakeoutList/node_modules/@reduxjs/toolkit';
import { Takeout } from './take-out';
import {
  FETCH_TAKEOUT,
  FETCH_TAKEOUT_SUCCESS,
  FETCH_TAKEOUT_FAILURE,
} from './constants';

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
