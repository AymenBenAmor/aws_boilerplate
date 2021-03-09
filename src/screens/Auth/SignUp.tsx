/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { StackNavigationProp } from '@react-navigation/stack';
import { Auth } from 'aws-amplify';
import * as React from 'react';
import { StyleSheet } from 'react-native';

import AppContainer from '../../components/common/AppContainer';
import Toast from '../../components/common/Toast';
import SignUpStep1 from '../../components/signUp/SignUpStep1';
import SignUpStep2 from '../../components/signUp/SignUpStep2';
import { ParamList } from '../../navigation/ParamList';

type Props = {
  navigation: StackNavigationProp<ParamList, 'SignUp'>;
};

const SignUp: React.FC<Props> = ({ navigation }) => {
  const [isConfirmStep, setIsConfirmStep] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [messageType] = React.useState('error');

  const [loading, setLoading] = React.useState(false);

  return (
    <AppContainer>
      <>
        {!isConfirmStep ? (
          <SignUpStep1
            loading={loading}
            setLoading={setLoading}
            setIsConfirmStep={setIsConfirmStep}
            setEmail={setEmail}
            setMessage={setMessage}
          />
        ) : (
          <SignUpStep2
            navigation={navigation}
            loading={loading}
            setLoading={setLoading}
            email={email}
            setMessage={setMessage}
          />
        )}
        <Toast message={message} callback={setMessage} type={messageType} />
      </>
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
});

export default SignUp;
