import { Status } from 'api';

export interface User {
  id: string;
  name: string;
  email: string;
}

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

export const fetchUserOfId: ({
  token,
  id,
}: {
  token: string;
  id: string;
}) => Promise<{
  data?: {
    user: User;
  };
  status: Status;
}> = async ({ token, id }) => {
  try {
    const response = await fetch(
      `http://localhost:3000/authentication/user/ofId/${id}`,
      {
        method: 'GET',
        headers: {
          token,
          'content-type': 'application/json',
        },
      },
    );
    const json = await response.json();

    return json;
  } catch (e) {
    console.error(e);
  }
};
