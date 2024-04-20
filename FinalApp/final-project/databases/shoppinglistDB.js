import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('shoppinglist.db');

const updateShoppingList = (setShoppingList) => {
    db.transaction(tx => {
        tx.executeSql('SELECT * FROM shoppinglist;', [], (_, { rows }) => setShoppingList(rows._array)
        );
    }, null, null);
}

const saveShoppingListItem = ({item, amount, checked, price}) => {
    db.transaction(tx => {
        tx.executeSql('INSERT INTO shoppinglist (item, amount, checked, price) values (?, ?, ?, ?);',
        [item, amount, checked, parseFloat(price)]);
    }, null, null);
}

const deleteShoppingListItem = (id) => {
    db.transaction(tx => {
            tx.executeSql('DELETE FROM shoppinglist WHERE id = ?', 
            [parseInt(id)]);
        }, null, null
    );
}

const deleteAllShoppingListItems = () => {
    db.transaction(tx => {
            tx.executeSql('DELETE FROM shoppinglist');
        }, null, null
    )
}

const editShoppingListItem = ({id, item, amount, checked, price}) => {
    db.transaction(
        tx => {
            tx.executeSql('UPDATE shoppinglist SET ' 
                + 'item = ?, '
                + 'amount = ?, '
                + 'checked = ?, '
                + 'price = ? '
                + 'WHERE id = ?'
                + ';',
            [item, amount, checked, parseFloat(price), parseInt(id)]);
        }, null, null
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
    }, null, null);
};

export { 
    createShoppingListDB, 
    saveShoppingListItem, 
    updateShoppingList, 
    deleteShoppingListItem, 
    deleteAllShoppingListItems, 
    editShoppingListItem 
};