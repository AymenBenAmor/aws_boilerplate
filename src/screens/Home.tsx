import * as React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { Button, Layout } from '@ui-kitten/components';
import { Auth } from 'aws-amplify';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text } from 'react-native';

import { updateAuth } from '../navigation/AppNavigator';
import { ParamList } from '../navigation/ParamList';

type Props = {
  navigation: StackNavigationProp<ParamList, 'SignIn'>;
  updateAuthState: updateAuth;
};

const Home = ({ updateAuthState, navigation }: Props) => {
  async function signOut() {
    try {
      await Auth.signOut();
      updateAuthState('loggedOut');
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('Error signing out: ', error);
    }
  }

  return (
    <Layout style={styles.container}>
      <Text>React Native + Amplify</Text>
      <StatusBar style="auto" />
      <Button
        style={{ marginTop: 20 }}
        onPress={() => navigation.navigate('Profile')}
      >
        Profile
      </Button>
      <Button
        style={{ marginVertical: 20 }}
        onPress={() => navigation.navigate('Chat')}
      >
        Chat
      </Button>
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
