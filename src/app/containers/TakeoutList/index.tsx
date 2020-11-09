import React, { useEffect, useState } from 'react';
import {
  makeStyles,
  TableContainer,
  Paper,
  Table,
  LinearProgress,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  TablePagination,
  CssBaseline,
  Fab,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useTypedSelector } from 'store/reducers';
import {
  makeSelectIsRequest,
  makeSelectTakeOuts,
  makeSelectMessage,
  makeSelectTotalCount,
  makeSelectUsers,
} from './selector';
import { createStructuredSelector } from 'reselect';
import { fetchTakeout } from './action';
import { fetchTakeOutReducer } from './reducer';
import { FetchTakeOutFlow } from './saga';
import { useInjectReducer } from 'redux-injectors';
import { useInjectSaga } from 'utils/redux-injectors';
import { Helmet } from 'react-helmet-async';
import { push } from 'connected-react-router';
import AddIcon from '@material-ui/icons/Add';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { getDateTimeString } from 'utils/datetime-string';
import { find } from 'lodash';

const useStyles = makeStyles(theme => ({
  table: {
    minWidth: 650,
  },
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
}));

const stateSelector = createStructuredSelector({
  isRequest: makeSelectIsRequest(),
  takeOuts: makeSelectTakeOuts(),
  totalCount: makeSelectTotalCount(),
  message: makeSelectMessage(),
  users: makeSelectUsers(),
});

const StartedAt = ({ date }: { date: Date }) => {
  return <>{getDateTimeString(moment(date).toDate())}</>;
};

const EndAt = ({ date }: { date: Date }) => {
  return <>{getDateTimeString(moment(date).toDate())}</>;
};

export const TakeOutList = () => {
  useInjectReducer({
    key: 'fetchTakeOut',
    reducer: fetchTakeOutReducer,
  });

  useInjectSaga({
    key: 'fetchTakeOut',
    saga: FetchTakeOutFlow,
  });

  const classes = useStyles();
  const dispatch = useDispatch();

  const { token } = useTypedSelector(state => state.me);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const { isRequest, takeOuts, totalCount, message, users } = useSelector(
    stateSelector,
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  const handleClickAddIcon = () => {
    dispatch(push('/take-out/create'));
  };

  useEffect(() => {
    dispatch(
      fetchTakeout({
        token,
        page: page + 1,
        count: rowsPerPage,
      }),
    );
  }, [dispatch, token, page, rowsPerPage]);

  const showMessage = () => {
    if (message) {
      console.error(message);
      return <div>{message}</div>;
    }
    return <></>;
  };

  const handleOnClick = (id: string) => {
    dispatch(push(`/takeout/ofId/${id}`));
  };

  const { t } = useTranslation();

  const getUserName = (id: string) => {
    const user = find(users, e => e.id);

    return user ? user.name : '';
  };

  return (
    <>
      <Helmet>
        <title>Take Out List Page</title>
        <meta name="description" content="foodies pick TakeOut page." />
      </Helmet>
      <CssBaseline />
      <div className={classes.paper}>
        {showMessage()}
        <LinearProgress hidden={!isRequest} />
        <TableContainer component={Paper}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell> {t('takeout.title')} </TableCell>
                <TableCell> {t('takeout.createdBy')} </TableCell>
                <TableCell> {t('takeout.description')} </TableCell>
                <TableCell> {t('takeout.startedAt')} </TableCell>
                <TableCell> {t('takeout.endAt')} </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {takeOuts.map(data => (
                <TableRow
                  key={data.id}
                  hover
                  onClick={() => handleOnClick(data.id)}
                >
                  <TableCell>{data.title}</TableCell>
                  <TableCell>{getUserName(data.createdBy)}</TableCell>
                  <TableCell>{data.description}</TableCell>
                  <TableCell>
                    <StartedAt date={data.startedAt} />
                  </TableCell>
                  <TableCell>
                    <EndAt date={data.endAt} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          page={page}
          component="div"
          count={totalCount}
          rowsPerPage={rowsPerPage}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
        <Fab
          color="primary"
          aria-label="add"
          className={classes.fab}
          onClick={handleClickAddIcon}
        >
          <AddIcon />
        </Fab>
      </div>
    </>
  );
};
