import React, { useState } from 'react';
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
import { Order } from 'app/containers/OrderList/reducer';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export const OrderList = ({
  isRequest,
  orders,
  totalCount,
  page,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
}: {
  isRequest: boolean;
  orders: Order[];
  totalCount: number;
  page: number;
  rowsPerPage: number;
  handleChangePage: (newPage: number) => void;
  handleChangeRowsPerPage: (newRowsPerPage) => void;
}) => {
  const classes = useStyles();

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
        onChangePage={(event, newPage) => {
          handleChangePage(newPage);
        }}
        onChangeRowsPerPage={event => {
          handleChangeRowsPerPage(event.target.value);
        }}
      />
    </>
  );
};
