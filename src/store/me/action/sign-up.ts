import { Action, ActionCreator, ThunkAction, Dispatch } from '@reduxjs/toolkit';
import fetch from 'node-fetch';
export interface RequestSignUp extends Action<'RequestSignUp'> {
  name: string;
  password: string;
  email: string;
}

export interface ResponseStatus {
  code: 'SUCCESS' | 'FAILURE';
  msg: string;
}

export interface ReceiveSignUpResponse extends Action<'ReceiveSignUpResponse'> {
  name: string;
  email: string;
  status: ResponseStatus;
}

export interface ReceiveSignUpSucceedResponse
  extends Action<'ReceiveSignUpSucceedResponse'> {
  name: string;
  email: string;
  status: ResponseStatus;
}

export interface ReceiveSignUpFailedResponse
  extends Action<'ReceiveSignUpFailedResponse'> {
  name: string;
  email: string;
  status: ResponseStatus;
}

export type SignUpResponseActions =
  | ReceiveSignUpResponse
  | ReceiveSignUpSucceedResponse
  | ReceiveSignUpFailedResponse;

export const RequestSignUpActionCreator: ActionCreator<RequestSignUp> = (input: {
  name: string;
  password: string;
  email: string;
}) => {
  return {
    type: 'RequestSignUp',
    ...input,
  };
};

export const SignUpActionCreator: ActionCreator<ThunkAction<
  Promise<SignUpResponseActions>,
  { name: string; email: string; status: ResponseStatus },
  string,
  SignUpResponseActions
>> = (input: { name: string; password: string; email: string }) => {
  return async (dispatch: Dispatch) => {
    dispatch(RequestSignUpActionCreator(input));
    return fetch(`http://localhost:3000/authentication/user/register`, {
      method: 'POST',
      body: JSON.stringify(input),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(
        response => response.body,
        error => console.log(`An error occurred.`, error),
      )
      .then(json => {
        console.log('receive:', json);
        return dispatch(ReceiveSignUpResponseCreator(json));
      });
  };
};

export const ReceiveSignUpResponseCreator: ActionCreator<ReceiveSignUpResponse> = (input: {
  name: string;
  email: string;
  status: ResponseStatus;
}) => {
  return {
    type: 'ReceiveSignUpResponse',
    ...input,
  };
};

export const ReceiveSignUpSucceedResponseCreator: ActionCreator<ReceiveSignUpSucceedResponse> = (input: {
  name: string;
  email: string;
  status: ResponseStatus;
}) => {
  return {
    type: 'ReceiveSignUpSucceedResponse',
    ...input,
  };
};

export const ReceiveSignUpFailedResponseCreator: ActionCreator<ReceiveSignUpFailedResponse> = (input: {
  name: string;
  email: string;
  status: ResponseStatus;
}) => {
  return {
    type: 'ReceiveSignUpFailedResponse',
    ...input,
  };
};
