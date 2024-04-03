import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import RecipeSearchScreen from '../screens/RecipeSearchScreen';
import ShoppingListScreen from '../screens/ShoppingListScreen';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function NavigationBar() {

    const Tab = createBottomTabNavigator();


    const screenOptions = ({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
      
          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Recipes') {
            iconName = 'nutrition'; //restaurant, pizza, nutrition, ice-cream, fish
          } else if (route.name === 'Shopping List') {
            iconName = 'storefront'; //storefront or bag-handle
          }
      
          return <Ionicons name={iconName} size={size} color={color} />;
        }
      });

    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={screenOptions}
            >
                <Tab.Screen name="Home" component={HomeScreen} />
                <Tab.Screen name="Recipes" component={RecipeSearchScreen} />
                <Tab.Screen name="Shopping List" component={ShoppingListScreen} />
            </Tab.Navigator>
        </NavigationContainer>

    );  
}