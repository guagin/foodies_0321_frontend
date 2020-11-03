import { CircularProgress, Typography } from '@material-ui/core';
import React from 'react';

import { Provider } from './reducer';

export const ProviderName = ({
  provider,
  classes,
}: {
  provider?: Provider;
  classes: {
    inline: string;
  };
}) => {
  if (!provider) {
    return <CircularProgress />;
  }

  return (
    <Typography className={classes.inline} color="textSecondary">
      {provider.name}
    </Typography>
  );
};
