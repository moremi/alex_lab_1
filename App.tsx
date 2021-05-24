import React, {createContext, useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import RecipesList from './RecipesList';
import RecipesCreate from './RecipesCreate';
import RecipesHelp from './RecipesHelp';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

export const AppContext = createContext({
  recipes: [],
  setRecipes: (obj: any) => {},
});

const App = () => {
  // const nav = useNavigation();
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const get = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('@recipes');
        return jsonValue != null ? JSON.parse(jsonValue) : null;
      } catch (e) {
        // error reading value
      }
      return null;
    };
    console.log('load');
    get().then(data => {
      if (data) {
        setRecipes(data);
      } else {
        setRecipes([
          {
            name: 'Яичница',
            group: '1',
            description:
              'Яйца - 3 шт.\n' + 'Масло сливочное - 25 г\n' + 'Соль - щепотка',
            date: new Date(Date.now() - 10).toISOString(),
          },
          {
            name: 'Борщ',
            group: '2',
            description:
              'Мясо (любое) - 500 г\nКартофель - 3-4 шт.\nСвекла - 1-2 шт.\nКапуста - 200-300 г\nМорковь - 2 шт.\nПомидор - 1 шт.\nЛук репчатый - 1 шт.\nЧеснок - 1-2 зуб.,\n',
            date: new Date(Date.now() - 5),
          },
        ]);
      }
    });
  }, []);

  const contextValue = {
    recipes,
    setRecipes: (newObj: any) => {
      AsyncStorage.setItem('@recipes', JSON.stringify(newObj));
      setRecipes(newObj);
    },
  };
  return (
    <AppContext.Provider value={contextValue}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="list" component={RecipesList} />
          <Stack.Screen name={'create'} component={RecipesCreate} />
          <Stack.Screen name={'help'} component={RecipesHelp} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppContext.Provider>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
