import React from 'react';
import { Route } from 'react-router-dom';

interface Props {
  exact?: boolean;
  path: string;
  component: React.ComponentType<any>;
}

export const UnauthenticatedRoute = ({
  component: Component,
  ...rest
}: Props) => {
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
