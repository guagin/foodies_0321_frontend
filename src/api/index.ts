import delay from 'delay';

export const signUp: (input: {
  name: string;
  password: string;
  email: string;
}) => Promise<{ id: string } | { msg: string }> = async ({
  name,
  password,
  email,
}) => {
  await delay(3000);
  console.log(`${name}, ${password}, ${email}`);

  if (Math.random() > 0) {
    return { id: '123456' };
  }
  return { msg: 'fuck!!' };
};
