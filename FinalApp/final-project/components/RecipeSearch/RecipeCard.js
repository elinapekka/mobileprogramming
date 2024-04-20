import { Card, Button } from '@rneui/themed';
import { View, ScrollView, Text, ActivityIndicator, Image, FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import { CardTitle } from '@rneui/base/dist/Card/Card.Title';
import { fetchRepositories, searchByCategory } from './RecipeApiLinks';



export default function RecipeCard({ recipe, openRecipe }) {
    return (
        <Card>
            <Card.Title>{recipe.foodTitle}</Card.Title>
            <Image
                style={{ width: "100%", height: 100 }}
                resizeMode="contain"
                source={{ uri: recipe.strMealThumb }}
            />
            <Text >{recipe.strMeal}</Text>
            <Button title="Check now" onPress={openRecipe(recipe.idMeal)} />
            <Card.Divider />
        </Card>
    )
}