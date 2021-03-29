import React from 'react';

import ChatList from '../components/chat/ChatRoomList';
import AppContainer from '../components/common/AppContainer';

const Chat = () => {
  const test: any = [];
  test.length = 15;
  return (
    <AppContainer>
      <ChatList array={test} />
    </AppContainer>
  );
};

export default Chat;
