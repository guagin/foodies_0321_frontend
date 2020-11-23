import { Action, ActionCreator } from '@reduxjs/toolkit';

import {
  APPEND_MEAL,
  REMOVE_MEAL,
  FETCH_ORDER,
  FETCH_ORDER_FAILURE,
  FETCH_ORDER_SUCCESS,
  FETCH_PROVIDER,
  FETCH_PROVIDER_SUCCESS,
  FETCH_PROVIDER_FAILURE,
  FETCH_TAKEOUT,
  FETCH_TAKEOUT_FAILURE,
  FETCH_TAKEOUT_SUCCESS,
  FETCH_USER,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
  FETCH_MEALS,
  FETCH_MEALS_SUCCESS,
  FETCH_MEALS_FAILURE,
  FETCH_CREATE_MEAL_USERS,
  FETCH_CREATE_MEAL_USERS_SUCCESS,
  FETCH_CREATE_MEAL_USERS_FAILURE,
  UPDATE_MEAL,
  UPDATE_MEAL_SUCCESS,
  UPDATE_MEAL_FAILURE,
  REMOVE_MEAL_SUCCESS,
  REMOVE_MEAL_FAILURE,
  APPEND_MEAL_SUCCESS,
  APPEND_MEAL_FAILURE,
} from './constants';
import { Meal, Order, Provider, Takeout, User } from './reducer';

export interface FetchOrder extends Action<typeof FETCH_ORDER> {
  token: string;
  orderId: string;
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
  token: string;
  orderId: string;
  meal: {
    id: string;
    amount: number;
    note: string;
  };
}

export const appendMeal: ActionCreator<AppendMeal> = (input: AppendMeal) => ({
  ...input,
  type: APPEND_MEAL,
});

export interface AppendMealSuccess extends Action<typeof APPEND_MEAL_SUCCESS> {}

export const appendMealSuccess: ActionCreator<AppendMealSuccess> = (
  input: AppendMealSuccess,
) => ({
  ...input,
  type: APPEND_MEAL_SUCCESS,
});

export interface AppendMealFailure extends Action<typeof APPEND_MEAL_FAILURE> {
  message: string;
}

export const appendMealFailure: ActionCreator<AppendMealFailure> = (
  input: AppendMealFailure,
) => ({
  ...input,
  type: APPEND_MEAL_FAILURE,
});

export interface RemoveMeal extends Action<typeof REMOVE_MEAL> {
  token: string;
  index: number;
  id: string;
}

export const removeMeal: ActionCreator<RemoveMeal> = (input: RemoveMeal) => ({
  ...input,
  type: REMOVE_MEAL,
});

export interface RemoveMealSuccess extends Action<typeof REMOVE_MEAL_SUCCESS> {}

export const removeMealSuccess: ActionCreator<RemoveMealSuccess> = (
  input: RemoveMealSuccess,
) => ({
  ...input,
  type: REMOVE_MEAL_SUCCESS,
});

export interface RemoveMealFailure extends Action<typeof REMOVE_MEAL_FAILURE> {
  message: string;
}

export const removeMealFailure: ActionCreator<RemoveMealFailure> = (
  input: RemoveMealFailure,
) => ({
  ...input,
  type: REMOVE_MEAL_FAILURE,
});

export interface UpdateMeal extends Action<typeof UPDATE_MEAL> {
  token: string;
  id: string;
  index: number;
  amount: number;
  note: string;
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

export const fetchTakeoutFailure: ActionCreator<FetchTakeoutFailure> = (
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
  type: FETCH_PROVIDER_SUCCESS,
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

export interface FetchUser extends Action<typeof FETCH_USER> {
  token: string;
  userId: string;
}

export const fetchUser: ActionCreator<FetchUser> = (input: FetchUser) => ({
  ...input,
  type: FETCH_USER,
});

export interface FetchUserSuccess extends Action<typeof FETCH_USER_SUCCESS> {
  user: User;
}

export const fetchUserSuccess: ActionCreator<FetchUserSuccess> = (
  input: FetchUserSuccess,
) => ({
  ...input,
  type: FETCH_USER_SUCCESS,
});

export interface FetchUserFailure extends Action<typeof FETCH_USER_FAILURE> {
  message: string;
}

export const fetchUserFailure: ActionCreator<FetchUserFailure> = (
  input: FetchUserFailure,
) => ({
  ...input,
  type: FETCH_USER_FAILURE,
});

export interface FetchMeals extends Action<typeof FETCH_MEALS> {
  token: string;
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

export const fetchMealsFailure: ActionCreator<FetchMealsFailure> = (
  input: FetchMealsFailure,
) => ({
  ...input,
  type: FETCH_MEALS_FAILURE,
});

export interface FetchCreateMealUsers
  extends Action<typeof FETCH_CREATE_MEAL_USERS> {
  token: string;
  userIds: string[];
}

export const fetchCreateMealUsers: ActionCreator<FetchCreateMealUsers> = (
  input: FetchCreateMealUsers,
) => ({
  ...input,
  type: FETCH_CREATE_MEAL_USERS,
});

export interface FetchCreateMealUsersSuccess
  extends Action<typeof FETCH_CREATE_MEAL_USERS_SUCCESS> {
  users: User[];
}

export const fetchCreateMealUserSuccess: ActionCreator<FetchCreateMealUsersSuccess> = (
  input: FetchCreateMealUsersSuccess,
) => ({
  ...input,
  type: FETCH_CREATE_MEAL_USERS_SUCCESS,
});

export interface FetchCreateMealUsersFailure
  extends Action<typeof FETCH_CREATE_MEAL_USERS_FAILURE> {
  message: string;
}

export const fetchCreateMealUsersFailure: ActionCreator<FetchCreateMealUsersFailure> = (
  input: FetchCreateMealUsersFailure,
) => ({
  ...input,
  type: FETCH_CREATE_MEAL_USERS_FAILURE,
});
