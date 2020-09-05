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
import { CreateOrder } from './containers/CreateOrder';
import { CreateProviderPage } from './containers/CreateProvider/Loadable';
import { TakeOutManagemnet } from './containers/CreateTakeOut';
import { DetailInfo } from './containers/CreateTakeOut/detail-info';
import { PickProvider } from './containers/CreateTakeOut/pick-provider';
import { OrderListPage } from './containers/OrderList/Loadable';
import { CreateOrderDetailPage } from './containers/CreateOrder/detail-info';

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
          path="/order-list"
          component={OrderListPage}
        />
        <AuthenticatedRoute
          exact
          path="/order/create/pick-takeout"
          component={CreateOrder}
        />
        <AuthenticatedRoute
          exact
          path="/order/create/detailPage"
          component={CreateOrderDetailPage}
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
