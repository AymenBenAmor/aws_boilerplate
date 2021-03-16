import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import ChatMessage from '../components/chat/ChatMessage';
import Chat from '../screens/Chat';
import Home from '../screens/Home';
import Profil from '../screens/Profil';

type AppStackParamList = {
  Home: undefined;
  Profil: undefined;
  Chat: undefined;
  ChatMessage: { name: string };
  params: any;
};

const AppStack = createStackNavigator<AppStackParamList>();

export type updateAuth = (isLoggedIn: string) => void;
export type NavigatorProp = {
  updateAuthState: updateAuth;
};
const AppNavigator: React.FC<NavigatorProp> = ({
  updateAuthState,
}: NavigatorProp) => {
  return (
    <AppStack.Navigator>
      <AppStack.Screen name="Home">
        {(screenProps) => (
          <Home updateAuthState={updateAuthState} {...screenProps} />
        )}
      </AppStack.Screen>
      <AppStack.Screen name="Profil">
        {(screenProps) => (
          <Profil updateAuthState={updateAuthState} {...screenProps} />
        )}
      </AppStack.Screen>
      <AppStack.Screen name="Chat">
        {(screenProps) => <Chat {...screenProps} />}
      </AppStack.Screen>
      <AppStack.Screen
        name="ChatMessage"
        options={({ route }) => ({ title: route?.params?.name || '' })}
      >
        {(screenProps) => (
          <ChatMessage updateAuthState={updateAuthState} {...screenProps} />
        )}
      </AppStack.Screen>
    </AppStack.Navigator>
  );
};

export default AppNavigator;
