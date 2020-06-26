import React from 'react';
import { CircularProgress } from '@material-ui/core';

export const ProgressCircle = ({ isRequest }: { isRequest: boolean }) => {
  if (isRequest) {
    return <CircularProgress />;
  }
  return <></>;
};
