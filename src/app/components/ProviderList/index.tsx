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
} from '@material-ui/core';

import { Provider } from 'store/model/provider';
import { useTranslation } from 'react-i18next';

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
  handleOnClick,
}: {
  providers: Provider[];
  isRequest: boolean;
  page: number;
  rowsPerPage: number;
  totalCount: number;
  handleChangePage: (page) => void;
  handleChangeRowsPerPage: (rowsPerPage) => void;
  handleOnClick: (id: string) => void;
}) => {
  const classes = useStyles();

  const { t } = useTranslation();

  return (
    <>
      <LinearProgress hidden={!isRequest} />
      <TableContainer component={Paper}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell> {t('provider.name')} </TableCell>
              <TableCell> {t('provider.description')} </TableCell>
              <TableCell> {t('provider.phone')} </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {providers.map(data => (
              <TableRow
                key={data.id}
                hover
                onClick={() => handleOnClick(data.id)}
              >
                <TableCell>{data.name}</TableCell>
                <TableCell>{data.description}</TableCell>
                <TableCell>{data.phone}</TableCell>
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
