import { Action, ActionCreator } from '@reduxjs/toolkit';
import {
  SIGN_IN,
  SIGN_IN_FAILURE,
  SIGN_IN_SUCCESS,
  SIGN_IN_BY_TOKEN,
  SIGN_OUT,
} from './constants';

export interface SignIn extends Action<typeof SIGN_IN> {
  name: string;
  password: string;
  from: { pathname: string };
}

export const signIn: ActionCreator<SignIn> = (input: {
  name: string;
  password: string;
  from: { pathname: string };
}) => {
  return {
    ...input,
    type: SIGN_IN,
  };
};

export interface SignInFailure extends Action<typeof SIGN_IN_FAILURE> {
  message: string;
}

export const signInFailure: ActionCreator<SignInFailure> = (input: {
  message: string;
}) => {
  return {
    ...input,
    type: SIGN_IN_FAILURE,
  };
};

export interface SignInSuccess extends Action<typeof SIGN_IN_SUCCESS> {
  token: string;
}

export const signInSuccess: ActionCreator<SignInSuccess> = (input: {
  token: string;
}) => {
  return {
    ...input,
    type: SIGN_IN_SUCCESS,
  };
};

export interface SignInByToken extends Action<typeof SIGN_IN_BY_TOKEN> {
  token: string;
  from: { pathname: string };
}

export const signInByToken: ActionCreator<SignInByToken> = (
  input: SignInByToken,
) => {
  return {
    ...input,
    type: SIGN_IN_BY_TOKEN,
  };
};

export interface SignOut extends Action<typeof SIGN_OUT> {}

export const signOut: ActionCreator<SignOut> = () => ({
  type: SIGN_OUT,
});
