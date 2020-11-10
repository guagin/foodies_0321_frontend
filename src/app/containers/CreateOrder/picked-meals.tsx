import React from 'react';

import {
  Box,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  MenuItem,
  Select,
} from '@material-ui/core';

import { map, range } from 'lodash';
import { useTranslation } from 'react-i18next';

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
}));

export const PickedMeal = ({
  meals,
  updateAmount,
  remove,
}: {
  meals: {
    id: string;
    name: string;
    price: number;
    amount: number;
    description: string;
    note: string;
  }[];
  updateAmount: (idx: number, amount: number) => void;
  remove: (id: number) => void;
}) => {
  const classes = useStyles();

  const { t } = useTranslation();

  const amountMenuItems = [
    <MenuItem value={0}>{t('remove')}</MenuItem>,
    ...map(range(1, 100), e => <MenuItem value={e}>{e}</MenuItem>),
  ];
  return (
    <>
      <div className={classes.root}>
        <List>
          {meals.map((meal, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={
                  <Box display="flex">
                    <Box flexGrow={1} alignContent="center">
                      {meal.name}
                    </Box>
                    <Box>
                      <Box>
                        <Select
                          labelId="meal-amount-select-required-label"
                          id="meal-amount-select-required"
                          value={meal.amount}
                          onChange={(
                            event: React.ChangeEvent<{ value: unknown }>,
                          ) => {
                            const amount = event.target.value as number;
                            if (amount > 0) {
                              updateAmount(index, amount);
                              return;
                            }

                            remove(index);
                          }}
                          className={classes.selectEmpty}
                        >
                          {amountMenuItems}
                        </Select>
                      </Box>
                    </Box>
                  </Box>
                }
              />
            </ListItem>
          ))}
        </List>
      </div>
    </>
  );
};
