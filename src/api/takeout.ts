import { Status } from 'api';
import fetch from 'node-fetch';

export interface Takeout {
  id: string;
  title: string;
  createdBy: string;
  description: string;
  startedAt: Date;
  endAt: Date;
  enabled: boolean;
  providerId: string;
}

export const fetchTakeOutList: (input: {
  token: string;
  page: number;
  count: number;
}) => Promise<{
  data?: {
    takeOuts: Takeout[];
    hasPrevious: boolean;
    hasNext: boolean;
    page: number;
    totalPage: number;
    totalCount: number;
  };
  status: Status;
}> = async ({ token, page, count }) => {
  try {
    const response = await fetch(
      `http://localhost:3000/order/takeOut/ofPage?page=${page}&count=${count}`,
      {
        headers: {
          token,
        },
      },
    );

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

export const fetchTakeOutByPartialTitle: (input: {
  token: string;
  title: string;
}) => Promise<{
  data?: {
    providers: Takeout[];
    hasNext: boolean;
    hasPrevious: boolean;
    totalPages: number;
    page: number;
    totalCount: number;
  };
  status: Status;
}> = async ({ token, title }) => {
  try {
    const response = await fetch(
      `http://localhost:3000/order/takeOut/ofPartialTitle?title=${title}&count=3`,
      {
        headers: {
          token,
        },
      },
    );
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

export const fetchTakeOutOfIds: (input: {
  token: string;
  ids: string[];
}) => Promise<{
  data?: {
    takeOuts: Takeout[];
  };
  status: Status;
}> = async ({ token, ids }) => {
  try {
    const response = await fetch(`http://localhost:3000/order/takeOut/ofIds`, {
      method: 'POST',
      headers: {
        token,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        ids,
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

export const fetchTakeoutOfId: (input: {
  token: string;
  id: string;
}) => Promise<{
  data?: {
    takeout: Takeout;
  };
  status: Status;
}> = async ({ token, id }) => {
  try {
    const response = await fetch(
      `http://localhost:3000/order/takeout/ofId/${id}`,
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
    return {
      status: {
        code: 'ERROR',
        message: e.message,
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
