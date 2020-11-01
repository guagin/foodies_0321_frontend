import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Switch, Route } from 'react-router-dom';

import { GlobalStyle } from 'styles/global-styles';

import { HomePage } from './containers/HomePage/Loadable';
import { NotFoundPage } from './components/NotFoundPage/Loadable';

import { SignUpPage } from './containers/SignUpPage';
import { SignInPage } from './containers/SignInPage';
import { AuthenticatedRoute } from './containers/AuthenticatedRoute';
import { UnauthenticatedRoute } from './containers/UnauthentiactedRoute';
import { MealListPage } from './containers/MealList';
import { ProviderListPage } from './containers/ProviderList';
import { CreateOrder } from './containers/CreateOrder';
import { CreateProviderPage } from './containers/CreateProvider/Loadable';
import { DetailInfo } from './containers/CreateTakeOut/detail-info';
import { OrderListPage } from './containers/OrderList';
import { CreateOrderDetailPage } from './containers/CreateOrder/detail';
import { CreateTakeOut } from './containers/CreateTakeOut/Loadable';
import { TakeOutList } from './containers/TakeOutList';
import { OrderDetail } from './containers/OrderDetail';
import { PickProvider } from './containers/CreateMeal/pick-provider';
import { CreateMealForm } from './containers/CreateMeal/create-meal-form';
import { Provider } from './containers/Provider';
import { Meal } from './containers/Meal';
import { CreateMeal } from './containers/Provider/create-meal';
import { EditMeal } from './containers/Meal/edit-meal';
import { TakeoutPage } from './containers/Takeout';

export function App() {
  return (
    <>
      <Helmet titleTemplate="%s - Foodies" defaultTitle="Foodies">
        <meta name="description" content="A order service for meal." />
      </Helmet>

      <Switch>
        <AuthenticatedRoute exact path="/" component={HomePage} />
        <AuthenticatedRoute exact path="/meal-list" component={MealListPage} />
        <AuthenticatedRoute
          exact
          path="/create-meal/pick-provider"
          component={PickProvider}
        />
        <AuthenticatedRoute
          exact
          path="/create-meal/form"
          component={CreateMealForm}
        />
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
          path="/order/create/detail"
          component={CreateOrderDetailPage}
        />
        <AuthenticatedRoute
          exact
          path="/take-out/list"
          component={TakeOutList}
        />
        <AuthenticatedRoute
          exact
          path="/take-out/create"
          component={CreateTakeOut}
        />
        <AuthenticatedRoute
          exact
          path="/take-out/create/detail-info"
          component={DetailInfo}
        />
        <AuthenticatedRoute
          path="/order/ofId/:orderId"
          component={OrderDetail}
        />
        <AuthenticatedRoute
          path="/provider/ofId/:providerId"
          component={Provider}
        />
        <AuthenticatedRoute path="/meal/ofId/:id" component={Meal} />
        <AuthenticatedRoute
          path="/provider/:id/createMeal/"
          component={CreateMeal}
        />
        <AuthenticatedRoute path="/meal/:id/edit" component={EditMeal} />

        <AuthenticatedRoute path="/takeout/ofId/:id" component={TakeoutPage} />

        <UnauthenticatedRoute exact path="/sign-in" component={SignInPage} />
        <UnauthenticatedRoute exact path="/sign-up" component={SignUpPage} />
        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </>
  );
}
