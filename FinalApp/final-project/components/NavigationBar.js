import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import {RecipeSearchScreenKeywords, RecipeSearchResultsScreen, SelectedRecipeScreen} from '../screens/RecipeSearchScreen';
import ShoppingListScreen from '../screens/ShoppingListScreen';
import Ionicons from '@expo/vector-icons/Ionicons';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function RecipeStack() {
  return (
    <Stack.Navigator>
        <Stack.Screen name="RecipeKeywords" options={{ headerShown: false }} component={RecipeSearchScreenKeywords} />
        <Stack.Screen name="SearchResult" options={{ headerShown: false }} component={RecipeSearchResultsScreen} />
        <Stack.Screen name="SelectedRecipe" options={{ headerShown: false }} component={SelectedRecipeScreen} />
    </Stack.Navigator>
  );
}

export default function NavigationBar() {

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
                <Tab.Screen name="Recipes" component={RecipeStack} />
                <Tab.Screen name="Shopping List" component={ShoppingListScreen} />
            </Tab.Navigator>
        </NavigationContainer>

    );  
}