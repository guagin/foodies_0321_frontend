import React, { FormEvent, useState } from 'react';
import {
  makeStyles,
  Typography,
  Grid,
  TextField,
  Button,
} from '@material-ui/core';

import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useTypedSelector } from 'store/reducers';
import { createMeal } from './action';
import { useInjectSaga } from 'utils/redux-injectors';
import { createMealReducer } from './reducer';
import { createMealFlow } from './saga';
import { useInjectReducer } from 'redux-injectors';

const useStyles = makeStyles(theme => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export function CreateMealForm() {
  useInjectReducer({ key: 'createMeal', reducer: createMealReducer });
  useInjectSaga({ key: 'createMeal', saga: createMealFlow });

  const classes = useStyles();
  const dispatch = useDispatch();

  const { t } = useTranslation();
  const me = useTypedSelector(state => state.me);

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  //   const [pictureCount, setPictureCount] = useState(0);
  //   const [pictures, setPictures] = useState([]);
  const [provider, setProvider] = useState('');

  const handleNameChange = value => {
    setName(value);
  };

  const handlePriceChange = value => {
    setPrice(value);
  };

  const handleDescriptionChange = value => {
    setDescription(value);
  };

  const handleProviderChange = value => {
    setProvider(value);
  };

  const handleSubmmit = (event: FormEvent) => {
    event.preventDefault();

    dispatch(
      createMeal({
        token: me.token,
        name,
        price,
        description,
        pictures: [],
        provider,
      }),
    );
  };

  return (
    <>
      <Typography component="h1" variant="h5">
        Create meal form
      </Typography>
      <form className={classes.form} onSubmit={handleSubmmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <TextField
              autoComplete="name"
              name="name"
              variant="outlined"
              required
              fullWidth
              id="name"
              label={t('meal.name')}
              autoFocus
              placeholder={t('meal.namePlaceholder')}
              value={name}
              onChange={e => {
                handleNameChange(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              name="price"
              variant="outlined"
              required
              fullWidth
              id="price"
              label={t('meal.price')}
              autoFocus
              placeholder={t('meal.pricePlaceholder')}
              value={price}
              onChange={e => {
                handlePriceChange(e.target.value);
              }}
              //   disabled={disabled}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              name="description"
              variant="outlined"
              required
              fullWidth
              id="description"
              label={t('meal.description')}
              autoFocus
              placeholder={t('meal.descriptionPlaceholder')}
              value={description}
              onChange={e => {
                handleDescriptionChange(e.target.value);
              }}
              //   disabled={disabled}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              name="provider"
              variant="outlined"
              required
              fullWidth
              id="provider"
              label={t('meal.provider')}
              autoFocus
              placeholder={t('meal.providerPlaceholder')}
              value={provider}
              onChange={e => {
                handleProviderChange(e.target.value);
              }}
              //   disabled={disabled}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {t('submit')}
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
}
