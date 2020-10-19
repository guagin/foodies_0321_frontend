import React from 'react';
import {
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';

import { Meal } from '../MealList/meal';

export const PickedMeal = ({ meals }: { meals: Meal[] }) => {
  return (
    <>
      <TableContainer>
        <Table component={Paper}>
          <TableHead>
            <TableRow>
              <TableCell>name</TableCell>
              <TableCell>price</TableCell>
              <TableCell>amount</TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>
    </>
  );
};
