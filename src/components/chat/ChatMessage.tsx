import { RouteProp } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { API, graphqlOperation } from 'aws-amplify';
import { GraphQLResult } from '@aws-amplify/api-graphql';
import { useAsync } from '../../helpers/customHooks';
import { createChatRoom, createChatRoomUser } from '../../graphql/mutations';
import AppContainer from '../common/AppContainer';
import ChatMessageList from './ChatMessageList';
import InputBoxChat from './InputBoxChat';
import type { ParamList } from '../../navigation/ParamList';
import { CreateChatRoomMutation, CreateChatRoomUserMutation } from '../../API';

type Props = {
  route: RouteProp<ParamList, 'ChatMessage'>;
};
const ChatMessage = ({ route }: Props) => {
  const [chatRoomID, setChatRoomID] = React.useState(route.params.chatRoomID);
  const [firstMessage, setfirstMessage] = React.useState('');
  const { run } = useAsync();

  const createChatRoomUserFn = async (message: string) => {
    // create a new chat Room
    /* eslint-disable @typescript-eslint/no-explicit-any  */
    const newChatRoomData: any = await run(
      API.graphql(graphqlOperation(createChatRoom, { input: {} })) as Promise<
        GraphQLResult<CreateChatRoomMutation>
      >,
    );
    const newChatRoom = newChatRoomData?.data?.createChatRoom;
    // add user to chat Room
    await run(
      API.graphql(
        graphqlOperation(createChatRoomUser, {
          input: { userID: route.params.userID, chatRoomID: newChatRoom.id },
        }),
      ) as Promise<GraphQLResult<CreateChatRoomUserMutation>>,
    );
    await API.graphql(
      graphqlOperation(createChatRoomUser, {
        input: {
          userID: route.params.currentUserId,
          chatRoomID: newChatRoom.id,
        },
      }),
    );

    setChatRoomID(newChatRoom.id);
    setfirstMessage(message);
  };

  return (
    <AppContainer style={styles.container}>
      <>
        {chatRoomID ? (
          <ChatMessageList
            chatRoomID={chatRoomID}
            UserId={route.params.currentUserId}
            firstMessage={firstMessage}
          />
        ) : (
          <View style={{ flex: 1 }} />
        )}
        <InputBoxChat
          chatRoomID={chatRoomID}
          createChatRoomUserFn={createChatRoomUserFn}
        />
      </>
    </AppContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0eff1',
  },
});

export default ChatMessage;
