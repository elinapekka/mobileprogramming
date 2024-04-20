import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('savedrecipes.db');

const updateSavedRecipes = (setSavedRecipesList) => {
    db.transaction(tx => {
        tx.executeSql('SELECT * FROM savedrecipes;', [], (_, { rows }) => setSavedRecipesList(rows._array)
        );
    }, null, null);
}

const savedRecipeExists = (id, callback) => {
    db.transaction(tx => {
        tx.executeSql(
            'SELECT COUNT(*) as count FROM savedrecipes WHERE id = ?',
            [id],
            (_, { rows }) => {
                const { count } = rows.item(0);
                callback(count);
            },
            (_, error) => {
                console.error('Error checking ID existence:', error);
                callback(0); // Return 0 rows affected in case of an error
            }
        );
    });
};

const saveRecipe = (id) => {
    savedRecipeExists(id, rowsAffected => {
        console.log('Rows affected:', rowsAffected);
        console.log(id);
        if (rowsAffected === 0 && id ) {
            db.transaction(tx => {
                tx.executeSql('INSERT INTO savedrecipes (id) values (?);',
                    [id]);
            }, null, null);
            return "success";
        } else {
            console.log('something went wrong')
            return "fail";
        }
    });

}

const deleteSavedRecipe = (id) => {
    db.transaction(tx => {
        tx.executeSql('DELETE FROM savedrecipes WHERE id = ?',
            [id]);
    }, null, null);
}

const createSavedRecipesDB = () => {
    db.transaction(tx => {
        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS savedrecipes (' +
            'id TEXT PRIMARY KEY' +
            ');'
        );
    }, null, null);
};

const dropSavedRecipesDB = () => {
    db.transaction(tx => {
        tx.executeSql('DROP TABLE IF EXISTS savedrecipes;')
    }, null, null)
}

export {
    updateSavedRecipes,
    saveRecipe,
    deleteSavedRecipe,
    createSavedRecipesDB,
    savedRecipeExists,
    dropSavedRecipesDB
};