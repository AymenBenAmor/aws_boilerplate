import React from 'react';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import { GraphQLResult } from '@aws-amplify/api-graphql';
import { View, TextInput, Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import AppButton from 'components/common/AppButton';
import { createMessage } from '../../graphql/mutations';
import { useAsync } from '../../helpers/customHooks';
import { CreateMessageInput } from '../../API';

type Props = {
  chatRoomID: string;
  createChatRoomUserFn: (message: string) => void;
};
type UserType = {
  attributes: { sub: string };
};

const InputBoxChat: React.FC<Props> = ({
  chatRoomID,
  createChatRoomUserFn,
}) => {
  const [message, setMessage] = React.useState('');
  const [UserId, setMyUserId] = React.useState('');

  const { run: runGetUser } = useAsync<UserType>();
  const { run } = useAsync<GraphQLResult<CreateMessageInput>>();
  React.useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    runGetUser(Auth.currentAuthenticatedUser()).then((res: any) => {
      setMyUserId(res.attributes.sub);
    });
  }, [setMyUserId, runGetUser]);

  const onSendPress = React.useCallback(() => {
    run(
      API.graphql(
        graphqlOperation(createMessage, {
          input: {
            content: message,
            userID: UserId,
            chatRoomID,
          },
        }),
      ) as Promise<GraphQLResult<CreateMessageInput>>,
    ).then(() => {
      setMessage('');
    });
  }, [UserId, chatRoomID, message, run]);
  React.useEffect(() => {
    if (chatRoomID && !!message) {
      onSendPress();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatRoomID]);

  const SendIcon = () => (
    <MaterialCommunityIcons
      name="send-circle-outline"
      size={24}
      color="black"
    />
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
        onChangeText={setMessage}
        multiline
        placeholder="Type a message"
        style={{
          maxHeight: 60,
          width: '90%',
          borderRightWidth: 1,
        }}
        numberOfLines={Platform.OS === 'ios' ? undefined : 4}
      />
      <AppButton
        accessoryLeft={SendIcon}
        style={{
          width: '10%',
          paddingTop: 15,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={chatRoomID ? onSendPress : () => createChatRoomUserFn(message)}
      />
    </View>
  );
};

export default InputBoxChat;
