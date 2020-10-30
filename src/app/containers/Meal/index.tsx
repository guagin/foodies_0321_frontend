import {
  CircularProgress,
  CssBaseline,
  Grid,
  makeStyles,
} from '@material-ui/core';
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { useInjectReducer } from 'redux-injectors';
import { createStructuredSelector } from 'reselect';
import { useTypedSelector } from 'store/reducers';
import { useInjectSaga } from 'utils/redux-injectors';
import { fetchMealOfId } from './action';
import { MealCard } from './meal-card';

import { mealReducer } from './reducer';
import { MealFlow } from './saga';
import {
  makeSelectIsRequest,
  makeSelectMeal,
  makeSelectMessage,
} from './selector';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    marginLeft: theme.spacing(4),
    marginRight: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  root: {
    marginTop: theme.spacing(2),
    minWidth: 275,
  },
}));

interface Props {
  computedMatch: ComputedMatch;
}

interface ComputedMatch {
  params: { id: string };
}

const stateSelector = createStructuredSelector({
  isRequest: makeSelectIsRequest(),
  message: makeSelectMessage(),
  meal: makeSelectMeal(),
});

export const Meal: (props: Props) => React.ReactElement = ({
  computedMatch: {
    params: { id },
  },
}) => {
  useInjectReducer({ key: 'meal', reducer: mealReducer });
  useInjectSaga({ key: 'meal', saga: MealFlow });

  const classes = useStyles();
  const dispatch = useDispatch();
  const { token } = useTypedSelector(state => state.me);
  const { users } = useTypedSelector(state => state.userOfIds);
  const { isRequest, message, meal } = useSelector(stateSelector);

  useEffect(() => {
    dispatch(
      fetchMealOfId({
        token,
        id,
      }),
    );
  }, [id, token, dispatch]);

  if (isRequest) {
    return (
      <>
        <Helmet>
          <title>Provider Detail Page</title>
          <meta name="meal detail page" content="foodies meal detail page." />
        </Helmet>
        <CssBaseline />
        <div className={classes.paper}>
          <CircularProgress />
        </div>
      </>
    );
  }

  console.log(meal);

  return (
    <>
      <Helmet>
        <title>Provider Detail Page</title>
        <meta name="meal detail page" content="foodies meal detail page." />
      </Helmet>
      <CssBaseline />
      <div className={classes.paper}>
        <Grid container justify={'center'}>
          <Grid item xs={8} sm={8}>
            <MealCard meal={meal} users={users} />
          </Grid>
        </Grid>
      </div>
    </>
  );
};
