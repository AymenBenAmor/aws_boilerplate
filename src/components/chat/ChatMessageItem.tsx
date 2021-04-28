import dayjs from 'dayjs';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

type Props = {
  isMymessage: boolean;
  message: string;
  createdAt: string;
  name: string;
};
const ChatMessageItem = ({ isMymessage, message, createdAt, name }: Props) => {
  return (
    <View
      style={[
        styles.container,
        {
          marginRight: isMymessage ? 0 : 50,
          marginLeft: isMymessage ? 50 : 0,
          backgroundColor: isMymessage ? 'white' : '#d7e4c4',
        },
      ]}
    >
      {!isMymessage && <Text style={styles.name}>{name}</Text>}
      <Text style={styles.message}>{message}</Text>
      <Text style={styles.time}>
        {createdAt && dayjs(createdAt).fromNow(true)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 5,
    marginVertical: 10,
  },
  name: {
    fontSize: 15,
    color: '#889d9c',
    fontWeight: '600',
    marginBottom: 5,
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

export default ChatMessageItem;
