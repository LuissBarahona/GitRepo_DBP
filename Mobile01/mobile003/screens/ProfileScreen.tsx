import { StyleSheet, Text, View } from 'react-native';

const ProfileScreen = ()=> {
  return (
    <View style={styles.container}>
      <Text>Profile screen</Text>
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

export default ProfileScreen;
