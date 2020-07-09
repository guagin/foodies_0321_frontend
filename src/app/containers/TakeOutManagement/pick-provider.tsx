import React, { useState } from 'react';
import { makeStyles, CssBaseline, TextField } from '@material-ui/core';
import { useTypedSelector } from 'store/reducers';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { CreateFetchProviderByPartialName } from 'store/fetch-provider-of-partial-name/action';

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
}));

export const PickProvider = () => {
  const classes = useStyles();

  const { t } = useTranslation();
  const dispatch = useDispatch();

  const fetchProviderByPartialName = useTypedSelector(
    state => state.fetchProviderByPartialName,
  );

  const { token } = useTypedSelector(state => state.me);

  const [name, setName] = useState('');

  const handleNameChange = (name: string) => {
    setName(name);
    dispatch(CreateFetchProviderByPartialName({ token, name }));
  };

  const handleSubmmit = event => {
    event.preventDefault();
  };
  return (
    <>
      <Helmet>
        <title>SignUp Page</title>
        <meta name="description" content="foodies sign up page." />
      </Helmet>
      <CssBaseline />
      <div className={classes.paper}>
        <form className={classes.form} onSubmit={handleSubmmit}>
          <TextField
            autoComplete="name"
            name="name"
            variant="outlined"
            required
            fullWidth
            id="name"
            label={t('user.name')}
            autoFocus
            placeholder={t('user.namePlaceholder')}
            value={name}
            onChange={e => {
              handleNameChange(e.target.value);
            }}
          />
        </form>
      </div>
    </>
  );
};
