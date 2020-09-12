import React, { FormEvent } from 'react';
import {
  makeStyles,
  Grid,
  TextField,
  CssBaseline,
  Button,
} from '@material-ui/core';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from 'store/reducers';
import { push } from 'connected-react-router';
import { createTakeOut } from './action';

const useStyles = makeStyles(theme => ({
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
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '100%',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export const DetailInfo = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { token } = useTypedSelector(state => state.me);
  // const { isRequest, message, pickedProviderId } = useTypedSelector(
  //   state => state.createTakeOut,
  // );

  const [title, setTitle] = React.useState('');
  const handleTitleChange = title => {
    setTitle(title);
  };

  const [description, setDescription] = React.useState('');
  const handleDescriptionChange = description => {
    setDescription(description);
  };

  const [startedAt, setStartedAt] = React.useState(new Date());

  const handleStartedAtChange = date => {
    setStartedAt(date);
  };

  const [endAt, setEndAt] = React.useState(new Date());

  const handleEndAtChange = date => {
    setEndAt(date);
  };

  const handleSubmmit = (event: FormEvent) => {
    event.preventDefault();
    dispatch(
      createTakeOut({
        token,
        title,
        description,
        startedAt,
        endAt,
        enabled: true,
        providerId: 'pickedProviderId',
      }),
    );
  };

  if (!'pickedProviderId') {
    dispatch(push('/take-out-management'));
  }

  return (
    <>
      <Helmet>
        <title>SignUp Page</title>
        <meta name="description" content="foodies create take out page." />
      </Helmet>
      <CssBaseline />
      <div className={classes.paper}>
        <form className={classes.form} noValidate onSubmit={handleSubmmit}>
          <Grid container spacing={2} justify="center">
            <Grid item xs={6} sm={6}>
              <TextField
                id="datetime-local"
                label={t('provider.startedAt')}
                type="datetime-local"
                defaultValue={startedAt}
                value={startedAt}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={event => {
                  handleStartedAtChange(event.target.value);
                }}
              />
            </Grid>
            <Grid item xs={6} sm={6}>
              <TextField
                id="datetime-local"
                label={t('provider.endAt')}
                type="datetime-local"
                defaultValue={endAt}
                value={endAt}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={event => {
                  handleEndAtChange(event.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="title"
                label={t('provider.title')}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                value={title}
                onChange={event => {
                  handleTitleChange(event.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="description"
                label={t('provider.description')}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                value={description}
                onChange={event => {
                  handleDescriptionChange(event.target.value);
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                // disabled={isRequest}
              >
                {t('submit')}
              </Button>
            </Grid>
          </Grid>
        </form>
        {/* <div>{message}</div> */}
      </div>
    </>
  );
};
