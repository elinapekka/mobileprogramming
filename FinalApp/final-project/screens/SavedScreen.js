import { View, Text } from 'react-native';
import SavedRecipes from '../components/Saved/SavedRecipes';

export default function SavedScreen({navigation}) {
    return (
        <View>
            <SavedRecipes navigation={navigation}/>
        </View>
    );
};