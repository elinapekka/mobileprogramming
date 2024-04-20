import { useState, useEffect } from 'react';
import { View, ScrollView, Text, ActivityIndicator, Image } from 'react-native';
import { fetchRepositories, getRecipeById } from './RecipeApiLinks';
import IngredientsList from './IngredientsList';
import StepsList from './StepsList';
import { Button } from '@rneui/base';
import SaveExistingRecipe from '../Saved/SaveExistingRecipe';


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

    return(
        <ScrollView>
            <Button onPress={() => navigation.goBack()} title="Go back" />
            <Text>{recipeInfo.strMeal}</Text>
            <Image
                style={{width:"100%",height:300}}
                resizeMode="contain"
                source={{ uri: recipeInfo.strMealThumb }}
            />
            <SaveExistingRecipe id={recipeInfo.idMeal} />
            <IngredientsList recipeInfo={recipeInfo} />
            <StepsList instructionsString={recipeInfo.strInstructions}/>
        </ScrollView>
    )
}