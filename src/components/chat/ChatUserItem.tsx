import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

type Props = {
  id: string;
  imageUri?: string;
  firstName?: string;
  lastName?: string;
  status?: string;
  onClick: () => void;
};

const ChatUserItem = ({
  id,
  imageUri = 'https://loja02.uberflow.com.br/wordpress/wp-content/files/loja02.uberflow.com.br/2019/11/dep_01.jpg',
  firstName = `Patric ${id}`,
  lastName = 'whyy dwdw ldwdwdw dwdw ',
  status,
  onClick,
}: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={{
        paddingVertical: 15,
      }}
      onPress={onClick}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Image
          style={styles.image}
          source={{
            uri: imageUri,
          }}
        />
        <View>
          <Text style={styles.name}>
            {firstName}
            {lastName}
          </Text>
          <Text style={styles.message}>{status}</Text>
        </View>
      </View>
      <View style={styles.border} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {},
  image: {
    height: 60,
    width: 60,
    marginRight: 20,
    borderRadius: 100,
  },
  name: { fontSize: 17, fontWeight: 'bold', marginBottom: 10 },
  message: { fontSize: 15, color: '#606060' },
  border: {
    height: 10,
    width: '90%',
    borderBottomColor: '#bdbcbc',
    borderBottomWidth: 1,
    alignSelf: 'center',
  },
});

export default ChatUserItem;
