import { useState, useEffect } from 'react';
import { ScrollView, View } from "react-native";
import { ListItem, Button } from "@rneui/base";
import { getRecipeById, fetchRepositories } from "../RecipeSearch/RecipeApiLinks";
import { deleteSavedRecipe } from '../../databases/savedRecipesDB';
import RecipeCard from '../RecipeSearch/RecipeCard';



export default function SavedRecipeItem({itemId, openRecipe, update}) {
    const [recipeInfo, setRecipeInfo] = useState('');

    const deleteItem = (id) => {
        deleteSavedRecipe(id);
        update();
    }

    const fetchData = async () => {
        try {
            const data = await fetchRepositories(getRecipeById(itemId));
            setRecipeInfo(data.meals[0]);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (itemId) {
            fetchData();
            console.log(itemId)
        }
    }, [])

    return (
        /*
        <ListItem.Swipeable     
            rightContent={(reset) => (
                <Button
                    title="Delete"
                    onPress={() => {
                        deleteItem(itemId)
                        reset();
                    }}
                    icon={{ name: 'delete', color: 'white' }}
                    buttonStyle={{
                        minHeight: '100%', width: '100%', backgroundColor: 'red'
                    }}
                />
            )}
            
            bottomDivider
        >
            <ListItem.Content>
                    <ListItem.Title>
                        {recipeInfo.strMeal}
                        <Button title="lol" onPress={openRecipe(itemId)} />
                    </ListItem.Title>
            </ListItem.Content>

        </ListItem.Swipeable>
        */

        <RecipeCard recipe={recipeInfo} openRecipe={openRecipe} />
    )
}