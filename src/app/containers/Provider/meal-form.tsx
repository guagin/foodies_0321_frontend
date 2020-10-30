import React, { FormEvent, useState } from 'react';
import {
  Typography,
  Grid,
  makeStyles,
  TextField,
  Button,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { Provider } from './reducer';
import { useDispatch } from 'react-redux';
import { createMeal } from './action';
import { useTypedSelector } from 'store/reducers';

const useStyles = makeStyles(theme => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export function MealForm({ provider }: { provider: Provider }) {
  const classes = useStyles();

  const { token } = useTypedSelector(state => state.me);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');

  const handleNameChange = value => {
    setName(value);
  };

  const handlePriceChange = value => {
    setPrice(value);
  };

  const handleDescriptionChange = value => {
    setDescription(value);
  };

  const handleSubmmit = (event: FormEvent) => {
    event.preventDefault();
    dispatch(
      createMeal({
        token,
        providerId: provider._id,
        name,
        price,
        description,
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
              name="provider"
              variant="outlined"
              required
              fullWidth
              id="provider"
              label={t('meal.provider')}
              autoFocus
              placeholder={t('meal.providerPlaceholder')}
              value={provider.name}
              disabled={true}
            />
          </Grid>
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
