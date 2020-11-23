import { Status } from 'api';
import fetch from 'node-fetch';

export interface Order {
  id: string;
  createdBy: string;
  products: Product[];
  status: number;
  takeOutId: string;
}

export interface Product {
  id: string;
  amount: number;
  note: string;
}

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

export const createOrder: (input: {
  token: string;
  takeOutId: string;
  meals: {
    id: string;
    amount: number;
  }[];
}) => Promise<{
  data?: {
    id: string;
  };
  status: Status;
}> = async ({ token, takeOutId, meals }) => {
  try {
    const response = await fetch(`http://localhost:3000/order/order/create`, {
      method: 'POST',
      headers: {
        token,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        meals,
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

export const fetchOrderOfId: (input: {
  token: string;
  id: string;
}) => Promise<{
  data?: {
    order: Order;
  };
  status: Status;
}> = async ({ token, id }) => {
  try {
    const response = await fetch(
      `http://localhost:3000/order/order/ofId/${id}`,
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
        message: e.message,
      },
    };
  }
};

export const fetchOrderOfTakeoutId: (input: {
  token: string;
  takeoutId: string;
}) => Promise<{
  data?: {
    order: Order;
  };
  status: Status;
}> = async ({ token, takeoutId }) => {
  try {
    const response = await fetch(
      `http://localhost:3000/order/order/ofTakeoutId/${takeoutId}`,
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

export const updateMeal: (input: {
  token: string;
  id: string;
  index: number;
  amount: number;
  note: string;
}) => Promise<{
  data?: {};
  status: Status;
}> = async ({ token, id, index, amount, note }) => {
  try {
    const response = await fetch(
      'http://localhost:3000/order/order/update/product',
      {
        method: 'POST',
        headers: {
          token,
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          id,
          index,
          amount,
          note,
        }),
      },
    );

    const json = await response.json();
    return json;
  } catch (e) {
    console.error(e);
    return {
      status: {
        cdoe: 'ERROR',
        message: e.message,
      },
    };
  }
};

export const removeMeal = async ({
  token,
  index,
  id,
}: {
  token: string;
  index: number;
  id: string;
}) => {
  try {
    const response = await fetch(
      `http://localhost:3000/order/order/removeProduct`,
      {
        method: 'POST',
        headers: {
          token,
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          id,
          index,
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
        message: e.message,
      },
    };
  }
};

export const appendMeal = async ({
  token,
  orderId,
  meal,
}: {
  token: string;
  orderId: string;
  meal: {
    id: string;
    amount: number;
    note: string;
  };
}) => {
  try {
    const response = await fetch(
      `http://localhost:3000/order/order/appendProduct`,
      {
        method: 'POST',
        headers: {
          token,
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          orderId,
          products: [meal],
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
        message: e.message,
      },
    };
  }
};
