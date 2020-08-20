import React from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Container,
  CssBaseline,
  CircularProgress,
  makeStyles,
} from '@material-ui/core';
import { SignInForm } from './sign-in-form';
import { useLocation } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import {
  makeSelectIsRequest,
  makeSelectName,
  makeSelectEmail,
  makeSelectToken,
  makeSelectMessage,
} from './selector';
import { useSelector } from 'react-redux';
import { useInjectReducer } from 'redux-injectors';
import { signInReducer } from './reducer';
import { useInjectSaga } from 'utils/redux-injectors';
import { signInFlow } from './saga';

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

const stateSelector = createStructuredSelector({
  isRequest: makeSelectIsRequest(),
  name: makeSelectName(),
  email: makeSelectEmail(),
  token: makeSelectToken(),
  message: makeSelectMessage(),
});

export function SignInPage() {
  useInjectReducer({
    key: 'signIn',
    reducer: signInReducer,
  });
  useInjectSaga({ key: 'signIn', saga: signInFlow });

  const classes = useStyles();
  const location = useLocation();

  const { isRequest, message } = useSelector(stateSelector);

  const { from } = { from: { pathname: '/' }, ...location.state };

  const progressCirlcle = () => {
    if (isRequest) {
      return <CircularProgress />;
    }
    return <></>;
  };

  const signInMessage = () => {
    if (message) {
      return (
        <div>
          <p>{message}</p>
        </div>
      );
    }
    return <></>;
  };

  return (
    <>
      <Helmet>
        <title>SignIn Page</title>
        <meta name="sign in page" content="foodies sign in page." />
      </Helmet>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <SignInForm classes={classes} disabled={isRequest} from={from} />
          {progressCirlcle()}
          {signInMessage()}
        </div>
      </Container>
    </>
  );
}
