/* eslint-disable prettier/prettier */
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import ContactsList from '../components/chat/ContactsList';

import ChatMessage from '../components/chat/ChatMessage';
import Chat from '../screens/Chat';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import { ParamList } from './ParamList';

const AppStack = createStackNavigator<ParamList>();

export type updateAuth = (isLoggedIn: string) => void;
export type NavigatorProp = {
  updateAuthState: updateAuth;
};

const AppNavigator = ({ updateAuthState }: NavigatorProp) => {
  return (
    <AppStack.Navigator>
      <AppStack.Screen name="Home">
        {screenProps => (
          <Home
            updateAuthState={updateAuthState}
            navigation={screenProps.navigation}
          />
        )}
      </AppStack.Screen>
      <AppStack.Screen name="Profile">{() => <Profile />}</AppStack.Screen>
      <AppStack.Screen name="Chat">{() => <Chat />}</AppStack.Screen>
      <AppStack.Screen name="ContactsList">
        {() => <ContactsList />}
      </AppStack.Screen>
      <AppStack.Screen
        name="ChatMessage"
        options={({ route }) => ({ title: route?.params?.name || '' })}
      >
        {screenProps => <ChatMessage route={screenProps.route} />}
      </AppStack.Screen>
    </AppStack.Navigator>
  );
};

export default AppNavigator;
