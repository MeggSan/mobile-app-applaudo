import React from 'react';
import {Text, Pressable} from 'react-native';

// STYLES
import {Styles} from './AnimesStyles';

export const Animes = ({navigation}) => {
  const handleNavigate = () => {
    navigation.navigate('Anime Detail');
  };

  return (
    <>
      <Text>Animes</Text>
      <Pressable onPress={handleNavigate}>
        <Text>Go to Anime Detail</Text>
      </Pressable>
    </>
  );
};
