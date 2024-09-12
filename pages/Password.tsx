import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'Password'>;

const Password: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Password</Text>
      <TouchableOpacity onPress={() => navigation.navigate('UserInfo')}>
        <Text>go to UserInfo</Text>
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

export default Password;
