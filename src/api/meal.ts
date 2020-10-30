import { Status } from './status';

export interface Meal {
  id: string;
  name: string;
  description: string;
  price: number;
  provider: string;
  createdBy: string;
}

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

export const mealsOfProvider: (input: {
  token: string;
  page: number;
  count: number;
  providerId: string;
}) => Promise<{
  meals: Meal[];
  hasNext: boolean;
  hasPrevious: boolean;
  totalPages: number;
  page: number;
  totalCount: number;
}> = async ({ token, page = 1, count, providerId }) => {
  try {
    const response = await fetch(
      `http://localhost:3000/order/meal/ofProvider?page=${page}&count=${count}&providerId=${providerId}`,
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

export const fetchMealOfIds: (input: {
  token: string;
  ids: string[];
}) => Promise<{
  data?: {
    meals: Meal[];
  };
  status: Status;
}> = async ({ token, ids }) => {
  try {
    const response = await fetch(`http://localhost:3000/order/meal/ofIds`, {
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

export const fetchMealOfId: (input: {
  token: string;
  id: string;
}) => Promise<{
  data?: {
    meal: Meal;
  };
  status: Status;
}> = async ({ token, id }) => {
  try {
    const response = await fetch(
      `http://localhost:3000/order/meal/ofId/${id}`,
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
