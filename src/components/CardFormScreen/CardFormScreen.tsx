import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { CreditCardInput } from 'react-native-credit-card-input';

const CardFormScreen = () => {
  const [form, setForm] = React.useState({ valid: false });

  return (
    <View style={styles.container}>
      <CreditCardInput
        /* eslint-disable @typescript-eslint/no-explicit-any  */
        onChange={(formData: any) => {
          setForm(formData);
        }}
      />
      <View style={styles.footerButtonContainer}>
        <Button
          onPress={() => {
            setForm(form);
          }}
          disabled={!form.valid}
          title="send"
        />
      </View>
    </View>
  );
};
export default CardFormScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instruction: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  paymentMethod: {
    height: 20,
  },
  footerButtonContainer: {
    width: '100%',
    marginBottom: 30,
  },
});
