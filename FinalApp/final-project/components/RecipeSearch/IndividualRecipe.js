import { useState, useEffect } from 'react';
import { View, ScrollView, Text, ActivityIndicator } from 'react-native';
import { fetchRepositories, getRecipeById } from './RecipeApiLinks';
import IngredientsList from './IngredientsList';
import StepsList from './StepsList';
import { Button, Image } from '@rneui/base';


export default function IndividualRecipe({idMeal, navigation}) {
    const [recipeInfo, setRecipeInfo] = useState('');

    const fetchData = async () => {
        try {
            const data = await fetchRepositories(getRecipeById(idMeal));
            setRecipeInfo(data.meals[0]);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
        console.log(recipeInfo)
    }, [])

    /*
            <Image
                source={recipeInfo.strMealThumb}
                containerStyle={{width: 100, height: 100}}
                PlaceholderContent={<ActivityIndicator />}
            />
    */

    return(
        <ScrollView>
            <Button onPress={() => navigation.goBack()} title="Go back" />
            <Text>{recipeInfo.strMeal}</Text>
            <IngredientsList recipeInfo={recipeInfo} />
            <StepsList instructionsString={recipeInfo.strInstructions}/>
        </ScrollView>
    )
}