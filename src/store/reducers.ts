/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers, Reducer, AnyAction } from '@reduxjs/toolkit';
import { connectRouter, RouterState } from 'connected-react-router';

import { history } from 'utils/history';
import { InjectedReducersType } from 'utils/types/injector-typings';
import { meReducer, MeState } from './me/reducer';
import { TypedUseSelectorHook, useSelector } from 'react-redux';

import { UsersOfIdsState, userOfIdsReducer } from './users-of-ids/reducer';
import { FetchUsersOfIdAction } from './users-of-ids/action/fetch-users-of-id';

import { FetchMeAction } from './me/action';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export function createReducer(injectedReducers: InjectedReducersType = {}) {
  const rootReducer = combineReducers({
    ...injectedReducers,
    router: connectRouter(history) as Reducer<RouterState, AnyAction>,
    me: meReducer as Reducer<MeState, FetchMeAction>,
    userOfIds: userOfIdsReducer as Reducer<
      UsersOfIdsState,
      FetchUsersOfIdAction
    >,
  });

  return rootReducer;
}

export type RootState = ReturnType<ReturnType<typeof createReducer>>;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
