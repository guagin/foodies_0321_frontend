import { Status } from './status';

interface Provider {
  id: string;
  name: string;
  description: string;
  phone: number;
  createdBy: string;
}

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

export const fetchProvidersByPartialName: (input: {
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
