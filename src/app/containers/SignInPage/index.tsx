import React from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Container,
  CssBaseline,
  CircularProgress,
  makeStyles,
} from '@material-ui/core';
import { SignInForm } from './sign-in-form';
import { useTypedSelector } from 'store/reducers';

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

export function SignInPage() {
  const me = useTypedSelector(state => state.me);
  const classes = useStyles();

  const progressCirlcle = () => {
    if (me.isRequest) {
      return <CircularProgress />;
    }
    return <></>;
  };

  const signInMessage = () => {
    if (me.message) {
      return (
        <div>
          <p>{me.message}</p>
        </div>
      );
    }
    return <></>;
  };

  return (
    <>
      <Helmet>
        <title>SignIn Page</title>
        <meta name="description" content="foodies sign in page." />
      </Helmet>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <SignInForm classes={classes} disabled={me.isRequest} />
          {progressCirlcle()}
          {signInMessage()}
        </div>
      </Container>
    </>
  );
}
