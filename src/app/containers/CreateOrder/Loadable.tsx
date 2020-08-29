import { lazyLoad } from 'utils/loadable';

export const CreateOrder = lazyLoad(
  () => import('./index'),
  module => module.CreateOrder,
);
