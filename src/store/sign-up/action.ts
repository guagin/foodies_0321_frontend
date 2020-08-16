import { Action, ActionCreator } from '@reduxjs/toolkit';

export interface SignUp extends Action<'SignUp'> {
  name: string;
  password: string;
  email: string;
}

export interface SignUpSuccess extends Action<'SignUpSuccess'> {
  id: string;
}

export interface SignUpFailed extends Action<'SignUpFailed'> {
  message: string;
}

export type SignUpActions = SignUp | SignUpSuccess | SignUpFailed;

export const SignUpCreator: ActionCreator<SignUp> = input => ({
  type: 'Signup',
  ...input,
});

export const SignUpSuccessCreator: ActionCreator<SignUpSuccess> = input => ({
  type: 'SignUpSuccess',
  ...input,
});

export const SignUpFailedCreator: ActionCreator<SignUpFailed> = input => ({
  type: 'SignUpFailed',
  ...input,
});
