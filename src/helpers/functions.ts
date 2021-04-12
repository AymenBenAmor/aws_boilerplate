import { REGEX, images } from './constants';
// eslint-disable @typescript-eslint/no-explicit-any

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

export const verifExistChatRoomUsers = ({
  userData,
  userID,
}: {
  userData: any;
  userID: string;
}): any => {
  const { items }: { items: [] } = userData.data.getUser.chatRoomUser;

  if (!items || items.length === 0) {
    return undefined;
  }
  return items.find(
    ({
      chatRoom: {
        chatRoomUsers: { items: chatRoomUsersItems },
      },
    }: {
      chatRoom: { chatRoomUsers: { items: [] } };
    }) => {
      const userChatRoomDetails = chatRoomUsersItems.find(
        ({ user: { id: chatRoomUsersID } }: { user: { id: string } }) => {
          return !!(chatRoomUsersID === userID);
        },
      );

      return !!userChatRoomDetails;
    },
  );
};

export const getContactList = ({
  userData,
  userID,
}: {
  userData: any;
  userID: string;
}): any => {
  const { items }: { items: [] } = userData.data.getUser.chatRoomUser;

  if (!items || items.length === 0) {
    return [];
  }
  return items.map(
    ({
      chatRoom: {
        chatRoomUsers: { items: chatRoomUsersItems },
      },
    }: {
      chatRoom: { chatRoomUsers: { items: [] } };
    }) => {
      const userChatRoomDetails = chatRoomUsersItems.find(
        ({ user }: { user: { id: string }; chatRoomID: string }) => {
          return user.id !== userID;
        },
      );

      return userChatRoomDetails;
    },
  );
};
