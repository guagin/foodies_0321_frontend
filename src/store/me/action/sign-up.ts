import { push } from 'connected-react-router';
import { Action, ActionCreator, ThunkAction, Dispatch } from '@reduxjs/toolkit';
import fetch from 'node-fetch';
export interface RequestSignUp extends Action<'RequestSignUp'> {
  name: string;
  password: string;
  email: string;
}

export interface ResponseStatus {
  code: 'SUCCESS' | 'ERROR';
  msg: string;
}

export interface ReceiveSignUpResponse extends Action<'ReceiveSignUpResponse'> {
  id: string;
  status: ResponseStatus;
}

export interface ReceiveSignUpSucceedResponse
  extends Action<'ReceiveSignUpSucceedResponse'> {
  id: string;
  status: ResponseStatus;
}

export interface ReceiveSignUpFailedResponse
  extends Action<'ReceiveSignUpFailedResponse'> {
  id: string;
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
    try {
      const response = await fetch(
        `http://localhost:3000/authentication/user/register`,
        {
          method: 'POST',
          body: JSON.stringify(input),
          headers: { 'Content-Type': 'application/json' },
        },
      );
      const data = await response.json();
      console.log('receive: ', data);
      dispatch(push('/'));
      return dispatch(ReceiveSignUpResponseCreator(data));
    } catch (error) {
      console.log(`An error occurred.`, error);
      return dispatch(
        ReceiveSignUpResponseCreator({
          status: {
            code: 'ERROR',
            msg: error.message,
          },
        }),
      );
    }
  };
};

export const ReceiveSignUpResponseCreator: ActionCreator<ReceiveSignUpResponse> = (input: {
  id: string;
  status: ResponseStatus;
}) => {
  return {
    type: 'ReceiveSignUpResponse',
    ...input,
  };
};

export const ReceiveSignUpSucceedResponseCreator: ActionCreator<ReceiveSignUpSucceedResponse> = (input: {
  id: string;
  status: ResponseStatus;
}) => {
  return {
    type: 'ReceiveSignUpSucceedResponse',
    ...input,
  };
};

export const ReceiveSignUpFailedResponseCreator: ActionCreator<ReceiveSignUpFailedResponse> = (input: {
  id: string;
  status: ResponseStatus;
}) => {
  return {
    type: 'ReceiveSignUpFailedResponse',
    ...input,
  };
};
