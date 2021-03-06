import React, { useState, FormEvent } from 'react';
import {
  makeStyles,
  Typography,
  Grid,
  TextField,
  Button,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useTypedSelector } from 'store/reducers';
import { createProvider } from './action';
import { createStructuredSelector } from 'reselect';
import { makeSelectIsRequest } from './selector';

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
});
export const CreateProviderForm = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const me = useTypedSelector(state => state.me);

  const { isRequest } = useSelector(stateSelector);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [phone, setPhone] = useState('');

  const handleNameChange = value => {
    setName(value);
  };

  const handleDescriptionChange = value => {
    setDescription(value);
  };

  const handlePhoneChange = value => {
    setPhone(value);
  };

  const handleSubmmit = (event: FormEvent) => {
    event.preventDefault();
    dispatch(
      createProvider({
        token: me.token,
        name,
        description,
        phone,
      }),
    );
  };

  return (
    <>
      <Typography component="h1" variant="h5">
        Create provider form
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
              label={t('provider.name')}
              autoFocus
              placeholder={t('provider.namePlaceholder')}
              value={name}
              onChange={e => {
                handleNameChange(e.target.value);
              }}
              disabled={isRequest}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              name="description"
              variant="outlined"
              required
              fullWidth
              id="description"
              label={t('provider.description')}
              autoFocus
              placeholder={t('provider.descriptionPlaceholder')}
              value={description}
              onChange={e => {
                handleDescriptionChange(e.target.value);
              }}
              disabled={isRequest}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              name="phone"
              variant="outlined"
              required
              fullWidth
              id="phone"
              label={t('provider.phone')}
              autoFocus
              placeholder={t('provider.phonePlaceholder')}
              value={phone}
              onChange={e => {
                handlePhoneChange(e.target.value);
              }}
              disabled={isRequest}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={isRequest}
            >
              {t('submit')}
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};
