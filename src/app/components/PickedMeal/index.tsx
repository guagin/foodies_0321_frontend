import React, { useState } from 'react';

import {
  Box,
  Button,
  Grid,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  MenuItem,
  Select,
  Typography,
  TextField,
} from '@material-ui/core';

import { map, range } from 'lodash';
import { useTranslation } from 'react-i18next';
import { blue, grey, yellow } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  selectEmpty: {
    marginTop: theme.spacing(0),
  },
  submitButton: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '100%',
  },
}));

export const MealRow = ({
  meal,
  updateMeal,
  remove,
  onSubmit,
}: {
  meal: {
    index: number;
    id: string;
    name: string;
    price: number;
    amount: number;
    description: string;
    note: string;
  };
  updateMeal: (idx: number, amount: number, note: string) => void;
  remove: (id: number) => void;
  onSubmit: () => void;
}) => {
  const classes = useStyles();

  const [note, setNote] = useState(meal.note);

  const { t } = useTranslation();

  const handleChangeNote = (note: string) => {
    setNote(note);
  };

  const amountMenuItems = [
    <MenuItem value={0}>{t('remove')}</MenuItem>,
    ...map(range(1, 100), e => <MenuItem value={e}>{e}</MenuItem>),
  ];

  return (
    <Grid container spacing={2}>
      <Grid item sm={4}>
        <Typography className={classes.heading}>{meal.name}</Typography>
      </Grid>
      <Grid item sm={5}>
        <TextField
          id="title"
          label={t('takeout.title')}
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          required={true}
          value={note}
          onChange={e => {
            handleChangeNote(e.target.value);
          }}
          onBlur={() => {
            updateMeal(meal.index, meal.amount, note);
          }}
        />
      </Grid>
      <Grid item sm={2}>
        <Typography className={classes.secondaryHeading}>
          ${meal.price * meal.amount}
        </Typography>
      </Grid>
      <Grid item sm={1}>
        <Box>
          <Select
            labelId="meal-amount-select-required-label"
            id="meal-amount-select-required"
            value={meal.amount}
            onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
              const amount = event.target.value as number;
              if (amount > 0) {
                updateMeal(meal.index, amount, meal.note);
                return;
              }

              remove(meal.index);
            }}
            className={classes.selectEmpty}
          >
            {amountMenuItems}
          </Select>
        </Box>
      </Grid>
    </Grid>
  );
};

export const PickedMeal = ({
  meals,
  updateMeal,
  remove,
  onSubmit,
}: {
  meals: {
    id: string;
    name: string;
    price: number;
    amount: number;
    description: string;
    note: string;
  }[];
  updateMeal: (idx: number, amount: number, note: string) => void;
  remove: (id: number) => void;
  onSubmit: () => void;
}) => {
  const classes = useStyles();

  const { t } = useTranslation();

  return (
    <>
      <div className={classes.root}>
        <Typography variant="h4" component="h4">
          {t('createOrder.title')}
        </Typography>
        <List>
          {meals.map((meal, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={
                  <MealRow
                    meal={{
                      ...meal,
                      index,
                    }}
                    updateMeal={updateMeal}
                    remove={remove}
                    onSubmit={onSubmit}
                  />
                }
              />
            </ListItem>
          ))}
        </List>
        <Box display="flex" justifyContent="flex-end">
          <Button
            className={classes.submitButton}
            disabled={meals.length === 0}
            style={{
              background: meals.length === 0 ? grey[200] : blue[900],
              color: meals.length === 0 ? grey[500] : yellow[50],
            }}
            onClick={() => {
              onSubmit();
            }}
          >
            <Typography>{t('confirm')}</Typography>
          </Button>
        </Box>
      </div>
    </>
  );
};
