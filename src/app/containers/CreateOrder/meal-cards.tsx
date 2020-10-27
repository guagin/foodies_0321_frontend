import React from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Grid,
  Typography,
} from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { chunk } from 'lodash';
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
  onClickChoose,
}: {
  meals: Meal[];
  isRequest: boolean;
  onClickChoose: (meal: Meal) => void;
}) {
  if (isRequest) {
    return <CircularProgress />;
  }

  console.log(meals);
  const mealRows = chunk(meals, 3);
  return (
    <>
      {mealRows.map(row => (
        <>
          <MealCardRows meals={row} onClickChoose={onClickChoose} />
        </>
      ))}
    </>
  );
}

function MealCardRows({
  meals,
  onClickChoose,
}: {
  meals: Meal[];
  onClickChoose: (meal: Meal) => void;
}) {
  const classes = useStyles();

  return (
    <>
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
                  {meal.id}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  {meal.price}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  {meal.provider}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  {meal.description}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  {meal.createdBy}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  onClick={() => {
                    onClickChoose(meal);
                  }}
                >
                  choose
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
