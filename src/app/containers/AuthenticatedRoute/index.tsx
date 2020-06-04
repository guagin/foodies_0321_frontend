import React from 'react';
import { Route } from 'react-router-dom';
import { useTypedSelector } from 'store/reducers';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
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
  const dispatch = useDispatch();

  if (!me.token) {
    dispatch(push('/sign-in'));
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
