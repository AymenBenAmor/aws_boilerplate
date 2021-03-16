import { NavigationContainer } from '@react-navigation/native';
import { Layout, Spinner } from '@ui-kitten/components';
import { Auth } from 'aws-amplify';
import React, { useState, useEffect } from 'react';

import { authFun } from '../helpers/functions';
import AppNavigator from './AppNavigator';
import AuthenticationNavigator from './AuthenticationNavigator';

const Initializing = () => {
  return (
    <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Spinner size="large" />
    </Layout>
  );
};

const GlobalAppNavigator = () => {
  const [isUserLoggedIn, setUserLoggedIn] = useState('initializing');
  function updateAuthState(loggedIn: string) {
    setUserLoggedIn(loggedIn);
  }
  async function checkAuthState() {
    authFun({
      func: Auth.currentAuthenticatedUser(),
      onSuccessFn: () => {
        setUserLoggedIn('loggedIn');
      },
      onFailedFn: () => {
        setUserLoggedIn('loggedOut');
      },
    });
  }
  useEffect(() => {
    checkAuthState();
  }, []);

  return (
    <NavigationContainer>
      {isUserLoggedIn === 'initializing' && <Initializing />}
      {isUserLoggedIn === 'loggedIn' && (
        <AppNavigator updateAuthState={updateAuthState} />
      )}
      {isUserLoggedIn === 'loggedOut' && (
        <AuthenticationNavigator updateAuthState={updateAuthState} />
      )}
    </NavigationContainer>
  );
};

export default GlobalAppNavigator;
