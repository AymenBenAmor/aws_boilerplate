// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { RouteProp } from '@react-navigation/native';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { FlatList } from 'react-native';

import ChatMessageItem from './ChatMessageItem';

type Props = {
  array: [];
};
const ChatMessageList = ({ array }: Props) => {
  const flatListRef: any = React.useRef();

  return (
    <>
      <FlatList
        ref={flatListRef}
        data={array}
        style={{ marginBottom: 10 }}
        contentContainerStyle={{
          flexGrow: 1,
        }}
        renderItem={({ index }) => {
          const isMymessage = index % 2 === 0;

          return <ChatMessageItem isMymessage={isMymessage} index={index} />;
        }}
        onContentSizeChange={() =>
          flatListRef.current.scrollToEnd({ animated: false })
        }
        keyExtractor={(item: object, index: number) => index.toString()}
      />
    </>
  );
};

export default ChatMessageList;
