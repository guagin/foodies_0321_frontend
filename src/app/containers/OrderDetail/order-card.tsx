import React from 'react';
import {
  Card,
  CardContent,
  CircularProgress,
  createStyles,
  Divider,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core';

import { Meal, Order, Product } from './reducer';
import { User } from 'store/users-of-ids/reducer';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(2),
      minWidth: 275,
    },
    title: {
      fontSize: 26,
    },
    subTitle: {
      marginBottom: 12,
    },
    inline: {
      marginBottom: 12,
    },
    divier: {
      marginBottom: theme.spacing(2),
    },
  }),
);

const statusMap = ['pended', 'placed', 'canceled'];

export const OrderDeatailCard = ({
  order,
  meals,
  users,
}: {
  order?: Order;
  meals: Meal[];
  users: User[];
}) => {
  const classes = useStyles();

  if (!order) {
    return (
      <>
        <CircularProgress />
      </>
    );
  }

  const getUserName = () => {
    return users.length > 0 ? users[0].name : '';
  };

  return (
    <div>
      <Typography className={classes.title} color="textSecondary">
        basicInfo
      </Typography>
      <Card className={classes.root} variant="outlined">
        <CardContent>
          <Typography
            className={classes.subTitle}
            color="textSecondary"
            gutterBottom
            variant="h5"
            component="h2"
          >
            orderId
          </Typography>
          <Typography
            className={classes.subTitle}
            color="textSecondary"
            gutterBottom
            variant="h5"
            component="h2"
          >
            {order.id}
          </Typography>
          <Typography className={classes.inline} color="textSecondary">
            createdBy
          </Typography>
          <Typography className={classes.inline} color="textSecondary">
            {getUserName()}
          </Typography>
          <Typography className={classes.inline} color="textSecondary">
            status
          </Typography>
          <Typography className={classes.inline} color="textSecondary">
            {statusMap[order.status]}
          </Typography>
          <Typography className={classes.inline} color="textSecondary">
            takeOutId
          </Typography>
          <Typography className={classes.inline} color="textSecondary">
            {order.takeOutId}
          </Typography>
        </CardContent>
      </Card>
      <Typography className={classes.inline} color="textSecondary">
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

  return (
    <>
      {products.map((product, indx) => {
        if (indx < products.length - 1) {
          return (
            <>
              <ProductCard product={product} meal={getMeal(product.id)} />
              <Divider className={classes.divier} />
            </>
          );
        }
        return <ProductCard product={product} meal={getMeal(product.id)} />;
      })}
    </>
  );
};

const ProductCard = ({ product, meal }: { product: Product; meal?: Meal }) => {
  const classes = useStyles();

  const getName = (id: string) => (meal ? meal.name : '');

  const getDes = (id: string) => (meal ? meal.description : '');

  return (
    <>
      <div key={product.id}>
        <Typography className={classes.inline} color="textSecondary">
          {getName(product.id)}
        </Typography>
        <Typography className={classes.inline} color="textSecondary">
          description
        </Typography>
        <Typography className={classes.inline} color="textSecondary">
          {getDes(product.id)}
        </Typography>
        <Typography className={classes.inline} color="textSecondary">
          amount
        </Typography>
        <Typography className={classes.inline} color="textSecondary">
          {product.amount}
        </Typography>
        <Typography className={classes.inline} color="textSecondary">
          note
        </Typography>
        <Typography className={classes.inline} color="textSecondary">
          {product.note}
        </Typography>
      </div>
    </>
  );
};
