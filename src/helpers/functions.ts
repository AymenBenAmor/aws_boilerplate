import { REGEX, images } from './constants';

// todo aymen recheck these
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
