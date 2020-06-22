import React from 'react';
import { ProviderList } from 'app/components/ProviderList';
import { useTypedSelector } from 'store/reducers';
import { Helmet } from 'react-helmet-async';
import { CssBaseline, makeStyles, Grid, Fab } from '@material-ui/core';
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

export const ProviderManagement = () => {
  const provider = useTypedSelector(state => state.provider);
  const classes = useStyles();
  const dispatch = useDispatch();
  const handleClickAddIcon = () => {
    dispatch(push('/create-provider'));
  };

  if (provider.message) {
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
          <p>{provider.message} </p>
        </div>
      </>
    );
  }

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
            <ProviderList></ProviderList>
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
