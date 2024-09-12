import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types';
import {useDispatch, useSelector} from 'react-redux';
import {updatePassword} from '../redux/slices/userInfoSlice';
import {RootState} from '../redux/store';

import {SUPABASE_URL, SUPABASE_ANON_KEY} from '@env';
import {createClient} from '@supabase/supabase-js';

const showIcon = require('../assets/show.png');
const hideIcon = require('../assets/hide.png');

type Props = NativeStackScreenProps<RootStackParamList, 'Password'>;

const Password: React.FC<Props> = ({navigation}) => {
  const [password, setPassword] = useState('1234');
  const [confirmPassword, setConfirmPassword] = useState('1234');
  const [securePasswordEntry, setSecurePasswordEntry] = useState(true);
  const [secureConfirmEntry, setSecureConfirmEntry] = useState(true);
  const [isPasswordSame, setIsPasswordSame] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (password === '' || confirmPassword === '') {
      setIsPasswordSame(false);
      return;
    } else {
      setIsPasswordSame(password === confirmPassword);
    }
  }, [password, confirmPassword]);

  const togglePasswordVisibility = () => {
    setSecurePasswordEntry(!securePasswordEntry);
  };

  const toggleConfirmVisibility = () => {
    setSecureConfirmEntry(!secureConfirmEntry);
  };

  const handlePress = () => {
    if (isPasswordSame) {
      registerUser();
      dispatch(updatePassword(password));
      navigation.navigate('UserInfo');
    }
  };

  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  const {name, role, email, image, phone} = useSelector(
    (state: RootState) => state.userInfo,
  );

  const registerUser = () => {
    const register = async () => {
      const {data} = await supabase
        .from('users')
        .insert([
          {
            name: name,
            email: email,
            password: password,
            phone: phone,
            image: image,
            role: role,
          },
        ])
        .select();
    };
    register();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter Password</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={securePasswordEntry}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          onPress={togglePasswordVisibility}
          style={styles.icon}>
          <Image
            source={securePasswordEntry ? showIcon : hideIcon}
            style={styles.iconImage}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          secureTextEntry={secureConfirmEntry}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <TouchableOpacity onPress={toggleConfirmVisibility} style={styles.icon}>
          <Image
            source={secureConfirmEntry ? showIcon : hideIcon}
            style={styles.iconImage}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[
          styles.button,
          isPasswordSame ? styles.buttonValid : styles.buttonNotValid,
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
    backgroundColor: 'white',
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  icon: {
    padding: 10,
  },
  iconImage: {
    width: 24,
    height: 24,
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
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Password;
