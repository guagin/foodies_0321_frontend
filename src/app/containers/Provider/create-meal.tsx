import React, { ReactElement } from 'react';
import { MealForm } from './meal-form';
import { createStructuredSelector } from 'reselect';
import {
  makeSelectIsRequest,
  makeSelectProvider,
  makeSelectMessage,
} from './selector';
import { useSelector } from 'react-redux';

interface Props {
  computedMatch: ComputedMatch;
}

interface ComputedMatch {
  params: { providerId: string };
}

const stateSelector = createStructuredSelector({
  isRequest: makeSelectIsRequest(),
  provider: makeSelectProvider(),
  message: makeSelectMessage(),
});

export const CreateMeal: (props: Props) => ReactElement = ({
  computedMatch: {
    params: { providerId },
  },
}) => {
  const { provider } = useSelector(stateSelector);
  return (
    <>
      <MealForm provider={provider} />
    </>
  );
};
