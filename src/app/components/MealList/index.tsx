import React, { useEffect } from 'react';
import { useTypedSelector } from 'store/reducers';
import {
  CircularProgress,
  TableContainer,
  Paper,
  makeStyles,
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
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

  useEffect(() => {
    dispatch(
      fetchMealsCreator({
        page: 1,
        count: 10,
        token: me.token,
      }),
    );
  }, [dispatch, me.token]);

  const progressCirlcle = () => {
    if (menu.isRequest) {
      return <CircularProgress />;
    }
    return <></>;
  };

  return (
    <>
      {progressCirlcle()}
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
              <TableRow key={meal.id}>
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
    </>
  );
};
