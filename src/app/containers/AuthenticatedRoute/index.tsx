import React from 'react';
import {
  Route,
  Redirect,
  useLocation,
  useParams,
  useRouteMatch,
} from 'react-router-dom';
import { useTypedSelector } from 'store/reducers';
import { AppDrawer } from 'app/components/Drawer';

interface Props {
  exact?: boolean;
  path: string;
  component: React.ComponentType<any>;
}

export const AuthenticatedRoute = ({
  component: Component,
  ...rest
}: Props) => {
  const me = useTypedSelector(state => state.me);
  const location = useLocation();

  if (!me.token) {
    return (
      <Redirect
        to={{
          pathname: '/sign-in',
          state: { from: location },
        }}
      />
    );
  }

  return (
    <Route
      render={() => (
        <AppDrawer>
          <Component {...rest} />
        </AppDrawer>
      )}
    />
  );
};
