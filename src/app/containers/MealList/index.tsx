import React, { useState } from 'react';
import { MealList } from 'app/components/MealList';
import {
  makeStyles,
  CssBaseline,
  Grid,
  Fab,
  TextField,
} from '@material-ui/core';
import { Helmet } from 'react-helmet-async';
import AddIcon from '@material-ui/icons/Add';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import { useInjectSaga } from 'utils/redux-injectors';
import { fetchMealsReducer } from './reducer';

import { useInjectReducer } from 'redux-injectors';
import { createStructuredSelector } from 'reselect';
import {
  makeSelectIsRequest,
  makeSelectMessage,
  makeSelectMeals,
  makeProviders,
} from './selector';
import { useTypedSelector } from 'store/reducers';
import { fetchMealsFlow } from './saga';
import { makeSelectTotalCount } from '../TakeOutList/selector';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    marginLeft: theme.spacing(4),
    marginRight: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
}));

const stateSelector = createStructuredSelector({
  isRequest: makeSelectIsRequest(),
  message: makeSelectMessage(),
  meals: makeSelectMeals(),
  totalCount: makeSelectTotalCount(),
  providers: makeProviders(),
});

export const MealListPage = () => {
  useInjectReducer({
    key: 'fetchMeals',
    reducer: fetchMealsReducer,
  });

  useInjectSaga({
    key: 'fetchMeals',
    saga: fetchMealsFlow,
  });

  const me = useTypedSelector(state => state.me);
  const userOfIds = useTypedSelector(state => state.userOfIds);
  const { t } = useTranslation();
  const [name, setName] = useState('');

  const { isRequest, message, meals, totalCount, providers } = useSelector(
    stateSelector,
  );

  const classes = useStyles();
  const dispatch = useDispatch();

  const handleClickAddIcon = () => {
    dispatch(push('/create-meal/pick-provider'));
  };

  const handleSubmmit = event => {
    event.preventDefault();
  };
  const handleNameChanged = (name: string) => {
    setName(name);
  };

  return (
    <>
      <Helmet>
        <title>Meal Management Page</title>
        <meta
          name="meal management page"
          content="foodies meal management page."
        />
      </Helmet>
      <CssBaseline />
      <div className={classes.paper}>
        <Grid container spacing={2} justify="center">
          <Grid item xs={4} sm={4}>
            <form className={classes.form} onSubmit={handleSubmmit}>
              <TextField
                autoComplete="name"
                name="name"
                variant="outlined"
                required
                fullWidth
                id="name"
                label={t('provider.name')}
                autoFocus
                placeholder={t('provider.namePlaceholder')}
                value={name}
                onChange={e => {
                  handleNameChanged(e.target.value);
                }}
              />
            </form>
          </Grid>
        </Grid>
      </div>
      <div className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <MealList
              isRequest={isRequest}
              message={message}
              meals={meals}
              totalCount={totalCount}
              me={me}
              userOfIds={userOfIds}
              providers={providers}
            />
          </Grid>
        </Grid>
        <Fab
          color="primary"
          aria-label="add"
          className={classes.fab}
          onClick={handleClickAddIcon}
        >
          <AddIcon />
        </Fab>
      </div>
    </>
  );
};
