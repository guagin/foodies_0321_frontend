import fetch from 'node-fetch';

import { User } from 'store/users-of-ids/reducer';

export * from './provider';
export * from './meal';
export * from './takeout';
export * from './order';

export interface Status {
  code: 'SUCCESS' | 'ERROR';
  msg: string;
}

export const signUp: (input: {
  name: string;
  password: string;
  email: string;
}) => Promise<{
  data?: {
    id: string;
  };
  status: Status;
}> = async ({ name, password, email }) => {
  const response = await fetch(
    'http://localhost:3000/authentication/user/register',
    {
      method: 'POST',
      body: JSON.stringify({
        name,
        password,
        email,
      }),
      headers: {
        'content-type': 'application/json',
      },
    },
  );

  const json = await response.json();
  return json;
};

export const signIn: (input: {
  name: string;
  password: string;
}) => Promise<{
  data?: {
    token: string;
  };
  status: Status;
}> = async ({ name, password }) => {
  const response = await fetch(
    'http://localhost:3000/authentication/user/login',
    {
      method: 'POST',
      body: JSON.stringify({
        name,
        password,
      }),
      headers: {
        'content-type': 'application/json',
      },
    },
  );

  const json = await response.json();
  return json;
};

export const fetchMe: (input: {
  token: string;
}) => Promise<{
  data?: {
    name: string;
    email: string;
  };
  status: Status;
}> = async ({ token }) => {
  const response = await fetch(
    'http://localhost:3000/authentication/user/ofToken',
    {
      headers: {
        token,
      },
    },
  );
  const json = await response.json();
  return json;
};

export const fetchUserOfIds: (input: {
  token: string;
  ids: string[];
}) => Promise<{
  data: {
    users: User[];
  };
  status: Status;
}> = async ({ token, ids }) => {
  try {
    const response = await fetch(
      `http://localhost:3000/authentication/user/ofIds`,
      {
        method: 'POST',
        headers: {
          token,
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          ids,
        }),
      },
    );
    const json = await response.json();

    return json;
  } catch (e) {
    console.error(e);
    return {
      status: {
        code: 'ERROR',
        msg: e.message,
      },
    };
  }
};

export const createTakeOut: (input: {
  token: string;
  title: string;
  description: string;
  startedAt: Date;
  endAt: Date;
  enabled: boolean;
  providerId: string;
}) => Promise<{
  data?: {
    id: string;
  };
  status: Status;
}> = async ({
  token,
  title,
  description,
  startedAt,
  endAt,
  enabled,
  providerId,
}) => {
  try {
    const response = await fetch(`http://localhost:3000/order/takeOut/create`, {
      method: 'POST',
      headers: {
        token,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        title,
        description,
        startedAt,
        endAt,
        enabled,
        providerId,
      }),
    });
    const json = await response.json();
    return json;
  } catch (e) {
    console.error(e);
    return {
      status: {
        code: 'ERROR',
        message: e.message,
      },
    };
  }
};
