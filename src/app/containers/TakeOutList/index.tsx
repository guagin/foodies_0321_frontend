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
} from './selector';
import { createStructuredSelector } from 'reselect';
import { fetchTakeOut } from './action';
import { fetchTakeOutReducer } from './reducer';
import { FetchTakeOutFlow } from './saga';
import { useInjectReducer } from 'redux-injectors';
import { useInjectSaga } from 'utils/redux-injectors';
import { Helmet } from 'react-helmet-async';
import { push } from 'connected-react-router';
import AddIcon from '@material-ui/icons/Add';

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
});

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

  const { isRequest, takeOuts, totalCount, message } = useSelector(
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
      fetchTakeOut({
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
                <TableCell> id </TableCell>
                <TableCell> title </TableCell>
                <TableCell> createdBy </TableCell>
                <TableCell> description </TableCell>
                <TableCell> startedAt </TableCell>
                <TableCell> endedAt </TableCell>
                <TableCell> enabled </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {takeOuts.map(data => (
                <TableRow
                  key={data.id}
                  hover
                  onClick={() => handleOnClick(data.id)}
                >
                  <TableCell>{data.id}</TableCell>
                  <TableCell>{data.title}</TableCell>
                  <TableCell>{data.createdBy}</TableCell>
                  <TableCell>{data.description}</TableCell>
                  <TableCell>{data.startedAt}</TableCell>
                  <TableCell>{data.endAt}</TableCell>
                  <TableCell>{data.enabled}</TableCell>
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
