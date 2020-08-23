import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Grid, makeStyles } from '@material-ui/core';
import { CreateMealForm } from './create-meal-form';

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

export const CreateMeal = () => {
  const classes = useStyles();
  return (
    <>
      <Helmet>
        <title>Create Meal Page</title>
        <meta name="create meal page" content="foodies create meal page." />
      </Helmet>
      <div className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <CreateMealForm></CreateMealForm>
          </Grid>
        </Grid>
      </div>
    </>
  );
};
