import { View, ScrollView } from 'react-native';
import { Text, Card, ListItem } from '@rneui/themed';
import SearchBarComponent from '../components/SearchBarComponent';
import { RecipeKeywordList } from '../components/RecipeSearch/RecipeKeywordList';

export default function ReacipeSearchScreen() {
    return (
        <View>
            <SearchBarComponent />
            <RecipeKeywordList />
        </View>
    );
};