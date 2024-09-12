import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Phone = () => {
  return (
    <View style={styles.container}>
      <Text>Phone</Text>
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

export default Phone;
