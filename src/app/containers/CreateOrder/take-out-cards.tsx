import React from 'react';
import { chunk } from 'lodash';
import {
  CircularProgress,
  makeStyles,
  Grid,
  Typography,
  CardContent,
  CardActions,
  Button,
  Card,
} from '@material-ui/core';
import { Takeout } from '../TakeoutList/take-out';

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

export function TakeOutCards({
  takeOuts,
  isRequest,
  onClickChoose,
}: {
  takeOuts: Takeout[];
  isRequest: boolean;
  onClickChoose: (takeOut: Takeout) => void;
}) {
  const takeOutRows = chunk(takeOuts, 3);

  if (isRequest) {
    return <CircularProgress />;
  }

  return (
    <>
      {takeOutRows.map(row => (
        <>
          <TakeOutCardRows
            key={row.keys.toString()}
            takeOuts={row}
            onClickChoose={onClickChoose}
          />
        </>
      ))}
    </>
  );
}

function TakeOutCardRows({
  takeOuts,
  onClickChoose,
}: {
  takeOuts: Takeout[];
  onClickChoose: (takeOut: Takeout) => void;
}) {
  const classes = useStyles();

  return (
    <>
      <Grid container spacing={2}>
        {takeOuts.map(takeOut => (
          <Grid item xs={4} sm={4}>
            <Card className={classes.root} variant="outlined">
              <CardContent>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                  variant="h5"
                  component="h2"
                >
                  {takeOut.title}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  {takeOut.description}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  {takeOut.startedAt}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  {takeOut.endAt}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  {takeOut.createdBy}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  onClick={() => {
                    onClickChoose(takeOut);
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
