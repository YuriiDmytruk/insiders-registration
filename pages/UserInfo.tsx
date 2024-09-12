import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { setDefault } from '../redux/slices/userInfoSlice';

const showIcon = require('../assets/show.png');
const hideIcon = require('../assets/hide.png');

type Props = NativeStackScreenProps<RootStackParamList, 'UserInfo'>;

const UserInfo: React.FC<Props> = ({ navigation }) => {
  const { name, phone, email, image, password, role } = useSelector((state: RootState) => state.userInfo);
  const [showPassword, setShowPassword] = useState(false);

  console.log(role);

  const generatePassword = () => {
    return showPassword ? password : '*'.repeat(password.length);
  };

  const dispatch = useDispatch();

  const handlePress = () => {
    dispatch(setDefault());
    navigation.navigate('Welcome');
  };

  const handleUsersListPress = () => {
    navigation.navigate('UsersList');
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Congratulations, your account is successfully created!</Text>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Text style={styles.imageText}>No Image</Text>
          </View>
        )}

        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>Name: {name}</Text>
          <Text style={styles.infoText}>Phone: {phone}</Text>
          <Text style={styles.infoText}>Email: {email}</Text>
        </View>

        <View style={styles.passwordContainer}>
          <Text style={styles.infoText}>Password: {generatePassword()}</Text>
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image source={showPassword ? showIcon : hideIcon} style={styles.icon} />
          </TouchableOpacity>
        </View>

        {role === 'admin' && (
          <TouchableOpacity style={styles.adminButton} onPress={handleUsersListPress}>
            <Text style={styles.buttonText}>Users List</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity style={styles.button} onPress={handlePress}>
          <Text style={styles.buttonText}>Log Out</Text>
        </TouchableOpacity>
      </View>
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
  content: {
    alignItems: 'center',
    width: '90%',
    maxWidth: 400,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  imagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  imageText: {
    color: '#888',
  },
  infoContainer: {
    marginBottom: 20,
  },
  infoText: {
    fontSize: 16,
    marginVertical: 5,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  icon: {
    width: 24,
    height: 24,
    marginLeft: 10,
  },
  button: {
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 40,
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  adminButton: {
    backgroundColor: '#2196F3',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 40,
    alignSelf: 'center',
    marginBottom: 20,
  },
});

export default UserInfo;
