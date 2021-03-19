import { Layout } from '@ui-kitten/components';
import { Auth } from 'aws-amplify';
import React from 'react';
import { StyleSheet, Text } from 'react-native';

import AppButton from '../components/common/AppButton';
import AppContainer from '../components/common/AppContainer';
import AppTextInput from '../components/common/AppTextInput';
import Toast from '../components/common/Toast';
import { useAsync } from '../components/common/custemHook/useAsync';
import useForm from '../components/common/custemHook/useForm';

const Profile = () => {
  const [isEditStep, setIsEditStep] = React.useState(false);
  const [userDetails, setuserDetails] = React.useState<any>({}); // todo fix this type

  const {
    handleChange,
    checkErrors,
    values,
    updateAllValues,
    errorsMessages,
    isSubmitting,
  } = useForm(
    {
      email: 'd',
      family_name: 'd',
      given_name: 'd',
      address: 'd',
    },
    {
      email: 'Invalid email',
      family_name: 'Invalid firstName',
      given_name: 'Invalid lastname',
      address: 'Invalid address',
    },
  );

  const { loadData: getUserDetails } = useAsync({
    fetchFn: () => Auth.currentAuthenticatedUser(),
    onSuccessFn: res => {
      updateAllValues(() => {
        // eslint-disable-next-line camelcase
        const { email, family_name, given_name, address } = res.attributes;
        setuserDetails(res);
        return { email, family_name, given_name, address };
      });
    },
    loadOnMount: true,
  });

  const {
    message,
    setMessage,
    messageType,
    loadData: updateUserDetails,
  } = useAsync({
    fetchFn: () =>
      Auth.updateUserAttributes(userDetails, {
        ...values,
      }),
    onSuccessFn: () => {
      getUserDetails();
      setIsEditStep(false);
    },
  });

  return (
    <AppContainer>
      <Layout style={styles.container}>
        <Text style={styles.title}>Sign in to your account</Text>
        {!isEditStep ? (
          <Layout>
            <Text style={styles.title}>
              Email: {userDetails?.attributes?.email}
            </Text>
            <Text style={styles.title}>
              first name: {userDetails?.attributes?.family_name}
            </Text>
            <Text style={styles.title}>
              last name: {userDetails?.attributes?.given_name}
            </Text>
            <Text style={styles.title}>
              address: {userDetails?.attributes?.address}
            </Text>
          </Layout>
        ) : (
          <Layout>
            <AppTextInput
              value={values.email || ''}
              onChangeText={value => handleChange({ name: 'email', value })}
              leftIcon="person-outline"
              placeholder="Enter email"
              autoCapitalize="none"
              keyboardType="email-address"
              textContentType="emailAddress"
              onBlur={() => checkErrors('email')}
              errorMessage={errorsMessages.email || ''}
            />
            <AppTextInput
              value={values.family_name || ''}
              onChangeText={value =>
                handleChange({ name: 'family_name', value })
              }
              leftIcon="person-outline"
              placeholder="Enter first name"
              autoCapitalize="none"
              onBlur={() => checkErrors('family_name')}
              errorMessage={errorsMessages.family_name || ''}
            />
            <AppTextInput
              value={values.given_name || ''}
              onChangeText={value =>
                handleChange({ name: 'given_name', value })
              }
              leftIcon="person-outline"
              placeholder="Enter last name"
              autoCapitalize="none"
              onBlur={() => checkErrors('given_name')}
              errorMessage={errorsMessages.given_name || ''}
            />
            <AppTextInput
              value={values.address || ''}
              onChangeText={value => handleChange({ name: 'address', value })}
              leftIcon="person-outline"
              placeholder="Enter address"
              autoCapitalize="none"
              onBlur={() => checkErrors('address')}
              errorMessage={errorsMessages.address || ''}
            />
          </Layout>
        )}

        <Toast message={message} callback={setMessage} type={messageType} />

        <AppButton
          onPress={() =>
            !isEditStep ? setIsEditStep(true) : updateUserDetails
          }
          disabled={!isEditStep ? false : isSubmitting}
          title={!isEditStep ? 'updateUserDetails' : 'Update'}
        />
      </Layout>
    </AppContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 20,
    color: '#202020',
    fontWeight: '500',
    marginVertical: 15,
  },
});

export default Profile;
