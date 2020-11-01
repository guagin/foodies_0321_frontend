import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  makeSelectIsRequest,
  makeSelectTakeout,
  makeSelectProvider,
} from './selector';
import { createStructuredSelector } from 'reselect';
import { makeSelectMessage } from '../SignUpPage/selector';
import { fetchTakeoutOfId } from './action';
import { useTypedSelector } from 'store/reducers';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import { takeoutReducer, Takeout, Order, Provider } from './reducer';
import { TakeoutFlow } from './saga';
import {
  makeStyles,
  Grid,
  Typography,
  Card,
  CssBaseline,
  CircularProgress,
  CardContent,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@material-ui/core';
import { Helmet } from 'react-helmet-async';
import { makeSelectOrders } from '../OrderList/selector';

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
  orders: makeSelectOrders(),
  provider: makeSelectProvider(),
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

const BasicInfo = ({
  takeout,
  provider,
}: {
  takeout: Takeout;
  provider: Provider;
}) => {
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
                  {provider.name}
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

const OrderTable = ({ orders }: { orders: Order[] }) => {
  return (
    <>
      <Grid container justify={'center'}>
        <Grid item sm={10} xs={10}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>createdBy</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map(e => (
                <TableRow>
                  <TableCell>{e.createdBy}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Grid>
      </Grid>
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

  const { isRequest, takeout, message, orders, provider } = useSelector(
    stateSelector,
  );
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
        <title>Takeout Detail Page</title>
        <meta name="takeout page" content="foodies takeout page." />
      </Helmet>
      <CssBaseline />
      <BasicInfo takeout={takeout} provider={provider} />
      <OrderTable orders={orders} />
    </>
  );
};
