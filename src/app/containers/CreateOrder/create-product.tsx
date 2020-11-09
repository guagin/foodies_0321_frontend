import {
  Box,
  Button,
  Card,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { grey } from '@material-ui/core/colors';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Meal } from './reducer';
import IconButton from '@material-ui/core/IconButton/IconButton';

const useStyle = makeStyles(theme => ({
  paper: {
    paddingBottom: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
  },
  name: {
    paddingLeft: theme.spacing(2),
  },
  description: {
    paddingLeft: theme.spacing(2),
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),

    width: '100%',
  },
  priceCalculation: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    width: '100%',
  },
  price: {
    background: grey[200],
    color: grey[500],
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    width: '100%',
  },
  appendAProduct: {
    background: grey[200],
    color: grey[500],
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    width: '100%',
  },
  addIcon: {
    background: grey[200],
  },
  removeIcon: {
    background: grey[200],
  },
  amountDiv: {
    paddingRight: theme.spacing(2),
  },
  amount: {
    fontSize: '18',
    padding: theme.spacing(1),
  },
}));

export const CreateProduct = ({ meal }: { meal: Meal }) => {
  const classes = useStyle();
  const { t } = useTranslation();

  const [amount, setAmount] = useState(1);

  const handleAddClick = () => {
    setAmount(amount + 1);
  };

  const handleRemoveClick = () => {
    if (amount > 1) {
      setAmount(amount - 1);
    }
  };

  if (!meal) {
    return <></>;
  }
  return (
    <div>
      <Card className={classes.paper}>
        <Typography variant="h4" component="h4" className={classes.name}>
          {meal.name}
        </Typography>
        <div className={classes.description}>
          <Typography>{meal.description}</Typography>
        </div>
        <div className={classes.priceCalculation}>
          <Grid container spacing={2}>
            <Grid item sm={4}>
              <Grid container spacing={2} alignItems="center">
                <Grid item sm={4}>
                  <IconButton
                    className={classes.removeIcon}
                    onClick={handleRemoveClick}
                  >
                    <RemoveIcon />
                  </IconButton>
                </Grid>
                <Grid item sm={4}>
                  <Typography>
                    <Box display="flex" justifyContent="center">
                      {amount}
                    </Box>
                  </Typography>
                </Grid>
                <Grid item sm={4}>
                  <IconButton
                    className={classes.addIcon}
                    onClick={handleAddClick}
                  >
                    <AddIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
            <Grid item sm={8}>
              <Grid container spacing={2} className={classes.appendAProduct}>
                <Grid item sm={8}>
                  <Box display="flex" justifyContent="flex-end">
                    <Typography>
                      {t('createOrder.appendAProduct').replace(
                        '%s',
                        `${amount}`,
                      )}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item sm={4} className={classes.price}>
                  <Box display="flex" justifyContent="flex-end">
                    <Typography>${meal.price * amount}</Typography>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </Card>
    </div>
  );
};
