import { TakeOut } from '../TakeOutList/take-out';
import { createReducer } from '@reduxjs/toolkit';
import {
  FetchTakeOutByPartialTitleSuccess,
  FetchTakeOutByPartialTitleFailed,
  CreateOrder,
  CreateOrderSuccess,
  CreateOrderFailed,
  FetchTakeOutByPartialTitle,
  FetchMeals,
  PickTakeOut,
  FetchMealsSuccess,
  FetchMealsFailed,
  PickMeal,
  UpdatePickedMealAmount,
  RemovePickedMeal,
} from './action';
import { Meal } from '../MealList/meal';
import { curry, find, map, reduce, remove } from 'lodash';
import { stringify } from 'querystring';

export type CreateOrderState = {
  isRequest: boolean;
  takeOuts: TakeOut[];
  message: string;
  takeOutId: string;
  providerId: string;
  meals: Meal[];
  pickedMeals: {
    id: string;
    name: string;
    price: number;
    amount: number;
  }[];
};

export const initCreateOrderState: CreateOrderState = {
  isRequest: false,
  takeOuts: [],
  message: '',
  takeOutId: '',
  providerId: '',
  meals: [],
  pickedMeals: [],
};

export const createOrderReducer = createReducer(initCreateOrderState, {
  FetchTakeOutByPartialTitle: (state, action: FetchTakeOutByPartialTitle) => {
    return {
      ...state,
      isRequest: true,
      message: '',
    };
  },

  FetchTakeOutByPartialTitleSuccess: (
    state,
    { takeOuts }: FetchTakeOutByPartialTitleSuccess,
  ) => {
    return {
      ...state,
      isRequest: false,
      message: '',
      takeOuts,
    };
  },

  FetchTakeOutByPartialTitleFailed: (
    state,
    { message }: FetchTakeOutByPartialTitleFailed,
  ) => {
    return {
      ...state,
      isRequest: false,
      message,
    };
  },

  PickTakeOut: (state, { takeOutId, providerId }: PickTakeOut) => {
    return {
      ...state,
      isRequest: false,
      message: '',
      takeOutId,
      providerId,
    };
  },

  CreateOrder: (state, action: CreateOrder) => {
    return {
      ...state,
      isRequest: true,
      message: '',
    };
  },

  CreateOrderSuccess: (state, action: CreateOrderSuccess) => {
    return {
      ...state,
      isRequest: false,
      message: '',
    };
  },

  CreateOrderFailed: (state, { message }: CreateOrderFailed) => {
    return {
      ...state,
      isRequest: false,
      message,
    };
  },

  FetchMeals: (state, { providerId }: FetchMeals) => {
    return {
      ...state,
      isRequest: true,
      providerId,
    };
  },

  FetchMealsSuccess: (state, { meals }: FetchMealsSuccess) => {
    return {
      ...state,
      isRequest: false,
      meals,
    };
  },
  FetchMealsFailed: (state, { message }: FetchMealsFailed) => {
    return {
      ...state,
      message,
      isRequest: false,
    };
  },

  PickMeal: ({ pickedMeals, ...rest }, { meal }: PickMeal) => {
    const found = find(pickedMeals, e => e.id === meal.id);

    if (found) {
      return {
        ...rest,
        pickedMeals,
      };
    }

    const pickedMeal = {
      id: meal.id,
      name: meal.name,
      price: meal.price,
      amount: 1,
    };

    return {
      ...rest,
      pickedMeals: [...pickedMeals, pickedMeal],
    };
  },

  UpdatePickedMealAmount: (
    { pickedMeals, ...rest },
    { id, amount }: UpdatePickedMealAmount,
  ) => {
    const updatedMeals = pickedMeals.map(e => {
      if (e.id === id) {
        return {
          ...e,
          amount,
        };
      }

      return {
        ...e,
      };
    });

    return {
      ...rest,
      pickedMeals: updatedMeals,
    };
  },

  RemovePickedMeal: ({ pickedMeals, ...rest }, { id }: RemovePickedMeal) => {
    const pickedMealAfterRemoving = reduce(
      pickedMeals,
      (accu, curr) => {
        if (curr.id === id) {
          return accu;
        }

        accu.push(curr);
        return accu;
      },
      [] as {
        id: string;
        name: string;
        price: number;
        amount: number;
      }[],
    );

    return {
      ...rest,
      pickedMeals: pickedMealAfterRemoving,
    };
  },
});
