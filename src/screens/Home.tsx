import * as React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { Auth } from 'aws-amplify';
import { StyleSheet, Text, View } from 'react-native';

import AppButton from 'components/common/AppButton';
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
    <View style={styles.container}>
      <Text>React Native + Amplify</Text>
      <AppButton
        onPress={() => navigation.navigate('Profile')}
        label="Profile"
        testID="Profile"
      />
      <AppButton
        onPress={() => navigation.navigate('Chat')}
        label="Chat"
        testID="Chat"
      />
      <AppButton onPress={signOut} label="Logout" testID="Logout" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
});

export default Home;
