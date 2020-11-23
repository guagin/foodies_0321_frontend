import {
  CircularProgress,
  CssBaseline,
  Grid,
  makeStyles,
  Fab,
} from '@material-ui/core';
import { push } from 'connected-react-router';
import React, { ReactElement, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import { createStructuredSelector } from 'reselect';
import { useTypedSelector } from 'store/reducers';
import AddIcon from '@material-ui/icons/Add';

import { fetchProviderOfId } from './action';
import { MealCard } from './meal-card';
import { ProviderCard } from './provider-card';
import { providerReducer } from './reducer';
import { providerFlow } from './saga';
import {
  makeSelectIsRequest,
  makeSelectMeals,
  makeSelectMessage,
  makeSelectProvider,
} from './selector';
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
  title: {
    fontSize: 26,
  },
}));

const stateSelector = createStructuredSelector({
  isRequest: makeSelectIsRequest(),
  provider: makeSelectProvider(),
  message: makeSelectMessage(),
  meals: makeSelectMeals(),
});

interface Props {
  computedMatch: ComputedMatch;
}

interface ComputedMatch {
  params: { providerId: string };
}

export const Provider: (props: Props) => ReactElement = ({
  computedMatch: {
    params: { providerId },
  },
}) => {
  useInjectReducer({ key: 'provider', reducer: providerReducer });
  useInjectSaga({ key: 'provider', saga: providerFlow });

  const classes = useStyles();

  const dispatch = useDispatch();
  const { token } = useTypedSelector(state => state.me);
  const { users } = useTypedSelector(state => state.userOfIds);
  const { isRequest, provider, meals } = useSelector(stateSelector);

  const { t } = useTranslation();

  useEffect(() => {
    dispatch(
      fetchProviderOfId({
        token,
        id: providerId,
      }),
    );
  }, [dispatch, providerId, token]);

  if (isRequest) {
    return (
      <>
        <CircularProgress />
      </>
    );
  }

  const handleMealDetailOnlick = (id: string) => {
    dispatch(push(`/meal/ofId/${id}`));
  };

  const handleClickAddIcon = () => {
    dispatch(push(`/provider/${providerId}/createMeal/`));
  };

  return (
    <>
      <Helmet>
        <title>{t('ProviderDetailPage')}</title>
        <meta
          name="provider detail page"
          content="foodies provider detail page."
        />
      </Helmet>
      <CssBaseline />
      <div className={classes.paper}>
        <Grid container justify={'flex-start'}>
          <Grid item xs={12} sm={12}>
            <ProviderCard provider={provider} users={users} />
          </Grid>
        </Grid>
      </div>
      <div className={classes.paper}>
        <Grid container justify={'flex-start'} spacing={2}>
          {meals.map(e => (
            <Grid item xs={4} sm={2}>
              <MealCard meal={e} handleOnClick={handleMealDetailOnlick} />
            </Grid>
          ))}
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
