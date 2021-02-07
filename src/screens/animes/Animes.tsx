import React, {useEffect, useState} from 'react';
import {Text, Pressable, FlatList, ImageBackground, View} from 'react-native';

// API
import {getAnimeList} from '@networking/Animes';

// STYLES
import {GlobalStyles} from 'utils/GlobalStyles';
import {Styles} from './AnimesStyles';

export const Animes = ({navigation}) => {
  const [animesList, setAnimesList] = useState([]);

  useEffect(() => {
    getAnimes();
  }, []);

  const handleNavigate = () => {
    navigation.navigate('Anime Detail');
  };

  const getAnimes = async () => {
    const response = await getAnimeList('anime');
    setAnimesList(response.data.data);
  };

  const renderAnime = ({item}) => {
    return (
      <>
        <Pressable style={Styles.containerPressable} onPress={handleNavigate}>
          <ImageBackground
            source={{uri: item.attributes.posterImage.small}}
            imageStyle={Styles.imageBackground}
            style={Styles.containerCard}
            resizeMode="cover">
            <View style={Styles.containerViewCard}>
              <View style={Styles.overlay} />
              <Text style={[GlobalStyles.titleCard, Styles.colorText]}>
                {item.attributes.titles.en_jp}
              </Text>
            </View>
          </ImageBackground>
        </Pressable>
      </>
    );
  };

  return (
    <FlatList
      data={animesList}
      keyExtractor={(item) => item.id}
      renderItem={renderAnime}
      style={Styles.containerFlatList}
    />
  );
};
