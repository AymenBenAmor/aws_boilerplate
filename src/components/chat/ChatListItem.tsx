import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

// eslint-disable-next-line @typescript-eslint/no-unused-vars

type Props = {
  id: string;
  image?: string;
  name?: string;
  lastMessage?: string;
};

const ChatListItem: React.FC<Props> = ({
  id,
  image = 'https://loja02.uberflow.com.br/wordpress/wp-content/files/loja02.uberflow.com.br/2019/11/dep_01.jpg',
  name = 'Patric ' + id,
  lastMessage = 'whyy dwdw ldwdwdw dwdw ',
}: Props) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={{
        paddingVertical: 15,
      }}
      onPress={() => navigation.navigate('ChatMessage', { id, name })}
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
            uri:
              'https://loja02.uberflow.com.br/wordpress/wp-content/files/loja02.uberflow.com.br/2019/11/dep_01.jpg',
          }}
        />
        <View>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.message}>{lastMessage}</Text>
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
    width: '80%',
    borderBottomColor: '#bdbcbc',
    borderBottomWidth: 1,
    alignSelf: 'center',
  },
});

export default ChatListItem;
