import { REGEX, images } from './constants';

export const checkError = ({
  value,
  name,
}: {
  name: string;
  value: string;
}): boolean => {
  let errorValue;
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

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function authFun({
  func,
  onSuccessFn,
  onFailedFn,
  callback,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  func: Promise<any>; // todo fix this type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSuccessFn?: (value: any) => void; // todo fix this type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onFailedFn?: (value: any) => void; // todo fix this type
  callback?: () => void;
}) {
  try {
    const user = await func;
    // eslint-disable-next-line no-console
    console.log(
      '<img draggable="false" class="emoji" alt="✅" src="https://s.w.org/images/core/emoji/11/svg/2705.svg"> Success',
      'user',
      user,
    );
    if (onSuccessFn) {
      onSuccessFn(user);
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(
      '<img draggable="false" class="emoji" alt="❌" src="https://s.w.org/images/core/emoji/11/svg/274c.svg"> Error signing in...',
      error,
    );
    if (onFailedFn) {
      onFailedFn(error);
    }
  } finally {
    if (callback) {
      callback();
    }
  }
}

export const getRandomImage = (): string => {
  const random = Math.floor(Math.random() * images.length);
  return images[random];
};
