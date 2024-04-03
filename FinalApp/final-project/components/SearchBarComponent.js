import { useState } from 'react';
import { SearchBar } from '@rneui/themed';
import { View } from 'react-native';

export default function SearchBarComponent() {

  const [search, setSearch] = useState('');

  const updateSearch = (search) => {
    setSearch(search);
  };

  return (
    <View>
      <SearchBar
        placeholder="Type Here..."
        onChangeText={updateSearch}
        value={search}
      />
    </View>
  );
}
