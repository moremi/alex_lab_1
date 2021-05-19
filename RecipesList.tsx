import React, {useContext, useEffect, useLayoutEffect, useState} from 'react';
import {FlatList, View} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {
  Button,
  Card,
  Text,
  CardItem,
  Body,
  Item,
  Input,
  Form,
  Icon,
  Picker,
} from 'native-base';
import {AppContext} from './App';
import {groupOptions} from './RecipesCreate';

type ScreenNavigationProp = StackNavigationProp<{create: undefined}, never>;
type Props = {
  navigation: ScreenNavigationProp;
};

const extendedGroupOptions = [
  {key: 'all', value: 'Все рецепты'},
  ...groupOptions,
];

const RecipesList = ({navigation}: Props) => {
  const {recipes} = useContext(AppContext);

  const [results, setResults] = useState(recipes);

  const [search, setSearch] = useState('');
  const [group, setGroup] = useState('all');

  useEffect(() => {
    if (search.length > 0 || group !== 'all') {
      const filtered = recipes.filter(
        rec =>
          rec.name.toLowerCase().indexOf(search.toLowerCase()) !== -1 &&
          (group === 'all' || rec.group === group),
      );
      setResults(filtered);
    } else {
      setResults(recipes);
    }
  }, [recipes, search, group]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Рецепты',
      headerRight: () => {
        return (
          <View style={{flexDirection: 'row'}}>
            <Button
              transparent
              onPress={() => {
                navigation.push('help');
              }}>
              <Text style={{color: '#000'}}>Помощь </Text>
            </Button>
            <Button
              transparent
              onPress={() => {
                navigation.push('create');
              }}>
              <Text style={{color: '#000'}}>Создать</Text>
            </Button>
          </View>
        );
      },
    });
  }, [navigation]);

  const renderItem = ({item}: any) => {
    return (
      <Card>
        <CardItem header>
          <Text style={{fontWeight: '700'}}>{item.name}</Text>
        </CardItem>
        <CardItem>
          <Body>
            <Text>{item.description}</Text>
          </Body>
        </CardItem>
      </Card>
    );
  };

  return (
    <View style={{backgroundColor: '#ffffff', flex: 1, paddingTop: 10}}>
      <Form>
        <Item
          style={{marginLeft: 16, marginRight: 16, marginBottom: 10}}
          rounded>
          <Input
            placeholder="Поиск"
            style={{marginLeft: 10}}
            value={search}
            onChangeText={setSearch}
          />
        </Item>
        <Item picker style={{}}>
          <Picker
            mode="dropdown"
            iosIcon={<Icon name="arrow-down" />}
            placeholder="Группа"
            placeholderStyle={{color: '#bfc6ea'}}
            placeholderIconColor="#007aff"
            selectedValue={group}
            onValueChange={value => setGroup(value)}>
            {extendedGroupOptions.map(({key, value}) => (
              <Picker.Item label={value} value={key} key={key} />
            ))}
          </Picker>
        </Item>
      </Form>
      <FlatList
        style={{backgroundColor: '#f8fdff', padding: 6}}
        data={results}
        renderItem={renderItem}
        keyExtractor={i => i.date}
        ListFooterComponent={<View style={{height: 20}} />}
        ListEmptyComponent={
          <Card>
            <CardItem>
              <Body>
                <Text>
                  {(search.length > 0 && 'Ничего не найдено') ||
                    'Тут ничего нет. Создайте первый рецепт'}
                </Text>
              </Body>
            </CardItem>
          </Card>
        }
      />
    </View>
  );
};

export default RecipesList;
