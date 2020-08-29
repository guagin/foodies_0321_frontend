import { lazyLoad } from 'utils/loadable';

export const CreateProviderPage = lazyLoad(
  () => import('./index'),
  module => module.CreateProviderPage,
);
