import { CssBaseline, Grid, makeStyles, Typography } from '@material-ui/core';
import { PickedMeal } from 'app/components/PickedMeal';
import { find, reduce } from 'lodash';
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import { createStructuredSelector } from 'reselect';
import { useTypedSelector } from 'store/reducers';

import { fetchOrder, removeMeal, updateMealAmount } from './actions';
import { MealCards } from './meal-cards';
import { editOrderReducer } from './reducer';
import { editOrderFlow } from './saga';
import {
  makeSelectCreateMealUsers,
  makeSelectMeals,
  makeSelectOrder,
  makeSelectProvider,
  makeSelectTakeout,
  makeSelectUser,
} from './selector';

const useStyle = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    marginLeft: theme.spacing(4),
    marginRight: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  root: {
    backgroundColor: theme.palette.background.paper,
    width: '100%',
  },
}));

interface Props {
  computedMatch: ComputedMatch;
}

interface ComputedMatch {
  params: { orderId: string };
}

const stateSelector = createStructuredSelector({
  order: makeSelectOrder(),
  takeout: makeSelectTakeout(),
  provider: makeSelectProvider(),
  user: makeSelectUser(),
  meals: makeSelectMeals(),
  createMealUsers: makeSelectCreateMealUsers(),
});

export const EditOrder: (props: Props) => React.ReactElement = ({
  computedMatch: {
    params: { orderId },
  },
}) => {
  useInjectReducer({ key: 'editOrder', reducer: editOrderReducer });
  useInjectSaga({ key: 'editOrder', saga: editOrderFlow });

  const classes = useStyle();
  const dispatch = useDispatch();
  const { token } = useTypedSelector(state => state.me);
  const { order, takeout, provider, meals, createMealUsers } = useSelector(
    stateSelector,
  );
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(
      fetchOrder({
        token,
        orderId,
      }),
    );
  }, [dispatch, token, orderId]);

  const updateAmount = (index, amount) => {
    dispatch(updateMealAmount({ index, amount }));
  };

  const remove = index => {
    dispatch(removeMeal({ index }));
  };

  const handleSubmit = () => {
    // dispatch(
    //   createOrder({
    //     token,
    //     takeOutId: takeoutId,
    //     meals: pickedMeals,
    //   }),
    // );
  };

  const pickedMeals: () => {
    id: string;
    name: string;
    price: number;
    amount: number;
    description: string;
    note: string;
  }[] = () => {
    if (!order) {
      return [];
    }

    return reduce(
      order.products,
      (accu, product) => {
        const meal = find(meals, e => e.id === product.id);
        if (meal) {
          accu.push({
            ...meal,
            ...product,
          });
        }

        return accu;
      },
      [] as {
        id: string;
        name: string;
        price: number;
        amount: number;
        description: string;
        note: string;
      }[],
    );
  };

  return (
    <>
      <Helmet>
        <title>{t('orderEditPage.title')}</title>
        <meta name="edit order page" content="foodies edit order page." />
      </Helmet>
      <CssBaseline />
      <div className={classes.paper}>
        <Grid container justify={'center'}>
          <Grid item xs={12} sm={12}>
            <PickedMeal
              meals={pickedMeals()}
              updateAmount={updateAmount}
              remove={remove}
              onSubmit={handleSubmit}
            />
          </Grid>
        </Grid>
      </div>
      <div className={classes.paper}>
        <MealCards meals={meals} users={createMealUsers} />
      </div>
    </>
  );
};
