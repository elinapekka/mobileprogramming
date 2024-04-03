import { Card, Button } from '@rneui/themed';
import { View, ScrollView, Text, ActivityIndicator, Image,FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import { CardTitle } from '@rneui/base/dist/Card/Card.Title';
import { fetchRepositories, searchByCategory } from './RecipeApiLinks';

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
                <View style={{flex: 6, width: '90%'}}>
                    {
                        meals.map((l, i) => (
                            <Card key={i}>
                                <Card.Title>{l.foodTitle}</Card.Title>
                                <Image
                                    style={{width:"100%",height:100}}
                                    resizeMode="contain"
                                    source={{ uri: l.strMealThumb }}
                                />
                                <Text >{l.strMeal}</Text>
                                <Button title="Check now" onPress={openRecipe(l.idMeal)} />
                                <Card.Divider/>
                            </Card>
                        ))
                    }
                </View>
            </ScrollView>
        );
    }
};