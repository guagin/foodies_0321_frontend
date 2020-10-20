import React, { useEffect } from 'react';
import {
  makeSelectIsRequest,
  makeSelectMessage,
  makeSelectTakeOutId,
  makeSelectProviderId,
  makeSelectMeals,
  makeSelectPickedMeals,
} from './selector';

import { makeStyles } from '@material-ui/core/styles';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'redux-injectors';
import { createOrderReducer } from './reducer';
import { useInjectSaga } from 'utils/redux-injectors';
import { createOrderFlow } from './saga';
import { useSelector, useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { Button, CssBaseline, Grid, TextField } from '@material-ui/core';

import { useTranslation } from 'react-i18next';
import {
  createOrder,
  fetchMeals,
  pickMeal,
  RemovePickedMeal,
  UpdatePickedMealAmount,
} from './action';
import { useTypedSelector } from 'store/reducers';
import { MealCards } from './meal-cards';
import { PickedMeal } from './picked-meals';

const useStyle = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    marginLeft: theme.spacing(4),
    marginRight: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
}));

const stateSelector = createStructuredSelector({
  isRequest: makeSelectIsRequest(),
  message: makeSelectMessage(),
  takeOutId: makeSelectTakeOutId(),
  providerId: makeSelectProviderId(),
  meals: makeSelectMeals(),
  pickedMeals: makeSelectPickedMeals(),
});

export const CreateOrderDetailPage = () => {
  const classes = useStyle();
  useInjectReducer({ key: 'createOrder', reducer: createOrderReducer });
  useInjectSaga({ key: 'createOrder', saga: createOrderFlow });

  const dispatch = useDispatch();

  const { t } = useTranslation();
  const { token } = useTypedSelector(state => state.me);

  const {
    isRequest,
    message,
    takeOutId,
    providerId,
    meals,
    pickedMeals,
  } = useSelector(stateSelector);

  const handleSubmit = event => {
    event.preventDefault();
    dispatch(
      createOrder({
        token,
        takeOutId,
        meals: pickedMeals,
      }),
    );
  };

  const handleChoose = meal => {
    //TODO: choose meal.
    console.log(meal);
    dispatch(pickMeal({ token, meal }));
  };

  const updateAmount = (id, amount) => {
    dispatch(UpdatePickedMealAmount({ id, amount }));
  };

  const remove = id => {
    dispatch(RemovePickedMeal({ id }));
  };

  useEffect(() => {
    dispatch(fetchMeals({ token, page: 1, count: 3, providerId }));
  }, [dispatch, providerId, token]);

  return (
    <>
      <Helmet>
        <title>Create Order Page</title>
        <meta name="description" content="foodies Create Order page." />
      </Helmet>
      <CssBaseline />
      <div className={classes.paper}>
        {message}
        <Grid container spacing={2} justify="center">
          <Grid item xs={6} sm={6}>
            <TextField
              id="takeOutId"
              required
              fullWidth
              value={takeOutId}
              disabled={true}
            />
          </Grid>
        </Grid>
      </div>
      <div className={classes.paper}>
        <Grid container spacing={2} justify="flex-start">
          <Grid item xs={12} sm={12}>
            <PickedMeal
              meals={pickedMeals}
              updateAmount={updateAmount}
              remove={remove}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} justify="flex-end">
          <Grid item xs={1} sm={1}>
            <Button size="large" onClick={handleSubmit}>
              submit
            </Button>
          </Grid>
        </Grid>
      </div>

      <div className={classes.paper}>
        <MealCards
          meals={meals}
          isRequest={isRequest}
          onClickChoose={handleChoose}
        />
      </div>
    </>
  );
};
