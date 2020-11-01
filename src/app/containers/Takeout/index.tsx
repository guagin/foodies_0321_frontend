import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeSelectIsRequest, makeSelectTakeout } from './selector';
import { createStructuredSelector } from 'reselect';
import { makeSelectMessage } from '../SignUpPage/selector';
import { fetchTakeoutOfId } from './action';
import { useTypedSelector } from 'store/reducers';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import { takeoutReducer, Takeout } from './reducer';
import { TakeoutFlow } from './saga';
import {
  makeStyles,
  Grid,
  Typography,
  Card,
  CssBaseline,
  CircularProgress,
  CardContent,
} from '@material-ui/core';
import { Helmet } from 'react-helmet-async';

interface Props {
  computedMatch: ComputedMatch;
}

interface ComputedMatch {
  params: { id: string };
}

const stateSelector = createStructuredSelector({
  isRequest: makeSelectIsRequest(),
  takeout: makeSelectTakeout(),
  message: makeSelectMessage(),
});

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

const BasicInfo = ({ takeout }: { takeout: Takeout }) => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.paper}>
        <Grid container justify={'center'}>
          <Grid item>
            <Typography className={classes.title} color="textSecondary">
              takeout
            </Typography>
            <Card className={classes.root} variant="outlined">
              <CardContent>
                <Typography
                  className={classes.subTitle}
                  color="textSecondary"
                  gutterBottom
                  variant="h5"
                  component="h2"
                >
                  {takeout.title}
                </Typography>
                <Typography
                  className={classes.subTitle}
                  color="textSecondary"
                  gutterBottom
                >
                  {takeout.providerId}
                </Typography>
                <Typography
                  className={classes.subTitle}
                  color="textSecondary"
                  gutterBottom
                >
                  {takeout.createdBy}
                </Typography>
                <Typography
                  className={classes.subTitle}
                  color="textSecondary"
                  gutterBottom
                >
                  {takeout.startedAt}
                </Typography>
                <Typography
                  className={classes.subTitle}
                  color="textSecondary"
                  gutterBottom
                >
                  {takeout.endAt}
                </Typography>
                <Typography
                  className={classes.subTitle}
                  color="textSecondary"
                  gutterBottom
                >
                  {takeout.description}
                </Typography>
                <Typography
                  className={classes.subTitle}
                  color="textSecondary"
                  gutterBottom
                >
                  {takeout.enabled}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export const TakeoutPage: (props: Props) => ReactElement = ({
  computedMatch: {
    params: { id },
  },
}) => {
  useInjectReducer({ key: 'takeout', reducer: takeoutReducer });
  useInjectSaga({ key: 'takeout', saga: TakeoutFlow });

  const { isRequest, takeout, message } = useSelector(stateSelector);

  const { token } = useTypedSelector(state => state.me);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTakeoutOfId({ token, id }));
  }, [token, id, dispatch]);

  if (isRequest) {
    return (
      <>
        <CircularProgress />
      </>
    );
  }

  // todo: basic info.
  // todo: order lsit.
  return (
    <>
      <Helmet>
        <title>Provider Detail Page</title>
        <meta name="takeout page" content="foodies takeout page." />
      </Helmet>
      <CssBaseline />
      <BasicInfo takeout={takeout} />
      {/* <OrderList orders={} /> */}
    </>
  );
};
