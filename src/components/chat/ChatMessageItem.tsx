import moment from 'moment';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type Props = {
  isMymessage: boolean;
  message: string;
  createdAt: string;
  name: string;
};
const ChatMessageItem = ({ isMymessage, message, createdAt, name }: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const test: any = [];
  test.length = 15;
  /* todo put these styles in the stylesheet */
  return (
    <View
      style={{
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 5,
        marginVertical: 10,
        marginRight: isMymessage ? 0 : 50,
        marginLeft: isMymessage ? 50 : 0,
        backgroundColor: isMymessage ? 'white' : '#d7e4c4',
      }}
    >
      {!isMymessage && <Text style={styles.name}>{name}</Text>}
      <Text style={styles.message}>{message}</Text>
      <Text style={styles.time}>{moment(createdAt).fromNow()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#64907a',
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
