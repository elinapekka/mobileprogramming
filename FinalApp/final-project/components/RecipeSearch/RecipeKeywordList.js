import { Card, Button } from '@rneui/themed';
import { View, ScrollView } from 'react-native';
import SearchResults from './SearchResults';
import { useState } from 'react';

const keywordList = ['Pasta', 'Salad', 'Bread', 'Seafood'];

function RecipeKeywordList() {
    const [openOverlay, setOpenOverlay] = useState(false);
    const [selectedKeyword, setSelectedKeyword] = useState('');

    const searchKeyword = (keyword) => {
        return () => {
            setSelectedKeyword(keyword);
            setOpenOverlay(true);
        };
    }

    return (
        <ScrollView>
            <SearchResults keyword={selectedKeyword} openOverlay={openOverlay} setOpenOverlay={setOpenOverlay}/>
            <View>
                {
                    keywordList.map((l, i) => (
                        <Card key={i}>
                            <Button title={l} onPress={searchKeyword(l)}/>
                        </Card>
                    ))
                }
            </View>
        </ScrollView>
    )
};

export {RecipeKeywordList, keywordList};