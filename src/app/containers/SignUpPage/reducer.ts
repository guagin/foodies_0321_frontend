import { createReducer } from '@reduxjs/toolkit';
import { SignUpFailed, SignUp, SignUpSuccess } from './action';

export type SignUpState = {
  isRequest: boolean;
  name: string;
  password: string;
  email: string;
  id: string;
};

export const initState: SignUpState = {
  name: '',
  password: '',
  email: '',
  id: '',
  isRequest: false,
};

export const signUpReducer = createReducer(initState, {
  SignUp: (state, action: SignUp) => {
    return {
      ...state,
      isRequest: true,
    };
  },

  SignUpSuccess: (state, { id }: SignUpSuccess) => {
    return {
      ...state,
      isRequest: false,
      id,
    };
  },

  SignUpFailed: (state, { message }: SignUpFailed) => {
    return {
      ...state,
      isRequest: false,
      message,
    };
  },
});
