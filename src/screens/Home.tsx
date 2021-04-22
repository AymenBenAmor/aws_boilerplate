import * as React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { Auth } from 'aws-amplify';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text } from 'react-native';

import UikittenButton from 'components/common/UikittenButton';
import UikittenLayout from 'components/common/UikittenLayout';
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
    <UikittenLayout style={styles.container}>
      <Text>React Native + Amplify</Text>
      <StatusBar style="auto" />
      <UikittenButton
        style={{ marginTop: 20 }}
        onPress={() => navigation.navigate('Profile')}
      >
        Profile
      </UikittenButton>
      <UikittenButton
        style={{ marginVertical: 20 }}
        onPress={() => navigation.navigate('Chat')}
      >
        Chat
      </UikittenButton>
      <UikittenButton onPress={signOut}>Logout</UikittenButton>
    </UikittenLayout>
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
