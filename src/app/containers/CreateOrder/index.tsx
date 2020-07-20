import React, { useState, useEffect } from 'react';
import { makeStyles, CssBaseline, Grid, TextField } from '@material-ui/core';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { createFetchTakeOutByPartialTitle } from 'store/fetch-take-out-by-partial-title/action';
import { useTypedSelector } from 'store/reducers';
import { useDispatch } from 'react-redux';
import { TakeOutCards } from './take-out-cards';

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

export function CreateOrder() {
  const classes = useStyle();

  const { t } = useTranslation();
  const { token } = useTypedSelector(state => state.me);
  const { takeOuts, isRequest } = useTypedSelector(
    state => state.fetchTakeOutByPartialTitle,
  );
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');

  const handleNameChange = (title: string) => {
    setTitle(title);
  };

  const handleSubmmit = event => {
    event.preventDefault();
  };

  const handleChoose = (id: string) => {
    console.log(id);
  };

  useEffect(() => {
    dispatch(createFetchTakeOutByPartialTitle({ token, title }));
  }, [dispatch, title, token]);

  return (
    <>
      <Helmet>
        <title>SignUp Page</title>
        <meta name="description" content="foodies take-out management page." />
      </Helmet>
      <CssBaseline />
      <div className={classes.paper}>
        <Grid container spacing={2} justify="center">
          <Grid item xs={4} sm={4}>
            <form className={classes.form} onSubmit={handleSubmmit}>
              <TextField
                autoComplete="title"
                name="title"
                variant="outlined"
                required
                fullWidth
                id="title"
                label={t('takeOut.title')}
                autoFocus
                placeholder={t('takeOut.titlePlaceholder')}
                value={title}
                onChange={e => {
                  handleNameChange(e.target.value);
                }}
              />
            </form>
          </Grid>
        </Grid>
      </div>
      <div className={classes.paper}>
        <TakeOutCards
          takeOuts={takeOuts}
          isRequest={isRequest}
          onClickChoose={handleChoose}
        />
      </div>
    </>
  );
}
