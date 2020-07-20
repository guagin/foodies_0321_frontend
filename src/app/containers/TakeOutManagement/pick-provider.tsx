import React, { useState, useEffect } from 'react';
import { makeStyles, CssBaseline, TextField, Grid } from '@material-ui/core';
import { useTypedSelector } from 'store/reducers';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { CreateFetchProviderByPartialName } from 'store/fetch-provider-of-partial-name/action';
import { ProviderCards } from './provider-cards';
import { createPickProviderForTakeOut } from 'store/craete-take-out/action';
import { push } from 'connected-react-router';

const useStyles = makeStyles(theme => ({
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

export const PickProvider = () => {
  const classes = useStyles();

  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { providers, isRequest } = useTypedSelector(
    state => state.fetchProviderByPartialName,
  );

  const { token } = useTypedSelector(state => state.me);

  const [name, setName] = useState('');

  const handleNameChange = (name: string) => {
    setName(name);
  };

  const handleSubmmit = event => {
    event.preventDefault();
  };

  const handleChoose = (id: string) => {
    dispatch(createPickProviderForTakeOut({ providerId: id }));
    dispatch(push('/take-out/create/detail-info'));
  };

  useEffect(() => {
    dispatch(CreateFetchProviderByPartialName({ token, name }));
  }, [dispatch, name, token]);

  return (
    <>
      <Helmet>
        <title>SignUp Page</title>
        <meta
          name="description"
          content="foodies create take out , pick provider page."
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
                onChange={event => {
                  handleNameChange(event.target.value);
                }}
              />
            </form>
          </Grid>
        </Grid>
      </div>
      <div className={classes.paper}>
        <ProviderCards
          providers={providers}
          isRequest={isRequest}
          onClickChoose={handleChoose}
        />
      </div>
    </>
  );
};
