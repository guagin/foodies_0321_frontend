import React from 'react';
import { Helmet } from 'react-helmet-async';
import {
  makeStyles,
  Container,
  CssBaseline,
  CircularProgress,
} from '@material-ui/core';

import { Me } from 'app/components/Me';

import { useTypedSelector } from 'store/reducers';
import { SignUpForm } from './sign-up-form';

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
  const me = useTypedSelector(state => state.me);
  const classes = useStyles();

  const progressCirlcle = () => {
    if (me.isRequest) {
      return <CircularProgress />;
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
          <Me></Me>
          <SignUpForm classes={classes} disabled={me.isRequest}></SignUpForm>
          {progressCirlcle()}
        </div>
      </Container>
    </>
  );
}

// export default connect(null, { signUp })(SignUpPage);
