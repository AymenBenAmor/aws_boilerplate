// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { RouteProp } from '@react-navigation/native';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type Props = {
  isMymessage: boolean;
  index: number;
};
const ChatMessageItem = ({ isMymessage, index }: Props) => {
  const test: any = [];
  test.length = 15;
  return (
    <View
      style={{
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 5,
        marginVertical: 10,
        marginRight: isMymessage ? 50 : 0,
        marginLeft: isMymessage ? 0 : 50,
        backgroundColor: isMymessage ? 'white' : '#d7e4c4',
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
