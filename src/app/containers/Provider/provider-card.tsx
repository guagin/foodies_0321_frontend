import {
  Card,
  CardContent,
  createStyles,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core';
import { find } from 'lodash';
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
  const getName = (id: string) => {
    const user = find(users, e => e.id === id);

    return user ? user.name : '';
  };
  return (
    <>
      <Typography className={classes.title} color="textSecondary">
        provider
      </Typography>
      <Card className={classes.root} variant="outlined">
        <CardContent>
          <Typography
            className={classes.subTitle}
            color="textSecondary"
            gutterBottom
            variant="h5"
            component="h2"
          >
            {provider.name}
          </Typography>
          <Typography
            className={classes.subTitle}
            color="textSecondary"
            gutterBottom
          >
            {getName(provider.createdBy)}
          </Typography>
          <Typography
            className={classes.subTitle}
            color="textSecondary"
            gutterBottom
          >
            {provider.phone}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};
