import { Action, ActionCreator } from '@reduxjs/toolkit';
import { TakeOut } from '../TakeOutList/take-out';
import { Meal } from '../MealList/meal';

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

export interface PickTakeOut extends Action<'PickTakeOut'> {
  takeOutId: string;
  providerId: string;
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

export interface FetchMeals extends Action<'FetchMeals'> {
  token: string;
  page: number;
  count: number;
  providerId: string;
}

export interface FetchMealsSuccess extends Action<'FetchMealsSuccess'> {
  meals: Meal[];
}

export interface FetchMealsFailed extends Action<'FetchMealsFailed'> {
  message: string;
}

export interface PickMeal extends Action<'PickMeal'> {
  meal: Meal;
}

export interface UpdatePickMealAmount extends Action<'UpdatePickMealAmount'> {
  id: string;
  amount: number;
}

export type CreateOrderAction =
  | CreateOrder
  | CreateOrderSuccess
  | CreateOrderFailed
  | FetchMeals
  | FetchMealsSuccess
  | FetchMealsFailed
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

export const pickTakeOut: ActionCreator<PickTakeOut> = (
  input: PickTakeOut,
) => ({
  ...input,
  type: 'PickTakeOut',
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

export const fetchMeals: ActionCreator<FetchMeals> = (input: FetchMeals) => ({
  ...input,
  type: 'FetchMeals',
});

export const fetchMealsSuccess: ActionCreator<FetchMealsSuccess> = (
  input: FetchMealsSuccess,
) => ({
  ...input,
  type: 'FetchMealsSuccess',
});

export const fetchMealsFailed: ActionCreator<FetchMealsFailed> = (
  input: FetchMealsFailed,
) => ({
  ...input,
  type: 'FetchMealsFailed',
});

export const pickMeal: ActionCreator<PickMeal> = (input: PickMeal) => ({
  ...input,
  type: 'PickMeal',
});

export const updatePickMealAmount: ActionCreator<UpdatePickMealAmount> = (
  input: UpdatePickMealAmount,
) => ({
  ...input,
  type: 'UpdatePickMealAmount',
});
