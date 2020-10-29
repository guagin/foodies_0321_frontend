import {
  CircularProgress,
  CssBaseline,
  Grid,
  makeStyles,
} from '@material-ui/core';
import React, { ReactElement, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import { createStructuredSelector } from 'reselect';
import { useTypedSelector } from 'store/reducers';

import { fetchProviderOfId } from './action';
import { ProviderCard } from './provider-card';
import { providerReducer } from './reducer';
import { providerFlow } from './saga';
import {
  makeSelectIsRequest,
  makeSelectMessage,
  makeSelectProvider,
} from './selector';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    marginLeft: theme.spacing(4),
    marginRight: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

const stateSelector = createStructuredSelector({
  isRequest: makeSelectIsRequest(),
  provider: makeSelectProvider(),
  message: makeSelectMessage(),
});

interface Props {
  computedMatch: ComputedMatch;
}

interface ComputedMatch {
  params: { providerId: string };
}

export const Provider: (props: Props) => ReactElement = ({
  computedMatch: {
    params: { providerId },
  },
}) => {
  useInjectReducer({ key: 'provider', reducer: providerReducer });
  useInjectSaga({ key: 'provider', saga: providerFlow });

  const classes = useStyles();

  const dispatch = useDispatch();
  const { token } = useTypedSelector(state => state.me);
  const { users } = useTypedSelector(state => state.userOfIds);
  const { isRequest, provider, message } = useSelector(stateSelector);

  useEffect(() => {
    dispatch(
      fetchProviderOfId({
        token,
        id: providerId,
      }),
    );
  }, [dispatch, providerId, token]);

  if (isRequest) {
    return (
      <>
        <CircularProgress />
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Provider Detail Page</title>
        <meta name="provider page" content="foodies provider page." />
      </Helmet>
      <CssBaseline />
      <div className={classes.paper}>
        <Grid container justify={'center'}>
          <Grid item xs={8} sm={8}>
            <ProviderCard provider={provider} users={users} />
          </Grid>
        </Grid>
      </div>
    </>
  );
};
