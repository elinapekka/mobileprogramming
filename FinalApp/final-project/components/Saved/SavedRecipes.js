import { ScrollView, View } from "react-native";
import { Button } from "@rneui/base";
import { useState, useCallback } from 'react';
import { updateSavedRecipes } from "../../databases/savedRecipesDB";
import SavedRecipeItem from "./SavedRecipeItem";
import { useFocusEffect } from '@react-navigation/native';

export default function SavedRecipes({navigation}) {

    const [savedRecipesList, setSavedRecipesList] = useState([]);

    const update = () => {
        updateSavedRecipes(setSavedRecipesList);
        console.log(savedRecipesList)
    }

    const refreshDataArray = useCallback(() => {
        update();
    }, []);

    const openRecipe = (id) => {
        return () => {
            navigation.navigate('SavedRecipeSelected', {idMeal: id});
        };
    }

    const refresh = () => {
        update();
    }

    useFocusEffect(refreshDataArray);

    /*
    useEffect(() => {
        refreshDataArray();
    }, [])

    
    useEffect(() => {
        console.log(savedRecipesList);
    }, [savedRecipesList]);
    */
    
    return (
        <ScrollView>
            <Button title="refresh" onPress={refresh} />
            <View>
                { 
                    savedRecipesList.map((recipe, i) => (
                        <View key={recipe.id}>
                            
                            <SavedRecipeItem itemId={recipe.id} openRecipe={openRecipe} update={update} />
                        </View>
                    ))
                }
            </View>

        </ScrollView>
    )
}