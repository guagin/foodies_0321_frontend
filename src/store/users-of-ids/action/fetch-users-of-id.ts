import { Action, ActionCreator } from '@reduxjs/toolkit';
import { User } from '../reducer';

export interface FetchUserOfIds extends Action<'FetchUserOfIds'> {
  token: string;
  ids: string[];
}

export interface FetchUserOfIdsSuccess extends Action<'FetchUserOfIdsSuccess'> {
  users: User[];
}

export interface FetchUserOfIdsFailure extends Action<'FetchUserOfIdsFailure'> {
  message: string;
}

export type FetchUsersOfIdAction =
  | FetchUserOfIds
  | FetchUserOfIdsSuccess
  | FetchUserOfIdsFailure;

export const fetchUserOfIdsCreator: ActionCreator<FetchUserOfIds> = ({
  token,
  ids,
}: {
  token: string;
  ids: string[];
}) => {
  return {
    type: 'FetchUserOfIds',
    token,
    ids,
  };
};

export const fetchUserOfIdsSuccessCreator: ActionCreator<FetchUserOfIdsSuccess> = ({
  users,
}: {
  users: User[];
}) => {
  return {
    type: 'FetchUserOfIdsSuccess',
    users,
  };
};

export const fetchUserOfIdsFailureCreator: ActionCreator<FetchUserOfIdsFailure> = ({
  message,
}: {
  message: string;
}) => {
  return {
    type: 'FetchUserOfIdsFailure',
    message,
  };
};
