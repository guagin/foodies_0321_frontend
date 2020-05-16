import React from 'react';
import { Helmet } from 'react-helmet-async';
import {
  makeStyles,
  Container,
  CssBaseline,
  Avatar,
  Typography,
  Grid,
  TextField,
  FormControlLabel,
  Button,
} from '@material-ui/core';
import LockOutlineIcon from '@material-ui/icons/LockOutlined';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export function SignUpPage() {
  const classes = useStyles();
  const { t, i18n } = useTranslation();
  return (
    <>
      <Helmet>
        <title>SignUp Page</title>
        <meta name="description" content="foodies sign up page." />
      </Helmet>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlineIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            SignUp
          </Typography>
          <form className={classes.form} noValidate>
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
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {t('submit')}
            </Button>
          </form>
        </div>
      </Container>
    </>
  );
}
