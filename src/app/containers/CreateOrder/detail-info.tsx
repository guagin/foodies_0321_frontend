import React from 'react';
import {
  makeSelectIsRequest,
  makeSelectMessage,
  makeSelectTakeOutId,
} from './selector';

import { makeStyles } from '@material-ui/core/styles';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'redux-injectors';
import { createOrderReducer } from './reducer';
import { useInjectSaga } from 'utils/redux-injectors';
import { createOrderFlow } from './saga';
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { CssBaseline, Grid, TextField } from '@material-ui/core';

import { useTranslation } from 'react-i18next';

const useStyle = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    marginLeft: theme.spacing(4),
    marginRight: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
}));

const stateSelector = createStructuredSelector({
  isRequest: makeSelectIsRequest(),
  message: makeSelectMessage(),
  takeOutId: makeSelectTakeOutId(),
});

export const CreateOrderDetailPage = () => {
  const classes = useStyle();
  useInjectReducer({ key: 'createOrder', reducer: createOrderReducer });
  useInjectSaga({ key: 'createOrder', saga: createOrderFlow });

  const { t } = useTranslation();

  const { isRequest, message, takeOutId } = useSelector(stateSelector);

  const handleSubmit = event => {
    event.preventDefault();
  };

  return (
    <>
      <Helmet>
        <title>Create Order Page</title>
        <meta name="description" content="foodies Create Order page." />
      </Helmet>
      <CssBaseline />
      <div className={classes.paper}>
        {message}
        <Grid container spacing={2} justify="center">
          <form className={classes.form} onSubmit={handleSubmit}>
            <Grid item xs={4} sm={4}>
              <TextField
                id="takeOutId"
                value={takeOutId}
                disabled={true}
              ></TextField>
            </Grid>
          </form>
        </Grid>
      </div>
    </>
  );
};
