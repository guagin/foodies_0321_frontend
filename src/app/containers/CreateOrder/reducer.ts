import { TakeOut } from '../TakeOutList/take-out';
import { createReducer } from '@reduxjs/toolkit';
import {
  FetchTakeOutByPartialTitleSuccess,
  FetchTakeOutByPartialTitleFailed,
} from './action';

export type FetchTakeOutByPartialTitleState = {
  isRequest: boolean;
  takeOuts: TakeOut[];
  message: string;
};

export const initFetchTakeOutByPartialTitle: FetchTakeOutByPartialTitleState = {
  isRequest: false,
  takeOuts: [],
  message: '',
};

export const fetchTakeOutByPartialTitleReducer = createReducer(
  initFetchTakeOutByPartialTitle,
  {
    FetchTakeOutByPartialTitle: (
      state,
      action: FetchTakeOutByPartialTitleState,
    ) => {
      return {
        ...state,
        isRequest: true,
        message: '',
      };
    },

    FetchTakeOutByPartialTitleSuccess: (
      state,
      { takeOuts }: FetchTakeOutByPartialTitleSuccess,
    ) => {
      return {
        ...state,
        isRequest: false,
        message: '',
        takeOuts,
      };
    },

    FetchTakeOutByPartialTitleFailed: (
      state,
      { message }: FetchTakeOutByPartialTitleFailed,
    ) => {
      return {
        ...state,
        isRequest: false,
        message,
      };
    },
  },
);
