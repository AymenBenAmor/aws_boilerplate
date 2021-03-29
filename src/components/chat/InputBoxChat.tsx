import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Auth, API, graphqlOperation } from 'aws-amplify';

import { Icon, Button, IconProps } from '@ui-kitten/components';
import React from 'react';
import { StyleSheet, View, TextInput, Platform } from 'react-native';
import { createMessage } from '../../graphql/mutations';
import { AppStackParamList } from '../../navigation/AppNavigator';

import { useAsync } from '../common/custemHook/useAsync';

type Props = {
  chatRoomID: string;
};
const InputBoxChat: React.FC<Props> = ({ chatRoomID }) => {
  const [message, setMessage] = React.useState('');
  const [myUserId, setMyUserId] = React.useState('');

  useAsync({
    fetchFn: () => Auth.currentAuthenticatedUser(),
    onSuccessFn: res => {
      setMyUserId(res.attributes.sub);
    },

    loadOnMount: true,
  });
  const { loadData: onSendPress } = useAsync({
    fetchFn: async () =>
      API.graphql(
        graphqlOperation(createMessage, {
          input: {
            content: message,
            userID: myUserId,
            chatRoomID,
          },
        }),
      ),
    onSuccessFn: res => {
      setMessage('');
    },
  });

  const SendIcon = (props: IconProps) => (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Icon {...props} fill="black" name="paper-plane-outline" />
  );

  return (
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
        appearance="ghost"
        status="danger"
        accessoryLeft={SendIcon}
        style={{ width: '10%' }}
        onPress={onSendPress}
      />
    </View>
  );
};

export default InputBoxChat;
