import React, {useEffect} from 'react';
import {Text, Image, View} from 'react-native';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

// COMPONENTS
import {ContainerScreens} from '@components/containerScreens/ContainerScreens';
import {CardInformation} from '@components/cardInformation/CardInformation';
import {BottomLine} from '@components/bottomLine/BottomLine';
import {JobsList} from '@components/jobsList/JobsList';
import {InlineInfo} from '@components/inlineInfo/InlineInfo';
import {InfoList} from '@components/infoList/InfoList';

// CONSTANTS
import {IMAGES} from '@constants/Images';
import {
  PRINCIPAL_INFO,
  PROFILE,
  PERSONAL_INFO,
  SOFTWARES_SKILLS,
  PROFESSIONAL_INFO,
  EDUCATION,
  ASYNC_STORAGE_VALUES,
} from '@constants/Strings';
import {FAVORITES_TYPES} from '@redux/types/FavoritesTypes';

// STYLES
import {GlobalStyles} from '@utils/GlobalStyles';
import {Styles} from './HomeStyles';

const {ADD_ANIME_FAVORITES, ADD_MANGA_FAVORITES} = FAVORITES_TYPES;
const {ANIMES, MANGAS} = ASYNC_STORAGE_VALUES;
const {TITLE_JOB, NAME} = PRINCIPAL_INFO;
const {TITLE_PROFILE, CONTENT_PROFILE} = PROFILE;
const {TITLE_PERSONAL_INFO, CONTACT_INFO, HOBBIES, LANGUAGES} = PERSONAL_INFO;
const {
  TITLE_PROFESSIONAL_INFO,
  NATIVAPPS,
  WAYU_INC,
  KRONO_GROUP,
  JOB,
} = PROFESSIONAL_INFO;
const {TITLE_SOFTWARES_SKILLS, PROGRAMMING, SOFTWARES} = SOFTWARES_SKILLS;
const {TITLE_EDUCATION, DEGREE, COURSES} = EDUCATION;

export const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    getFavorites(ANIMES, ADD_ANIME_FAVORITES);
    getFavorites(MANGAS, ADD_MANGA_FAVORITES);
  }, []);

  const getFavorites = async (asyncValue: string, favoritesType: string) => {
    try {
      const value = await AsyncStorage.getItem(asyncValue);
      if (value !== null) {
        const favoritesValue = JSON.parse(value);
        dispatch({type: favoritesType, payload: favoritesValue});
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <ContainerScreens>
      {/* PRINCIPAL INFO */}
      <View style={GlobalStyles.containerTwoColumns}>
        <View style={GlobalStyles.containerImage}>
          <Image
            style={Styles.imageProfile}
            source={IMAGES.MEGGIE_PHOTO}
            resizeMode="cover"
          />
        </View>
        <View style={GlobalStyles.containerNameTitle}>
          <Text style={GlobalStyles.title}>{NAME}</Text>
          <Text style={GlobalStyles.title}>{TITLE_JOB}</Text>
        </View>
      </View>

      {/* PROFILE INFO */}
      <CardInformation>
        <View style={GlobalStyles.containerTitle}>
          <Text style={GlobalStyles.titleCard}>{TITLE_PROFILE}</Text>
        </View>
        <Text style={GlobalStyles.text}>{CONTENT_PROFILE}</Text>
      </CardInformation>

      {/* PERSONAL INFORMATION */}
      <CardInformation>
        <View style={GlobalStyles.containerTitle}>
          <Text style={GlobalStyles.titleCard}>{TITLE_PERSONAL_INFO}</Text>
        </View>
        <Text style={GlobalStyles.title}>{CONTACT_INFO.TITLE}</Text>
        <BottomLine />
        <InlineInfo
          title={CONTACT_INFO.EMAIL.TITLE}
          content={CONTACT_INFO.EMAIL.CONTENT}
        />
        <InlineInfo
          title={CONTACT_INFO.PHONE.TITLE}
          content={CONTACT_INFO.PHONE.CONTENT}
        />
        <InlineInfo
          title={CONTACT_INFO.LOCATION.TITLE}
          content={CONTACT_INFO.LOCATION.CONTENT}
        />
        <InfoList information={HOBBIES} />
        <InfoList information={LANGUAGES} />
      </CardInformation>

      {/* PROFESSIONAL INFORMATION */}
      <CardInformation>
        <View style={GlobalStyles.containerTitle}>
          <Text style={GlobalStyles.titleCard}>{TITLE_PROFESSIONAL_INFO}</Text>
        </View>
        <JobsList jobs={NATIVAPPS} jobTitle={JOB} />
        <JobsList jobs={WAYU_INC} jobTitle={JOB} />
        <JobsList jobs={KRONO_GROUP} jobTitle={JOB} />
      </CardInformation>

      {/* SOFTWARE SKILLS */}
      <CardInformation>
        <View style={GlobalStyles.containerTitle}>
          <Text style={GlobalStyles.titleCard}>{TITLE_SOFTWARES_SKILLS}</Text>
        </View>
        <InfoList information={PROGRAMMING} />
        <InfoList information={SOFTWARES} />
      </CardInformation>

      {/* EDUCATION */}
      <CardInformation>
        <View style={GlobalStyles.containerTitle}>
          <Text style={GlobalStyles.titleCard}>{TITLE_EDUCATION}</Text>
        </View>
        <Text style={GlobalStyles.title}>{DEGREE.TITLE}</Text>
        <BottomLine />
        <Text style={GlobalStyles.textBold}>{DEGREE.EXTRA}</Text>
        <View style={Styles.inlineView}>
          <Text style={GlobalStyles.bullet}>{'\u2B24'}</Text>
          <Text style={GlobalStyles.text}>{DEGREE.CONTENT}</Text>
        </View>
        <InfoList information={COURSES} />
      </CardInformation>
    </ContainerScreens>
  );
};
