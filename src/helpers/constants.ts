interface RegexType {
  [email: string]: RegExp;
  password: RegExp;
}

export const REGEX: RegexType = {
  email: /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/,
  password: /^[a-zA-Z0-9]/,
};
