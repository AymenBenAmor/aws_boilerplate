/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-props-no-spreading */
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import ContactsList from '../components/chat/ContactsList';

import ChatMessage from '../components/chat/ChatMessage';
import Chat from '../screens/Chat';
import Home from '../screens/Home';
import Profile from '../screens/Profile';

export type AppStackParamList = {
  Home: undefined;
  Profile: undefined;
  Chat: undefined;
  ChatMessage: { name: string ,chatRoomID:string,myUserId:''};
  ContactsList:undefined;
  params: any;
};

const AppStack = createStackNavigator<AppStackParamList>();

export type updateAuth = (isLoggedIn: string) => void;
export type NavigatorProp = {
  updateAuthState: updateAuth;
};

const AppNavigator = ({ updateAuthState }: NavigatorProp) => {
 
  return (
    <AppStack.Navigator>
      <AppStack.Screen name="Home">
        {(screenProps) => (
          <Home updateAuthState={updateAuthState} {...screenProps} />
        )}
      </AppStack.Screen>
      <AppStack.Screen name="Profile">{() => <Profile />}</AppStack.Screen>
      <AppStack.Screen name="Chat">{() => <Chat />}</AppStack.Screen>
      <AppStack.Screen name="ContactsList">{() => <ContactsList />}</AppStack.Screen>
      <AppStack.Screen
        name="ChatMessage"
        options={({ route }) => ({ title: route?.params?.name || '' })}
        
      >
        {( screenProps) => (
          // eslint-disable-next-line react/jsx-props-no-multi-spaces
          <ChatMessage  {...screenProps}  />
        )}
      </AppStack.Screen>
    </AppStack.Navigator>
  );
};

export default AppNavigator;
