import { useState, useEffect } from 'react';
import { View, ScrollView, Text, ActivityIndicator, Image,FlatList } from 'react-native';

export default function IngredientsList({recipeInfo}) {
    const ingredients = []; // i tried using useState, for some reason, didn't work the way it was supposed to 

    const getIngredientsAndMeasurements = () => {
        // each recipe has only 20 slots for ingredients/measurement
        for (let i = 1; i <= 20; i++) {
            const ingredient = recipeInfo[`strIngredient${i}`];
            if (ingredient && ingredient.length > 0) {
                ingredients.push({
                    ingredient: ingredient,
                    measurement: recipeInfo[`strMeasure${i}`]
                });
            } else {
                    break;
            }
        }

        console.log('Ingredients:', ingredients);
    }

    useEffect(() => {
        getIngredientsAndMeasurements();
    }, [recipeInfo]);

    return ( 
        <View>
            <Text>ingredients</Text>
    
        </View>
    )


}