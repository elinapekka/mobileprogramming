import { useState, useEffect } from 'react';
import { ListItem, Button, CheckBox } from '@rneui/themed';
import { View, ScrollView, Text } from 'react-native';
import { updateShoppingList, deleteShoppingListItem, editShoppingListItem } from '../../databases/shoppinglistDB';
import AddShoppingListItem from './AddShoppingListItem';


export default function ShoppingList() {

    const [shoppingList, setShoppingList] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [checkedItemsAmount, setCheckedItemsAmount] = useState(0);

    useEffect(() => {
        updateShoppingList(setShoppingList);
    }, []);

    useEffect(() => {
        getAmountOfCheckedItems();
        getTotalPrice();
    }, [shoppingList]);

    const update = () => {
        updateShoppingList(setShoppingList);
    }

    const deleteItem = (id) => {
        deleteShoppingListItem(id);
        update();
    }

    const toggleCheckbox = (l) => {
        return () => {
            editShoppingListItem(l.id, l.item, l.amount, l.checked === 1 ? false : true, l.price);
            update();
        };
    };

    const getTotalPrice = () => {
        let sum = 0;
        shoppingList.forEach((l) => sum += l.price);
        setTotalPrice(sum.toFixed(2));
    }

    const getAmountOfCheckedItems = () => {
        let checkedItem = 0;
        shoppingList.forEach((l) => l.checked === 1 ? checkedItem++ : null );
        setCheckedItemsAmount(checkedItem);    }

    return ( 
        <ScrollView>
            <Button 
                title="Refresh"
                onPress={update}
            />
            <AddShoppingListItem updateShoppingList={update} />
            <View>
                <Text>Checked items: {checkedItemsAmount} / {shoppingList.length}</Text>
                <Text>Total price: {totalPrice} €</Text>
            </View>
            <View>
                {
                    shoppingList.map((l, i) => (
                        <ListItem.Swipeable 
                            /*
                            leftContent={(reset) => (
                                <Button
                                    title="Info"
                                    onPress={() => reset()}
                                    icon={{ name: 'info', color: 'white' }}
                                    buttonStyle={{ minHeight: '100%' }}
                                />
                            )}
                            */
                            rightContent={(reset) => (
                                <Button
                                    title=""
                                    onPress={() => {
                                        deleteItem(l.id)
                                        reset();
                                    }}
                                    icon={{ name: 'delete', color: 'white' }}
                                    buttonStyle={{ 
                                        minHeight: '100%', width: '100%', backgroundColor: 'red' 
                                    }}
                                />
                            )}
                            key={i} 
                            bottomDivider
                        >
                            <ListItem.Content>
                                <View style={{flexDirection: 'row', width: '100%', alignItems: 'center'}}>
                                    <CheckBox
                                        checked={l.checked === 1 ? true : false}
                                        onPress={toggleCheckbox(l)}
                                        iconType="material-community"
                                        checkedIcon="checkbox-outline"
                                        uncheckedIcon={'checkbox-blank-outline'}
                                    />
                                    <View style={{marginRight: 'auto'}}>
                                        <ListItem.Title>{l.item} {l.amount} </ListItem.Title>
                                        <ListItem.Subtitle>{l.price.toFixed(2)}€</ListItem.Subtitle>
                                    </View>
                                    
                                </View>
                            </ListItem.Content>
                        </ListItem.Swipeable>
                    ))
                }
            </View>
        </ScrollView>
    
    )
};