import React from 'react';
import {
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Typography,
} from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Meal } from '../MealList/reducer';

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

export function MealCards({
  meals,
  isRequest,
  handleOnClick,
}: {
  meals: Meal[];
  isRequest: boolean;
  handleOnClick: (meal: Meal) => void;
}) {
  if (isRequest) {
    return <CircularProgress />;
  }

  console.log(meals);

  return (
    <>
      <Grid container spacing={2}>
        {meals.map(meal => (
          <MealCard meal={meal} handleOnClick={handleOnClick} />
        ))}
      </Grid>
    </>
  );
}

function MealCard({
  meal,
  handleOnClick,
}: {
  meal: Meal;
  handleOnClick: (meal: Meal) => void;
}) {
  const classes = useStyles();

  return (
    <>
      <Grid item xs={4} sm={4}>
        <Card
          onClick={() => {
            handleOnClick(meal);
          }}
        >
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
              ${meal.price}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              {meal.description}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
}
