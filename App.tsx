import Amplify from 'aws-amplify';
import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { ToastProvider } from './src/context/Toast/ToastContext';

import config from './aws-exports';
import GlobalAppNavigator from './src/navigation/GlobalAppNavigator';
import ToastComponent from './src/components/common/ToastComponent';

Amplify.configure(config);

const App = () => {
  return (
    <SafeAreaProvider>
      <ToastProvider>
        <ToastComponent />
        <SafeAreaView style={styles.safeAreaContainer}>
          <GlobalAppNavigator />
        </SafeAreaView>
      </ToastProvider>
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
