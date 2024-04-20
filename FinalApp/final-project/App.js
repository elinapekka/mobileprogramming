import { ThemeProvider } from '@rneui/themed';
import theme from './styling/theme';
import NavigationBar from './components/NavigationBar';
import { createShoppingListDB } from './databases/shoppinglistDB';
import { createSavedRecipesDB, dropSavedRecipesDB } from './databases/savedRecipesDB';
import { useEffect } from 'react';

export default function App() {

  useEffect(() => {
    createShoppingListDB();
    //dropSavedRecipesDB();
    createSavedRecipesDB();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <NavigationBar />
    </ThemeProvider>
  );
}