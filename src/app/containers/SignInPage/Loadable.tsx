import { lazyLoad } from 'utils/loadable';

export const SignInPage = lazyLoad(
  () => import('./index'),
  module => module.SignInPage,
);
