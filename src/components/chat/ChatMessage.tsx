import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet } from 'react-native';
import { AppStackParamList } from '../../navigation/AppNavigator';

import AppContainer from '../common/AppContainer';
import ChatMessageList from './ChatMessageList';
import InputBoxChat from './InputBoxChat';

type Props = {
  navigation: StackNavigationProp<AppStackParamList, 'ChatMessage'>;
  route: RouteProp<AppStackParamList, 'ChatMessage'>;
};
const ChatMessage: React.FC<Props> = ({ route }) => {
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
