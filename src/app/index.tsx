import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Switch, Route } from 'react-router-dom';

import { GlobalStyle } from 'styles/global-styles';

import { HomePage } from './containers/HomePage/Loadable';
import { NotFoundPage } from './components/NotFoundPage/Loadable';

import { SignUpPage } from './containers/SignUpPage/Loadable';
import { SignInPage } from './containers/SignInPage/Loadable';
import { AuthenticatedRoute } from './containers/AuthenticatedRoute';
import { UnauthenticatedRoute } from './containers/UnauthentiactedRoute';
import { MealManagement } from './containers/MealManagement';
import { CreateMeal } from './containers/MealManagement/create-meal';
import { ProviderManagement } from './containers/ProviderManagement';
import { CreateProvider } from './containers/ProviderManagement/create-provider';

export function App() {
  return (
    <>
      <Helmet titleTemplate="%s - Foodies" defaultTitle="Foodies">
        <meta name="description" content="A order service for meal." />
      </Helmet>

      <Switch>
        <AuthenticatedRoute exact path="/" component={HomePage} />
        <AuthenticatedRoute
          exact
          path="/meal-management"
          component={MealManagement}
        />
        <AuthenticatedRoute exact path="/create-meal" component={CreateMeal} />
        <AuthenticatedRoute
          exact
          path="/provider-management"
          component={ProviderManagement}
        />
        <AuthenticatedRoute
          exact
          path="/create-provider"
          component={CreateProvider}
        />
        <UnauthenticatedRoute exact path="/sign-in" component={SignInPage} />
        <UnauthenticatedRoute exact path="/sign-up" component={SignUpPage} />
        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </>
  );
}
