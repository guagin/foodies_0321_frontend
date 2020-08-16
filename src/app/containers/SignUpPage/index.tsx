import React from 'react';
import { Helmet } from 'react-helmet-async';
import {
  makeStyles,
  Container,
  CssBaseline,
  CircularProgress,
} from '@material-ui/core';

import { SignUpForm } from './sign-up-form';
import { signUpReducer } from 'store/sign-up/reducer';
import { signUpFlow } from 'store/sign-up/saga';
import { useInjectSaga } from 'utils/redux-injectors';
import { useInjectReducer } from 'redux-injectors';
import { createStructuredSelector } from 'reselect';
import {
  makeSelectIsRequest,
  makeSelectName,
  makeSelectEmail,
  makeSelectPassword,
  makeSelectId,
  makeSelectMessage,
} from 'store/sign-up/selector';
import { useSelector } from 'react-redux';

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
  password: makeSelectPassword(),
  email: makeSelectEmail(),
  id: makeSelectId(),
  message: makeSelectMessage(),
});

export function SignUpPage() {
  useInjectReducer({ key: 'signUp', reducer: signUpReducer });
  useInjectSaga({ key: 'signUp', saga: signUpFlow });

  const { isRequest, message } = useSelector(stateSelector);

  const classes = useStyles();

  const progressCirlcle = () => {
    if (isRequest) {
      return <CircularProgress />;
    }
    return <></>;
  };

  const signUpMessage = () => {
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
        <title>SignUp Page</title>
        <meta name="description" content="foodies sign up page." />
      </Helmet>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <SignUpForm classes={classes} disabled={isRequest}></SignUpForm>
          {progressCirlcle()}
          {signUpMessage()}
        </div>
      </Container>
    </>
  );
}
