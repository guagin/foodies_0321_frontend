import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { makeSelectIsRequest, makeSelectMessage } from './selector';
import { createStructuredSelector } from 'reselect';
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { Grid } from '@material-ui/core';
import { CreateProviderForm } from './create-provider-form';
import { ProgressCircle } from 'app/components/ProgressCircle';
import { Message } from 'app/components/Message';

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

const stateSelector = createStructuredSelector({
  isRequest: makeSelectIsRequest(),
  message: makeSelectMessage(),
});

export const CreateProviderPage = () => {
  const classes = useStyles();

  const { isRequest, message } = useSelector(stateSelector);

  return (
    <>
      <Helmet>
        <title>Create Provider Page</title>
        <meta
          name="create provider page"
          content="foodies create provider page"
        />
      </Helmet>
      <div className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <CreateProviderForm />
          </Grid>
        </Grid>
        <ProgressCircle isRequest={isRequest} />
        <Message message={message} />
      </div>
    </>
  );
};
