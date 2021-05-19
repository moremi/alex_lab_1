import React, {
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react';
import {ScrollView, View} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {
  Button,
  Text,
  Form,
  Item,
  Input,
  Label,
  Picker,
  Icon,
  Textarea,
} from 'native-base';
import {AppContext} from './App';

type ScreenNavigationProp = StackNavigationProp<{}, never>;
type Props = {
  navigation: ScreenNavigationProp;
};

export const groupOptions = [
  {key: '1', value: 'Завтрак'},
  {key: '2', value: 'Обед'},
  {key: '3', value: 'Ужин'},
  {key: '4', value: 'Десерт'},
];
const RecipesCreate = ({navigation}: Props) => {
  const [name, setName] = useState('');
  const [group, setGroup] = useState(groupOptions[0].key);
  const [description, setDescription] = useState('');
  const {setRecipes, recipes} = useContext(AppContext);

  const onCreate = useCallback(() => {
    const date = new Date();
    function ISODateString(d: any) {
      function pad(n: any) {
        return n < 10 ? '0' + n : n;
      }
      return (
        pad(d.getUTCDate()) +
        '_' +
        pad(d.getUTCMonth() + 1) +
        '_' +
        pad(d.getUTCFullYear()) +
        ' ' +
        pad(d.getUTCHours()) +
        ':' +
        pad(d.getUTCMinutes())
      );
    }
    const dateString = ISODateString(date);

    const recipe = {
      name: (name.length > 0 && name) || dateString,
      group,
      description,
      date: date.toISOString(),
    };
    console.log({recipe});
    setRecipes([...recipes, recipe]);
  }, [description, group, name, recipes, setRecipes]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Создать рецепт',
      headerRight: () => {
        return (
          <Button
            transparent
            onPress={() => {
              onCreate();
              navigation.goBack();
            }}>
            <Text style={{color: '#000'}}>Сохранить</Text>
          </Button>
        );
      },
    });
  }, [navigation, onCreate]);

  return (
    <ScrollView style={{backgroundColor: '#fff'}}>
      <Form>
        <Item style={{marginLeft: 0, marginBottom: 10}}>
          <Input
            placeholder="Название рецепта"
            style={{marginLeft: 10}}
            value={name}
            onChangeText={setName}
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
            {groupOptions.map(({key, value}) => (
              <Picker.Item label={value} value={key} key={key} />
            ))}
          </Picker>
        </Item>
        <Textarea
          rowSpan={5}
          bordered
          value={description}
          onChangeText={setDescription}
          style={{
            borderTopWidth: 0,
            borderLeftWidth: 0,
            borderRightWidth: 0,
          }}
          placeholder="Описание рецепта"
        />
      </Form>
    </ScrollView>
  );
};

export default RecipesCreate;
