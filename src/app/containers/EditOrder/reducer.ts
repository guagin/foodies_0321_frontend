import { createReducer } from '@reduxjs/toolkit';
import { find, reduce } from 'lodash';
import {
  AppendMeal,
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
} from './actions';
import {
  APPEND_MEAL,
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
  meal?: Meal[];
  user?: User;
};

export const initEditOrderState: EditOrderState = {};

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
  [APPEND_MEAL]: (state, { meal }: AppendMeal) => {
    const { order, ...rest } = state;
    if (!order) {
      return { ...state };
    }
    const { products } = order;
    const found = find(products, e => e.id === meal.id);

    if (found) {
      return {
        ...rest,
        products,
      };
    }

    const newProduct = {
      id: meal.id,
      amount: 1,
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
  [REMOVE_MEAL]: (state, { mealId }: RemoveMeal) => {
    const { order } = state;
    if (!order) {
      return {
        ...state,
      };
    }
    const { products } = order;

    const productsAfterRemoving = reduce(
      products,
      (accu, curr) => {
        if (curr.id === mealId) {
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
  [UPDATE_MEAL_AMOUNT]: (state, { mealId, amount }: UpdateMealAmount) => {
    const { order } = state;
    if (!order) {
      return {
        ...state,
      };
    }

    const { products } = order;

    const updatedProducts = products.map(e => {
      if (e.id === mealId) {
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
      ...state,
      order: {
        ...order,
        products: updatedProducts,
      },
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
  [FETCH_MEALS]: () => {},

  [FETCH_MEALS_SUCCESS]: () => {},

  [FETCH_MEALS_FAILURE]: () => {},
});
