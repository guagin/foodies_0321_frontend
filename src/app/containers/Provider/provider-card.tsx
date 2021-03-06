import { createStyles, makeStyles, Theme, Typography } from '@material-ui/core';
import React, { ReactElement } from 'react';
import { User } from 'store/users-of-ids/reducer';
import { Provider } from './reducer';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(2),
      minWidth: 275,
    },
    title: {
      fontSize: 26,
    },
    subTitle: {
      marginBottom: 12,
    },
    inline: {
      marginBottom: 12,
    },
    divier: {
      marginBottom: theme.spacing(2),
    },
  }),
);

export const ProviderCard: ({
  provider,
  users,
}: {
  provider: Provider;
  users: User[];
}) => ReactElement = ({ provider, users }) => {
  const classes = useStyles();

  return (
    <>
      <Typography
        className={classes.subTitle}
        gutterBottom
        variant="h5"
        component="h2"
      >
        {provider.name}
      </Typography>
      <Typography className={classes.inline} gutterBottom>
        {provider.phone}
      </Typography>
    </>
  );
};
