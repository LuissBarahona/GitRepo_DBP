import { StyleSheet, Text, View } from 'react-native';

const HomeScreen = ()=> {
  return (
    <View style={styles.container}>
      <Text>Home screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;
