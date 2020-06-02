import { Action, ActionCreator } from '@reduxjs/toolkit';

export interface SignIn extends Action<'SignIn'> {
  name: string;
  password: string;
}

export interface SignInFailure extends Action<'SignInFailure'> {
  message: string;
}

export interface SignInSuccess extends Action<'SignInSuccess'> {
  token: string;
}

export const SignInCreator: ActionCreator<SignIn> = (input: {
  name: string;
  password: string;
}) => {
  return {
    ...input,
    type: 'SignIn',
  };
};

export const SignInFailureCreator: ActionCreator<SignInFailure> = (input: {
  message: string;
}) => {
  return {
    ...input,
    type: 'SignInFailure',
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
