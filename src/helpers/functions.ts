import { REGEX } from './constants';

export const checkError = ({
  value,
  name,
}: {
  name: string;
  value: string;
}): boolean => {
  let errorValue = false;
  switch (name) {
    case 'email':
      errorValue = REGEX[name].test(value);
      break;

    case 'password':
      errorValue = value?.trim().length >= 10;
      break;
    case 'verificationCode':
      errorValue = value?.trim().length === 6;
      break;

    default:
      errorValue = value?.trim().length >= 3;
  }
  return errorValue;
};

export async function authFun({
  func,
  onSuccessFn,
  onFailedFn,
  callback = () => {},
}: {
  func: Promise<any>;
  onSuccessFn: (value: any) => void;
  onFailedFn: (value: any) => void;
  callback?: () => void;
}) {
  try {
    const user = await func;
    console.log(
      '<img draggable="false" class="emoji" alt="✅" src="https://s.w.org/images/core/emoji/11/svg/2705.svg"> Success',
      'user',
      user
    );
    onSuccessFn(user);
  } catch (error) {
    console.log(
      '<img draggable="false" class="emoji" alt="❌" src="https://s.w.org/images/core/emoji/11/svg/274c.svg"> Error signing in...',
      error
    );
    onFailedFn(error);
  } finally {
    callback();
  }
}
