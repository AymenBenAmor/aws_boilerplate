import * as React from 'react';
import { FlatList } from 'react-native';

import { useListSubscription } from '../../helpers/customHooks';
import { messagesByChatRoom } from '../../graphql/queries';
import { onCreateMessage } from '../../graphql/subscriptions';
import ChatMessageItem from './ChatMessageItem';

type Props = {
  chatRoomID: string;
  UserId: string;
  firstMessage: string;
};
type messagesType = {
  user: { id: string; firstName: string };
  createdAt: string;
  content: string;
};
const ChatMessageList = ({ chatRoomID, UserId, firstMessage }: Props) => {
  // todo aymen check type for this.
  /* eslint-disable @typescript-eslint/no-explicit-any  */
  const flatListRef: any = React.useRef();
  const { data: messages } = useListSubscription<messagesType>(
    {
      query: messagesByChatRoom,
      variables: { chatRoomID, sortDirection: 'ASC' },
      key: 'messagesByChatRoom',
    },
    {
      query: onCreateMessage,
      variables: { chatRoomID },
      key: 'onCreateMessage',
    },
  );

  return (
    <>
      <FlatList
        ref={flatListRef}
        data={
          firstMessage
            ? [
                {
                  user: { id: UserId, firstName: '' },
                  createdAt: new Date().toString(),
                  content: firstMessage,
                },
                ...messages,
              ]
            : messages
        }
        style={{ marginBottom: 10 }}
        contentContainerStyle={{
          flexGrow: 1,
        }}
        renderItem={({ item }) => {
          return (
            <>
              {item && (
                <ChatMessageItem
                  isMymessage={!!(item?.user?.id === UserId)}
                  createdAt={item.createdAt}
                  message={item.content}
                  name={item?.user?.firstName}
                />
              )}
            </>
          );
        }}
        onContentSizeChange={() => {
          return flatListRef.current.scrollToEnd({ animated: false });
        }}
        keyExtractor={(_, index: number) => index.toString()}
      />
    </>
  );
};

export default ChatMessageList;
