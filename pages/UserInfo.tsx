import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const UserInfo = () => {
  return (
    <View style={styles.container}>
      <Text>UserInfo</Text>
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

export default UserInfo;
