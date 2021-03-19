import { StackNavigationProp } from '@react-navigation/stack';
import { Button, Layout } from '@ui-kitten/components';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { getUser } from '../graphql/queries';
import { createUser } from '../graphql/mutations';

import { updateAuth } from '../navigation/AppNavigator';
import { ParamList } from '../navigation/ParamList';
import { getRandomImage } from '../helpers/functions';

type Props = {
  navigation: StackNavigationProp<ParamList, 'SignIn'>;
  updateAuthState: updateAuth;
};

const Home = ({ updateAuthState, navigation }: Props) => {
  React.useEffect(() => {
    const fetchUser = async () => {
      const userInfo = await Auth.currentAuthenticatedUser({
        bypassCache: true,
      });
      if (userInfo) {
        const userData: any = await API.graphql(
          graphqlOperation(getUser, { id: userInfo.attributes.sub }),
        );
        if (userData?.data?.getUser) {
          return;
        }
        const newUser = {
          id: userInfo.attributes.sub,
          firstName: userInfo.attributes.family_name,
          lastName: userInfo.attributes.given_name,
          address: userInfo.attributes.address,
          email: userInfo.attributes.email,
          status: `Hi I m ${userInfo.attributes.family_name} `,
          imageUri: getRandomImage(),
        };

        await API.graphql(graphqlOperation(createUser, { input: newUser }));
      }
    };

    fetchUser();
  }, []);

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
