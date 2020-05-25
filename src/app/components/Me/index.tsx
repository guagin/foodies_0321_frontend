import React from 'react';
import { useTypedSelector } from 'store/reducers';

export function Me() {
  const me = useTypedSelector(state => state.me);
  return (
    <>
      <div>test</div>
      <div>{me.name}</div>
      <div>{me.email}</div>
      <div>{me.id}</div>
      <div>{me.token}</div>
    </>
  );
}
