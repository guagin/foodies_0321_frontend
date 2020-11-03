import { CircularProgress, Typography } from '@material-ui/core';
import React from 'react';
import { Takeout } from './reducer';

export const TakeoutTitle = ({
  takeout,
  classes,
}: {
  takeout?: Takeout;
  classes: {
    inline: string;
  };
}) => {
  if (!takeout) {
    return <CircularProgress />;
  }

  return (
    <Typography className={classes.inline} color="textSecondary">
      {takeout.title}
    </Typography>
  );
};
