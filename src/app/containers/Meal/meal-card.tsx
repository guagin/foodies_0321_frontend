import classes from '*.module.css';
import { Card, CardContent, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { User } from 'store/users-of-ids/reducer';
import { Meal, Provider } from './reducer';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    marginLeft: theme.spacing(4),
    marginRight: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  title: {
    fontSize: 26,
  },
  root: {
    marginTop: theme.spacing(2),
    minWidth: 275,
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
}));

export const MealCard = ({
  meal,
  users,
  provider,
}: {
  meal: Meal;
  users: User[];
  provider: Provider;
}) => {
  const classes = useStyles();
  const getUserName = () => {
    const found = users.find(e => e.id === meal.createdBy);

    return found ? found.name : '';
  };
  return (
    <>
      <Card className={classes.root} variant="outlined">
        <CardContent>
          <Typography
            className={classes.subTitle}
            color="textSecondary"
            gutterBottom
            variant="h5"
            component="h2"
          >
            {meal.name}
          </Typography>
          <Typography
            className={classes.subTitle}
            color="textSecondary"
            gutterBottom
          >
            {getUserName()}
          </Typography>
          <Typography
            className={classes.subTitle}
            color="textSecondary"
            gutterBottom
          >
            {meal.description}
          </Typography>
          <Typography
            className={classes.subTitle}
            color="textSecondary"
            gutterBottom
          >
            {meal.price}
          </Typography>
          <Typography
            className={classes.subTitle}
            color="textSecondary"
            gutterBottom
          >
            {provider.name}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};
