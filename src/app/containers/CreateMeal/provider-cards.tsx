import React from 'react';
import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CircularProgress,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { Provider } from './reducer';
import { chunk, map } from 'lodash';

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

export function ProviderCards({
  providers,
  isRequest,
  onClickChoose,
}: {
  providers: Provider[];
  isRequest: boolean;
  onClickChoose: (provider: Provider) => void;
}) {
  const providerRows = chunk(providers, 3);

  if (isRequest) {
    return <CircularProgress />;
  }

  return (
    <>
      {providerRows.map(row => (
        <>
          <ProviderCardRow providers={row} onClickChoose={onClickChoose} />
        </>
      ))}
    </>
  );
}

export function ProviderCardRow({
  providers,
  onClickChoose,
}: {
  providers: Provider[];
  onClickChoose: (provider: Provider) => void;
}) {
  const classes = useStyles();

  return (
    <>
      <Grid container spacing={2}>
        {map(providers, e => (
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
                  {e.name}
                </Typography>
                <Typography>{e.createdBy}</Typography>
              </CardContent>
              <CardActionArea>
                <Button
                  size="small"
                  onClick={() => {
                    onClickChoose(e);
                  }}
                >
                  choose
                </Button>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
