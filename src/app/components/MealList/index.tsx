import React, { useEffect, useState } from 'react';
import { useTypedSelector } from 'store/reducers';
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
} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { fetchMealsCreator } from 'store/menu/action/fetch-meals';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export const MealList = () => {
  const classes = useStyles();

  const menu = useTypedSelector(state => state.menu);
  const me = useTypedSelector(state => state.me);
  const dispatch = useDispatch();

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  useEffect(() => {
    dispatch(
      fetchMealsCreator({
        page: page + 1,
        count: rowsPerPage,
        token: me.token,
      }),
    );
  }, [dispatch, me.token, page, rowsPerPage]);

  const { totalCount } = menu;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  return (
    <>
      <LinearProgress hidden={!menu.isRequest} />
      <TableContainer component={Paper}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell> id </TableCell>
              <TableCell> name </TableCell>
              <TableCell> description </TableCell>
              <TableCell> price </TableCell>
              <TableCell> provider </TableCell>
              <TableCell> createdBy </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {menu.meals.map(meal => (
              <TableRow key={meal.id} hover>
                <TableCell>{meal.id}</TableCell>
                <TableCell>{meal.name}</TableCell>
                <TableCell>{meal.description}</TableCell>
                <TableCell>{meal.price}</TableCell>
                <TableCell>{meal.provider}</TableCell>
                <TableCell>{meal.createdBy}</TableCell>
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
