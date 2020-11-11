import React from 'react';
import {
  Box,
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
import { Takeout } from '../EditOrder/reducer';
import { useTranslation } from 'react-i18next';
import { green } from '@material-ui/core/colors';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';

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

const TakeoutTitle = ({ takeout }: { takeout?: Takeout }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const classes = useStyles();
  if (!takeout) {
    return <></>;
  }

  const handleClickOnTitle = () => {
    dispatch(push(`/takeout/ofId/${takeout.id}`));
  };

  return (
    <Box display="flex" flexDirection="row">
      <Box>
        <Typography className={classes.inline} color="textSecondary">
          {`${t('orderDetailPage.ofTakeout')}`}
        </Typography>
      </Box>
      <Box>
        <Typography
          className={classes.inline}
          style={{
            paddingLeft: '10px',
            color: green[500],
            textDecoration: 'underline',
          }}
          onClick={() => handleClickOnTitle()}
        >
          {takeout.title}
        </Typography>
      </Box>
    </Box>
  );
};

export const OrderDeatailCard = ({
  order,
  meals,
  users,
  takeout,
}: {
  order?: Order;
  meals: Meal[];
  users: User[];
  takeout?: Takeout;
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

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
        {t('orderDetailPage.head')}
      </Typography>
      <Card className={classes.root} variant="outlined">
        <CardContent>
          <Typography className={classes.inline} color="textSecondary">
            {getUserName()}
          </Typography>
          <TakeoutTitle takeout={takeout} />
        </CardContent>
      </Card>
      <div
        style={{
          marginTop: '20px',
        }}
      >
        <Typography className={classes.inline} color="textSecondary">
          {t('orderDetailPage.products')}
        </Typography>
        <Card className={classes.root} variant="outlined">
          <CardContent>
            <ListProduct products={order.products} meals={meals} />
          </CardContent>
        </Card>
      </div>
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
          {product.amount}
        </Typography>
        <Typography className={classes.inline} color="textSecondary">
          {product.note}
        </Typography>
        <Typography className={classes.inline} color="textSecondary">
          {product.note}
        </Typography>
      </div>
    </>
  );
};
