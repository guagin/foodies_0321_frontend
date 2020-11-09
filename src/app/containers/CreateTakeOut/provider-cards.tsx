import { chunk } from 'lodash';
import React from 'react';
import {
  makeStyles,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Grid,
  CircularProgress,
} from '@material-ui/core';
import { Provider } from 'store/model/provider';

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

export const ProviderCards = ({
  providers,
  isRequest,
  onClickChoose,
}: {
  providers: Provider[];
  isRequest: boolean;
  onClickChoose: (id: string) => void;
}) => {
  if (isRequest) {
    return <CircularProgress />;
  }
  return (
    <>
      <Grid container spacing={2}>
        {providers.map(provider => (
          <>
            <ProviderCard provider={provider} onClickChoose={onClickChoose} />
          </>
        ))}
      </Grid>
    </>
  );
};

const ProviderCard = ({
  provider,
  onClickChoose,
}: {
  provider: Provider;
  onClickChoose: (id: string) => void;
}) => {
  const classes = useStyles();
  return (
    <>
      <Grid item xs={4} sm={4}>
        <Card
          className={classes.root}
          variant="outlined"
          onClick={() => {
            onClickChoose(provider.id);
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
              {provider.name}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              {provider.description}
            </Typography>
            <Typography variant="body2" component="p">
              {provider.description}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
};
