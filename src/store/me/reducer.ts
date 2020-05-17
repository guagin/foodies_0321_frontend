import { MeActionType } from 'store/me/actionTypes';
import { Action, createReducer, PayloadAction } from '@reduxjs/toolkit';

export type MeState = {
  name: string;
  id: string;
  email: string;
  token: string;
};

const initialState: MeState = {
  name: '',
  id: '',
  email: '',
  token: '',
};

export interface MeAction extends Action<MeActionType> {
  payload: any;
}

export const meReducer = createReducer(initialState, {
  SIGN_UP: (
    state,
    action: PayloadAction<{
      name: string;
      email: string;
      password: string;
    }>,
  ) => {
    const { name, email, password } = action.payload;
    return {
      ...state,
      name,
      email,
      password,
    };
  },
});
