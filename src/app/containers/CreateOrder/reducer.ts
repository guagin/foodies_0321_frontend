import { createReducer } from '@reduxjs/toolkit';
import {
  CreateOrder,
  CreateOrderSuccess,
  CreateOrderFailure,
  FetchMeals,
  FetchMealsSuccess,
  FetchMealsFailure,
  PickMeal,
  UpdatePickedMealAmount,
  RemovePickedMeal,
  FetchTakeout,
  FetchTakeoutSuccess,
  FetchTakeoutFailure,
} from './action';
import { find, reduce } from 'lodash';
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

export interface Takeout {
  id: string;
  title: string;
  createdBy: string;
  description: string;
  startedAt: Date;
  endAt: Date;
  enabled: boolean;
  providerId: string;
}

export type CreateOrderState = {
  isRequest: boolean;
  message: string;
  takeout?: Takeout;
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
  message: '',
  providerId: '',
  meals: [],
  pickedMeals: [],
};

export const createOrderReducer = createReducer(initCreateOrderState, {
  [FETCH_TAKEOUT]: (state, action: FetchTakeout) => {
    return {
      ...state,
      isRequest: true,
    };
  },
  [FETCH_TAKEOUT_SUCCESS]: (state, { takeout }: FetchTakeoutSuccess) => {
    return {
      ...state,
      isRequest: false,
      takeout,
    };
  },
  [FETCH_TAKEOUT_FAILURE]: (state, { message }: FetchTakeoutFailure) => {
    return {
      ...state,
      isRequest: false,
      message,
    };
  },

  [CREATE_ORDER]: (state, action: CreateOrder) => {
    return {
      ...state,
      isRequest: true,
      message: '',
    };
  },

  [CREATE_ORDER_SUCCESS]: (state, action: CreateOrderSuccess) => {
    return {
      ...state,
      isRequest: false,
      message: '',
    };
  },

  [CREATE_ORDER_FAILURE]: (state, { message }: CreateOrderFailure) => {
    return {
      ...state,
      isRequest: false,
      message,
    };
  },

  [FETCH_MEALS]: (state, { providerId }: FetchMeals) => {
    return {
      ...state,
      isRequest: true,
      providerId,
    };
  },

  [FETCH_MEALS_SUCCESS]: (state, { meals }: FetchMealsSuccess) => {
    return {
      ...state,
      isRequest: false,
      meals,
    };
  },
  [FETCH_MEALS_FAILURE]: (state, { message }: FetchMealsFailure) => {
    return {
      ...state,
      message,
      isRequest: false,
    };
  },

  [PICK_MEAL]: ({ pickedMeals, ...rest }, { meal }: PickMeal) => {
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

  [UPDATE_PICKED_MEAL_AMOUNT]: (
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

  [REMOVE_PICKED_MEAL]: (
    { pickedMeals, ...rest },
    { id }: RemovePickedMeal,
  ) => {
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
