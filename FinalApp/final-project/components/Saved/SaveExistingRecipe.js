import { Button, CheckBox, Icon } from "@rneui/base";
import { saveRecipe, savedRecipeExists, deleteSavedRecipe } from "../../databases/savedRecipesDB";
import { useEffect, useState } from "react";
import { useFocusEffect } from '@react-navigation/native';


export default function SaveExistingRecipe({ id }) {
    const [alreadySaved, setAlreadySaved] = useState(false);

    const checkSave = () => {
        savedRecipeExists(id, rowsAffected => {
            console.log('Rows affected:', rowsAffected);
            if (rowsAffected === 0) {
                setAlreadySaved(false);
            } else {
                setAlreadySaved(true);
            }
        });
    }

    const toggleCheckbox = () => {
        if (alreadySaved) {
            deleteSavedRecipe(id);
            console.log('should delete')
            setAlreadySaved(false);
        } else {
            console.log(id);
            saveRecipe(id);
            console.log('should save')
            setAlreadySaved(true);
        }
    };

    useFocusEffect(checkSave);
    
    useEffect(() => {
        checkSave();
    }, [id]);

    return (
        <>
            <CheckBox
                checked={alreadySaved}
                checkedIcon="heart"
                uncheckedIcon="heart-o"
                checkedColor="red"
                onPress={() => toggleCheckbox()}
            />
        </>
    )
}