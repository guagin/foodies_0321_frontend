import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Me } from 'app/components/Me';
import { makeStyles, CssBaseline } from '@material-ui/core';

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

export function HomePage() {
  const classes = useStyles();
  return (
    <>
      <Helmet>
        <title>Home Page</title>
        <meta name="description" content="foodies home page." />
      </Helmet>
      <CssBaseline />
      <div className={classes.paper}>
        <Me />
      </div>
    </>
  );
}
