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
  CssBaseline,
  CircularProgress,
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
import { useTranslation } from 'react-i18next';

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
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
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

  const current = new Date();

  const startedAt = () => {
    if (moment(takeout.startedAt).toDate().getTime() <= current.getTime()) {
      return (
        <Typography className={classes.subTitle} gutterBottom>
          {getDateTimeString(moment(takeout.startedAt).toDate())}
        </Typography>
      );
    }

    return (
      <Typography
        className={classes.subTitle}
        style={{
          color: 'red',
        }}
        gutterBottom
      >
        {getDateTimeString(moment(takeout.startedAt).toDate())}
      </Typography>
    );
  };

  const endAt = () => {
    if (moment(takeout.endAt).toDate().getTime() < current.getTime()) {
      return (
        <Typography
          className={classes.subTitle}
          style={{
            color: 'red',
          }}
          gutterBottom
        >
          {getDateTimeString(moment(takeout.endAt).toDate())}
        </Typography>
      );
    }
    return (
      <Typography className={classes.subTitle} gutterBottom>
        {getDateTimeString(moment(takeout.endAt).toDate())}
      </Typography>
    );
  };

  return (
    <>
      <div className={classes.paper}>
        <Grid container justify={'flex-start'}>
          <Grid item>
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
            {startedAt()}
            {endAt()}
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
          </Grid>
        </Grid>
      </div>
    </>
  );
};

const OrderTable = ({ orders, users }: { orders: Order[]; users: User[] }) => {
  const classes = useStyles();

  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleClickOnOrder = (id: string) => {
    dispatch(push(`/order/ofId/${id}`));
  };

  const getUserName = (id: string) => {
    const found = users.find(e => e.id === id);
    return found ? found.name : '';
  };

  return (
    <div className={classes.paper}>
      <Grid container justify={'flex-start'}>
        <Grid item sm={12} xs={12}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>{t('order.createdBy')}</TableCell>
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
    </div>
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
  const dispatch = useDispatch();
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

  return (
    <>
      <Fab
        className={classes.fab}
        color="primary"
        aria-label="add"
        disabled={!(isTakeoutAvailable() && isNoOrderBelongsTo())}
        onClick={() => {
          dispatch(push(`/order/create/${takeout.id}`));
        }}
      >
        <AddIcon />
      </Fab>
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

  const { takeout, orders, provider, user, orderUsers } = useSelector(
    stateSelector,
  );
  const { token, id: selfUserId } = useTypedSelector(state => state.me);
  const dispatch = useDispatch();
  const { t } = useTranslation();

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
        <title>{t('TakeoutDetailPage')}</title>
        <meta name="takeout page" content="foodies takeout page." />
      </Helmet>
      <CssBaseline />
      <BasicInfo takeout={takeout} provider={provider} user={user} />
      <OrderTable orders={orders} users={orderUsers} />
      <AddFab takeout={takeout} orders={orders} userId={selfUserId} />
    </>
  );
};
