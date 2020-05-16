export const signUp = ({ name, email, password }) => ({
  type: 'SIGN_UP',
  payload: {
    name,
    email,
    password,
  },
});
