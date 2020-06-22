import React from 'react';
import { makeStyles, Grid } from '@material-ui/core';
import { CreateProviderForm } from './create-provider-form';
import { Helmet } from 'react-helmet-async';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    marginLeft: theme.spacing(4),
    marginRight: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

export const CreateProvider = () => {
  const classes = useStyles();

  return (
    <>
      <Helmet>
        <title>Create Provider Page</title>
        <meta
          name="create provider page"
          content="foodies create provider page."
        />
      </Helmet>
      <div className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <CreateProviderForm></CreateProviderForm>
          </Grid>
        </Grid>
      </div>
    </>
  );
};
