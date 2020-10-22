import { CssBaseline, Grid, makeStyles } from '@material-ui/core';
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import { createStructuredSelector } from 'reselect';
import { useTypedSelector } from 'store/reducers';
import { makeSelectMessage } from '../SignUpPage/selector';
import { fetchOrderOfId } from './action';
import { OrderDeatailCard } from './order-card';
import { orderDetailReducer } from './reducer';
import { fetchOrderDetailFlow } from './saga';
import {
  makeSelectIsRequest,
  makeSelectMeals,
  makeSelectOrder,
  makeSelectTakeOut,
  makeSelectUsers,
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

const stateSelector = createStructuredSelector({
  isRequest: makeSelectIsRequest(),
  message: makeSelectMessage(),
  order: makeSelectOrder(),
  takeOut: makeSelectTakeOut(),
  meals: makeSelectMeals(),
  users: makeSelectUsers(),
});

export const OrderDetail = ({
  computedMatch,
}: {
  computedMatch: { params: { orderId: string } };
}) => {
  useInjectReducer({
    key: 'orderDetail',
    reducer: orderDetailReducer,
  });

  useInjectSaga({
    key: 'orderDetail',
    saga: fetchOrderDetailFlow,
  });

  const classes = useStyle();

  const dispatch = useDispatch();

  const { token } = useTypedSelector(state => state.me);
  const { order, meals, users } = useSelector(stateSelector);
  const { orderId: id } = computedMatch.params;

  useEffect(() => {
    dispatch(
      fetchOrderOfId({
        token,
        id,
      }),
    );
  }, [token, id, dispatch]);

  return (
    <>
      <Helmet>
        <title>Provider Management Page</title>
        <meta
          name="provider management page"
          content="foodies provider management page."
        />
      </Helmet>
      <CssBaseline />
      <div className={classes.paper}>
        <Grid container justify={'center'}>
          <Grid item xs={8} sm={8}>
            <OrderDeatailCard order={order} meals={meals} users={users} />
          </Grid>
        </Grid>
      </div>
    </>
  );
};
