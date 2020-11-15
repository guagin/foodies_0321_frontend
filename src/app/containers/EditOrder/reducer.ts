import { createReducer } from '@reduxjs/toolkit';
import { find, reduce } from 'lodash';
import {
  AppendMeal,
  FetchCreateMealUsers,
  FetchCreateMealUsersFailure,
  FetchCreateMealUsersSuccess,
  FetchMeals,
  FetchMealsFailure,
  FetchMealsSuccess,
  FetchOrder,
  FetchOrderFailure,
  FetchOrderSuccess,
  FetchProvider,
  FetchProviderFailure,
  FetchProviderSuccess,
  FetchTakeout,
  FetchTakeoutFailure,
  FetchTakeoutSuccess,
  RemoveMeal,
  UpdateMealAmount,
  UpdateMealAmountFailure,
  UpdateMealAmountSuccess,
} from './actions';
import {
  APPEND_MEAL,
  FETCH_CREATE_MEAL_USERS,
  FETCH_CREATE_MEAL_USERS_FAILURE,
  FETCH_CREATE_MEAL_USERS_SUCCESS,
  FETCH_MEALS,
  FETCH_MEALS_FAILURE,
  FETCH_MEALS_SUCCESS,
  FETCH_ORDER,
  FETCH_ORDER_FAILURE,
  FETCH_ORDER_SUCCESS,
  FETCH_PROVIDER,
  FETCH_PROVIDER_FAILURE,
  FETCH_PROVIDER_SUCCESS,
  FETCH_TAKEOUT,
  FETCH_TAKEOUT_FAILURE,
  FETCH_TAKEOUT_SUCCESS,
  REMOVE_MEAL,
  UPDATE_MEAL_AMOUNT,
  UPDATE_MEAL_AMOUNT_FAILURE,
  UPDATE_MEAL_AMOUNT_SUCCESS,
} from './constants';

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Order {
  id: string;
  createdBy: string;
  products: Product[];
  status: number;
  takeOutId: string;
}

export interface Product {
  id: string;
  amount: number;
  note: string;
}

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

export interface Provider {
  id: string;
  name: string;
  description: string;
  phone: number;
  createdBy: string;
}

export interface Meal {
  id: string;
  name: string;
  description: string;
  price: number;
  provider: string;
  createdBy: string;
}

export type EditOrderState = {
  order?: Order;
  takeout?: Takeout;
  provider?: Provider;
  meals: Meal[];
  user?: User;
  createMealUsers: User[];
};

export const initEditOrderState: EditOrderState = {
  meals: [],
  createMealUsers: [],
};

export const editOrderReducer = createReducer(initEditOrderState, {
  [FETCH_ORDER]: (state, action: FetchOrder) => {
    return {
      ...state,
    };
  },
  [FETCH_ORDER_SUCCESS]: (state, { order }: FetchOrderSuccess) => {
    return {
      ...state,
      order,
    };
  },
  [FETCH_ORDER_FAILURE]: (state, { message }: FetchOrderFailure) => {
    return {
      ...state,
      message,
    };
  },
  [APPEND_MEAL]: (state, { meal, amount, note }: AppendMeal) => {
    const { order, ...rest } = state;
    if (!order) {
      return { ...state };
    }
    const { products } = order;

    const newProduct = {
      id: meal.id,
      amount,
      note: '',
    };

    return {
      ...rest,
      order: {
        ...order,
        products: [...products, newProduct],
      },
    };
  },
  [REMOVE_MEAL]: (state, { index }: RemoveMeal) => {
    const { order } = state;
    if (!order) {
      return {
        ...state,
      };
    }
    const { products } = order;

    const productsAfterRemoving = reduce(
      products,
      (accu, curr, idx) => {
        if (idx === index) {
          return accu;
        }

        accu.push(curr);
        return accu;
      },
      [] as {
        id: string;
        amount: number;
        note: string;
      }[],
    );

    return {
      ...state,
      order: {
        ...order,
        products: productsAfterRemoving,
      },
    };
  },
  [UPDATE_MEAL_AMOUNT]: (state, { index, amount }: UpdateMealAmount) => {
    return {
      ...state,
    };
  },
  [UPDATE_MEAL_AMOUNT_SUCCESS]: (state, action: UpdateMealAmountSuccess) => {
    return {
      ...state,
    };
  },
  [UPDATE_MEAL_AMOUNT_FAILURE]: (
    state,
    { message }: UpdateMealAmountFailure,
  ) => {
    return {
      ...state,
      message,
    };
  },

  [FETCH_TAKEOUT]: (state, action: FetchTakeout) => {
    return {
      ...state,
    };
  },
  [FETCH_TAKEOUT_SUCCESS]: (state, { takeout }: FetchTakeoutSuccess) => {
    return {
      ...state,
      takeout,
    };
  },
  [FETCH_TAKEOUT_FAILURE]: (state, { message }: FetchTakeoutFailure) => {
    return {
      ...state,
      message,
    };
  },
  [FETCH_PROVIDER]: (state, action: FetchProvider) => {
    return { ...state };
  },
  [FETCH_PROVIDER_SUCCESS]: (state, { provider }: FetchProviderSuccess) => {
    return {
      ...state,
      provider,
    };
  },
  [FETCH_PROVIDER_FAILURE]: (state, { message }: FetchProviderFailure) => {
    return {
      ...state,
      message,
    };
  },
  [FETCH_MEALS]: (state, action: FetchMeals) => {
    return { ...state };
  },

  [FETCH_MEALS_SUCCESS]: (state, { meals }: FetchMealsSuccess) => {
    return {
      ...state,
      meals,
    };
  },

  [FETCH_MEALS_FAILURE]: (state, { message }: FetchMealsFailure) => {
    return {
      ...state,
      message,
    };
  },

  [FETCH_CREATE_MEAL_USERS]: (state, action: FetchCreateMealUsers) => {
    return {
      ...state,
    };
  },
  [FETCH_CREATE_MEAL_USERS_SUCCESS]: (
    state,
    { users }: FetchCreateMealUsersSuccess,
  ) => {
    return {
      ...state,
      users,
    };
  },
  [FETCH_CREATE_MEAL_USERS_FAILURE]: (
    state,
    { message }: FetchCreateMealUsersFailure,
  ) => {
    return {
      ...state,
      message,
    };
  },
});
