import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('shoppinglist.db');

const updateShoppingList = (setShoppingList) => {
    db.transaction(tx => {
        tx.executeSql('SELECT * FROM shoppinglist;', [], (_, { rows }) =>
            setShoppingList(rows._array)
        );
    }, console.log('Error while updating'), null);
}

const saveShoppingListItem = ({item, amount, checked, price}) => {
    db.transaction(tx => {
        tx.executeSql('INSERT INTO shoppinglist (item, amount, checked, price) values (?, ?, ?, ?);',
        [item, amount, checked, parseFloat(price)]);
    }, console.log('Error while saving'), console.log('Successfully saved')
)
}

const deleteShoppingListItem = (id) => {
    db.transaction(tx => {
            tx.executeSql('DELETE FROM shoppinglist WHERE id = ?', 
            [parseInt(id)]);
        }, console.log("Error while deleting"), null
    )
}

const editShoppingListItem = (id, item, amount, checked, price) => {
    db.transaction(
        tx => {
            tx.executeSql('UPDATE shoppinglist SET ' 
                + 'item = ?, '
                + 'amount = ?, '
                + 'checked = ?, '
                + 'price = ? '
                + 'WHERE id = ?'
                + ';',
            [item, amount, checked, parseFloat(price.toFixed(2)), parseInt(id)]);
        }, (error) => console.error("Error when editing shopping list", error), null
    )
}

const createShoppingListDB = () => {
    db.transaction(tx => {
        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS shoppinglist (' +
            'id INTEGER PRIMARY KEY NOT NULL, ' +
            'item TEXT NOT NULL, ' +
            'amount TEXT, ' +
            'checked BOOLEAN NOT NULL, ' +
            'price NUMERIC);'
        );
    }, (error) => console.error("Error when creating shopping list DB", error), null);

    //saveShoppingListItem('example', '100g', false, 10.30)
};

export { createShoppingListDB, saveShoppingListItem, updateShoppingList, deleteShoppingListItem, editShoppingListItem };