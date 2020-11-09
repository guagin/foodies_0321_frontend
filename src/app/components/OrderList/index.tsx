import React from 'react';
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
import { User } from 'store/users-of-ids/reducer';

import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { Takeout } from 'app/containers/TakeoutList/take-out';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const statusMap = ['pended', 'placed', 'canceled'];

export const OrderList = ({
  isRequest,
  orders,
  users,
  takeOuts,
  totalCount,
  page,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
}: {
  isRequest: boolean;
  orders: Order[];
  users: User[];
  takeOuts: Takeout[];
  totalCount: number;
  page: number;
  rowsPerPage: number;
  handleChangePage: (newPage: number) => void;
  handleChangeRowsPerPage: (newRowsPerPage) => void;
}) => {
  const classes = useStyles();

  const getUserFrom = (id: string) => {
    const foundUser = users.find(e => e.id === id);
    return foundUser;
  };

  const getUserName = (user?: User) => {
    return user ? user.name : '';
  };

  const getTakeOutFrom = (id: string) => {
    const found = takeOuts.find(e => e.id === id);
    return found;
  };

  const getTakeOutTitle = (takeOut?: Takeout) => {
    return takeOut ? takeOut.title : '';
  };

  const dispatch = useDispatch();

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
              <TableRow
                key={order.id}
                hover
                onClick={() => {
                  dispatch(push(`/order/ofId/${order.id}`));
                }}
              >
                <TableCell>
                  {getUserName(getUserFrom(order.createdBy))}
                </TableCell>
                <TableCell>
                  {getTakeOutTitle(getTakeOutFrom(order.takeOutId))}
                </TableCell>
                <TableCell>{statusMap[order.status]}</TableCell>
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
