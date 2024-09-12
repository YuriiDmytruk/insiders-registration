import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '@env';

const showIcon = require('../assets/show.png');
const hideIcon = require('../assets/hide.png');
const deleteIcon = require('../assets/delete.png');

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

type UserProps = {
  user: {
    id: string;
    image: string;
    name: string;
    email: string;
    phone: string;
    password: string;
    role: string;
  }
};

const User: React.FC<UserProps> = ({ user }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleDelete = async () => {
    const { error } = await supabase.from('users').delete().eq('email', user.email);
    if (error) {
      console.error('Error deleting user:', error);
    } else {
      // Handle successful deletion, e.g., update state or notify user
    }
  };

  const handleMakeAdmin = async () => {
    const { error } = await supabase.from('users').update({ role: 'admin' }).eq('email', user.email);
    if (error) {
      console.error('Error making user admin:', error);
    } else {
      // Handle successful role update
    }
  };

  const handleDropAdmin = async () => {
    const { error } = await supabase.from('users').update({ role: 'user' }).eq('email', user.email);
    if (error) {
      console.error('Error dropping user from admin:', error);
    } else {
      // Handle successful role update
    }
  };

  return (
    <View style={styles.userContainer}>
      <Image source={{ uri: user.image }} style={styles.userImage} />
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{user.name}</Text>
        <Text style={styles.userEmail}>Email: {user.email}</Text>
        <Text style={styles.userPhone}>Phone: {user.phone}</Text>
        <Text style={styles.userPassword}>
          Password: {showPassword ? user.password : '*'.repeat(user.password.length)}
        </Text>
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Image source={showPassword ? showIcon : hideIcon} style={styles.icon} />
        </TouchableOpacity>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity onPress={handleDelete}>
          <Image source={deleteIcon} style={styles.icon} />
        </TouchableOpacity>
        {user.role === 'admin' && (
          <TouchableOpacity onPress={handleDropAdmin}>
            <Text style={styles.buttonText}>Drop Admin</Text>
          </TouchableOpacity>
        )}
        {user.role === 'user' && (
          <TouchableOpacity onPress={handleMakeAdmin}>
            <Text style={styles.buttonText}>Make Admin</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginBottom: 10,
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontWeight: 'bold',
  },
  userEmail: {
    color: '#666',
  },
  userPhone: {
    color: '#666',
  },
  userPassword: {
    color: '#666',
    marginVertical: 5,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
    marginLeft: 10,
  },
  buttonText: {
    color: '#2196F3',
    marginLeft: 10,
  },
});

export default User;
