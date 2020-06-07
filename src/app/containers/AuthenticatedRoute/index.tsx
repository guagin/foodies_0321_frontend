import React from 'react';
import { Route, Redirect, useLocation } from 'react-router-dom';
import { useTypedSelector } from 'store/reducers';

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
        <>
          <Component {...rest} />
        </>
      )}
    />
  );
};
