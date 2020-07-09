import { Action, ActionCreator } from '@reduxjs/toolkit';

export interface PickProviderForTakeOut
  extends Action<'PickProviderForTakeOut'> {
  providerId: string;
}

export interface PickDateForTakeOut extends Action<'PickDateForTakeOut'> {
  startedAt: Date;
  endAt: Date;
}

export interface insertTakeOutInfo extends Action<'InsertTakeOutInfo'> {
  description: string;
  enabled: boolean;
}

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
  title: string;
  description: string;
  startedAt: Date;
  endAt: Date;
  enabled: boolean;
}

export interface CreateTakeOutFailure extends Action<'CreateTakeOutFailure'> {
  message: string;
}

export type CreateTakeOutActions =
  | PickProviderForTakeOut
  | CreateTakeOut
  | CreateTakeOutSuccess
  | CreateTakeOutFailure;

export const createPickProviderForTakeOut: ActionCreator<PickProviderForTakeOut> = ({
  providerId,
}: {
  providerId: string;
}) => ({
  type: 'PickProviderForTakeOut',
  providerId,
});

export const createPickDateForTakeOut: ActionCreator<PickDateForTakeOut> = ({
  startedAt,
  endAt,
}: {
  startedAt: Date;
  endAt: Date;
}) => ({
  type: 'PickDateForTakeOut',
  startedAt,
  endAt,
});

export const createInsertTakeOutInfo: ActionCreator<insertTakeOutInfo> = ({
  description,
  enabled,
}: {
  description: string;
  enabled: boolean;
}) => ({
  type: 'InsertTakeOutInfo',
  description,
  enabled,
});

export const createCreateTakeOut: ActionCreator<CreateTakeOut> = ({
  token,
  title,
  description,
  startedAt,
  endAt,
  enabled,
}: {
  token: string;
  title: string;
  description: string;
  startedAt: Date;
  endAt: Date;
  enabled: boolean;
}) => ({
  type: 'CreateTakeOut',
  token,
  title,
  description,
  startedAt,
  endAt,
  enabled,
});

export const createCreateTakeOutSuccess: ActionCreator<CreateTakeOutSuccess> = ({
  id,
  title,
  description,
  startedAt,
  endAt,
  enabled,
}: {
  id: string;
  title: string;
  description: string;
  startedAt: Date;
  endAt: Date;
  enabled: boolean;
}) => ({
  type: 'CreateTakeOutSuccess',
  id,
  title,
  description,
  startedAt,
  endAt,
  enabled,
});

export const createCreateTakeOutFailure: ActionCreator<CreateTakeOutFailure> = ({
  message,
}: {
  message: string;
}) => ({
  type: 'CreateTakeOutFailure',
  message,
});
