import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Icon, Button, IconProps } from '@ui-kitten/components';
import React from 'react';
import { StyleSheet, View, TextInput, Platform } from 'react-native';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import { messagesByChatRoom } from '../../graphql/queries';
import { useAsync } from '../common/custemHook/useAsync';
import { AppStackParamList } from '../../navigation/AppNavigator';

import AppContainer from '../common/AppContainer';
import ChatMessageList from './ChatMessageList';
import InputBoxChat from './InputBoxChat';

type Props = {
  navigation: StackNavigationProp<AppStackParamList, 'ChatMessage'>;
  route: RouteProp<AppStackParamList, 'ChatMessage'>;
};
const ChatMessage: React.FC<Props> = ({ navigation, route }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const test: any = [];
  test.length = 15;
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
