import { StyleSheet, View, ActivityIndicator } from 'react-native';
import HomePage from './src/pages/HomePage';
import AddFoodPage from './src/pages/AddFoodPage';
import FoodDetailPage from './src/pages/FoodDetailPage';
import { useFonts, Montserrat_400Regular, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FoodProvider } from './src/context/FoodContext';

const Stack = createNativeStackNavigator();

export default function App() {
  let [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_700Bold,
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#3091c1" />
      </View>
    );
  }

  return (
    <FoodProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomePage} />
          <Stack.Screen name="AddFood" component={AddFoodPage} />
          <Stack.Screen name="FoodDetail" component={FoodDetailPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </FoodProvider>
  );
}

const styles = StyleSheet.create({

});
