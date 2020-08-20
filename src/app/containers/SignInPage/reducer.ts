import { createReducer } from '@reduxjs/toolkit';
import { SignIn, SignInSuccess, SignInFailed } from './action';

export type SignInState = {
  name: string;
  email: string;
  token: string;
  isRequest: boolean;
};

export const initState: SignInState = {
  name: '',
  email: '',
  token: '',
  isRequest: false,
};

export const signInReducer = createReducer(initState, {
  SignIn: (state, action: SignIn) => {
    return {
      ...state,
      isRequest: true,
    };
  },

  SignInSuccess: (state, { token }: SignInSuccess) => {
    return {
      ...state,
      isRequest: false,
      token,
    };
  },

  SignInFailed: (state, { message }: SignInFailed) => {
    return {
      ...state,
      isRequest: false,
      message,
    };
  },
});
