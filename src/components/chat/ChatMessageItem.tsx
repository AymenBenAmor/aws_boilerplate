import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type Props = {
  isMyMessage: boolean;
  index: number;
};
const ChatMessageItem = ({ isMyMessage, index }: Props) => {
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
        marginRight: isMyMessage ? 50 : 0,
        marginLeft: isMyMessage ? 0 : 50,
        backgroundColor: isMyMessage ? 'white' : '#d7e4c4',
      }}
    >
      <Text style={styles.message}>
        message edwed fwef wefklfwe f fwelknfwew {index}
      </Text>
      <Text style={styles.time}>09:45</Text>
    </View>
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

export default ChatMessageItem;
