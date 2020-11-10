import React, { useEffect, ReactElement, useState } from 'react';
import {
  makeSelectIsRequest,
  makeSelectMessage,
  makeSelectProviderId,
  makeSelectMeals,
  makeSelectPickedMeals,
  makeSelectTakeout,
} from './selector';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'redux-injectors';
import { createOrderReducer, Meal } from './reducer';
import { useInjectSaga } from 'utils/redux-injectors';
import { createOrderFlow } from './saga';
import { useSelector, useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import {
  CircularProgress,
  CssBaseline,
  Dialog,
  DialogContent,
  Fab,
} from '@material-ui/core';

import {
  createOrder,
  fetchTakeout,
  RemovePickedMeal,
  UpdatePickedMealAmount,
} from './action';
import { useTypedSelector } from 'store/reducers';
import { MealCards } from './meal-cards';
import { CreateProduct } from './create-product';
import { PickedMeal } from './picked-meals';

const useStyle = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    marginLeft: theme.spacing(4),
    marginRight: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  dialogContent: {
    padding: '0px 0px 0px 0px',
  },
  fab: {
    position: 'absolute',
    top: theme.spacing(2),
    left: theme.spacing(2),
  },
}));

interface Props {
  computedMatch: ComputedMatch;
}

interface ComputedMatch {
  params: { takeoutId: string };
}

const stateSelector = createStructuredSelector({
  isRequest: makeSelectIsRequest(),
  message: makeSelectMessage(),
  providerId: makeSelectProviderId(),
  meals: makeSelectMeals(),
  pickedMeals: makeSelectPickedMeals(),
  takeout: makeSelectTakeout(),
});

export const CreateOrder: (props: Props) => ReactElement = ({
  computedMatch: {
    params: { takeoutId },
  },
}) => {
  const classes = useStyle();

  useInjectReducer({ key: 'createOrder', reducer: createOrderReducer });
  useInjectSaga({ key: 'createOrder', saga: createOrderFlow });
  const [openDialog, setOpenDialog] = useState(false);
  const [pickedMeal, setPickedMeal] = useState<Meal | undefined>(undefined);

  const dispatch = useDispatch();

  const { token } = useTypedSelector(state => state.me);

  const {
    isRequest,
    message,
    providerId,
    meals,
    pickedMeals,
    takeout,
  } = useSelector(stateSelector);

  const handleSubmit = event => {
    event.preventDefault();
    dispatch(
      createOrder({
        token,
        takeOutId: takeoutId,
        meals: pickedMeals,
      }),
    );
  };

  const handleOnClick = meal => {
    // SHOW DIALOG.
    // dispatch(pickMeal({ token, meal }));
    setPickedMeal(meal);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const updateAmount = (index, amount) => {
    dispatch(UpdatePickedMealAmount({ index, amount }));
  };

  const remove = index => {
    dispatch(RemovePickedMeal({ index }));
  };

  useEffect(() => {
    dispatch(fetchTakeout({ token, id: takeoutId }));
  }, [dispatch, takeoutId, token]);

  if (!takeout) {
    return (
      <>
        <CircularProgress />
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Create Order Page</title>
        <meta name="description" content="foodies Create Order page." />
      </Helmet>
      <CssBaseline />

      {/* https://stackoverflow.com/questions/61220424/material-ui-drawer-finddomnode-is-deprecated-in-strictmode */}
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
            onAppendProduct={() => {
              handleDialogClose();
            }}
          />
        </DialogContent>
      </Dialog>

      <div className={classes.paper}>
        <PickedMeal
          meals={pickedMeals}
          updateAmount={updateAmount}
          remove={remove}
        />
        {/* PROVIDER INFO */}

        {/* <Grid container spacing={2} justify="flex-start">
          <Grid item xs={12} sm={12}>
            <PickedMeal
              meals={pickedMeals}
              updateAmount={updateAmount}
              remove={remove}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} justify="flex-end">
          <Grid item xs={1} sm={1}>
            <Button size="large" onClick={handleSubmit}>
              submit
            </Button>
          </Grid>
        </Grid> */}
      </div>

      <div className={classes.paper}>
        <MealCards
          meals={meals}
          isRequest={isRequest}
          handleOnClick={handleOnClick}
        />
      </div>
    </>
  );
};
