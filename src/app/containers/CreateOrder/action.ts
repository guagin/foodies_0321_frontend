import { Action, ActionCreator } from '@reduxjs/toolkit';
import { TakeOut } from '../TakeOutList/take-out';

export interface FetchTakeOutByPartialTitle
  extends Action<'FetchTakeOutByPartialTitle'> {
  token: string;
  title: string;
}

export interface FetchTakeOutByPartialTitleSuccess
  extends Action<'FetchTakeOutByPartialTitleSuccess'> {
  takeOuts: TakeOut[];
}

export interface FetchTakeOutByPartialTitleFailed
  extends Action<'FetchTakeOutByPartialFailed'> {
  message: string;
}

export type FetchTakeOutByPartialTitleActions =
  | FetchTakeOutByPartialTitle
  | FetchTakeOutByPartialTitleSuccess
  | FetchTakeOutByPartialTitleFailed;

export const fetchTakeOutByPartialTitle: ActionCreator<FetchTakeOutByPartialTitle> = (
  input: FetchTakeOutByPartialTitle,
) => ({
  ...input,
  type: 'FetchTakeOutByPartialTitle',
});

export const fetchTakeOutByPartialTitleSuccess: ActionCreator<FetchTakeOutByPartialTitleSuccess> = (
  input: FetchTakeOutByPartialTitleSuccess,
) => ({
  ...input,
  type: 'FetchTakeOutByPartialTitleSuccess',
});

export const fetchTakeOutByPartialTitleFailed: ActionCreator<FetchTakeOutByPartialTitleFailed> = (
  input: FetchTakeOutByPartialTitleFailed,
) => ({
  ...input,
  type: 'FetchTakeOutByPartialFailed',
});

export interface PickTakeOutId extends Action<'PickTakeOutId'> {
  takeOutId: string;
}

export interface CreateOrder extends Action<'CreateOrder'> {
  token: string;
  userId: string;
  takeOutId: string;
}

export interface CreateOrderSuccess extends Action<'CreateOrderSuccess'> {
  id: string;
}

export interface CreateOrderFailed extends Action<'CreateOrderFailed'> {
  message: string;
}

export type CreateOrderAction =
  | CreateOrder
  | CreateOrderSuccess
  | CreateOrderFailed;

export const pickTakeOutId: ActionCreator<PickTakeOutId> = (
  input: PickTakeOutId,
) => ({
  ...input,
  type: 'PickTakeOutId',
});

export const createOrder: ActionCreator<CreateOrder> = (
  input: CreateOrder,
) => ({
  ...input,
  type: 'CreateOrder',
});

export const createOrderSuccess: ActionCreator<CreateOrderSuccess> = (
  input: CreateOrderSuccess,
) => ({
  ...input,
  type: 'CreateOrderSuccess',
});

export const createOrderFailed: ActionCreator<CreateOrderFailed> = (
  input: CreateOrderFailed,
) => ({
  ...input,
  type: 'CreateOrderFailed',
});
