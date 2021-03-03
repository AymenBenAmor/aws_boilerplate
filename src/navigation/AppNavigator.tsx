import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import Home from '../screens/Home';

type AppStackParamList = {
  Home: undefined;
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
        {() => <Home updateAuthState={updateAuthState} />}
      </AppStack.Screen>
    </AppStack.Navigator>
  );
};

export default AppNavigator;
