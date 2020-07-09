import React from 'react';
import { makeStyles, CssBaseline, Grid, Fab } from '@material-ui/core';
import { Helmet } from 'react-helmet-async';
import { TakeOutList } from 'app/components/TakeOutList';
import { push } from 'connected-react-router';
import AddIcon from '@material-ui/icons/Add';
import { useDispatch } from 'react-redux';

const useStyle = makeStyles(theme => ({
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

export function TakeOutManagemnet() {
  const dispatch = useDispatch();

  const classes = useStyle();

  const handleClickAddIcon = () => {
    dispatch(push('/create-take-out'));
  };

  return (
    <>
      <Helmet>
        <title>SignUp Page</title>
        <meta name="description" content="foodies sign up page." />
      </Helmet>
      <CssBaseline />
      <div className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <TakeOutList></TakeOutList>
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
}
