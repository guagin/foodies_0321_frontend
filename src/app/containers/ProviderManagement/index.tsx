import React from 'react';
import { ProviderList } from 'app/components/ProviderList';
import { useTypedSelector } from 'store/reducers';
import { Helmet } from 'react-helmet-async';
import { CssBaseline, makeStyles } from '@material-ui/core';

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
        <ProviderList></ProviderList>
      </div>
    </>
  );
};
