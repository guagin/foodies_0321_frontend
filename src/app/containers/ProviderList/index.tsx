import React, { useEffect, useState } from 'react';
import { ProviderList } from 'app/components/ProviderList';
import { useTypedSelector } from 'store/reducers';
import { Helmet } from 'react-helmet-async';
import { CssBaseline, makeStyles, Grid, Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import { createStructuredSelector } from 'reselect';
import {
  makeSelectIsRequest,
  makeSelectMessage,
  makeSelectProviders,
} from './selector';
import { makeSelectTotalCount } from '../TakeOutList/selector';
import { fetchProviderOfPage } from './action';
import { fetchUserOfIdsCreator } from 'store/users-of-ids/action/fetch-users-of-id';

import { providerListReducer } from './reducer';
import { useInjectReducer } from 'redux-injectors';
import { useInjectSaga } from 'utils/redux-injectors';
import { providerListFlow } from './saga';

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

const stateSelector = createStructuredSelector({
  isRequest: makeSelectIsRequest(),
  providers: makeSelectProviders(),
  totalCount: makeSelectTotalCount(),
  message: makeSelectMessage(),
});

export const ProviderListPage = () => {
  useInjectReducer({ key: 'ProviderList', reducer: providerListReducer });
  useInjectSaga({ key: 'ProviderList', saga: providerListFlow });

  const classes = useStyles();
  const dispatch = useDispatch();

  const { isRequest, providers, totalCount, message } = useSelector(
    stateSelector,
  );

  const me = useTypedSelector(state => state.me);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const handleClickAddIcon = () => {
    dispatch(push('/create-provider'));
  };

  useEffect(() => {
    dispatch(
      fetchUserOfIdsCreator({
        token: me.token,
        ids: providers.map(data => data.createdBy),
      }),
    );
  }, [dispatch, me.token, providers]);

  useEffect(() => {
    dispatch(
      fetchProviderOfPage({
        page: page + 1,
        count: rowsPerPage,
        token: me.token,
      }),
    );
  }, [dispatch, me.token, page, rowsPerPage]);

  const handleChangePage = newPage => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = newRowsPerPage => {
    setRowsPerPage(newRowsPerPage);
    setPage(0);
  };

  if (message) {
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
          <p>{message} </p>
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
            <ProviderList
              providers={providers}
              isRequest={isRequest}
              page={page}
              rowsPerPage={rowsPerPage}
              totalCount={totalCount}
              handleChangePage={handleChangePage}
              handleChangeRowsPerPage={handleChangeRowsPerPage}
            />
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
