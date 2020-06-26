import React, { useState, useEffect } from 'react';
import {
  makeStyles,
  LinearProgress,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  CircularProgress,
} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from 'store/reducers';
import { fetchProviderCreator } from 'store/provider/action/fetch-provider';
import { fetchUserOfIdsCreator } from 'store/users-of-ids/action/fetch-users-of-id';

const useStyles = makeStyles(theme => ({
  table: {
    minWidth: 650,
  },
}));

export const ProviderList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const me = useTypedSelector(state => state.me);
  const provider = useTypedSelector(state => state.provider);
  const userOfIds = useTypedSelector(state => state.userOfIds);

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  useEffect(() => {
    dispatch(
      fetchProviderCreator({
        page: page + 1,
        count: rowsPerPage,
        token: me.token,
      }),
    );
  }, [dispatch, me.token, page, rowsPerPage]);

  useEffect(() => {
    dispatch(
      fetchUserOfIdsCreator({
        token: me.token,
        ids: provider.providers.map(data => data.createdBy),
      }),
    );
  }, [dispatch, me.token, provider.providers]);

  const { totalCount } = provider;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  const showUserName = (userId: string) => {
    if (userOfIds.isRequest) {
      return <CircularProgress />;
    }
    const user = userOfIds.users.find(user => user.id === userId);
    return user ? user.name : `not found this user's namn: ${userId}`;
  };

  return (
    <>
      <LinearProgress hidden={!provider.isRequest} />
      <TableContainer component={Paper}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell> id </TableCell>
              <TableCell> name </TableCell>
              <TableCell> description </TableCell>
              <TableCell> provider </TableCell>
              <TableCell> createdBy </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {provider.providers.map(data => (
              <TableRow key={data.id} hover>
                <TableCell>{data.id}</TableCell>
                <TableCell>{data.name}</TableCell>
                <TableCell>{data.description}</TableCell>
                <TableCell>{data.phone}</TableCell>
                <TableCell>{showUserName(data.createdBy)}</TableCell>
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
    </>
  );
};
