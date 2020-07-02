import { createReducer } from '@reduxjs/toolkit';
import {
  FetchTakeOutOfPage,
  FetchTakeOutOfPageSuccess,
  FetchTakeOutOfPageFailure,
} from './action';

export interface TakeOut {
  id: string;
  title: string;
  createdBy: string;
  description: string;
  startedAt: Date;
  endAt: Date;
  enabled: boolean;
}

export type TakeOutOfPageState = {
  isRequest: boolean;
  takeOuts: TakeOut[];
  hasPrevious: boolean;
  hasNext: boolean;
  message: string;
  page: number;
  totalCount: number;
  totalPage: number;
};

const initState: TakeOutOfPageState = {
  isRequest: false,
  takeOuts: [],
  hasNext: false,
  hasPrevious: false,
  message: '',
  page: 1,
  totalCount: 0,
  totalPage: 0,
};

export const takeOutOfPageReducer = createReducer(initState, {
  FetchTakeOutOfPage: (state, action: FetchTakeOutOfPage) => {
    return {
      ...state,
      isRequest: true,
    };
  },

  FetchTakeOutOfPageSuccess: (
    state,
    {
      takeOuts,
      hasPrevious,
      hasNext,
      page,
      totalCount,
      totalPage,
    }: FetchTakeOutOfPageSuccess,
  ) => {
    return {
      ...state,
      message: '',
      isRequest: false,
      takeOuts,
      hasPrevious,
      page,
      totalCount,
      totalPage,
    };
  },

  FetchTakeOutOfPageFailure: (state, action: FetchTakeOutOfPageFailure) => {
    return {
      ...state,
      isRequest: false,
      message: '',
    };
  },
});
