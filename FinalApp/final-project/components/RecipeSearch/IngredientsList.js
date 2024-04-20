import { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { ListItem, Button } from '@rneui/themed';
import { saveShoppingListItem } from '../../databases/shoppinglistDB';

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

    const addToShoppingList = (ingredient, measurement) => {
        saveShoppingListItem({item: ingredient, amount: measurement, checked: false, price: 0});
    }

    const addAllToShoppingList = () => {
        ingredients.forEach( item => {
            saveShoppingListItem({item: item.ingredient, amount: item.measurement, checked: false, price: 0})
        })
    }

    useEffect(() => {
        getIngredientsAndMeasurements();
    }, [recipeInfo]);

    return ( 
        <View>
            <Text>ingredients</Text>
            <Button title="Add ALL to shopping list" onPress={() => addAllToShoppingList()} />
            {
                ingredients.map((l, i) => (
                    <ListItem key={i} bottomDivider>
                        <ListItem.Content>
                            <View>
                                <ListItem.Title>{l.measurement} {l.ingredient}</ListItem.Title>
                                <Button title="Add to shopping list" onPress={() => addToShoppingList(l.ingredient, l.measurement)} />
                            </View>
                        </ListItem.Content>
                    </ListItem>
                ))
            }
        </View>
    )
}