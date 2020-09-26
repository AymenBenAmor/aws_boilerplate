import React from 'react';
import { StyleSheet, TextInputProps } from 'react-native';
import { Input, Layout, Icon } from '@ui-kitten/components';

type Props = {
  leftIcon: string;
} & TextInputProps;

const AppTextInput: React.FC<Props> = ({ leftIcon, ...otherProps }) => {
  return (
    <Layout style={styles.container}>
      {leftIcon && (
        <Icon name={leftIcon} size={20} color="#6e6869" style={styles.icon} />
      )}
      <Input
        style={styles.input}
        placeholderTextColor="#6e6869"
        {...otherProps}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9f9f9',
    borderRadius: 25,
    flexDirection: 'row',
    padding: 15,
    marginVertical: 10,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    width: '80%',
    fontSize: 18,
    color: '#101010',
  },
});

export default AppTextInput;
