import { createReducer } from '@reduxjs/toolkit';
import {
  SignUp,
  SignUpSuccess,
  SignUpFailure,
  SignIn,
  SignInFailure,
  SignInSuccess,
} from './action';

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
  SignUp: (state, action: SignUp) => {
    return {
      ...state,
      isRequest: true,
    };
  },
  SignUpSuccess: (state, action: SignUpSuccess) => {
    return {
      ...state,
      isRequest: false,
    };
  },
  SignUpFailure: (state, action: SignUpFailure) => {
    const { message } = action;
    return {
      ...state,
      isRequest: false,
      message,
    };
  },
  SignIn: (state, action: SignIn) => {
    return {
      ...state,
      isRequest: true,
    };
  },
  SignInSuccess: (state, action: SignInSuccess) => {
    return {
      ...state,
      isRequest: false,
      token: action.token,
    };
  },
  SignInFailure: (state, action: SignInFailure) => {
    return {
      ...state,
      isRequest: false,
      message: action.message,
    };
  },
});
