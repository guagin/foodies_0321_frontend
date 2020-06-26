import { createReducer } from '@reduxjs/toolkit';
import {
  FetchUserOfIds,
  FetchUserOfIdsSuccess,
  FetchUserOfIdsFailure,
} from './action/fetch-users-of-id';

export interface User {
  id: string;
  name: string;
  email: string;
}

export type UsersOfIdsState = {
  isRequest: boolean;
  users: User[];
  ids: string[];
  message: string;
};

const initState: UsersOfIdsState = {
  isRequest: false,
  users: [],
  ids: [],
  message: '',
};

export const userOfIdsReducer = createReducer(initState, {
  FetchUserOfIds: (state, { ids }: FetchUserOfIds) => {
    return {
      ...state,
      ids,
      isRequest: true,
    };
  },
  FetchUserOfIdsSuccess: (state, { users }: FetchUserOfIdsSuccess) => {
    return {
      ...state,
      isRequest: false,
      users,
      message: '',
    };
  },
  FetchUserOfIdsFailure: (state, { message }: FetchUserOfIdsFailure) => {
    return {
      ...state,
      isRequest: false,
      message,
    };
  },
});
