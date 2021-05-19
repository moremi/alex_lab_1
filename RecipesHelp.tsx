import React, {useLayoutEffect} from 'react';
import {Dimensions, ScrollView, View} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import Carousel from 'react-native-snap-carousel';
import {Body, Card, CardItem, Text} from 'native-base';

type ScreenNavigationProp = StackNavigationProp<{}, never>;
type Props = {
  navigation: ScreenNavigationProp;
};

const RecipesHelp = ({navigation}: Props) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Помощь',
    });
  });

  const items = [
    {
      id: 1,
      text: 'Открыть приложение',
    },
    {
      id: 2,
      text: 'Нажать кнопку "Создать"',
    },
    {
      id: 3,
      text: 'Ввести информацию о рецепте',
    },
    {
      id: 4,
      text: 'Нажать кнопку "Сохранить"',
    },
    {
      id: 5,
      text: 'Вернуться на главный экран и смотреть список рецептов',
    },
  ];

  const renderItem = ({item, index}) => {
    return (
      <Card>
        <CardItem header>
          <Text style={{fontWeight: '700'}}>Шаг {item.id}</Text>
        </CardItem>
        <CardItem>
          <Body style={{height: 60}}>
            <Text>{item.text}</Text>
          </Body>
        </CardItem>
      </Card>
    );
  };
  return (
    <ScrollView style={{backgroundColor: '#fff'}}>
      <Text
        style={{
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: 20,
          marginBottom: 10,
          marginTop: 50,
        }}>
        Лабораторная работа №1
      </Text>
      <Text
        style={{
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: 16,
          marginBottom: 4,
        }}>
        Автор:
      </Text>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 16,
          marginBottom: 10,
        }}>
        Куранец Александр Геннадьевич
      </Text>
      <Text
        style={{
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: 16,
          marginBottom: 4,
        }}>
        Группа:
      </Text>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 16,
          marginBottom: 60,
        }}>
        881074
      </Text>
      <Text
        style={{
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: 16,
          marginBottom: 4,
        }}>
        Инструкция:
      </Text>
      <Carousel
        layout={'default'}
        data={items}
        renderItem={renderItem}
        sliderWidth={Dimensions.get('window').width}
        itemWidth={Dimensions.get('window').width * 0.8}
      />
    </ScrollView>
  );
};

export default RecipesHelp;
