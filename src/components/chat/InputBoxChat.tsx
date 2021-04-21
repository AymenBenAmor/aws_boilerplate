import React from 'react';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import { GraphQLResult } from '@aws-amplify/api-graphql';
import { Icon, Button, IconProps } from '@ui-kitten/components';
import { View, TextInput, Platform } from 'react-native';

import { createMessage } from '../../graphql/mutations';
import { useAsync } from '../../helpers/customHooks';
import { CreateMessageInput } from '../../API';

type Props = {
  chatRoomID: string;
};
type UserType = {
  attributes: { sub: string };
};

const InputBoxChat: React.FC<Props> = ({ chatRoomID }) => {
  const [message, setMessage] = React.useState('');
  const [UserId, setMyUserId] = React.useState('');

  const { run: runGetUser } = useAsync<UserType>();
  const { run } = useAsync<GraphQLResult<CreateMessageInput>>();
  React.useEffect(() => {
    runGetUser(Auth.currentAuthenticatedUser()).then(res => {
      setMyUserId(res.attributes.sub);
    });
  }, [setMyUserId, runGetUser]);

  const onSendPress = () => {
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
  };

  const SendIcon = (props: IconProps) => (
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
