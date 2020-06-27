import React, { useState, useEffect } from 'react';
import {
  makeStyles,
  LinearProgress,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@material-ui/core';
import { useTypedSelector } from 'store/reducers';
import { useDispatch } from 'react-redux';
import { createFetchOrderOfPage } from 'store/order/action/fetch-order-of-page';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export const OrderList = () => {
  const classes = useStyles();

  const me = useTypedSelector(state => state.me);
  const orderOfPage = useTypedSelector(state => state.orderOfPage);

  const dispatch = useDispatch();
  const [rowsPerPage] = useState(10);
  const [page] = useState(1);

  useEffect(() => {
    dispatch(
      createFetchOrderOfPage({
        page: page,
        count: rowsPerPage,
        token: me.token,
      }),
    );
  }, [dispatch, me.token, page, rowsPerPage]);

  return (
    <>
      <LinearProgress hidden={!orderOfPage.isRequest} />
      <TableContainer component={Paper}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>id</TableRow>
          </TableHead>
          <TableBody>
            {orderOfPage.orders.map(order => (
              <TableRow key={order.id} hover>
                <TableCell>{order.id}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
