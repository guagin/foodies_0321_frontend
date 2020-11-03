import {
  Card,
  CardContent,
  CircularProgress,
  createStyles,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { ProviderName } from './provider-name';
import { Order, Provider, Takeout } from './reducer';
import { TakeoutTitle } from './takeout-title';

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

export const OrderBasicInfo = ({
  order,
  takeout,
  provider,
}: {
  order?: Order;
  takeout?: Takeout;
  provider?: Provider;
}) => {
  const classes = useStyles();

  if (!order) {
    return (
      <>
        <CircularProgress />
      </>
    );
  }

  return (
    <>
      <Typography className={classes.title} color="textSecondary">
        basicInfo
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
            {order.id}
          </Typography>
          <Typography className={classes.inline} color="textSecondary">
            {order.createdBy}
          </Typography>
          <TakeoutTitle takeout={takeout} classes={classes} />
          <ProviderName provider={provider} classes={classes} />
          <Typography className={classes.inline} color="textSecondary">
            {order.status}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};
