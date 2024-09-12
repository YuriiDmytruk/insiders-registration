import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'Phone'>;

const Phone: React.FC<Props> = ({navigation}) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [formatedPhone, setFormatedPhone] = useState('');
  const [isValid, setIsValid] = useState(false);

  const phoneInput = useRef<PhoneInput>(null);

  useEffect(() => {
    if (phoneInput.current) {
      const isValidNumber = phoneInput.current.isValidNumber(phoneNumber);
      setIsValid(isValidNumber);
    }
  }, [phoneNumber]);

  const handlePress = () => {
    if (isValid) {
      navigation.navigate('PhoneConfirmation', {phone: formatedPhone});
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter Your Phone Number</Text>
      <PhoneInput
        ref={phoneInput}
        defaultValue={phoneNumber}
        defaultCode="UA"
        layout="first"
        onChangeText={text => {
          setPhoneNumber(text);
        }}
        onChangeFormattedText={(text) => setFormatedPhone(text)}
        withDarkTheme={false}
        withShadow
        autoFocus
        containerStyle={styles.phoneContainer}
        textContainerStyle={styles.textInput}
      />

      <TouchableOpacity
        style={[
          styles.button,
          isValid ? styles.buttonValid : styles.buttonNotValid,
        ]}
        onPress={handlePress}>
        <Text style={styles.buttonText}>Confirm</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  phoneContainer: {
    width: '100%',
    height: 50,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 5,
    marginBottom: 20,
  },
  textInput: {
    paddingVertical: 0,
    borderRadius: 10,
    backgroundColor: '#f5f5f5',
  },
  button: {
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 40,
    marginTop: 20,
  },
  buttonValid: {
    backgroundColor: '#4CAF50',
  },
  buttonNotValid: {
    backgroundColor: '#7d4848',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Phone;
