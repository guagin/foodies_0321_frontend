import { Action, ActionCreator } from '@reduxjs/toolkit';

export interface CreateTakeOut extends Action<'CreateTakeOut'> {
  token: string;
  title: string;
  description: string;
  startedAt: Date;
  endAt: Date;
  enabled: boolean;
}

export interface CreateTakeOutSuccess extends Action<'CreateTakeOutSuccess'> {
  id: string;
}

export interface CreateTakeOutFailed extends Action<'CreateTakeOutFailed'> {
  message: string;
}

export type CreateTakeOutActions =
  | CreateTakeOut
  | CreateTakeOutSuccess
  | CreateTakeOutFailed;

export const createTakeOut: ActionCreator<CreateTakeOut> = (
  input: CreateTakeOut,
) => ({
  ...input,
  type: 'CreateTakeOut',
});

export const createTakeOutSuccess: ActionCreator<CreateTakeOutSuccess> = (
  input: CreateTakeOutSuccess,
) => ({
  ...input,
  type: 'CreateTakeOutSuccess',
});

export const createTakeOutFailed: ActionCreator<CreateTakeOutFailed> = (
  input: CreateTakeOutFailed,
) => ({
  ...input,
  type: 'CreateTakeOutFailed',
});
