import React, { useState } from 'react';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { FlatList, Text, View, StyleSheet } from 'react-native';
import { Auth, API, graphqlOperation } from 'aws-amplify';

import { Button, Icon, IconProps } from '@ui-kitten/components';
import { getContactList } from '../../helpers/functions';
import ChatListItem from './ChatUserItem';
import { listUsers } from '../../graphql/queries';
import { getUser } from './queries';
import { createChatRoom, createChatRoomUser } from '../../graphql/mutations';

const ChatRoomList = () => {
  const [chatRoomList, setChatRoomList] = React.useState([]);
  const [myUserId, setMyUserId] = React.useState('');

  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const MessegeIcon = (props: IconProps) => (
    <Icon
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      name="message-square-outline"
      size="large"
      fill="white"
      style={{ width: 25, height: 25 }}
    />
  );
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const myInfo = await Auth.currentAuthenticatedUser();
        const userData = await API.graphql(
          graphqlOperation(getUser, { id: myInfo.attributes.sub }),
        );
        const chatRoomID = getContactList({
          userData,
          userID: myInfo.attributes.sub,
        });

        setChatRoomList(chatRoomID);
        setMyUserId(myInfo.attributes.sub);
      } catch (error) {
        console.log('error', error);
      }
    };

    if (isFocused) {
      fetchData();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

  const onClick = async ({
    chatRoomID,
    name,
  }: {
    chatRoomID: string;
    name: string;
  }) => {
    return navigation.navigate('ChatMessage', {
      chatRoomID,
      name,
      myUserId,
    });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={[...chatRoomList]}
        renderItem={({ item: { user, chatRoomID } }) => {
          return (
            <>
              {!!(user.id !== myUserId) && (
                <ChatListItem
                  id={user.id}
                  firstName={user.firstName}
                  lastName={user.lastName}
                  status={user.status}
                  imageUri={user.imageUri}
                  onClick={() =>
                    onClick({
                      chatRoomID,
                      name: `${user.firstName} ${user.lastName}`,
                    })
                  }
                />
              )}
            </>
          );
        }}
        keyExtractor={(item: any, index: number) => index.toString()}
      />

      <Button
        appearance="ghost"
        status="danger"
        accessoryLeft={MessegeIcon}
        style={styles.button}
        onPress={() => {
          navigation.navigate('ContactsList');
        }}
      />
    </View>
  );
};

export default ChatRoomList;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    flex: 1,
    width: '100%',
  },
  button: {
    position: 'absolute',
    width: 50,
    height: 50,
    bottom: 10,
    right: 20,
    backgroundColor: '#325e5c',
    borderRadius: 50,
  },
});
