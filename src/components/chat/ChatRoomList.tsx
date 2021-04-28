import React from 'react';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { FlatList, View, StyleSheet } from 'react-native';
import { Auth, API, graphqlOperation } from 'aws-amplify';

import { IconProps } from '@ui-kitten/components';
import { GraphQLResult } from '@aws-amplify/api-graphql';
import UikittenButton from '../../components/common/UikittenButton';
import UikittenIcon from '../../components/common/UikittenIcon';
import { getContactList } from '../../helpers/functions';
import ChatListItem from './ChatUserItem';
import { getUser } from './queries';
import { useAsync } from '../../helpers/customHooks';
import { GetUserQuery } from '../../API';

type chatRoomListType = {
  user: {
    id: string;
    firstName: string;
    lastName: string;
    status: string;
    imageUri: string;
  };
  chatRoomID: string;
};
const ChatRoomList = () => {
  const [chatRoomList, setChatRoomList] = React.useState<chatRoomListType[]>(
    [],
  );
  const [UserId, setMyUserId] = React.useState('');

  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const { run } = useAsync();

  const MessegeIcon = (props: IconProps) => (
    <UikittenIcon
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
        /* eslint-disable @typescript-eslint/no-explicit-any  */
        const userData: any = await run(
          API.graphql(
            graphqlOperation(getUser, { id: myInfo.attributes.sub }),
          ) as Promise<GraphQLResult<GetUserQuery>>,
        );
        const chatRoomID = getContactList({
          userData,
          userID: myInfo.attributes.sub,
        });

        setChatRoomList(chatRoomID);
        setMyUserId(myInfo.attributes.sub);
      } catch (error) {
        // eslint-disable-next-line no-console
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
      currentUserId: UserId,
    });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={[...chatRoomList]}
        renderItem={({ item: { user, chatRoomID } }) => {
          return (
            <>
              {!!(user.id !== UserId) && (
                <ChatListItem
                  id={user.id}
                  firstName={user.firstName}
                  lastName={user.lastName}
                  status={user.status}
                  imageUri={user.imageUri}
                  onClick={() => {
                    return onClick({
                      chatRoomID,
                      name: `${user.firstName} ${user.lastName}`,
                    });
                  }}
                />
              )}
            </>
          );
        }}
        keyExtractor={(_, index: number) => index.toString()}
      />

      <UikittenButton
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
