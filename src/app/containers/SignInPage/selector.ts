import { initState } from './reducer';
import { createSelector } from 'reselect';

const selectSignInPageDomain = state => state.signIn || initState;

export const makeSelectIsRequest = () =>
  createSelector(selectSignInPageDomain, subState => subState.isRequest);

export const makeSelectName = () =>
  createSelector(selectSignInPageDomain, subState => subState.name);

export const makeSelectEmail = () =>
  createSelector(selectSignInPageDomain, subState => subState.email);

export const makeSelectToken = () =>
  createSelector(selectSignInPageDomain, subState => subState.token);

export const makeSelectMessage = () =>
  createSelector(selectSignInPageDomain, subState => subState.messge);
