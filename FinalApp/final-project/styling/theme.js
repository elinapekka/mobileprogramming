import { createTheme } from '@rneui/themed';
import colors from './colors';

const theme = createTheme({
    components: {

      ListItem: {
        Swipeable: {
          
        },
        variants: {
          biggerRecipeSearch: {
            containerStyle: {
              backgroundColor: colors.backgroundColor,
            },
          }
        },
      },

      SearchBar: { // https://reactnativeelements.com/docs/components/searchbar
        containerStyle: {
          backgroundColor: colors.secondary,
          margin: 0,
        },
        inputContainerStyle: {
          backgroundColor: colors.primary,
          margin: 0,
        },
        inputStyle: {
          color: colors.textColor,
        },
        placeholderTextColor: colors.textColor,
        rightIconContainerStyle: {
          color: colors.iconColor,
        },
        searchIcon: {
          color: colors.iconColor,
        },
        clearIcon: {
          color: colors.iconColor,
        },
      },
    },
});

export default theme;