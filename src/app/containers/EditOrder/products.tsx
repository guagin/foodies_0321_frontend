import {
  Button,
  CircularProgress,
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateMealAmount } from './actions';
import { Meal, Product } from './reducer';

const ProductRow = ({ product, meal }: { product: Product; meal?: Meal }) => {
  const dispatch = useDispatch();

  const updateAmount = (mealId: string, amount: number) => {
    dispatch(updateMealAmount({ mealId, amount }));
  };

  if (!meal) {
    return <CircularProgress />;
  }

  return (
    <>
      <TableRow>
        <TableCell>{meal.name}</TableCell>
        <TableCell>{meal.price}</TableCell>
        <TableCell>{product.amount}</TableCell>
        <TableCell>
          <Button
            size="small"
            onClick={() => {
              updateAmount(meal.id, product.amount + 1);
            }}
          >
            increase
          </Button>
          <Button
            size="small"
            onClick={() => {
              if (product.amount > 1) {
                updateAmount(meal.id, product.amount - 1);
              }
            }}
          >
            decrease
          </Button>
          <Button
            size="small"
            onClick={() => {
              //   remove(meal.id);
            }}
          >
            remove
          </Button>
        </TableCell>
      </TableRow>
    </>
  );
};

export const Products = ({
  products,
  meals,
}: {
  products: Product[];
  meals: Meal[];
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
          {products.map(product => (
            <ProductRow
              product={product}
              meal={meals.find(meal => meal.id === product.id)}
            />
          ))}
        </Table>
      </TableContainer>
    </>
  );
};
