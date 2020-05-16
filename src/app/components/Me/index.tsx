import React from 'react';
import { MeState } from 'store/me/reducer';
import { connect } from 'react-redux';

function Me(me: MeState) {
  return (
    <>
      <div>{me.name}</div>
      <div>{me.email}</div>
      <div>{me.id}</div>
      <div>{me.token}</div>
    </>
  );
}

const mapStateToProp: (state: { me: MeState }) => MeState = state => {
  console.log(state.me);
  return state.me;
};

export default connect(mapStateToProp)(Me);
