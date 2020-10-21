import React from 'react';
import {
  Card,
  CardContent,
  CircularProgress,
  makeStyles,
  Typography,
} from '@material-ui/core';

import { Order } from './reducer';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export const OrderDeatailCard = ({ order }: { order?: Order }) => {
  const classes = useStyles();
  if (!order) {
    return (
      <>
        <CircularProgress />
      </>
    );
  }
  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
          variant="h5"
          component="h2"
        >
          {order.id}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {order.createdBy}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {order.status}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {order.takeOutId}
        </Typography>
      </CardContent>
    </Card>
  );
};
