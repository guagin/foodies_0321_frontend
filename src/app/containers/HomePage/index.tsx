import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Me } from 'app/components/Me';

export function HomePage() {
  return (
    <>
      <Helmet>
        <title>Home Page</title>
        <meta name="description" content="foodies home page." />
      </Helmet>
      <span>show some shit here</span>
      <Me />
    </>
  );
}
