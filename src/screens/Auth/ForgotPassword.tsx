/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { StackNavigationProp } from '@react-navigation/stack';
import { Auth } from 'aws-amplify';
import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import AppContainer from '../../components/common/AppContainer';
import Toast from '../../components/common/Toast';
import ForgotPasswordStep1 from '../../components/forgotPassword/ForgotPasswordStep1';
import ForgotPasswordStep2 from '../../components/forgotPassword/ForgotPasswordStep2';
import { ParamList } from '../../navigation/ParamList';

type Props = {
  navigation: StackNavigationProp<ParamList, 'SignUp'>;
};

const ForgotPassword: React.FC<Props> = ({ navigation }) => {
  const [isConfirmStep, setIsConfirmStep] = React.useState(false);
  const [email, setEmail] = React.useState('jiancehenj@mikes.cd');
  const [message, setMessage] = React.useState('');
  const [messageType] = React.useState('error');

  return (
    <AppContainer>
      <View style={[styles.subcontainer]}>
        <Text style={styles.title}>Forgot Password </Text>
        {!isConfirmStep ? (
          <ForgotPasswordStep1
            setIsConfirmStep={setIsConfirmStep}
            setEmail={setEmail}
            setMessage={setMessage}
          />
        ) : (
          <ForgotPasswordStep2
            navigation={navigation}
            email={email}
            setMessage={setMessage}
          />
        )}
        <Toast message={message} callback={setMessage} type={messageType} />
      </View>
    </AppContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subcontainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 20,
    color: '#202020',
    fontWeight: '500',
    marginVertical: 15,
  },
});

export default ForgotPassword;
