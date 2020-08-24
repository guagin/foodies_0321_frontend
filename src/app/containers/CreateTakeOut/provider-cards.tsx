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
  const providerRows = chunk(providers, 3);

  if (isRequest) {
    return <CircularProgress />;
  }
  return (
    <>
      {providerRows.map(row => (
        <>
          <ProviderCardRows
            key={row.keys.toString()}
            providers={row}
            onClickChoose={onClickChoose}
          />
        </>
      ))}
    </>
  );
};

const ProviderCardRows = ({
  providers,
  onClickChoose,
}: {
  providers: Provider[];
  onClickChoose: (id: string) => void;
}) => {
  const classes = useStyles();
  return (
    <>
      <Grid container spacing={2}>
        {providers.map(provider => (
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
                  {provider.name}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  {provider.description}
                </Typography>
                <Typography variant="body2" component="p">
                  {provider.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  onClick={() => {
                    onClickChoose(provider.id);
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
};
