import { Card, Button, Text } from '@rneui/themed';
import { View, ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import { fetchRepositories, getAllCategories } from './RecipeApiLinks';
import SearchBarComponent from '../SearchBarComponent';

function RecipeKeywordList({navigation}) {
    const [keywordList, setKeywordList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log('yess')
                const data = await fetchRepositories(getAllCategories);
                setKeywordList(data.categories);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    const searchKeyword = (keyword) => {
        return () => {
            console.log(keyword)
            navigation.navigate('SearchResult', {keyword: keyword});
        };
    }

    if(!keywordList) {
        return (
            <View>
                <Text>Lameee</Text>
            </View>
        )
    } else {
        return (
            <ScrollView>
                <SearchBarComponent />
                <View>
                    {
                        keywordList.map((l, i) => (
                            <Card key={i}>
                                <Button title={l.strCategory} onPress={searchKeyword(l.strCategory)} />
                            </Card>
                        ))
                    }
                </View>
            </ScrollView>
        )
    }
};

export {RecipeKeywordList};