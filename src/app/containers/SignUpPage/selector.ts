import { initState } from './reducer';
import { createSelector } from 'reselect';

const selectSignUpPageDomain = state => state.signUp || initState;

export const makeSelectIsRequest = () =>
  createSelector(selectSignUpPageDomain, substate => substate.isRequest);

export const makeSelectName = () =>
  createSelector(selectSignUpPageDomain, substate => substate.name);

export const makeSelectPassword = () =>
  createSelector(selectSignUpPageDomain, substate => substate.password);

export const makeSelectEmail = () =>
  createSelector(selectSignUpPageDomain, substate => substate.email);

export const makeSelectId = () =>
  createSelector(selectSignUpPageDomain, substate => substate.idP);

export const makeSelectMessage = () =>
  createSelector(selectSignUpPageDomain, substate => substate.message);
