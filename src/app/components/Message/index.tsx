import React from 'react';

export const Message = ({ message }: { message: string }) => {
  if (message) {
    return (
      <>
        <p>{message}</p>
      </>
    );
  }
  return <></>;
};
