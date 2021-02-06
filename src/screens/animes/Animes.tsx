import React, {useEffect} from 'react';
import {Text, Pressable} from 'react-native';

// API
import {getAnimeList} from '@networking/Animes';

// STYLES
import {Styles} from './AnimesStyles';

export const Animes = ({navigation}) => {
  useEffect(() => {
    getAnimes();
  }, []);

  const handleNavigate = () => {
    navigation.navigate('Anime Detail');
  };

  const getAnimes = async () => {
    const response = await getAnimeList('anime');
    console.log('response', response.data);
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
