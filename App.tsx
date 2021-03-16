import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import Amplify from 'aws-amplify';
import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import config from './aws-exports';
import GlobalAppNavigator from './src/navigation/GlobalAppNavigator';
import { default as theme } from './theme.json';

Amplify.configure(config);

type AuthStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
};
type AppStackParamList = {
  Home: undefined;
};

const App: React.FC = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeAreaContainer}>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
          <GlobalAppNavigator />
        </ApplicationProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
});
