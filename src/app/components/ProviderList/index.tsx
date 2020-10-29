import React from 'react';
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

import { useTypedSelector } from 'store/reducers';
import { Provider } from 'store/model/provider';

const useStyles = makeStyles(theme => ({
  table: {
    minWidth: 650,
  },
}));

export const ProviderList = ({
  providers,
  isRequest,
  page,
  rowsPerPage,
  totalCount,
  handleChangePage,
  handleChangeRowsPerPage,
}: {
  providers: Provider[];
  isRequest: boolean;
  page: number;
  rowsPerPage: number;
  totalCount: number;
  handleChangePage: (page) => void;
  handleChangeRowsPerPage: (rowsPerPage) => void;
}) => {
  const classes = useStyles();
  const userOfIds = useTypedSelector(state => state.userOfIds);

  const showUserName = (userId: string) => {
    if (userOfIds.isRequest) {
      return <CircularProgress />;
    }
    const user = userOfIds.users.find(user => user.id === userId);
    return user ? user.name : `not found this user's namn: ${userId}`;
  };

  return (
    <>
      <LinearProgress hidden={!isRequest} />
      <TableContainer component={Paper}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell> name </TableCell>
              <TableCell> description </TableCell>
              <TableCell> phone </TableCell>
              <TableCell> createdBy </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {providers.map(data => (
              <TableRow key={data.id} hover>
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
        onChangePage={(event, page) => {
          handleChangePage(page);
        }}
        onChangeRowsPerPage={event => {
          handleChangeRowsPerPage(event.target.value);
        }}
      />
    </>
  );
};
