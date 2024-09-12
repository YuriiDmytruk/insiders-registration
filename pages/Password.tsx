import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Password = () => {
  return (
    <View style={styles.container}>
      <Text>Password</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      width: '100%',
      height: '100%',
      backgroundColor: 'red',
    },
  });

export default Password;
