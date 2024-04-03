import { useState, useEffect } from 'react';
import { View, ScrollView, Text, ActivityIndicator, Image,FlatList } from 'react-native';
import { fetchRepositories, getRecipeById } from './RecipeApiLinks';
import IngredientsList from './IngredientsList';


export default function IndividualRecipe({idMeal}) {
    const [recipeInfo, setRecipeInfo] = useState('');

    const fetchData = async () => {
        try {
            const data = await fetchRepositories(getRecipeById(idMeal));
            setRecipeInfo(data.meals[0]);
            console.log(recipeInfo);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [])

    return(
        <View>
            <IngredientsList recipeInfo={recipeInfo} />
            <Text>Individual recipe {idMeal}</Text>
        </View>
    )
}