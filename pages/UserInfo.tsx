import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'UserInfo'>;

const UserInfo: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>UserInfo</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Welcome')}>
        <Text>go to Welcome</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});

export default UserInfo;
