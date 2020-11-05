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
import { removeMeal, updateMealAmount } from './actions';
import { Meal, Product } from './reducer';

const ProductRow = ({
  product,
  meal,
}: {
  product: Product;
  meal: {
    id: string;
    name: string;
    price: number;
  };
}) => {
  const dispatch = useDispatch();

  const handleIncreaseClick = (mealId: string, amount: number) => {
    dispatch(updateMealAmount({ mealId, amount: amount + 1 }));
  };

  const handleDecreaseClick = (mealId: string, amount: number) => {
    dispatch(updateMealAmount({ mealId, amount: amount - 1 }));
  };

  const handleRemove = (mealId: string) => {
    dispatch(removeMeal({ mealId }));
  };

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
              handleIncreaseClick(meal.id, product.amount);
            }}
          >
            increase
          </Button>
          <Button
            size="small"
            onClick={() => {
              if (product.amount > 1) {
                handleDecreaseClick(meal.id, product.amount - 1);
              }
            }}
          >
            decrease
          </Button>
          <Button
            size="small"
            onClick={() => {
              handleRemove(meal.id);
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
  const getMeal = (id: string) => {
    const meal = meals.find(meal => meal.id === id);
    if (!meal) {
      return {
        id: '',
        name: '',
        price: 0,
      };
    }

    return meal;
  };

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
            <ProductRow product={product} meal={getMeal(product.id)} />
          ))}
        </Table>
      </TableContainer>
    </>
  );
};
