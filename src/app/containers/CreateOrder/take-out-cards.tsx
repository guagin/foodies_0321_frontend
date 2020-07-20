import React from 'react';
import { TakeOut } from 'store/take-out-of-page/reducer';
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
  takeOuts: TakeOut[];
  isRequest: boolean;
  onClickChoose: (id: string) => void;
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
  takeOuts: TakeOut[];
  onClickChoose: (id: string) => void;
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
                    onClickChoose(takeOut.id);
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
