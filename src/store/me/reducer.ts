import { createReducer, Reducer } from '@reduxjs/toolkit';
import {
  RequestSignUp,
  ReceiveSignUpResponse,
  ReceiveSignUpSucceedResponseCreator,
  ResponseStatus,
  ReceiveSignUpFailedResponse,
  ReceiveSignUpFailedResponseCreator,
  ReceiveSignUpSucceedResponse,
} from './action';

export type MeState = {
  name: string;
  id: string;
  email: string;
  token: string;
  isRequest: boolean;
  status?: ResponseStatus;
};

const initialState: MeState = {
  name: '',
  id: '',
  email: '',
  token: '',
  isRequest: false,
};

const signupResponseReducer: Reducer<
  MeState,
  ReceiveSignUpSucceedResponse | ReceiveSignUpFailedResponse
> = (state = initialState, action) => {
  switch (action.type) {
    case 'ReceiveSignUpSucceedResponse':
      return {
        ...state,
        email: action.email,
        name: action.name,
        status: {
          ...action.status,
        },
      };
    case 'ReceiveSignUpFailedResponse':
      return {
        ...state,
        status: {
          ...action.status,
        },
      };
  }
};

export const meReducer = createReducer(initialState, {
  RequestSignUp: (state, action: RequestSignUp) => {
    return {
      ...state,
      isRequest: true,
    };
  },
  ReceiveSignUpResponse: (state, action: ReceiveSignUpResponse) => {
    if (action.status.code === 'SUCCESS') {
      return signupResponseReducer(
        state,
        ReceiveSignUpSucceedResponseCreator(action),
      );
    }
    return signupResponseReducer(
      state,
      ReceiveSignUpFailedResponseCreator(action),
    );
  },
});
