import { View } from 'react-native';
import { RecipeKeywordList } from '../components/RecipeSearch/RecipeKeywordList';
import SearchResult from '../components/RecipeSearch/SearchResults';
import IndividualRecipe from '../components/RecipeSearch/IndividualRecipe';

function RecipeSearchScreenKeywords({navigation}) {
    return (
        <View>
            <RecipeKeywordList navigation={navigation}/>
        </View>
    );
}

function RecipeSearchResultsScreen({ route, navigation }) {
    const { keyword } = route.params;
    return (
        <View>
            <SearchResult keyword={keyword} navigation={navigation}/>
        </View>
    );
};

function SelectedRecipeScreen({ route, navigation }) {
    console.log(route)
    const { idMeal } = route.params;
    return (
        <View>
            <IndividualRecipe idMeal={idMeal} navigation={navigation} />
        </View>
    )
}

export {RecipeSearchScreenKeywords, RecipeSearchResultsScreen, SelectedRecipeScreen};