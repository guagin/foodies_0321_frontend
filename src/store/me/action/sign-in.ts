import { Action, ActionCreator } from '@reduxjs/toolkit';
import { ResponseStatus } from '../reducer';

export interface RequestSignIn extends Action<'RequestSignIn'> {
  name: string;
  password: string;
}

export interface ReceiveSignInResponse extends Action<'ReceiveSignInResponse'> {
  token: string;
  name: string;
  email: string;
}

export interface SignInFailed extends Action<'SignInFailed'> {
  status: ResponseStatus;
}

export interface SignInSucceed extends Action<'SignInSucceed'> {
  id: string;
  status: ResponseStatus;
}

export const RequestSignInActionCreator: ActionCreator<RequestSignIn> = (input: {
  name: string;
  password: string;
}) => {
  return {
    ...input,
    type: 'RequestSignIn',
  };
};
