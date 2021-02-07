import React, {useEffect} from 'react';
import {Text, Pressable} from 'react-native';

// STYLES
import {Styles} from './AnimeDetailStyles';

export const AnimeDetail = ({route, navigation}) => {
  const {animeId, otherParam} = route.params;

  useEffect(() => {
    console.log('anime id', animeId);
  }, []);

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
