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
import { MealListPage } from './containers/MealList';
import { CreateMeal } from './containers/CreateMeal';
import { ProviderListPage } from './containers/ProviderList';
import { OrderManagement } from './containers/OrderManagement';
import { TakeOutManagemnet } from './containers/TakeOutManagement';
import { PickProvider } from './containers/TakeOutManagement/pick-provider';
import { DetailInfo } from './containers/TakeOutManagement/detail-info';
import { CreateOrder } from './containers/CreateOrder';
import { CreateProviderPage } from './containers/CreateProvider/Loasdable';

export function App() {
  return (
    <>
      <Helmet titleTemplate="%s - Foodies" defaultTitle="Foodies">
        <meta name="description" content="A order service for meal." />
      </Helmet>

      <Switch>
        <AuthenticatedRoute exact path="/" component={HomePage} />
        <AuthenticatedRoute exact path="/meal-list" component={MealListPage} />
        <AuthenticatedRoute exact path="/create-meal" component={CreateMeal} />
        <AuthenticatedRoute
          exact
          path="/provider-list"
          component={ProviderListPage}
        />
        <AuthenticatedRoute
          exact
          path="/create-provider"
          component={CreateProviderPage}
        />
        <AuthenticatedRoute
          exact
          path="/order-management"
          component={OrderManagement}
        />
        <AuthenticatedRoute
          exact
          path="/order/create/pick-takeout"
          component={CreateOrder}
        />
        <AuthenticatedRoute
          exact
          path="/take-out-management"
          component={TakeOutManagemnet}
        />
        <AuthenticatedRoute
          exact
          path="/take-out/create/pick-provider"
          component={PickProvider}
        />
        <AuthenticatedRoute
          exact
          path="/take-out/create/detail-info"
          component={DetailInfo}
        />
        <UnauthenticatedRoute exact path="/sign-in" component={SignInPage} />
        <UnauthenticatedRoute exact path="/sign-up" component={SignUpPage} />
        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </>
  );
}
