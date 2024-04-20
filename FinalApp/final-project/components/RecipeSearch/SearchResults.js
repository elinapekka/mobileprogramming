import { Card, Button } from '@rneui/themed';
import { View, ScrollView, Text, ActivityIndicator, Image, FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import { CardTitle } from '@rneui/base/dist/Card/Card.Title';
import { fetchRepositories, searchByCategory } from './RecipeApiLinks';
import RecipeCard from './RecipeCard';

export default function SearchResult({keyword, navigation}) {
    const [meals, setMeals] = useState([]);

    const fetchData = async () => {
        try {
            const data = await fetchRepositories(searchByCategory(keyword));
            setMeals(data.meals);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const openRecipe = (idMeal) => {
        return () => {
            console.log(idMeal)
            navigation.navigate('SelectedRecipe', {idMeal: idMeal});
        };
    }

    if (!meals) {
        return(
            <View>
                <Text>No search results found</Text>
            </View>
        )
    } else {
        return (
            <ScrollView>
                <Button onPress={() => navigation.goBack()} title="Go back" />
                <View>
                    {
                        meals.map((l, i) => (
                            <View key={i}>
                                <RecipeCard recipe={l} openRecipe={openRecipe} />
                            </View>
                        ))
                    }
                </View>
            </ScrollView>
        );
    }
};