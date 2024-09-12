import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Image } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { useDispatch } from 'react-redux';
import { updateEmail, updateImage, updateName } from '../redux/slices/userInfoSlice';

type Props = NativeStackScreenProps<RootStackParamList, 'Info'>;

const IMAGE = 'https://www.frontierfireprotection.com/wp-content/uploads/freshizer/730cbf2e2455c64c961be8e18e793f6b_3-Things-a-Fire-Needs-2000-c-90.jpg';

const Info: React.FC<Props> = ({ navigation }) => {
  const [name, setName] = useState('Yurii');
  const [email, setEmail] = useState('yuriydmytrukr@gmail.com');
  const [profileImage, setProfileImage] = useState(IMAGE);
  const [nameValid, setNameValid] = useState(true);
  const [emailValid, setEmailValid] = useState(true);

  const dispatch = useDispatch();

  const handleNameChange = (text: string) => {
    setName(text);
    setNameValid(text.trim().length > 0);
  };

  const handleEmailChange = (text: string) => {
    setEmail(text);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailValid(emailRegex.test(text));
  };

  const handleImageChange = (text: string) => {
    setProfileImage(text);
  };

  const handlePress = () => {
    if(nameValid && emailValid){
      dispatch(updateEmail(email));
      dispatch(updateName(name));
      dispatch(updateImage(profileImage));
      navigation.navigate('Password');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Info</Text>

      <TextInput
        style={[styles.input, !nameValid && styles.invalidInput]}
        placeholder="Name"
        value={name}
        onChangeText={handleNameChange}
        autoCapitalize="none"  // Prevents automatic capitalization
      />
      <TextInput
        style={[styles.input, !emailValid && styles.invalidInput]}
        placeholder="Email"
        value={email}
        onChangeText={handleEmailChange}
        keyboardType="email-address"
        autoCapitalize="none"  // Prevents automatic capitalization
      />
      <TextInput
        style={styles.input}
        placeholder="Profile Image URL"
        value={profileImage}
        onChangeText={handleImageChange}
        autoCapitalize="none"  // Prevents automatic capitalization
      />

      {profileImage ? (
        <Image
          source={{ uri: profileImage }}
          style={styles.image}
          resizeMode="cover"
        />
      ) : (
        <View style={styles.imagePlaceholder}>
          <Text style={styles.imagePlaceholderText}>Profile Image</Text>
        </View>
      )}

      <TouchableOpacity style={[
          styles.button,
          nameValid && emailValid ? styles.buttonValid : styles.buttonNotValid,
        ]} onPress={handlePress}>
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
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  invalidInput: {
    borderColor: '#961212',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginTop: 20,
  },
  imagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 10,
    backgroundColor: '#cccccc',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  imagePlaceholderText: {
    color: 'white',
    fontSize: 14,
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

export default Info;
