// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { RouteProp } from '@react-navigation/native';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { StackNavigationProp } from '@react-navigation/stack';
import { Icon, Button } from '@ui-kitten/components';
import React from 'react';
import { StyleSheet, View, TextInput, Platform } from 'react-native';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { updateAuth } from '../../navigation/AppNavigator';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ParamList } from '../../navigation/ParamList';
import AppContainer from '../common/AppContainer';
import ChatMessageList from './ChatMessageList';

type Props = {
  updateAuthState: updateAuth;
  navigation?: StackNavigationProp<ParamList, 'ChatMessage'>;
  route?: any;
};

const ChatMessage: React.FC<Props> = ({ route, navigation }: Props) => {
  const [message, setMessage] = React.useState('');

  const SendIcon = (props: any) => (
    <Icon {...props} fill="black" name="paper-plane-outline" />
  );

  const test: any = [];
  test.length = 15;
  return (
    <AppContainer style={[styles.container]}>
      <>
        <ChatMessageList array={test} />
        <View
          style={{
            backgroundColor: 'white',
            flexDirection: 'row',
            borderRadius: 10,
            paddingVertical: 5,
            paddingHorizontal: 10,
            marginBottom: 10,
          }}
        >
          <TextInput
            value={message}
            onChangeText={(value: string) => setMessage(value)}
            multiline
            placeholder="Type a message"
            style={{
              maxHeight: 60,
              width: '90%',
              borderRightWidth: 1,
            }}
            numberOfLines={Platform.OS === 'ios' ? undefined : 4}
          />
          <Button
            onPress={() => {}}
            appearance="ghost"
            status="danger"
            accessoryLeft={SendIcon}
            style={{ width: '10%' }}
          />
        </View>
      </>
    </AppContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0eff1',
  },
  message: {
    fontSize: 15,
    color: '#202020',
    fontWeight: '500',
    marginBottom: 5,
  },
  time: {
    fontSize: 12,
    color: '#202020',
    alignSelf: 'flex-end',
  },
});

export default ChatMessage;
