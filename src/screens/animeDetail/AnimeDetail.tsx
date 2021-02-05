import React from 'react';
import {Text, Pressable} from 'react-native';

// STYLES
import {Styles} from './AnimeDetailStyles';

export const AnimeDetail = ({navigation}) => {
  const handleNavigate = () => {
    navigation.navigate('Favorites');
  };

  return (
    <>
      <Text>Anime Detail</Text>
      <Pressable onPress={handleNavigate}>
        <Text>Go to Favorites</Text>
      </Pressable>
    </>
  );
};
