import React from 'react';
import { makeStyles } from '@material-ui/core';
import { useTypedSelector } from 'store/reducers';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    marginLeft: theme.spacing(4),
    marginRight: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

export const CreateTakeOut = () => {
  const classes = useStyles();

  const provider = useTypedSelector(state => state.provider);

  return <></>;
};
