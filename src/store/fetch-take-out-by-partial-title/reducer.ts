import { TakeOut } from 'store/take-out-of-page/reducer';
import { createReducer } from '@reduxjs/toolkit';
import {
  FetchTakeOutByPartialTitleSuccess,
  FetchTakeOutByPartialTitleFailure,
} from './action';

export type FetchTakeOutByPartialTitleState = {
  isRequest: boolean;
  takeOuts: TakeOut[];
  message: string;
};

const initState: FetchTakeOutByPartialTitleState = {
  isRequest: false,
  takeOuts: [],
  message: 'string',
};

export const fetchTakeOutByPartialTitleReducer = createReducer(initState, {
  FetchTakeOutByPartialTitle: state => {
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
      takeOuts,
      message: '',
    };
  },

  FetchTakeOutByPartialTitleFailure: (
    state,
    { message }: FetchTakeOutByPartialTitleFailure,
  ) => {
    return {
      ...state,
      isRequest: false,
      message,
    };
  },
});