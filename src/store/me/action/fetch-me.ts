import { Action, ActionCreator } from '@reduxjs/toolkit';

export interface FetchMe extends Action<'FetchMe'> {
  token: string;
}

export interface FetchMeSuccess extends Action<'FetchMeSuccess'> {
  name: string;
  email: string;
}

export interface FetchMeFailure extends Action<'FetchMeFailure'> {
  message: string;
}

export const FetchMeCreator: ActionCreator<FetchMe> = (input: {
  token: string;
}) => {
  return {
    ...input,
    type: 'FetchMe',
  };
};

export const FetchMeSuccessCreator: ActionCreator<FetchMeSuccess> = (input: {
  name: string;
  email: string;
}) => {
  return {
    ...input,
    type: 'FetchMeSuccess',
  };
};

export const FetchMeFailureCreator: ActionCreator<FetchMeFailure> = (input: {
  message: string;
}) => {
  return {
    ...input,
    type: 'FetchMeFailure',
  };
};
