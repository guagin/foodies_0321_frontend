import React, { useEffect } from 'react';
import { useTypedSelector } from 'store/reducers';
import { useDispatch } from 'react-redux';
import { FetchMeCreator } from 'store/me/action/fetch-me';
import { CircularProgress } from '@material-ui/core';

export function Me() {
  const me = useTypedSelector(state => state.me);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(FetchMeCreator({ token: me.token }));
  }, []);

  const progressCirlcle = () => {
    if (me.isRequest) {
      return <CircularProgress />;
    }
    return <></>;
  };

  return (
    <>
      {progressCirlcle()}
      <div>{me.name}</div>
      <div>{me.email}</div>
      <div>{me.id}</div>
      <div>{me.token}</div>
      <div>{me.message}</div>
    </>
  );
}
