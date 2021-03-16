import React from 'react';
import { FlatList } from 'react-native';

import ChatListItem from '../../components/chat/ChatListItem';

type Props = {
  array: [];
};

const ChatList = ({ array }: Props) => {
  return (
    <FlatList
      data={array}
      renderItem={({ index, separators }) => <ChatListItem id={`${index}`} />}
      keyExtractor={(item: object, index: number) => index.toString()}
    />
  );
};

export default ChatList;
