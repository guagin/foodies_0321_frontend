import { createReducer } from '@reduxjs/toolkit';
import { FetchMe, FetchMeSuccess, FetchMeFailure } from './action/fetch-me';

export type MeState = {
  name: string;
  id: string;
  email: string;
  token: string;
  isRequest: boolean;
  message: string;
};

const initialState: MeState = {
  name: '',
  id: '',
  email: '',
  token: '',
  isRequest: false,
  message: '',
};

export const meReducer = createReducer(initialState, {
  FetchMe: (state, { token }: FetchMe) => {
    return {
      ...state,
      token,
      isRequest: true,
    };
  },
  FetchMeSuccess: (state, action: FetchMeSuccess) => {
    return {
      ...state,
      isRequest: false,
      id: action.id,
      name: action.name,
      email: action.email,
    };
  },
  FetchMeFailure: (state, action: FetchMeFailure) => {
    return {
      ...state,
      isRequest: false,
      message: action.message,
    };
  },
});
