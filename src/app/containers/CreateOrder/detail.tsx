import React, { useEffect } from 'react';
import {
  makeSelectIsRequest,
  makeSelectMessage,
  makeSelectTakeOutId,
  makeSelectProviderId,
  makeSelectMeals,
} from './selector';

import { makeStyles } from '@material-ui/core/styles';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'redux-injectors';
import { createOrderReducer } from './reducer';
import { useInjectSaga } from 'utils/redux-injectors';
import { createOrderFlow } from './saga';
import { useSelector, useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { CssBaseline, Grid, TextField } from '@material-ui/core';

import { useTranslation } from 'react-i18next';
import { fetchMeals, pickMeal } from './action';
import { useTypedSelector } from 'store/reducers';
import { MealCards } from './meail-cards';

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
});

export const CreateOrderDetailPage = () => {
  const classes = useStyle();
  useInjectReducer({ key: 'createOrder', reducer: createOrderReducer });
  useInjectSaga({ key: 'createOrder', saga: createOrderFlow });

  const dispatch = useDispatch();

  const { t } = useTranslation();
  const { token } = useTypedSelector(state => state.me);

  const { isRequest, message, takeOutId, providerId, meals } = useSelector(
    stateSelector,
  );

  const handleSubmit = event => {
    event.preventDefault();
  };

  const handleChoose = meal => {
    //TODO: choose meal.
    console.log(meal);
    dispatch(pickMeal({ token, meal }));
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
            <form className={classes.form} onSubmit={handleSubmit}>
              <TextField
                id="takeOutId"
                required
                fullWidth
                value={takeOutId}
                disabled={true}
              />
            </form>
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
