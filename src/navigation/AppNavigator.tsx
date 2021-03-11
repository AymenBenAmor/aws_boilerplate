import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import Home from '../screens/Home';
import Profile from '../screens/Profile';

type AppStackParamList = {
  Home: undefined;
  Profile: undefined;
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
        {screenProps => (
          <Home updateAuthState={updateAuthState} {...screenProps} />
        )}
      </AppStack.Screen>
      <AppStack.Screen name="Profile">{() => <Profile />}</AppStack.Screen>
    </AppStack.Navigator>
  );
};

export default AppNavigator;
