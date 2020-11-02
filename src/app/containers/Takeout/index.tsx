import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { fetchTakeoutOfId } from './action';
import { useTypedSelector } from 'store/reducers';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import { takeoutReducer, Takeout, Order, Provider, User } from './reducer';
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
  Fab,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { Helmet } from 'react-helmet-async';
import {
  makeSelectMessage,
  makeSelectOrders,
  makeSelectOrderUsers,
  makeSelectProvider,
  makeSelectTakeout,
  makeSelectTakeoutUser,
} from './selector';
import { getDateTimeString } from 'utils/datetime-string';
import { push } from 'connected-react-router';
import { some } from 'lodash';
import moment from 'moment';

interface Props {
  computedMatch: ComputedMatch;
}

interface ComputedMatch {
  params: { id: string };
}

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
  user,
}: {
  takeout: Takeout;
  provider: Provider;
  user: { name: string };
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
                  {provider ? provider.name : ''}
                </Typography>
                <Typography
                  className={classes.subTitle}
                  color="textSecondary"
                  gutterBottom
                >
                  {user ? user.name : ''}
                </Typography>
                <Typography
                  className={classes.subTitle}
                  color="textSecondary"
                  gutterBottom
                >
                  {getDateTimeString(moment(takeout.startedAt).toDate())}
                </Typography>
                <Typography
                  className={classes.subTitle}
                  color="textSecondary"
                  gutterBottom
                >
                  {getDateTimeString(moment(takeout.endAt).toDate())}
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

const OrderTable = ({ orders, users }: { orders: Order[]; users: User[] }) => {
  const dispatch = useDispatch();

  const handleClickOnOrder = (id: string) => {
    dispatch(push(`/order/ofId/${id}`));
  };

  const getUserName = (id: string) => {
    const found = users.find(e => e.id === id);
    return found ? found.name : '';
  };

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
                <TableRow
                  onClick={() => {
                    handleClickOnOrder(e.id);
                  }}
                >
                  <TableCell>{getUserName(e.createdBy)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Grid>
      </Grid>
    </>
  );
};

const stateSelector = createStructuredSelector({
  takeout: makeSelectTakeout(),
  message: makeSelectMessage(),
  orders: makeSelectOrders(),
  provider: makeSelectProvider(),
  user: makeSelectTakeoutUser(),
  orderUsers: makeSelectOrderUsers(),
});

export const AddFab = ({
  takeout,
  orders,
  userId,
}: {
  takeout: Takeout;
  orders: Order[];
  userId: string;
}) => {
  const classes = useStyles();

  const isTakeoutAvailable = () => {
    if (!takeout) {
      return false;
    }

    const current = new Date();
    const startedAt = moment(takeout.startedAt).toDate();
    const endAt = moment(takeout.endAt).toDate();
    return (
      startedAt.getTime() <= current.getTime() &&
      endAt.getTime() > current.getTime() &&
      takeout.enabled
    );
  };

  const isNoOrderBelongsTo = () => {
    return !some(orders, e => e.createdBy === userId);
  };

  if (isTakeoutAvailable() && isNoOrderBelongsTo()) {
    return (
      <>
        <Fab className={classes.fab} color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </>
    );
  }

  return <></>;
};

export const TakeoutPage: (props: Props) => ReactElement = ({
  computedMatch: {
    params: { id },
  },
}) => {
  useInjectReducer({ key: 'takeout', reducer: takeoutReducer });
  useInjectSaga({ key: 'takeout', saga: TakeoutFlow });

  const { takeout, message, orders, provider, user, orderUsers } = useSelector(
    stateSelector,
  );
  const { token, id: selfUserId } = useTypedSelector(state => state.me);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTakeoutOfId({ token, id }));
  }, [token, id, dispatch]);

  if (!takeout) {
    return (
      <>
        <CircularProgress />
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Takeout Detail Page</title>
        <meta name="takeout page" content="foodies takeout page." />
      </Helmet>
      <CssBaseline />
      <BasicInfo takeout={takeout} provider={provider} user={user} />
      <OrderTable orders={orders} users={orderUsers} />
      <AddFab takeout={takeout} orders={orders} userId={selfUserId} />
    </>
  );
};
