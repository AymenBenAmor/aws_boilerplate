export const currentAuthenticatedUser = {
  email: 'sadiktest@gmail.com',
  family_name: 'Aymen',
  given_name: 'ben amor',
  address: 'bruxelles',
};

export const Auth = {
  currentSession: jest.fn(() => Promise.resolve()),
  signUp: jest.fn(() => Promise.resolve()),
  signOut: jest.fn(() => Promise.resolve()),
  confirmSignUp: jest.fn(() => Promise.resolve()),
  resendSignUp: jest.fn(() => Promise.resolve()),
  currentAuthenticatedUser: jest.fn(() =>
    Promise.resolve({ attributes: currentAuthenticatedUser }),
  ),
};
