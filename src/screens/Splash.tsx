import { StackNavigationProp } from '@react-navigation/stack';
import * as React from 'react';
import { StyleSheet, Text } from 'react-native';
import UikittenLayout from '../components/common/UikittenLayout';
import { ParamList } from '../navigation/ParamList';

interface SplashProps {
  navigation: StackNavigationProp<ParamList, 'Splash'>;
}

const Splash = ({ navigation }: SplashProps) => {
  React.useEffect(() => {
    setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: 'SignIn' }],
      });
    }, 2000);
  }, [navigation]);
  return (
    <UikittenLayout style={styles.container}>
      <Text style={styles.title}>Splash</Text>
    </UikittenLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 45,
    color: '#202020',
    fontWeight: '500',
    marginVertical: 15,
  },
});

export default Splash;
