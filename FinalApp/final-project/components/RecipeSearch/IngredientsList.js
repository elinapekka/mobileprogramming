import { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { ListItem } from '@rneui/themed';

export default function IngredientsList({recipeInfo}) {
    const [ingredients, setIngredients] = useState([]);

    const getIngredientsAndMeasurements = () => {
        const tempIngredients = [];

        // each recipe has only 20 slots for ingredients/measurement
        for (let i = 1; i <= 20; i++) {
            const ingredient = recipeInfo[`strIngredient${i}`];
            if (ingredient && ingredient.length > 0) {
                tempIngredients.push({
                    ingredient: ingredient,
                    measurement: recipeInfo[`strMeasure${i}`],
                });
            } else {
                    break;
            }
        }
        setIngredients(tempIngredients);
    }

    useEffect(() => {
        getIngredientsAndMeasurements();
    }, [recipeInfo]);

    return ( 
        <View>
            <Text>ingredients</Text>
            {
                ingredients.map((l, i) => (
                    <ListItem key={i} bottomDivider>
                        <ListItem.Content>
                            <View>
                                <ListItem.Title>{l.measurement} {l.ingredient}</ListItem.Title>
                            </View>
                        </ListItem.Content>
                    </ListItem>
                ))
            }
        </View>
    )
}