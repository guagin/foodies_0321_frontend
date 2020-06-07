import React, { useEffect } from 'react';
import { useTypedSelector } from 'store/reducers';
import { CircularProgress } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { fetchMealCreator } from 'store/menu/action/fetch-meal';

export const MealList = () => {
  const menu = useTypedSelector(state => state.menu);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      fetchMealCreator({
        after: '',
        before: '',
        count: 50,
      }),
    );
  }, [dispatch]);

  const progressCirlcle = () => {
    if (menu.isRequest) {
      return <CircularProgress />;
    }
    return <></>;
  };

  return <>{progressCirlcle()}</>;
};
