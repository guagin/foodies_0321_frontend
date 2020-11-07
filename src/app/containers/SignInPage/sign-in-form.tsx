import React, { useState, FormEvent } from 'react';
import { Typography, Grid, TextField, Button } from '@material-ui/core';

import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { signIn } from './action';

export function SignInForm(input: {
  classes: { [index: string]: any };
  disabled: boolean;
  from: { pathname: string };
}) {
  const { classes, disabled, from } = input;
  const dispatch = useDispatch();

  const { t } = useTranslation();

  const [name, setName] = useState('');

  const handleNameChange = value => {
    setName(value);
  };

  const [password, setPassword] = useState('');
  const handlePasswordChange = value => {
    setPassword(value);
  };

  const handleSubmmit = (event: FormEvent) => {
    event.preventDefault();

    dispatch(
      signIn({
        name,
        password,
        from,
      }),
    );
  };

  return (
    <>
      <Typography component="h1" variant="h5">
        SignIn
      </Typography>
      <form className={classes.form} onSubmit={handleSubmmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <TextField
              autoComplete="name"
              name="name"
              variant="outlined"
              required
              fullWidth
              id="name"
              label={t('user.name')}
              autoFocus
              placeholder={t('user.namePlaceholder')}
              value={name}
              onChange={e => {
                handleNameChange(e.target.value);
              }}
              disabled={disabled}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              autoComplete="current-password"
              name="password"
              variant="outlined"
              required
              fullWidth
              type="password"
              id="password"
              label={t('user.password')}
              placeholder={t('user.passwordPlaceholder')}
              onChange={e => {
                handlePasswordChange(e.target.value);
              }}
              disabled={disabled}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={disabled}
            >
              {t('submit')}
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
}
