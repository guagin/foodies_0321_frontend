import React from 'react';
import { useTypedSelector } from 'store/reducers';

export function Me() {
  const me2 = useTypedSelector(state => state.me);
  return (
    <>
      <div>test</div>
      <div>{me2.name}</div>
      <div>{me2.email}</div>
      <div>{me2.id}</div>
      <div>{me2.token}</div>
    </>
  );
}
