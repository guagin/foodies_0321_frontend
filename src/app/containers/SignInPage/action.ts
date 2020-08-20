import { Action, ActionCreator } from '@reduxjs/toolkit';

export interface SignIn extends Action<'SignIn'> {
  name: string;
  password: string;
  from: { pathname: string };
}

export interface SignInFailed extends Action<'SignInFailed'> {
  message: string;
}

export interface SignInSuccess extends Action<'SignInSuccess'> {
  token: string;
}

export type SignInAction = SignIn | SignInFailed | SignInSuccess;

export const SignInCreator: ActionCreator<SignIn> = (input: {
  name: string;
  password: string;
  from: { pathname: string };
}) => {
  return {
    ...input,
    type: 'SignIn',
  };
};

export const SignInFailedCreator: ActionCreator<SignInFailed> = (input: {
  message: string;
}) => {
  return {
    ...input,
    type: 'SignInFailed',
  };
};

export const SignInSuccessCreator: ActionCreator<SignInSuccess> = (input: {
  token: string;
}) => {
  return {
    ...input,
    type: 'SignInSuccess',
  };
};
