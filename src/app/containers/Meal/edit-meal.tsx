import React, { FormEvent, useState } from 'react';
import {
  makeStyles,
  Typography,
  Grid,
  TextField,
  Button,
} from '@material-ui/core';
import { useTypedSelector } from 'store/reducers';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  makeSelectIsRequest,
  makeSelectMessage,
  makeSelectMeal,
  makeSelectProvider,
} from './selector';
import { updateMeal } from './action';

const useStyles = makeStyles(theme => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const stateSelector = createStructuredSelector({
  isRequest: makeSelectIsRequest(),
  message: makeSelectMessage(),
  meal: makeSelectMeal(),
  provider: makeSelectProvider(),
});

export const EditMeal = () => {
  const classes = useStyles();

  const { token } = useTypedSelector(state => state.me);
  const { isRequest, message, meal, provider } = useSelector(stateSelector);

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [name, setName] = useState(meal.name);
  const [price, setPrice] = useState(meal.price);
  const [description, setDescription] = useState(meal.description);
  const [pictures] = useState([]);

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
    // update meal
    dispatch(
      updateMeal({
        token,
        id: meal.id,
        name,
        description,
        price,
        pictures,
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
};
