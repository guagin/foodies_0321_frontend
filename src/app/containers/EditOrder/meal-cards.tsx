import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { useDispatch } from 'react-redux';
import { appendMeal } from './actions';
import { Meal, User } from './reducer';

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

export const MealCards = ({
  meals,
  users,
}: {
  meals: Meal[];
  users: User[];
}) => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const handleAppendClick = (meal: Meal) => {
    dispatch(
      appendMeal({
        meal,
      }),
    );
  };

  const getUserName = (id: string) => {
    const user = users.find(e => e.id === id);
    return user ? user.name : '';
  };

  return (
    <Grid container spacing={2}>
      {meals.map(meal => (
        <Grid item xs={4} sm={4}>
          <Card>
            <CardContent>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
                variant="h5"
                component="h2"
              >
                {meal.name}
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                {meal.price}
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                {meal.description}
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                {getUserName(meal.createdBy)}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                onClick={() => {
                  handleAppendClick(meal);
                }}
              >
                append
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};
