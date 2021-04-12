import * as React from 'react';
import { useNavigation } from '@react-navigation/native';
import { FlatList } from 'react-native';
import { Auth, API, graphqlOperation } from 'aws-amplify';

import ChatListItem from './ChatUserItem';
import { listUsers } from '../../graphql/queries';
import { createChatRoom, createChatRoomUser } from '../../graphql/mutations';

type usersListType = {
  id: string;
  firstName: string;
  lastName: string;
  status: string;
  imageUri: string;
  chatRoomID: string;
};

const ChatUserList = () => {
  const [usersList, setUsersList] = React.useState<usersListType[]>([]);
  const navigation = useNavigation();

  React.useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersListData: any = await API.graphql(
          graphqlOperation(listUsers),
        );
        setUsersList(usersListData.data?.listUsers.items);
      } catch (error) {
        console.log('error', error);
      }
    };

    fetchUsers();
  }, []);

  const onClick = async ({
    userID,
    name,
  }: {
    userID: string;
    name: string;
  }) => {
    try {
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
      const myInfo = await Auth.currentAuthenticatedUser();
      await API.graphql(
        graphqlOperation(createChatRoomUser, {
          input: { userID: myInfo.attributes.sub, chatRoomID: newChatRoom.id },
        }),
      );
      navigation.navigate('ChatMessage', {
        id: newChatRoom.id,
        name,
      });
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <FlatList
      data={usersList}
      renderItem={({ item }) => (
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
      keyExtractor={(_, index: number) => index.toString()}
    />
  );
};

export default ChatUserList;
