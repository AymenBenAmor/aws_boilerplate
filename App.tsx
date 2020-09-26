import React, { useState, useEffect } from 'react';
import Amplify, { Auth } from 'aws-amplify';
import { NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import * as eva from '@eva-design/eva';
import {
  ApplicationProvider,
  IconRegistry,
  Layout,
  Spinner,
} from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';

import { default as theme } from './theme.json';
import SignIn from './src/screens/SignIn';

import config from './aws-exports';
import Home from './src/screens/Home';

// import SignUp from './src/screens/SignUp';
// import ConfirmSignUp from './src/screens/ConfirmSignUp';
// import Home from './src/screens/Home';

Amplify.configure(config);

type AuthStackParamList = {
  SignIn: undefined;
};
type AppStackParamList = {
  Home: undefined;
};

export type AuthNavigationProp = StackNavigationProp<
  AuthStackParamList,
  'SignIn'
>;
export type AppNavigationProp = StackNavigationProp<AppStackParamList, 'Home'>;

export type updateAuth = (isLoggedIn: string) => void;
export type NavigatorProp = {
  updateAuthState: updateAuth;
};

const AuthenticationStack = createStackNavigator<AuthStackParamList>();
const AppStack = createStackNavigator<AppStackParamList>();

const AuthenticationNavigator: React.FC<NavigatorProp> = ({
  updateAuthState,
}: NavigatorProp) => {
  return (
    <AuthenticationStack.Navigator headerMode="none">
      <AuthenticationStack.Screen name="SignIn">
        {(screenProps) => (
          <SignIn {...screenProps} updateAuthState={updateAuthState} />
        )}
      </AuthenticationStack.Screen>
    </AuthenticationStack.Navigator>
  );
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

const Initializing = () => {
  return (
    <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Spinner size="large" />
    </Layout>
  );
};

const App: React.FC = () => {
  const [isUserLoggedIn, setUserLoggedIn] = useState('initializing');
  async function checkAuthState() {
    try {
      await Auth.currentAuthenticatedUser();
      console.log(
        '<img draggable="false" class="emoji" alt="✅" src="https://s.w.org/images/core/emoji/11/svg/2705.svg"> User is signed in'
      );
      setUserLoggedIn('loggedIn');
    } catch (err) {
      console.log(
        '<img draggable="false" class="emoji" alt="❌" src="https://s.w.org/images/core/emoji/11/svg/274c.svg"> User is not signed in'
      );
      setUserLoggedIn('loggedOut');
    }
  }
  useEffect(() => {
    checkAuthState();
  }, []);

  function updateAuthState(loggedIn: string) {
    setUserLoggedIn(loggedIn);
  }
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
        <NavigationContainer>
          {isUserLoggedIn === 'initializing' && <Initializing />}
          {isUserLoggedIn === 'loggedIn' && (
            <AppNavigator updateAuthState={updateAuthState} />
          )}
          {isUserLoggedIn === 'loggedOut' && (
            <AuthenticationNavigator updateAuthState={updateAuthState} />
          )}
        </NavigationContainer>
      </ApplicationProvider>
    </>
  );
};

export default App;
