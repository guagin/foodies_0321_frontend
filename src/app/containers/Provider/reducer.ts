import { createReducer } from '@reduxjs/toolkit';
import {
  FetchProviderOfId,
  FetchProviderOfIdFailure,
  FetchProviderOfIdSuccess,
} from './action';

export interface Provider {
  id: string;
  name: string;
  description: string;
  phone: number;
  createdBy: string;
}

export type ProviderState = {
  provider?: Provider;
  isRequest: boolean;
  message: string;
};

export const initProviderState: ProviderState = {
  isRequest: false,
  message: '',
};

export const providerReducer = createReducer(initProviderState, {
  FetchProviderOfId: (state, action: FetchProviderOfId) => {
    return {
      ...state,
      isRequest: true,
    };
  },

  FetchProviderOfIdSuccess: (state, { provider }: FetchProviderOfIdSuccess) => {
    return {
      ...state,
      isRequest: false,
      provider,
    };
  },

  FetchProviderOfIdFailure: (state, { message }: FetchProviderOfIdFailure) => {
    return {
      ...state,
      isRequest: false,
      message,
    };
  },
});
