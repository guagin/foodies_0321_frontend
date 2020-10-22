import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { CssBaseline, Grid, Fab, makeStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { OrderList } from 'app/components/OrderList';
import { push } from 'connected-react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import { orderOfPageReducer } from './reducer';
import { fetchOrderOfPageFlow } from './saga';
import { createStructuredSelector } from 'reselect';
import {
  makeSelectIsRequest,
  makeSelectMessage,
  makeSelectOrders,
  makeSelectTakeOuts,
  makeSelectTotalCount,
} from './selector';
import { fetchOrderOfPage } from './action';
import { useTypedSelector } from 'store/reducers';

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
  orders: makeSelectOrders(),
  message: makeSelectMessage(),
  totalCount: makeSelectTotalCount(),
  takeOuts: makeSelectTakeOuts(),
});

export const OrderListPage = () => {
  useInjectReducer({
    key: 'orderOfPage',
    reducer: orderOfPageReducer,
  });

  useInjectSaga({
    key: 'orderOfPage',
    saga: fetchOrderOfPageFlow,
  });

  const { token } = useTypedSelector(state => state.me);
  const { users } = useTypedSelector(state => state.userOfIds);

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const classes = useStyles();

  const dispatch = useDispatch();

  const { isRequest, message, orders, totalCount, takeOuts } = useSelector(
    stateSelector,
  );

  const handleChangePage = newPage => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = newRowsPerPage => {
    setRowsPerPage(newRowsPerPage);
    setPage(0);
  };

  const handleClickAddIcon = () => {
    dispatch(push('/order/create/pick-takeout'));
  };

  useEffect(() => {
    dispatch(
      fetchOrderOfPage({
        page: page + 1,
        count: rowsPerPage,
        token,
      }),
    );
  }, [dispatch, page, rowsPerPage, token]);

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
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <OrderList
              isRequest={isRequest}
              orders={orders}
              users={users}
              takeOuts={takeOuts}
              page={page}
              rowsPerPage={rowsPerPage}
              totalCount={totalCount}
              handleChangePage={handleChangePage}
              handleChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </Grid>
        </Grid>

        <Fab
          color="primary"
          aria-label="add"
          className={classes.fab}
          onClick={handleClickAddIcon}
        >
          <AddIcon />
        </Fab>
      </div>
    </>
  );
};
