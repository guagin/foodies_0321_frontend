import React from 'react';
import {
  Card,
  CardContent,
  CircularProgress,
  createStyles,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core';

import { Meal, Order, Product } from './reducer';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(2),
      minWidth: 275,
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  }),
);

const statusMap = ['pended', 'placed', 'canceled'];

export const OrderDeatailCard = ({
  order,
  meals,
}: {
  order?: Order;
  meals: Meal[];
}) => {
  const classes = useStyles();
  if (!order) {
    return (
      <>
        <CircularProgress />
      </>
    );
  }
  return (
    <div>
      <Typography className={classes.pos} color="textSecondary">
        basicInfo
      </Typography>
      <Card className={classes.root} variant="outlined">
        <CardContent>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
            variant="h5"
            component="h2"
          >
            orderId
          </Typography>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
            variant="h5"
            component="h2"
          >
            {order.id}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            createdBy
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            {order.createdBy}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            status
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            {statusMap[order.status]}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            {order.takeOutId}
          </Typography>
        </CardContent>
      </Card>
      <Typography className={classes.pos} color="textSecondary">
        products
      </Typography>
      <Card className={classes.root} variant="outlined">
        <CardContent>
          <ListProduct products={order.products} meals={meals} />
        </CardContent>
      </Card>
    </div>
  );
};

const ListProduct = ({
  products,
  meals,
}: {
  products: Product[];
  meals: Meal[];
}) => {
  const classes = useStyles();

  const getMeal = (id: string) => meals.find(e => e.id === id);
  const getName = (id: string) => {
    const meal = getMeal(id);

    return meal ? meal.name : '';
  };

  const getDes = (id: string) => {
    const meal = getMeal(id);

    return meal ? meal.description : '';
  };

  return (
    <>
      {products.map(product => (
        <div key={product.id}>
          <Typography className={classes.pos} color="textSecondary">
            {getName(product.id)}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            description
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            {getDes(product.id)}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            amount
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            {product.amount}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            note
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            {product.note}
          </Typography>
        </div>
      ))}
    </>
  );
};
