import React, { useEffect, useState } from 'react';
import {
  TableContainer,
  Paper,
  makeStyles,
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TablePagination,
  LinearProgress,
  CircularProgress,
} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { fetchUserOfIdsCreator } from 'store/users-of-ids/action/fetch-users-of-id';
import { MeState } from 'store/me/reducer';
import { UsersOfIdsState } from 'store/users-of-ids/reducer';
import { fetchMeals } from 'app/containers/MealList/action';
import { Meal, Provider } from 'app/containers/MealList/reducer';
import { find } from 'lodash';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export const MealList = ({
  isRequest,
  message,
  meals,
  totalCount,
  me,
  userOfIds,
  providers,
}: {
  isRequest: boolean;
  message: string;
  meals: Meal[];
  totalCount: number;
  me: MeState;
  userOfIds: UsersOfIdsState;
  providers: Provider[];
}) => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  useEffect(() => {
    dispatch(
      fetchMeals({
        page: page + 1,
        count: rowsPerPage,
        token: me.token,
      }),
    );
  }, [dispatch, me.token, page, rowsPerPage]);

  useEffect(() => {
    dispatch(
      fetchUserOfIdsCreator({
        token: me.token,
        ids: meals.map(data => data.createdBy),
      }),
    );
  }, [dispatch, me.token, meals]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  const showUserName = (userId: string) => {
    if (userOfIds.isRequest) {
      return <CircularProgress />;
    }
    const user = userOfIds.users.find(user => user.id === userId);
    return user ? user.name : `not found this user's namn: ${userId}`;
  };

  const getProviderName: (id: string) => string = id => {
    const provider = find(providers, e => e.id === id);

    return provider ? provider.name : 'not found';
  };

  return (
    <>
      <LinearProgress hidden={!isRequest} />
      <TableContainer component={Paper}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell> name </TableCell>
              <TableCell> description </TableCell>
              <TableCell> price </TableCell>
              <TableCell> provider </TableCell>
              <TableCell> createdBy </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {meals.map(meal => (
              <TableRow key={meal.id} hover>
                <TableCell>{meal.name}</TableCell>
                <TableCell>{meal.description}</TableCell>
                <TableCell>{meal.price}</TableCell>
                <TableCell>{getProviderName(meal.provider)}</TableCell>
                <TableCell>{showUserName(meal.createdBy)}</TableCell>
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
