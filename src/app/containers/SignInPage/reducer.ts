import { createReducer } from '@reduxjs/toolkit';
import { SignInSuccess, SignInFailure } from './action';
import { SIGN_IN, SIGN_IN_SUCCESS, SIGN_IN_FAILURE } from './constants';

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
  [SIGN_IN]: state => {
    return {
      ...state,
      isRequest: true,
    };
  },

  [SIGN_IN_SUCCESS]: (state, { token }: SignInSuccess) => {
    return {
      ...state,
      isRequest: false,
      token,
    };
  },

  [SIGN_IN_FAILURE]: (state, { message }: SignInFailure) => {
    return {
      ...state,
      isRequest: false,
      message,
    };
  },
});
