import { Action, ActionCreator } from '@reduxjs/toolkit';
import { Meal } from '../MealList/reducer';
import {
  CREATE_ORDER,
  CREATE_ORDER_FAILURE,
  CREATE_ORDER_SUCCESS,
  FETCH_MEALS,
  FETCH_MEALS_FAILURE,
  FETCH_MEALS_SUCCESS,
  FETCH_TAKEOUT,
  FETCH_TAKEOUT_FAILURE,
  FETCH_TAKEOUT_SUCCESS,
  PICK_MEAL,
  REMOVE_PICKED_MEAL,
  UPDATE_PICKED_MEAL_AMOUNT,
} from './constants';
import { Takeout } from './reducer';

export interface CreateOrder extends Action<typeof CREATE_ORDER> {
  token: string;
  takeOutId: string;
  meals: { id: string; amount: number }[];
}

export const createOrder: ActionCreator<CreateOrder> = (
  input: CreateOrder,
) => ({
  ...input,
  type: CREATE_ORDER,
});

export interface CreateOrderSuccess
  extends Action<typeof CREATE_ORDER_SUCCESS> {
  id: string;
}

export const createOrderSuccess: ActionCreator<CreateOrderSuccess> = (
  input: CreateOrderSuccess,
) => ({
  ...input,
  type: CREATE_ORDER_SUCCESS,
});

export interface CreateOrderFailure
  extends Action<typeof CREATE_ORDER_FAILURE> {
  message: string;
}

export const createOrderFailure: ActionCreator<CreateOrderFailure> = (
  input: CreateOrderFailure,
) => ({
  ...input,
  type: CREATE_ORDER_FAILURE,
});

export interface FetchMeals extends Action<typeof FETCH_MEALS> {
  token: string;
  page: number;
  count: number;
  providerId: string;
}

export const fetchMeals: ActionCreator<FetchMeals> = (input: FetchMeals) => ({
  ...input,
  type: FETCH_MEALS,
});

export interface FetchMealsSuccess extends Action<typeof FETCH_MEALS_SUCCESS> {
  meals: Meal[];
}

export const fetchMealsSuccess: ActionCreator<FetchMealsSuccess> = (
  input: FetchMealsSuccess,
) => ({
  ...input,
  type: FETCH_MEALS_SUCCESS,
});

export interface FetchMealsFailure extends Action<typeof FETCH_MEALS_FAILURE> {
  message: string;
}

export const fetchMealsFailed: ActionCreator<FetchMealsFailure> = (
  input: FetchMealsFailure,
) => ({
  ...input,
  type: FETCH_MEALS_FAILURE,
});

export interface PickMeal extends Action<typeof PICK_MEAL> {
  meal: Meal;
}

export const pickMeal: ActionCreator<PickMeal> = (input: PickMeal) => ({
  ...input,
  type: PICK_MEAL,
});

export interface UpdatePickedMealAmount
  extends Action<typeof UPDATE_PICKED_MEAL_AMOUNT> {
  id: string;
  amount: number;
}

export const UpdatePickedMealAmount: ActionCreator<UpdatePickedMealAmount> = (
  input: UpdatePickedMealAmount,
) => ({
  ...input,
  type: UPDATE_PICKED_MEAL_AMOUNT,
});

export interface RemovePickedMeal extends Action<typeof REMOVE_PICKED_MEAL> {
  id: string;
}

export const RemovePickedMeal: ActionCreator<RemovePickedMeal> = (
  input: RemovePickedMeal,
) => ({
  ...input,
  type: REMOVE_PICKED_MEAL,
});

export interface FetchTakeout extends Action<typeof FETCH_TAKEOUT> {
  token: string;
  id: string;
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

export const fetchTakeoutFailure: ActionCreator<FetchTakeoutFailure> = (
  input: FetchTakeoutFailure,
) => ({
  ...input,
  type: FETCH_TAKEOUT_FAILURE,
});

export type CreateOrderAction =
  | CreateOrder
  | CreateOrderSuccess
  | CreateOrderFailure
  | FetchMeals
  | FetchMealsSuccess
  | FetchMealsFailure;
