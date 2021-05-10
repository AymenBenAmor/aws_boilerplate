export const Auth = {
  currentSession: jest.fn(() => Promise.resolve()),
  signUp: jest.fn(() => Promise.resolve()),
  signOut: jest.fn(() => Promise.resolve()),
};
