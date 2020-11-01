import {
  FETCH_TAKEOUT_OF_ID_SUCCESS,
  FETCH_TAKEOUT_OF_ID_FAILURE,
  FETCH_TAKEOUT_OF_ID,
  FETCH_ORDER_OF_TAKEOUT_ID,
  FETCH_ORDER_OF_TAKEOUT_ID_SUCCESS,
  FETCH_ORDER_OF_TAKEOUT_ID_FAILURE,
  FETCH_PROVIDER_OF_ID,
  FETCH_PROVIDER_OF_ID_SUCCESS,
  FETCH_PROVIDER_OF_ID_FAILURE,
} from './constants';
import { Action, ActionCreator } from '@reduxjs/toolkit';
import { Takeout, Order, Provider } from './reducer';

export interface FetchTakeoutOfId extends Action<typeof FETCH_TAKEOUT_OF_ID> {
  token: string;
  id: string;
}

export const fetchTakeoutOfId: ActionCreator<FetchTakeoutOfId> = (
  inpupt: FetchTakeoutOfId,
) => ({
  ...inpupt,
  type: FETCH_TAKEOUT_OF_ID,
});

export interface FetchTakeoutOfIdSuccess
  extends Action<typeof FETCH_TAKEOUT_OF_ID_SUCCESS> {
  takeout: Takeout;
}

export const fetchTakeoutOfIdSuccess: ActionCreator<FetchTakeoutOfIdSuccess> = (
  input: FetchTakeoutOfIdSuccess,
) => ({
  ...input,
  type: FETCH_TAKEOUT_OF_ID_SUCCESS,
});

export interface FetchTakeoutOfIdFailure
  extends Action<typeof FETCH_TAKEOUT_OF_ID_FAILURE> {
  message: string;
}

export const fetchTakeoutOfIdFailure: ActionCreator<FetchTakeoutOfIdFailure> = (
  input: FetchTakeoutOfIdFailure,
) => ({
  ...input,
  type: FETCH_TAKEOUT_OF_ID_FAILURE,
});

export interface FetchOrderOfTakeoutId
  extends Action<typeof FETCH_ORDER_OF_TAKEOUT_ID> {
  token: string;
  takeoutId: string;
}

export const fetchOrderOfTakeoutId: ActionCreator<FetchOrderOfTakeoutId> = (
  input: FetchOrderOfTakeoutId,
) => ({
  ...input,
  type: FETCH_ORDER_OF_TAKEOUT_ID,
});

export interface FetchOrderOfTakeoutIdSuccess
  extends Action<typeof FETCH_ORDER_OF_TAKEOUT_ID_SUCCESS> {
  orders: Order[];
}

export const fetchOrderOfTakeoutIdSuccess: ActionCreator<FetchOrderOfTakeoutIdSuccess> = (
  input: FetchOrderOfTakeoutIdSuccess,
) => ({
  ...input,
  type: FETCH_ORDER_OF_TAKEOUT_ID_SUCCESS,
});

export interface FetchOrderOfTakeoutIdFailure
  extends Action<typeof FETCH_ORDER_OF_TAKEOUT_ID_FAILURE> {
  message: string;
}

export const fetchOrderOfTakeoutIdFailure: ActionCreator<FetchOrderOfTakeoutIdFailure> = (
  input: FetchOrderOfTakeoutIdFailure,
) => ({
  ...input,
  type: FETCH_ORDER_OF_TAKEOUT_ID_FAILURE,
});

export interface FetchProviderOfId extends Action<typeof FETCH_PROVIDER_OF_ID> {
  token: string;
  id: string;
}

export const fetchProviderOfId: ActionCreator<FetchProviderOfId> = (
  input: FetchProviderOfId,
) => ({
  ...input,
  type: FETCH_PROVIDER_OF_ID,
});

export interface FetchProviderOfIdSuccess
  extends Action<typeof FETCH_PROVIDER_OF_ID_SUCCESS> {
  provider: Provider;
}

export const fetchProviderOfIdSuccess: ActionCreator<FetchProviderOfIdSuccess> = (
  input: FetchProviderOfIdSuccess,
) => ({
  ...input,
  type: FETCH_PROVIDER_OF_ID_SUCCESS,
});

export interface FetchProviderOfIdFailure
  extends Action<typeof FETCH_PROVIDER_OF_ID_FAILURE> {
  message: string;
}

export const fetchProviderOfIdFailure: ActionCreator<FetchProviderOfIdFailure> = (
  input: FetchProviderOfIdFailure,
) => ({
  ...input,
  type: FETCH_PROVIDER_OF_ID_FAILURE,
});
