import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import ForgotPassword from '../screens/Auth/ForgotPassword';
import SignIn from '../screens/Auth/SignIn';
import SignUp from '../screens/Auth/SignUp';

type AuthStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
};
export type updateAuth = (isLoggedIn: string) => void;
const AuthenticationStack = createStackNavigator<AuthStackParamList>();
export type NavigatorProp = {
  updateAuthState: updateAuth;
};

const AuthenticationNavigator = ({ updateAuthState }: NavigatorProp) => {
  return (
    <AuthenticationStack.Navigator>
      <AuthenticationStack.Screen name="SignIn">
        {screenProps => (
          <SignIn {...screenProps} updateAuthState={updateAuthState} />
        )}
      </AuthenticationStack.Screen>
      <AuthenticationStack.Screen name="SignUp">
        {screenProps => <SignUp {...screenProps} />}
      </AuthenticationStack.Screen>
      <AuthenticationStack.Screen name="ForgotPassword">
        {screenProps => <ForgotPassword {...screenProps} />}
      </AuthenticationStack.Screen>
    </AuthenticationStack.Navigator>
  );
};

export default AuthenticationNavigator;
