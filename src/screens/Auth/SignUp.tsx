import { StackNavigationProp } from '@react-navigation/stack';
import AppContainer from 'components/common/AppContainer';
import SignUpStep1 from 'components/signUp/SignUpStep1';
import { ParamList } from 'navigation/ParamList';
import * as React from 'react';

import SignUpStep2 from 'components/signUp/SignUpStep2';

type Props = {
  navigation: StackNavigationProp<ParamList, 'SignUp'>;
};

const SignUp = ({ navigation }: Props) => {
  const [isConfirmStep, setIsConfirmStep] = React.useState(false);
  const [email, setEmail] = React.useState('');

  return (
    <AppContainer>
      <>
        {!isConfirmStep ? (
          <SignUpStep1
            setIsConfirmStep={setIsConfirmStep}
            setEmail={setEmail}
          />
        ) : (
          <SignUpStep2 navigation={navigation} email={email} />
        )}
      </>
    </AppContainer>
  );
};

export default SignUp;
