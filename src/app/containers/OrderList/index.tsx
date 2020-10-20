import React from 'react';
import { Helmet } from 'react-helmet-async';
import { CssBaseline, Grid, Fab, makeStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { OrderList } from 'app/components/OrderList';
import { push } from 'connected-react-router';
import { useDispatch } from 'react-redux';

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

export const OrderListPage = () => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const handleClickAddIcon = () => {
    dispatch(push('/order/create/pick-takeout'));
  };

  //fetch order.

  return (
    <>
      <Helmet>
        <title>Provider Management Page</title>
        <meta
          name="provider management page"
          content="foodies provider management page."
        />
      </Helmet>
      <CssBaseline />
      <div className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <OrderList />
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
