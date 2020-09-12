import { lazyLoad } from 'utils/loadable';

export const CreateTakeOut = lazyLoad(
  () => import('./index'),
  module => module.CreateOrder,
);
