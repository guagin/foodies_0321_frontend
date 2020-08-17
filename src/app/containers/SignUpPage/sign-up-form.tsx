import React, { useState, FormEvent } from 'react';
import { Typography, Grid, TextField, Button } from '@material-ui/core';

import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { SignUpCreator } from './action';

export function SignUpForm(input: {
  classes: { [index: string]: any };
  disabled: boolean;
}) {
  const { classes, disabled } = input;
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [name, setName] = useState('');

  const handleNameChange = value => {
    setName(value);
  };

  const [email, setEmail] = useState('');
  const handleEmailChange = value => {
    setEmail(value);
  };

  const [password, setPassword] = useState('');
  const handlePasswordChange = value => {
    setPassword(value);
  };

  const handleSubmmit = (event: FormEvent) => {
    event.preventDefault();

    dispatch(
      SignUpCreator({
        name,
        email,
        password,
      }),
    );
  };

  return (
    <>
      <Typography component="h1" variant="h5">
        SignUp
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
              autoComplete="email"
              name="email"
              variant="outlined"
              required
              fullWidth
              id="email"
              label={t('user.email')}
              placeholder={t('user.emailPlaceholder')}
              onChange={e => {
                handleEmailChange(e.target.value);
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
