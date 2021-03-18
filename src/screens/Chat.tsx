import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet } from 'react-native';

import ChatList from '../components/chat/ChatList';
import AppContainer from '../components/common/AppContainer';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { updateAuth } from '../navigation/AppNavigator';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ParamList } from '../navigation/ParamList';

const Chat = () => {
  const test: any = [];
  test.length = 15;
  return (
    <AppContainer>
      <ChatList array={test} />
    </AppContainer>
  );
};

export default Chat;
