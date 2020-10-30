import {
  Button,
  Card,
  CardActions,
  CardContent,
  createStyles,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { Meal } from './reducer';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(2),
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

export const MealCard = ({
  meal,
  handleOnClick,
}: {
  meal: Meal;
  handleOnClick: (id: string) => void;
}) => {
  const classes = useStyles();
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
            {meal.description}
          </Typography>
          <Typography
            className={classes.subTitle}
            color="textSecondary"
            gutterBottom
          >
            {meal.price}
          </Typography>
        </CardContent>
        <CardActions>
          <Button onClick={() => handleOnClick(meal.id)}>detail</Button>
        </CardActions>
      </Card>
    </>
  );
};
