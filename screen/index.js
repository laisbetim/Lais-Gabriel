import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import MapaLaisGabriel from "./mapa";
import HomeLaisGabriel from "./HomeScreen";


const Stack = createMaterialBottomTabNavigator();

export default function RootNavigation() {
    return (
      <NavigationContainer>
        <Stack.Navigator
        barStyle={{ backgroundColor: '#00ad76' }}
        >
          <Stack.Screen name="MapaLaisGabriel" component={MapaLaisGabriel} />
          <Stack.Screen name="HomeLaisGabriel" component={HomeLaisGabriel}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
}