import {
  CssBaseline,
  Dialog,
  DialogContent,
  Fab,
  Grid,
  makeStyles,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { CreateProduct } from 'app/components/CreateProduct';
import { MealCards } from 'app/components/MealCards';
import { PickedMeal } from 'app/components/PickedMeal';
import { find, reduce } from 'lodash';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import { createStructuredSelector } from 'reselect';
import { useTypedSelector } from 'store/reducers';

import { appendMeal, fetchOrder, removeMeal, updateMeal } from './actions';

import { editOrderReducer, Meal } from './reducer';
import { editOrderFlow } from './saga';
import {
  makeSelectCreateMealUsers,
  makeSelectMeals,
  makeSelectOrder,
  makeSelectProvider,
  makeSelectTakeout,
  makeSelectUser,
} from './selector';

const useStyle = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    marginLeft: theme.spacing(4),
    marginRight: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  root: {
    backgroundColor: theme.palette.background.paper,
    width: '100%',
  },
  fab: {
    position: 'absolute',
    top: theme.spacing(2),
    left: theme.spacing(2),
  },
  dialogContent: {
    padding: '0px 0px 0px 0px',
  },
}));

interface Props {
  computedMatch: ComputedMatch;
}

interface ComputedMatch {
  params: { orderId: string };
}

const stateSelector = createStructuredSelector({
  order: makeSelectOrder(),
  takeout: makeSelectTakeout(),
  provider: makeSelectProvider(),
  user: makeSelectUser(),
  meals: makeSelectMeals(),
  createMealUsers: makeSelectCreateMealUsers(),
});

export const EditOrder: (props: Props) => React.ReactElement = ({
  computedMatch: {
    params: { orderId },
  },
}) => {
  useInjectReducer({ key: 'editOrder', reducer: editOrderReducer });
  useInjectSaga({ key: 'editOrder', saga: editOrderFlow });

  const classes = useStyle();
  const dispatch = useDispatch();
  const { token } = useTypedSelector(state => state.me);
  const { order, takeout, provider, meals, createMealUsers } = useSelector(
    stateSelector,
  );
  const { t } = useTranslation();
  const [openDialog, setOpenDialog] = useState(false);
  const [pickedMeal, setPickedMeal] = useState<Meal | undefined>(undefined);

  useEffect(() => {
    dispatch(
      fetchOrder({
        token,
        orderId,
      }),
    );
  }, [dispatch, token, orderId]);

  const updateMealInfo = (index, amount, note) => {
    dispatch(updateMeal({ id: order.id, index, amount, token, note }));
  };

  const remove = index => {
    dispatch(removeMeal({ token, index, id: order.id }));
  };

  const appendProduct = (meal: Meal, amount: number) => {
    dispatch(appendMeal({ meal, amount, note: '' }));
    handleDialogClose();
  };

  const handleSubmit = () => {
    // dispatch(
    //   createOrder({
    //     token,
    //     takeOutId: takeoutId,
    //     meals: pickedMeals,
    //   }),
    // );
  };

  const handleOnClick = meal => {
    setPickedMeal(meal);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const pickedMeals: () => {
    id: string;
    name: string;
    price: number;
    amount: number;
    description: string;
    note: string;
  }[] = () => {
    if (!order) {
      return [];
    }

    return reduce(
      order.products,
      (accu, product) => {
        const meal = find(meals, e => e.id === product.id);
        if (meal) {
          accu.push({
            ...meal,
            ...product,
          });
        }

        return accu;
      },
      [] as {
        id: string;
        name: string;
        price: number;
        amount: number;
        description: string;
        note: string;
      }[],
    );
  };

  return (
    <>
      <Helmet>
        <title>{t('orderEditPage.title')}</title>
        <meta name="edit order page" content="foodies edit order page." />
      </Helmet>
      <CssBaseline />
      <Dialog
        open={openDialog}
        onClose={handleDialogClose}
        maxWidth="sm"
        fullWidth={true}
      >
        <Fab
          color="secondary"
          aria-label="close"
          className={classes.fab}
          onClick={handleDialogClose}
        >
          <CloseIcon />
        </Fab>
        <DialogContent
          className={classes.dialogContent}
          style={{ paddingTop: '0px' }}
        >
          <CreateProduct
            meal={pickedMeal as Meal}
            appendProduct={appendProduct}
          />
        </DialogContent>
      </Dialog>
      <div className={classes.paper}>
        <Grid container justify={'center'}>
          <Grid item xs={12} sm={12}>
            <PickedMeal
              meals={pickedMeals()}
              updateMeal={updateMealInfo}
              remove={remove}
              onSubmit={handleSubmit}
            />
          </Grid>
        </Grid>
      </div>
      <div className={classes.paper}>
        <MealCards
          meals={meals}
          isRequest={meals ? false : true}
          handleOnClick={handleOnClick}
        />
      </div>
    </>
  );
};
