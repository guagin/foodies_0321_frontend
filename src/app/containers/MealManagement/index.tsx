import React from 'react';
import { MealList } from 'app/components/MealList';
import { makeStyles, CssBaseline, Grid } from '@material-ui/core';
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

export const MealManagement = () => {
  const classes = useStyles();
  // load meals.
  // filter form.
  return (
    <>
      <Helmet>
        <title>Meal Management Page</title>
        <meta
          name="meal management page"
          content="foodies meal management page."
        />
      </Helmet>
      <CssBaseline />
      <div className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <MealList></MealList>
          </Grid>
        </Grid>
      </div>
    </>
  );
};
