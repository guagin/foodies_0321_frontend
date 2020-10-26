import { CssBaseline, Grid, makeStyles, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import { createStructuredSelector } from 'reselect';

import { useTypedSelector } from 'store/reducers';
import { makeSelectMessage } from '../SignUpPage/selector';

import { fetchProviderOfPartialName, pickProvider } from './action';
import { ProviderCards } from './provider-cards';
import { createMealReducer, Provider } from './reducer';
import { createMealFlow } from './saga';
import { makeSelectIsRequest, makeSelectProviders } from './selector';

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
  providers: makeSelectProviders(),
  message: makeSelectMessage(),
});

export const PickProvider = () => {
  useInjectReducer({ key: 'createMeal', reducer: createMealReducer });
  useInjectSaga({ key: 'createMeal', saga: createMealFlow });

  const classes = useStyle();
  const { t } = useTranslation();

  const [name, setName] = useState('');

  const dispatch = useDispatch();

  const { token } = useTypedSelector(state => state.me);
  const { isRequest, providers, message } = useSelector(stateSelector);

  useEffect(() => {
    dispatch(
      fetchProviderOfPartialName({
        token,
        name,
      }),
    );
  }, [dispatch, name, token]);

  const handleNameChanged = (name: string) => {
    setName(name);
  };

  const handleSubmmit = event => {
    event.preventDefault();
  };

  const onClickChoose = (provider: Provider) => {
    dispatch(pickProvider({ pickedProvider: provider }));
  };

  return (
    <>
      <Helmet>
        <title>Create Meal - Pick Provider Page</title>
        <meta name="description" content="create meal - pick provider page." />
      </Helmet>
      <CssBaseline />
      <div className={classes.paper}>
        {message}
        <Grid container spacing={2} justify="center">
          <Grid item xs={4} sm={4}>
            <form className={classes.form} onSubmit={handleSubmmit}>
              <TextField
                autoComplete="title"
                name="title"
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
        <Grid container spacing={2} justify="flex-start">
          <Grid item xs={12} sm={12}>
            <ProviderCards
              providers={providers}
              isRequest={isRequest}
              onClickChoose={onClickChoose}
            />
          </Grid>
        </Grid>
      </div>
    </>
  );
};
