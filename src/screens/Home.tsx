import { Button, Layout } from '@ui-kitten/components';
import { Auth } from 'aws-amplify';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text } from 'react-native';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { updateAuth } from '../navigation/AppNavigator';

type Props = {
  updateAuthState: updateAuth;
};

const Home: React.FC<Props> = ({ updateAuthState }: Props) => {
  async function signOut() {
    try {
      await Auth.signOut();
      updateAuthState('loggedOut');
    } catch (error) {
      console.log('Error signing out: ', error);
    }
  }

  return (
    <Layout style={styles.container}>
      <Text>React Native + Amplify</Text>
      <StatusBar style="auto" />
      <Button onPress={signOut}>Logout</Button>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Home;
