import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import {RootStackParamList} from '../types';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {createClient} from '@supabase/supabase-js';
import {useDispatch} from 'react-redux';
import {setUserInfo} from '../redux/slices/userInfoSlice';

import { SUPABASE_URL, SUPABASE_ANON_KEY } from '@env';


const showIcon = require('../assets/show.png');
const hideIcon = require('../assets/hide.png');

type Props = NativeStackScreenProps<RootStackParamList, 'LogIn'>;

const LogIn: React.FC<Props> = ({navigation}) => {
  const [email, setEmail] = useState('yuriydmytrukr@gmail.com');
  const [password, setPassword] = useState('1234');
  const [showPassword, setShowPassword] = useState(false);

  const [isValid, setIsValid] = useState(false);

  const dispatch = useDispatch();

  const supabase = createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY,
  );

  useEffect(() => {
    setIsValid(email !== '' && password !== '');
  }, [email, password]);

  const handleLogin = () => {
    const fetchUserByEmail = async () => {
      const {data: users} = await supabase
        .from('users')
        .select('*')
        .eq('email', email);
      if (users && users.length > 0) {
        const user = users[0];
        if (user.password === password) {
          dispatch(
            setUserInfo({
              name: user.name,
              email: user.email,
              password: user.password,
              image: user.image,
              phone: user.phone,
              role: user.role,
            }),
          );
          navigation.navigate('UserInfo');
        } else {
          console.log('Wrong Password');
        }
      } else {
        console.log('No user found with the provided email.');
      }
    };
    if (isValid) {
      fetchUserByEmail();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log In</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          autoCapitalize="none"
        />
        <TouchableOpacity
          style={styles.toggleButton}
          onPress={() => setShowPassword(prevState => !prevState)}>
          <Image
            source={showPassword ? hideIcon : showIcon}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[
          styles.button,
          isValid ? styles.buttonValid : styles.buttonNotValid,
        ]}
        onPress={handleLogin}>
        <Text style={styles.buttonText}>Log In</Text>
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  passwordInput: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  toggleButton: {
    padding: 10,
  },
  icon: {
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

export default LogIn;
