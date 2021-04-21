import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { UsernameAttributesType } from 'aws-amplify-react-native/types';

import { Auth } from 'aws-amplify';
import AppNavigator from './AppNavigator';
import AuthenticationNavigator from './AuthenticationNavigator';
import { useAsync } from '../helpers/customHooks';
import UikittenLayout from '../components/common/UikittenLayout';
import SpinnerComponent from '../components/common/SpinnerComponent';

const Initializing = () => {
  return (
    <UikittenLayout
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
    >
      <SpinnerComponent size="large" />
    </UikittenLayout>
  );
};

const GlobalAppNavigator = () => {
  const [isUserLoggedIn, setUserLoggedIn] = React.useState('initializing');
  function updateAuthState(loggedIn: string) {
    setUserLoggedIn(loggedIn);
  }
  const { run } = useAsync<UsernameAttributesType>();
  React.useEffect(() => {
    run(Auth.currentAuthenticatedUser()).then(
      () => {
        setUserLoggedIn('loggedIn');
      },
      () => {
        setUserLoggedIn('loggedOut');
      },
    );
  }, [run]);

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
