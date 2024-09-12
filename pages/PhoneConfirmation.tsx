import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'PhoneConfirmation'>;

const PhoneConfirmation: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>PhoneConfirmation</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Info')}>
        <Text>go to Info</Text>
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

export default PhoneConfirmation;
