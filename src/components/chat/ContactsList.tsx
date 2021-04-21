import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { FlatList } from 'react-native';
import { Auth, API, graphqlOperation } from 'aws-amplify';

import { StackNavigationProp } from '@react-navigation/stack';
import { GraphQLResult } from '@aws-amplify/api-graphql';
import { useAsync } from '../../helpers/customHooks';
import { verifExistChatRoomUsers } from '../../helpers/functions';
import ChatListItem from './ChatUserItem';
import { listUsers } from '../../graphql/queries';
import { getUser } from './queries';
import { createChatRoom, createChatRoomUser } from '../../graphql/mutations';
import { ListUsersQuery } from '../../API';

type usersListType = {
  id: string;
  firstName: string;
  lastName: string;
  status: string;
  imageUri: string;
  chatRoomID: string;
};
const ContactsList = () => {
  const [usersList, setUsersList] = React.useState<usersListType[]>([]);
  const [UserId, setMyUserId] = React.useState('');

  const { run } = useAsync();

  // eslint-disable-next-line @typescript-eslint/ban-types
  const navigation = useNavigation<StackNavigationProp<{ ChatMessage: {} }>>();

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        /* eslint-disable @typescript-eslint/no-explicit-any  */
        const usersListData: any = await run(
          API.graphql(graphqlOperation(listUsers)) as Promise<
            GraphQLResult<ListUsersQuery>
          >,
        );
        setUsersList(usersListData.data?.listUsers.items);

        /* eslint-disable @typescript-eslint/no-explicit-any  */
        const myInfo: any = await run(Auth.currentAuthenticatedUser());
        setMyUserId(myInfo.attributes.sub);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log('error', error);
      }
    };

    fetchData();
  }, [run]);

  const onClick = async ({
    userID,
    name,
  }: {
    userID: string;
    name: string;
  }) => {
    try {
      const userData: any = await API.graphql(
        graphqlOperation(getUser, { id: UserId }),
      );

      let chatRoomID = verifExistChatRoomUsers({ userData, userID })
        ?.chatRoomID;

      if (!chatRoomID) {
        // create a new chat Room

        const newChatRoomData: any = await API.graphql(
          graphqlOperation(createChatRoom, { input: {} }),
        );
        const newChatRoom = newChatRoomData.data.createChatRoom;
        // add user to chat Room
        await API.graphql(
          graphqlOperation(createChatRoomUser, {
            input: { userID, chatRoomID: newChatRoom.id },
          }),
        );
        await API.graphql(
          graphqlOperation(createChatRoomUser, {
            input: {
              userID: UserId,
              chatRoomID: newChatRoom.id,
            },
          }),
        );
        chatRoomID = newChatRoom.id;
      }

      return navigation.replace('ChatMessage', {
        chatRoomID,
        name,
        UserId,
      });
    } catch (error) {
      return null;
    }
  };

  return (
    <FlatList
      data={usersList}
      renderItem={({ item }) => (
        <>
          {!!(item.id !== UserId) && (
            <ChatListItem
              id={item.id}
              firstName={item.firstName}
              lastName={item.lastName}
              status={item.status}
              imageUri={item.imageUri}
              onClick={() => {
                return onClick({
                  userID: item.id,
                  name: `${item.firstName} ${item.lastName}`,
                });
              }}
            />
          )}
        </>
      )}
      keyExtractor={(_, index: number) => index.toString()}
    />
  );
};

export default ContactsList;
