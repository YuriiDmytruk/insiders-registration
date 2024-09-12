import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.container}>
        <Text>Hello</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer:{
    width: '100%',
    height: '100%',
  },
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'red',
  },
});

export default App;
