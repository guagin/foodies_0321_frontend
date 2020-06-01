import { Action, ActionCreator } from '@reduxjs/toolkit';

export interface SignUp extends Action<'SignUp'> {
  name: string;
  password: string;
  email: string;
}

export interface SignUpSuccess extends Action<'SignUpSuccess'> {
  id: string;
}

export interface SignUpFailure extends Action<'SignUpFailure'> {
  msg: string;
}

export type SignUpResponseActions = SignUp | SignUpSuccess | SignUpFailure;

export const SignUpCreator: ActionCreator<SignUp> = (input: {
  name: string;
  password: string;
  email: string;
}) => ({
  type: 'SignUp',
  ...input,
});

export const SignUpSuccessCreator: ActionCreator<SignUpSuccess> = (input: {
  id: string;
}) => ({
  type: 'SignUpSuccess',
  ...input,
});

export const SignUpFailureCreator: ActionCreator<SignUpFailure> = (input: {
  msg: string;
}) => ({
  type: 'SignUpFailure',
  ...input,
});
