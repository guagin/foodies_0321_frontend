import React from 'react';
import { Helmet } from 'react-helmet-async';

export function SignInPage() {
  return (
    <>
      <Helmet>
        <title>SignIn Page</title>
        <meta name="description" content="foodies sign in page." />
      </Helmet>
      <span>this is sign in page</span>
    </>
  );
}
