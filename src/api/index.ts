import fetch from 'node-fetch';

import { User } from 'store/users-of-ids/reducer';
import { Order } from 'store/order/reducer';
import { Provider } from 'store/model/provider';
import { TakeOut } from 'app/containers/TakeOutList/take-out';
import { Meal } from 'app/containers/MealList/meal';

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

export const fetchMeals: (input: {
  token: string;
  page: number;
  count: number;
}) => Promise<{
  data?: {
    meals: Meal[];
    hasNext: boolean;
    hasPrevious: boolean;
    totalPages: number;
    pages: number;
    totalCount: number;
  };
  status: Status;
}> = async ({ token, page = 1, count }) => {
  try {
    const response = await fetch(
      `http://localhost:3000/order/meal/ofPage?page=${page}&count=${count}`,
      {
        headers: {
          token,
        },
      },
    );
    const json = await response.json();
    console.log(json);
    return json;
  } catch (e) {
    return {
      status: {
        code: 'ERROR',
        msg: e.mesage,
      },
    };
  }
};

export const createMeal: (input: {
  token: string;
  name: string;
  price: number;
  description: string;
  pictures: string[];
  provider: string;
}) => Promise<{
  data?: {
    ids: string[];
  };
  status: Status;
}> = async ({ token, name, price, description, pictures, provider }) => {
  try {
    const response = await fetch(`http://localhost:3000/order/meal/create`, {
      method: 'POST',
      headers: {
        token,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        meals: [
          {
            name,
            price,
            description,
            pictures,
            provider,
          },
        ],
      }),
    });
    const json = await response.json();
    return json;
  } catch (e) {
    return {
      status: {
        code: 'ERROR',
        msg: e.message,
      },
    };
  }
};

export const fetchProvider: (input: {
  token: string;
  page: number;
  count: number;
}) => Promise<{
  data?: {
    provider: Provider[];
    hasNext: boolean;
    hasPrevious: boolean;
    totalPages: number;
    pages: number;
    totalCount: number;
  };
  status: Status;
}> = async ({ token, page = 1, count }) => {
  try {
    const response = await fetch(
      `http://localhost:3000/order/provider/ofPage?page=${page}&count=${count}`,
      {
        headers: {
          token,
        },
      },
    );

    const json = await response.json();
    console.log(json);
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

export const createProvider: (input: {
  token: string;
  name: string;
  description: string;
  phone: string;
}) => Promise<{
  data?: {
    id: string;
  };
  status: Status;
}> = async ({ token, name, description, phone }) => {
  try {
    const response = await fetch(
      `http://localhost:3000/order/provider/create`,
      {
        method: 'POST',
        headers: {
          token,
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          name,
          description,
          phone,
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

export const fetchOrderOfPage: (input: {
  token: string;
  page: number;
  count: number;
}) => Promise<{
  data?: {
    orders: Order[];
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
      `http://localhost:3000/order/order/ofPage?page=${page}&count=${count}`,
      {
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
        msg: e.message,
      },
    };
  }
};

export const fetchTakeOutList: (input: {
  token: string;
  page: number;
  count: number;
}) => Promise<{
  data?: {
    takeOuts: TakeOut[];
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

export const createTakeOut: (input: {
  token: string;
  title: string;
  description: string;
  startedAt: Date;
  endAt: Date;
  enabled: boolean;
}) => Promise<{
  data?: {
    id: string;
  };
  status: Status;
}> = async ({ token, title, description, startedAt, endAt, enabled }) => {
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

export const fetchProviderByPartialName: (input: {
  token: string;
  name: string;
}) => Promise<{
  data?: {
    providers: Provider[];
    hasNext: boolean;
    hasPrevious: boolean;
    totalPages: number;
    page: number;
    totalCount: number;
  };
  status: Status;
}> = async ({ token, name }) => {
  try {
    const response = await fetch(
      `http://localhost:3000/order/provider/ofPartialName?partialName=${name}&count=3`,
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
    providers: TakeOut[];
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

export const createOrder: (input: {
  token: string;
  userId: string;
  takeOutId: string;
}) => Promise<{
  data?: {
    id: string;
  };
  status: Status;
}> = async ({ token, userId, takeOutId }) => {
  try {
    const response = await fetch(`http://localhost:3000/order/create`, {
      headers: {
        token,
      },
      body: JSON.stringify({
        userId,
        takeOutId,
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
