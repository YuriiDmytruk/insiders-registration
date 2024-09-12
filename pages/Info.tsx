import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Info = () => {
  return (
    <View style={styles.container}>
      <Text>Info</Text>
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

export default Info;
