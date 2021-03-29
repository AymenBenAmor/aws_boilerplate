import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { FlatList } from 'react-native';
import { Auth, API, graphqlOperation } from 'aws-amplify';

import { StackNavigationProp } from '@react-navigation/stack';
import { verifExistChatRoomUsers } from '../../helpers/functions';
import ChatListItem from './ChatUserItem';
import { listUsers } from '../../graphql/queries';
import { getUser } from './queries';
import { createChatRoom, createChatRoomUser } from '../../graphql/mutations';

const ContactsList = () => {
  const [usersList, setUsersList] = React.useState([]);
  const [myUserId, setMyUserId] = React.useState('');

  // eslint-disable-next-line @typescript-eslint/ban-types
  const navigation = useNavigation<StackNavigationProp<{ ChatMessage: {} }>>();

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const usersListData: any = await API.graphql(
          graphqlOperation(listUsers),
        );
        setUsersList(usersListData.data?.listUsers.items);
        const myInfo = await Auth.currentAuthenticatedUser();
        setMyUserId(myInfo.attributes.sub);
      } catch (error) {
        console.log('error', error);
      }
    };

    fetchData();
  }, []);

  const onClick = async ({
    userID,
    name,
  }: {
    userID: string;
    name: string;
  }) => {
    try {
      const userData: any = await API.graphql(
        graphqlOperation(getUser, { id: myUserId }),
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
              userID: myUserId,
              chatRoomID: newChatRoom.id,
            },
          }),
        );
        chatRoomID = newChatRoom.id;
      }

      return navigation.replace('ChatMessage', {
        chatRoomID,
        name,
        myUserId,
      });
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  return (
    <FlatList
      data={usersList}
      renderItem={({ item }) => (
        <>
          {!!(item.id !== myUserId) && (
            <ChatListItem
              id={item.id}
              firstName={item.firstName}
              lastName={item.lastName}
              status={item.status}
              imageUri={item.imageUri}
              onClick={() =>
                onClick({
                  userID: item.id,
                  name: `${item.firstName} ${item.lastName}`,
                })
              }
            />
          )}
        </>
      )}
      keyExtractor={(item: any, index: number) => index.toString()}
    />
  );
};

export default ContactsList;
