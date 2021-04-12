import React from 'react';
import { FlatList } from 'react-native';
import { API, graphqlOperation } from 'aws-amplify';
import { useAsync } from '../../helpers/customHooks';
import { messagesByChatRoom } from '../../graphql/queries';
import { onCreateMessage } from '../../graphql/subscriptions';

import ChatMessageItem from './ChatMessageItem';

type Props = {
  chatRoomID: string;
  myUserId: string;
};
type messagesType = {
  user: { id: string; firstName: string };
  createdAt: string;
  content: string;
};
const ChatMessageList = ({ chatRoomID, myUserId }: Props) => {
  const flatListRef: any = React.useRef();

  const [messages, setMessages] = React.useState<messagesType[]>([]);

  const { run } = useAsync<any>();

  const getMessageList = React.useCallback(() => {
    run(
      API.graphql(
        graphqlOperation(messagesByChatRoom, {
          chatRoomID,
          sortDirection: 'ASC',
        }),
      ),
    ).then(result => {
      if (result?.data?.messagesByChatRoom?.items) {
        setMessages(result?.data?.messagesByChatRoom?.items);
      }
    });
  }, [chatRoomID, run]);

  React.useEffect(() => {
    getMessageList();
  }, [getMessageList]);

  React.useEffect(() => {
    const subscription = API.graphql({
      query: onCreateMessage,
      variables: { chatRoomID },
    }).subscribe({
      next: (data: any) => {
        const rep = data?.value?.data?.onCreateMessage;
        if (rep) {
          setMessages([...messages, rep]);
        }
      },
    });
    return () => subscription.unsubscribe();
  }, [chatRoomID, messages]);

  return (
    <>
      <FlatList
        ref={flatListRef}
        data={messages}
        style={{ marginBottom: 10 }}
        contentContainerStyle={{
          flexGrow: 1,
        }}
        renderItem={({ item }) => {
          return (
            <>
              {item && (
                <ChatMessageItem
                  isMymessage={!!(item?.user?.id === myUserId)}
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
