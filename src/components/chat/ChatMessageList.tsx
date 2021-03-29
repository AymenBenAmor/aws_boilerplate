import React from 'react';
import { FlatList } from 'react-native';
import { API, graphqlOperation } from 'aws-amplify';
import { useAsync } from '../common/custemHook/useAsync';
import { messagesByChatRoom } from '../../graphql/queries';
import { onCreateMessage } from '../../graphql/subscriptions';

import ChatMessageItem from './ChatMessageItem';

type Props = {
  chatRoomID: string;
  myUserId: string;
};
const ChatMessageList = ({ chatRoomID, myUserId }: Props) => {
  const flatListRef: any = React.useRef();

  const [messages, setMessages] = React.useState([]);

  const { result } = useAsync({
    fetchFn: async () =>
      API.graphql(
        graphqlOperation(messagesByChatRoom, {
          chatRoomID,
          sortDirection: 'ASC',
        }),
      ),
    // onSuccessFn: res => {
    //   console.log('res', res);
    // },
    loadOnMount: true,
  });

  React.useEffect(() => {
    if (result?.data?.messagesByChatRoom?.items)
      setMessages(result?.data?.messagesByChatRoom?.items);
  }, [result]);

  React.useEffect(() => {
    const subscription = API.graphql(
      graphqlOperation(onCreateMessage),
    ).subscribe({
      next: (data: any) => {
        console.log('dataaaaaaaaa', data);
      },
      error: (error: any) => console.log('error', error),
    });
    return () => subscription.unsubscribe();
  }, []);

  return (
    <>
      <FlatList
        ref={flatListRef}
        data={messages}
        style={{ marginBottom: 10 }}
        contentContainerStyle={{
          flexGrow: 1,
        }}
        renderItem={({ index, item }) => {
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
        onContentSizeChange={() =>
          flatListRef.current.scrollToEnd({ animated: false })
        }
        keyExtractor={(item: any, index: number) => index.toString()}
      />
    </>
  );
};

export default ChatMessageList;