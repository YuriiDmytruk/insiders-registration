import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {CodeField, Cursor} from 'react-native-confirmation-code-field';
import {RootStackParamList} from '../types';
import { useDispatch } from 'react-redux';
import { updatePhone } from '../redux/slices/userInfoSlice';

type Props = NativeStackScreenProps<RootStackParamList, 'PhoneConfirmation'>;

const CELL_COUNT = 3;
const VALID_CODE = '111';

const PhoneConfirmation: React.FC<Props> = ({route, navigation}) => {
  const [confirmationCode, setConfirmationCode] = useState('111');
  const [isValid, setIsvalid] = useState(false);
  const dispatch = useDispatch();

  const {phone} = route.params;

  useEffect(() => {
    setIsvalid(confirmationCode === VALID_CODE);
  }, [confirmationCode]);

  const handleConfirm = () => {
    if(isValid){
      dispatch(updatePhone(phone));
      navigation.navigate('Info');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter 3-digit Confirmation Code</Text>
      <View style={styles.codeFieldContainer}>
        <CodeField
          value={confirmationCode}
          onChangeText={setConfirmationCode}
          cellCount={CELL_COUNT}
          rootStyle={styles.codeFieldRoot}
          keyboardType="numeric"
          textContentType="oneTimeCode"
          renderCell={({index, symbol, isFocused}) => (
            <View
              key={index}
              style={[styles.cellRoot, isFocused && styles.focusCell]}>
              <Text style={styles.cellText}>
                {symbol || (isFocused ? <Cursor /> : '_')}
              </Text>
            </View>
          )}
        />
      </View>
      <TouchableOpacity
        style={[
          styles.button,
          isValid ? styles.buttonValid : styles.buttonNotValid,
        ]}
        onPress={handleConfirm}>
        <Text style={styles.buttonText}>Confirm</Text>
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
    padding: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  codeFieldContainer: {
    width: '50%',
    marginBottom: 20,
  },
  codeFieldRoot: {
    width: '100%',
  },
  cellRoot: {
    width: 40,
    height: 40,
    lineHeight: 38,
    borderBottomWidth: 2,
    borderColor: '#00000030',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 24,
  },
  focusCell: {
    borderColor: '#000',
  },
  cellText: {
    fontSize: 24,
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

export default PhoneConfirmation;
