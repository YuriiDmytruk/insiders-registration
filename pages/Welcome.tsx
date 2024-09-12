import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'Welcome'>;

const Welcome: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Welcome</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Phone')}>
        <Text>go to Phone</Text>
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

export default Welcome;
