import React, { useState, useEffect } from 'react';
import { makeStyles, CssBaseline, Grid, TextField } from '@material-ui/core';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useTypedSelector } from 'store/reducers';
import { useDispatch, useSelector } from 'react-redux';
import { TakeOutCards } from './take-out-cards';
import { fetchTakeOutByPartialTitle, pickTakeOutId } from './action';
import { createStructuredSelector } from 'reselect';
import {
  makeSelectIsRequest,
  makeSelectTakeOuts,
  makeSelectMessage,
} from './selector';
import { useInjectReducer } from 'redux-injectors';
import { useInjectSaga } from 'utils/redux-injectors';
import { fetchTakeOutByPartialTitleFlow } from './saga';
import { createOrderReducer } from './reducer';
import { TakeOut } from '../TakeOutList/take-out';

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
  takeOuts: makeSelectTakeOuts(),
});

export function CreateOrder() {
  useInjectReducer({
    key: 'createOrder',
    reducer: createOrderReducer,
  });

  useInjectSaga({
    key: 'createOrder',
    saga: fetchTakeOutByPartialTitleFlow,
  });

  const classes = useStyle();

  const { t } = useTranslation();
  const { token } = useTypedSelector(state => state.me);

  const { isRequest, message, takeOuts } = useSelector(stateSelector);

  const dispatch = useDispatch();

  const [title, setTitle] = useState('');

  const handleNameChange = (title: string) => {
    setTitle(title);
  };

  const handleSubmmit = event => {
    event.preventDefault();
  };

  const handleChoose = ({ id }: TakeOut) => {
    console.log(id);
    dispatch(pickTakeOutId({ takeOutId: id }));
    // dispatch(push('/order/create/detailPage'));
  };

  useEffect(() => {
    dispatch(fetchTakeOutByPartialTitle({ token, title }));
  }, [dispatch, title, token]);

  return (
    <>
      <Helmet>
        <title>Pick TakeOut Page</title>
        <meta name="description" content="foodies pick TakeOut page." />
      </Helmet>
      <CssBaseline />
      <div className={classes.paper}>
        {message}
        <Grid container spacing={2} justify="center">
          <Grid item xs={4} sm={4}>
            <form className={classes.form} onSubmit={handleSubmmit}>
              <TextField
                autoComplete="title"
                name="title"
                variant="outlined"
                required
                fullWidth
                id="title"
                label={t('takeOut.title')}
                autoFocus
                placeholder={t('takeOut.titlePlaceholder')}
                value={title}
                onChange={e => {
                  handleNameChange(e.target.value);
                }}
              />
            </form>
          </Grid>
        </Grid>
      </div>
      <div className={classes.paper}>
        <TakeOutCards
          takeOuts={takeOuts}
          isRequest={isRequest}
          onClickChoose={handleChoose}
        />
      </div>
    </>
  );
}
