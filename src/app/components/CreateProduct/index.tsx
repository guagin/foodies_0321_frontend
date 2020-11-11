import {
  Box,
  Button,
  Card,
  CardMedia,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import RemoveIcon from '@material-ui/icons/Remove';
import { blue, grey, yellow } from '@material-ui/core/colors';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import IconButton from '@material-ui/core/IconButton/IconButton';

interface Meal {
  id: string;
  name: string;
  description: string;
  price: number;
  provider: string;
  createdBy: string;
}

const useStyle = makeStyles(theme => ({
  paper: {
    paddingBottom: theme.spacing(2),
    flexDirection: 'column',
    alignItems: 'start',
  },
  name: {
    marginTop: theme.spacing(2),
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
  },
  price: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  appendAProduct: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
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
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
}));

export const CreateProduct = ({
  meal,
  appendProduct,
}: {
  meal: Meal;
  appendProduct: (meal: Meal, amount: number) => void;
}) => {
  const classes = useStyle();
  const { t } = useTranslation();

  // https://d1ralsognjng37.cloudfront.net/268f5d45-6b27-4405-8e6e-e0b3d43e01dc.jpeg

  const [amount, setAmount] = useState(1);

  const handleAddClick = () => {
    setAmount(amount + 1);
  };

  const handleRemoveClick = () => {
    if (amount > 1) {
      setAmount(amount - 1);
    }
  };

  const isAllOptionFullfill = () => {
    return true;
  };

  if (!meal) {
    return <></>;
  }

  return (
    <div>
      <Card className={classes.paper}>
        {/* TODO:　using meal picture path. */}
        <CardMedia
          className={classes.media}
          image="/coffee.jpeg"
          title="coffee"
        />
        <Typography variant="h4" component="h4" className={classes.name}>
          {meal.name}
        </Typography>
        <div className={classes.description}>
          <Typography>{meal.description}</Typography>
        </div>
        <div className={classes.priceCalculation}>
          <Grid container spacing={2} justify="space-between">
            <Grid item sm={4}>
              <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="center"
                spacing={2}
              >
                <Grid item sm={4}>
                  <IconButton
                    className={classes.removeIcon}
                    onClick={handleRemoveClick}
                  >
                    <RemoveIcon />
                  </IconButton>
                </Grid>
                <Grid item sm={3}>
                  <Box display="flex" justifyContent="center">
                    <Typography>{amount}</Typography>
                  </Box>
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
              <Button
                className={classes.appendAProduct}
                style={{
                  background: isAllOptionFullfill() ? blue[900] : grey[200],
                  color: isAllOptionFullfill() ? yellow[50] : grey[500],
                }}
                onClick={() => {
                  appendProduct(meal, amount);
                }}
              >
                <Box
                  display="flex"
                  justifyContent="space-around"
                  style={{
                    width: '100%',
                  }}
                >
                  <Box flexGrow={1} alignContent="center">
                    <Typography>
                      {t('createOrder.appendAProduct').replace(
                        '%s',
                        `${amount}`,
                      )}
                    </Typography>
                  </Box>
                  <Box alignContent="center">
                    <Typography>${meal.price * amount}</Typography>
                  </Box>
                </Box>
              </Button>
            </Grid>
          </Grid>
        </div>
      </Card>
    </div>
  );
};
