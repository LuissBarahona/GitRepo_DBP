import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';


export default function App() {
  return (
    <NavigationContainer>
      
    <View style={styles.container}>
      <Text>Hola mundo</Text>
      <Button icon="camera" mode="contained" onPress={() => console.log('Button pressed')}>
        Press me
      </Button>
      <StatusBar style="auto" />
    </View>

    </NavigationContainer>
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
