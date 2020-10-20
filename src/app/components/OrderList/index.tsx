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
  TablePagination,
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
  const { isRequest, totalCount, orders } = useTypedSelector(
    state => state.orderOfPage,
  );

  const dispatch = useDispatch();
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  useEffect(() => {
    dispatch(
      createFetchOrderOfPage({
        page: page + 1,
        count: rowsPerPage,
        token: me.token,
      }),
    );
  }, [dispatch, me.token, page, rowsPerPage]);

  return (
    <>
      <LinearProgress hidden={!isRequest} />
      <TableContainer component={Paper}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>createBy</TableCell>
              <TableCell>takeOutId</TableCell>
              <TableCell>status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map(order => (
              <TableRow key={order.id} hover onClick={() => {}}>
                <TableCell>{order.createdBy}</TableCell>
                <TableCell>{order.takeOutId}</TableCell>
                <TableCell>{order.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        page={page}
        component="div"
        count={totalCount}
        rowsPerPage={rowsPerPage}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </>
  );
};
