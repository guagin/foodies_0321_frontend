import { lazyLoad } from 'utils/loadable';

export const OrderListPage = lazyLoad(
  () => import('./index'),
  module => module.OrderListPage,
);
