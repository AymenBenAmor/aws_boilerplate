import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import ForgotPassword from '../screens/Auth/ForgotPassword';
import SignIn from '../screens/Auth/SignIn';
import SignUp from '../screens/Auth/SignUp';
import { ParamList } from './ParamList';

export type updateAuth = (isLoggedIn: string) => void;
const AuthenticationStack = createStackNavigator<ParamList>();
export type NavigatorProp = {
  updateAuthState: updateAuth;
};

const AuthenticationNavigator = ({ updateAuthState }: NavigatorProp) => {
  return (
    <AuthenticationStack.Navigator>
      <AuthenticationStack.Screen name="SignIn">
        {screenProps => (
          <SignIn
            navigation={screenProps.navigation}
            updateAuthState={updateAuthState}
          />
        )}
      </AuthenticationStack.Screen>
      <AuthenticationStack.Screen name="SignUp">
        {screenProps => <SignUp navigation={screenProps.navigation} />}
      </AuthenticationStack.Screen>
      <AuthenticationStack.Screen name="ForgotPassword">
        {screenProps => <ForgotPassword navigation={screenProps.navigation} />}
      </AuthenticationStack.Screen>
    </AuthenticationStack.Navigator>
  );
};

export default AuthenticationNavigator;
