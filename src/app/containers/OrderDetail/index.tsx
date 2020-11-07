import { CssBaseline, Fab, Grid, makeStyles } from '@material-ui/core';
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
import EditIcon from '@material-ui/icons/Edit';
import { push } from 'connected-react-router';
import moment from 'moment';

const useStyle = makeStyles(theme => ({
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
  message: makeSelectMessage(),
  order: makeSelectOrder(),
  takeout: makeSelectTakeOut(),
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

  const { token, id: selfId } = useTypedSelector(state => state.me);
  const { order, meals, users, takeout } = useSelector(stateSelector);
  const { orderId: id } = computedMatch.params;

  const isTakeoutAvailable = () => {
    if (!takeout) {
      return false;
    }
    const current = new Date();
    const statedAt = moment(takeout.startedAt).toDate();
    const endAt = moment(takeout.endAt).toDate();
    return (
      statedAt.getTime() <= current.getTime() &&
      current.getTime() < endAt.getTime()
    );
  };

  const isTakeoutOwner = () => {
    if (!takeout) {
      return false;
    }

    return takeout.createdBy === selfId;
  };

  const isOrderOwner = () => {
    if (!order) {
      return false;
    }

    return order.created === selfId;
  };

  const isEditable = () => {
    if (isTakeoutOwner()) {
      return true;
    }

    if (isTakeoutAvailable() && isOrderOwner()) {
      return true;
    }

    return false;
  };

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
            <OrderDeatailCard
              order={order}
              meals={meals}
              users={users}
              takeout={takeout}
            />
          </Grid>
        </Grid>
        <Fab
          color="primary"
          className={classes.fab}
          onClick={() => {
            dispatch(push(`/order/edit/${order.id}`));
          }}
          disabled={!isEditable()}
        >
          <EditIcon />
        </Fab>
      </div>
    </>
  );
};
