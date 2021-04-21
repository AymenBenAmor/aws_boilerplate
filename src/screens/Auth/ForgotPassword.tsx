import { StackNavigationProp } from '@react-navigation/stack';
import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import AppContainer from '../../components/common/AppContainer';
import ForgotPasswordStep1 from '../../components/forgotPassword/ForgotPasswordStep1';
import ForgotPasswordStep2 from '../../components/forgotPassword/ForgotPasswordStep2';
import { ParamList } from '../../navigation/ParamList';
import useForm from '../../components/common/custemHook/useForm';

type Props = {
  navigation: StackNavigationProp<ParamList, 'SignUp'>;
};

const ForgotPassword = ({ navigation }: Props) => {
  const [isConfirmStep, setIsConfirmStep] = React.useState(false);

  const { handleChange, checkErrors, values, errorsMessages } = useForm(
    {
      verificationCode: '818302',
      password: '1111111112',
      confirmPassword: '1111111112',
      email: 'jiancehenj@mikes.cd',
    },
    {
      verificationCode: 'Invalid verification code',
      password: 'Invalid password',
      confirmPassword: 'Password mismatch',
      email: 'Invalid email',
    },
  );
  const setEmail = (value: string) => handleChange({ name: 'email', value });
  return (
    <AppContainer>
      <View style={[styles.subcontainer]}>
        <Text style={styles.title}>Forgot Password </Text>
        {!isConfirmStep ? (
          <ForgotPasswordStep1
            setIsConfirmStep={setIsConfirmStep}
            setEmail={setEmail}
            checkErrors={checkErrors}
            email={values.email}
            errorsMessages={errorsMessages}
          />
        ) : (
          <ForgotPasswordStep2
            navigation={navigation}
            values={values}
            checkErrors={checkErrors}
            handleChange={handleChange}
            errorsMessages={errorsMessages}
          />
        )}
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
