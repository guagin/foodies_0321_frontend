import { Action, ActionCreator } from '@reduxjs/toolkit';

import {
  APPEND_MEAL,
  UPDATE_MEAL_AMOUNT,
  FETCH_ORDER,
  FETCH_ORDER_FAILURE,
  FETCH_ORDER_SUCCESS,
  FETCH_PROVIDER,
  FETCH_PROVIDER_SUCCESS,
  FETCH_TAKEOUT,
  FETCH_TAKEOUT_FAILURE,
  FETCH_TAKEOUT_SUCCESS,
  REMOVE_MEAL,
  FETCH_PROVIDER_FAILURE,
} from './constants';
import { Meal, Order, Provider, Takeout } from './reducer';

export interface FetchOrder extends Action<typeof FETCH_ORDER> {
  token: string;
  oderId: string;
}

export const fetchOrder: ActionCreator<FetchOrder> = (input: FetchOrder) => ({
  ...input,
  type: FETCH_ORDER,
});

export interface FetchOrderSuccess extends Action<typeof FETCH_ORDER_SUCCESS> {
  order: Order;
}

export const fetchOrderSuccess: ActionCreator<FetchOrderSuccess> = (
  input: FetchOrderSuccess,
) => ({
  ...input,
  type: FETCH_ORDER_SUCCESS,
});

export interface FetchOrderFailure extends Action<typeof FETCH_ORDER_FAILURE> {
  message: string;
}

export const fetchOrderFailure: ActionCreator<FetchOrderFailure> = (
  input: FetchOrderFailure,
) => ({
  ...input,
  type: FETCH_ORDER_FAILURE,
});

export interface AppendMeal extends Action<typeof APPEND_MEAL> {
  meal: Meal;
}

export const appendMeal: ActionCreator<AppendMeal> = (input: AppendMeal) => ({
  ...input,
  type: APPEND_MEAL,
});

export interface RemoveMeal extends Action<typeof REMOVE_MEAL> {
  mealId: string;
}

export const removeMeal: ActionCreator<RemoveMeal> = (input: RemoveMeal) => ({
  ...input,
  type: REMOVE_MEAL,
});

export interface UpdateMealAmount extends Action<typeof UPDATE_MEAL_AMOUNT> {
  mealId: string;
  amount: number;
}

export const updateMealAmount: ActionCreator<UpdateMealAmount> = (
  input: UpdateMealAmount,
) => ({
  ...input,
  type: UPDATE_MEAL_AMOUNT,
});

export interface FetchTakeout extends Action<typeof FETCH_TAKEOUT> {
  token: string;
  takeoutId: string;
}

export const fetchTakeout: ActionCreator<FetchTakeout> = (
  input: FetchTakeout,
) => ({
  ...input,
  type: FETCH_TAKEOUT,
});

export interface FetchTakeoutSuccess
  extends Action<typeof FETCH_TAKEOUT_SUCCESS> {
  takeout: Takeout;
}

export const fetchTakeoutSuccess: ActionCreator<FetchTakeoutSuccess> = (
  input: FetchTakeoutSuccess,
) => ({
  ...input,
  type: FETCH_TAKEOUT_SUCCESS,
});

export interface FetchTakeoutFailure
  extends Action<typeof FETCH_TAKEOUT_FAILURE> {
  message: string;
}

export const FetchTakeoutFailure: ActionCreator<FetchTakeoutFailure> = (
  input: FetchTakeoutFailure,
) => ({
  ...input,
  type: FETCH_TAKEOUT_FAILURE,
});

export interface FetchProvider extends Action<typeof FETCH_PROVIDER> {
  token: string;
  providerId: string;
}

export const fetchProvider: ActionCreator<FetchProvider> = (
  input: FetchProvider,
) => ({
  ...input,
  type: FETCH_PROVIDER,
});

export interface FetchProviderSuccess
  extends Action<typeof FETCH_PROVIDER_SUCCESS> {
  provider: Provider;
}

export const fetchProviderSuccess: ActionCreator<FetchProviderSuccess> = (
  input: FetchProviderSuccess,
) => ({
  ...input,
  typeof: FETCH_PROVIDER_SUCCESS,
});

export interface FetchProviderFailure
  extends Action<typeof FETCH_PROVIDER_FAILURE> {
  message: string;
}

export const fetchProviderFailure: ActionCreator<FetchProviderFailure> = (
  input: FetchProviderFailure,
) => ({
  ...input,
  type: FETCH_PROVIDER_FAILURE,
});
