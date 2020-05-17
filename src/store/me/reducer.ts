import { MeActionType } from 'store/me/actionTypes';
import { Action } from '@reduxjs/toolkit';

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

type MeReducer = (state: MeState, action: MeAction) => MeState;

export const meReducer: MeReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SIGN_UP':
      const { name, email, password } = action.payload;
      return {
        ...state,
        name,
        email,
        password,
      };
    default:
      return state;
  }
};
