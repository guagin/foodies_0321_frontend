import { CssBaseline, Grid, makeStyles } from '@material-ui/core';
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import { createStructuredSelector } from 'reselect';
import { useTypedSelector } from 'store/reducers';

import { fetchOrder } from './actions';
import { OrderBasicInfo } from './order-basic-info';
import { Products } from './products';
import { editOrderReducer } from './reducer';
import { editOrderFlow } from './saga';
import {
  makeSelectOrder,
  makeSelectProvider,
  makeSelectTakeout,
  makeSelectUser,
} from './selector';

const useStyle = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    marginLeft: theme.spacing(4),
    marginRight: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

interface Props {
  computedMatch: ComputedMatch;
}

interface ComputedMatch {
  params: { orderId: string };
}

const stateSelector = createStructuredSelector({
  order: makeSelectOrder(),
  takeout: makeSelectTakeout(),
  provider: makeSelectProvider(),
  user: makeSelectUser(),
});

export const EditOrder: (props: Props) => React.ReactElement = ({
  computedMatch: {
    params: { orderId },
  },
}) => {
  useInjectReducer({ key: 'editOrder', reducer: editOrderReducer });
  useInjectSaga({ key: 'editOrder', saga: editOrderFlow });

  const classes = useStyle();
  const dispatch = useDispatch();
  const { token } = useTypedSelector(state => state.me);
  const { order, takeout, provider, user } = useSelector(stateSelector);

  useEffect(() => {
    dispatch(
      fetchOrder({
        token,
        orderId,
      }),
    );
  }, [dispatch, token, orderId]);

  return (
    <>
      <Helmet>
        <title>Edit order Page</title>
        <meta name="edit order page" content="foodies edit order page." />
      </Helmet>
      <CssBaseline />
      <div className={classes.paper}>
        <Grid container justify={'center'}>
          <Grid item xs={8} sm={8}>
            <OrderBasicInfo
              order={order}
              takeout={takeout}
              provider={provider}
            />
          </Grid>
        </Grid>
        <Grid container justify={'center'}>
          <Grid item xs={8} sm={8}>
            <Products products={order ? order.products : []} meals={[]} />
          </Grid>
        </Grid>
      </div>
    </>
  );
};
