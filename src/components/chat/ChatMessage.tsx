import { RouteProp } from '@react-navigation/native';
import React from 'react';
import { StyleSheet } from 'react-native';

import AppContainer from '../common/AppContainer';
import ChatMessageList from './ChatMessageList';
import InputBoxChat from './InputBoxChat';
import type { ParamList } from '../../navigation/ParamList';

type Props = {
  route: RouteProp<ParamList, 'ChatMessage'>;
};
const ChatMessage = ({ route }: Props) => {
  return (
    <AppContainer style={styles.container}>
      <>
        <ChatMessageList
          chatRoomID={route.params.chatRoomID}
          myUserId={route.params.myUserId}
        />
        <InputBoxChat chatRoomID={route.params.chatRoomID} />
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
