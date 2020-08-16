/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers, Reducer, AnyAction } from '@reduxjs/toolkit';
import { connectRouter, RouterState } from 'connected-react-router';

import { history } from 'utils/history';
import { InjectedReducersType } from 'utils/types/injector-typings';
import { meReducer, MeState } from './me/reducer';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { MeActions } from './me/action';
import { menuReducer, MenuState } from './menu/reducer';
import { FetchMealActions } from './menu/action/fetch-meals';
import { CreateMealActions } from './menu/action/creat-meal';
import { providerReducer, ProviderState } from './provider/reducer';
import { FetchProviderAction } from './provider/action/fetch-provider';
import { UsersOfIdsState, userOfIdsReducer } from './users-of-ids/reducer';
import { FetchUsersOfIdAction } from './users-of-ids/action/fetch-users-of-id';
import { FetchOrderOfPageAction } from './order/action/fetch-order-of-page';
import { orderOfPageReducer, OrderOfPageState } from './order/reducer';
import {
  takeOutOfPageReducer,
  TakeOutOfPageState,
} from './take-out-of-page/reducer';
import { FetchTakeOutOfPageActions } from './take-out-of-page/action';
import {
  CreateTakeOutState,
  createTakeOutReducer,
} from './craete-take-out/reducer';
import { CreateTakeOutActions } from './craete-take-out/action';
import {
  fetchProviderByPartialNameReducer,
  FetchProviderByPartialNameState,
} from './fetch-provider-of-partial-name/reducer';
import { FetchProviderByPartialNameActions } from './fetch-provider-of-partial-name/action';
import {
  fetchTakeOutByPartialTitleReducer,
  FetchTakeOutByPartialTitleState,
} from './fetch-take-out-by-partial-title/reducer';
import { FetchtakeOutByPartialTitleActions } from './fetch-take-out-by-partial-title/action';
import { SignUpState } from './sign-up/reducer';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export function createReducer(
  injectedReducers:
    | InjectedReducersType
    | {
        signUp: Reducer<SignUpState, AnyAction>;
      } = {},
) {
  const rootReducer = combineReducers({
    ...injectedReducers,
    router: connectRouter(history) as Reducer<RouterState, AnyAction>,
    me: meReducer as Reducer<MeState, MeActions>,
    menu: menuReducer as Reducer<
      MenuState,
      FetchMealActions | CreateMealActions
    >,
    provider: providerReducer as Reducer<ProviderState, FetchProviderAction>,
    userOfIds: userOfIdsReducer as Reducer<
      UsersOfIdsState,
      FetchUsersOfIdAction
    >,
    orderOfPage: orderOfPageReducer as Reducer<
      OrderOfPageState,
      FetchOrderOfPageAction
    >,
    takeOutOfPage: takeOutOfPageReducer as Reducer<
      TakeOutOfPageState,
      FetchTakeOutOfPageActions
    >,
    createTakeOut: createTakeOutReducer as Reducer<
      CreateTakeOutState,
      CreateTakeOutActions
    >,
    fetchProviderByPartialName: fetchProviderByPartialNameReducer as Reducer<
      FetchProviderByPartialNameState,
      FetchProviderByPartialNameActions
    >,
    fetchTakeOutByPartialTitle: fetchTakeOutByPartialTitleReducer as Reducer<
      FetchTakeOutByPartialTitleState,
      FetchtakeOutByPartialTitleActions
    >,
  });

  return rootReducer;
}

export type RootState = ReturnType<ReturnType<typeof createReducer>>;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
