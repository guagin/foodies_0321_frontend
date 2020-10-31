import { Action, ActionCreator } from '@reduxjs/toolkit';
import { Meal, Provider } from './reducer';
import {
  FETCH_MEAL_OF_ID,
  FETCH_MEAL_OF_ID_SUCCESS,
  FETCH_MEAL_OF_ID_FAILURE,
  FETCH_PROVIDER_OF_ID,
  FETCH_PROVIDER_OF_ID_SUCCESS,
  FETCH_PROVIDER_OF_ID_FAILURE,
  UPDATE_MEAL,
  UPDATE_MEAL_SUCCESS,
  UPDATE_MEAL_FAILURE,
} from './constants';

export interface FetchMealOfId extends Action<typeof FETCH_MEAL_OF_ID> {
  token: string;
  id: string;
}

export const fetchMealOfId: ActionCreator<FetchMealOfId> = (
  input: FetchMealOfId,
) => ({
  ...input,
  type: FETCH_MEAL_OF_ID,
});

export interface FetchMealOfIdSuccess
  extends Action<typeof FETCH_MEAL_OF_ID_SUCCESS> {
  meal: Meal;
}

export const fetchMealOfIdSuccess: ActionCreator<FetchMealOfIdSuccess> = (
  input: FetchMealOfIdSuccess,
) => ({
  ...input,
  type: FETCH_MEAL_OF_ID_SUCCESS,
});

export interface FetchMealOfIdFailure
  extends Action<typeof FETCH_MEAL_OF_ID_FAILURE> {
  message: string;
}

export const fetchMealOfIdFailure: ActionCreator<FetchMealOfIdFailure> = (
  input: FetchMealOfIdFailure,
) => ({
  ...input,
  type: FETCH_MEAL_OF_ID_FAILURE,
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

export interface UpdateMeal extends Action<typeof UPDATE_MEAL> {
  token: string;
  id: string;
  name: string;
  description: string;
  price: number;
  pictures: string[];
}

export const updateMeal: ActionCreator<UpdateMeal> = (input: UpdateMeal) => ({
  ...input,
  type: UPDATE_MEAL,
});

export interface UpdateMealSuccess extends Action<typeof UPDATE_MEAL_SUCCESS> {}

export const updateMealSuccess: ActionCreator<UpdateMealSuccess> = (
  input: UpdateMealSuccess,
) => ({
  ...input,
  type: UPDATE_MEAL_SUCCESS,
});

export interface UpdateMealFailure extends Action<typeof UPDATE_MEAL_FAILURE> {
  message: string;
}

export const updateMealFailure: ActionCreator<UpdateMealFailure> = (
  input: UpdateMealFailure,
) => ({
  ...input,
  type: UPDATE_MEAL_FAILURE,
});

export type ActionType =
  | FetchMealOfId
  | FetchMealOfIdSuccess
  | FetchMealOfIdFailure
  | FetchProviderOfId
  | FetchProviderOfIdSuccess
  | FetchProviderOfIdFailure
  | UpdateMeal
  | UpdateMealSuccess
  | UpdateMealFailure;
