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
} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from 'store/reducers';
import { fetchProviderCreator } from 'store/provider/action/fetch-provider';

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

  const { totalCount } = provider;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(event.target.value);
    setPage(0);
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
                <TableCell>{data.createdBy}</TableCell>
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
