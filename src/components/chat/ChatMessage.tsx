import { Icon, Button, IconProps } from '@ui-kitten/components';
import React from 'react';
import { StyleSheet, View, TextInput, Platform } from 'react-native';

import AppContainer from '../common/AppContainer';
import ChatMessageList from './ChatMessageList';

const ChatMessage = () => {
  const [message, setMessage] = React.useState('');

  const SendIcon = (props: IconProps) => (
    <Icon {...props} fill="black" name="paper-plane-outline" />
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const test: any = [];
  test.length = 15;
  return (
    <AppContainer style={styles.container}>
      <>
        <ChatMessageList array={test} />
        {/* todo put these styles in the stylesheet */}
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
          {/* todo put these styles in the stylesheet */}
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
          {/* todo put these styles in the stylesheet */}
          <Button
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
