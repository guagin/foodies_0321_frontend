import React, { useState, FormEvent } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  makeStyles,
  Container,
  CssBaseline,
  Avatar,
  Typography,
  Grid,
  TextField,
  Button,
  CircularProgress,
} from '@material-ui/core';
import LockOutlineIcon from '@material-ui/icons/LockOutlined';
import { useTranslation } from 'react-i18next';
import { Me } from 'app/components/Me';

import { useDispatch } from 'react-redux';
import { SignUpActionCreator } from 'store/me/action';
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

export function SignUpPage() {
  const dispatch = useDispatch();
  const me2 = useTypedSelector(state => state.me);
  const classes = useStyles();
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
      SignUpActionCreator({
        name,
        email,
        password,
      }),
    );
  };

  const progressCirlcle = () => {
    if (me2.isRequest) {
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
          <Avatar className={classes.avatar}>
            <LockOutlineIcon />
          </Avatar>
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
          {progressCirlcle()}
        </div>
      </Container>
    </>
  );
}

// export default connect(null, { signUp })(SignUpPage);
