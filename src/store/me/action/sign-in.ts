import { Action, ActionCreator } from '@reduxjs/toolkit';

export interface SignIn extends Action<'SignIn'> {
  name: string;
  password: string;
}

export const SignInActionCreator: ActionCreator<SignIn> = (input: {
  name: string;
  password: string;
}) => {
  return {
    type: 'SignIn',
    ...input,
  };
};
