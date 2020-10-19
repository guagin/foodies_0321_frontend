import React from 'react';
import {
  Button,
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';

export const PickedMeal = ({
  meals,
  updateAmount,
}: {
  meals: {
    id: string;
    name: string;
    price: number;
    amount: number;
  }[];
  updateAmount: (id: string, amount: number) => void;
}) => {
  return (
    <>
      <TableContainer>
        <Table component={Paper}>
          <TableHead>
            <TableRow>
              <TableCell>name</TableCell>
              <TableCell>price</TableCell>
              <TableCell>amount</TableCell>
              <TableCell>operation</TableCell>
            </TableRow>
          </TableHead>
          {meals.map(meal => (
            <TableRow>
              <TableCell>{meal.name}</TableCell>
              <TableCell>{meal.price}</TableCell>
              <TableCell>{meal.amount}</TableCell>
              <TableCell>
                <Button
                  size="small"
                  onClick={() => {
                    updateAmount(meal.id, meal.amount + 1);
                  }}
                >
                  increase
                </Button>
                <Button
                  size="small"
                  onClick={() => {
                    updateAmount(meal.id, meal.amount - 1);
                  }}
                >
                  increase
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </Table>
      </TableContainer>
    </>
  );
};
