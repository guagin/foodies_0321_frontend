import React from 'react';
import { MealList } from 'app/components/MealList';
import { makeStyles, CssBaseline, Grid, Fab } from '@material-ui/core';
import { Helmet } from 'react-helmet-async';
import AddIcon from '@material-ui/icons/Add';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    marginLeft: theme.spacing(4),
    marginRight: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

export const MealListPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const handleClickAddIcon = () => {
    dispatch(push('/create-meal'));
  };
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
        <Fab
          color="primary"
          aria-label="add"
          className={classes.fab}
          onClick={handleClickAddIcon}
        >
          <AddIcon />
        </Fab>
      </div>
    </>
  );
};
