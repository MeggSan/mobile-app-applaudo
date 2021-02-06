import React from 'react';
import {Text, Image, View} from 'react-native';

// COMPONENTS
import {ContainerScreens} from '@components/containerScreens/ContainerScreens';
import {CardInformation} from '@components/cardInformation/CardInformation';
import {BottomLine} from '@components/bottomLine/BottomLine';

// STYLES / OTHERS
import {GlobalStyles} from '@utils/GlobalStyles';
import {Styles} from './HomeStyles';
import {IMAGES} from '@constants/Images';
import {
  PRINCIPAL_INFO,
  PROFILE,
  PERSONAL_INFO,
  SOFTWARES_SKILLS,
  PROFESSIONAL_INFO,
  EDUCATION,
} from '@constants/Strings';

export const Home = () => {
  const renderInfoList = (information) => {
    return (
      <View style={Styles.marginTopText}>
        <Text style={GlobalStyles.title}>{information.TITLE}</Text>
        <BottomLine />
        {renderList(information.CONTENT)}
      </View>
    );
  };

  const renderJobsList = (jobs) => {
    return (
      <View style={Styles.marginTopText}>
        <Text style={GlobalStyles.title}>{jobs.TITLE}</Text>
        <BottomLine />
        <Text style={GlobalStyles.subtitle}>{jobs.EXTRA}</Text>
        {renderList(jobs.CONTENT)}
      </View>
    );
  };

  const renderList = (array: Array<String>) =>
    array.map((content, index) => (
      <View key={index} style={Styles.inlineView}>
        <Text style={Styles.bullet}>{'\u2B24'}</Text>
        <Text style={[GlobalStyles.text, Styles.marginBotText]}>{content}</Text>
      </View>
    ));

  const renderInlineInfo = (title, content) => {
    return (
      <View style={Styles.viewInfo}>
        <Text style={GlobalStyles.textBold}>{title}</Text>
        <Text style={GlobalStyles.text}>{content}</Text>
      </View>
    );
  };

  return (
    <ContainerScreens>
      {/* PRINCIPAL INFO */}
      <View style={Styles.container}>
        <View style={Styles.containerImage}>
          <Image
            style={Styles.imageProfile}
            source={IMAGES.MEGGIE_PHOTO}
            resizeMode="cover"
          />
        </View>
        <View style={Styles.containerNameTitle}>
          <Text style={GlobalStyles.title}>{PRINCIPAL_INFO.NAME}</Text>
          <Text style={GlobalStyles.title}>{PRINCIPAL_INFO.TITLE}</Text>
        </View>
      </View>

      {/* PROFILE INFO */}
      <CardInformation>
        <View style={Styles.containerTitle}>
          <Text style={GlobalStyles.titleCard}>{PROFILE.TITLE}</Text>
        </View>
        <Text style={GlobalStyles.text}>{PROFILE.CONTENT}</Text>
      </CardInformation>

      {/* PERSONAL INFORMATION */}
      <CardInformation>
        <View style={Styles.containerTitle}>
          <Text style={GlobalStyles.titleCard}>{PERSONAL_INFO.TITLE}</Text>
        </View>
        <Text style={GlobalStyles.title}>
          {PERSONAL_INFO.CONTACT_INFO.TITLE}
        </Text>
        <BottomLine />
        {renderInlineInfo(
          PERSONAL_INFO.CONTACT_INFO.EMAIL.TITLE,
          PERSONAL_INFO.CONTACT_INFO.EMAIL.CONTENT,
        )}
        {renderInlineInfo(
          PERSONAL_INFO.CONTACT_INFO.PHONE.TITLE,
          PERSONAL_INFO.CONTACT_INFO.PHONE.CONTENT,
        )}
        {renderInlineInfo(
          PERSONAL_INFO.CONTACT_INFO.LOCATION.TITLE,
          PERSONAL_INFO.CONTACT_INFO.LOCATION.CONTENT,
        )}
        {renderInfoList(PERSONAL_INFO.HOBBIES)}
        {renderInfoList(PERSONAL_INFO.LANGUAGES)}
      </CardInformation>

      {/* PROFESSIONAL INFORMATION */}
      <CardInformation>
        <View style={Styles.containerTitle}>
          <Text style={GlobalStyles.titleCard}>{PROFESSIONAL_INFO.TITLE}</Text>
        </View>
        {renderJobsList(PROFESSIONAL_INFO.NATIVAPPS)}
        {renderJobsList(PROFESSIONAL_INFO.WAYU_INC)}
        {renderJobsList(PROFESSIONAL_INFO.KRONO_GROUP)}
      </CardInformation>

      {/* SOFTWARE SKILLS */}
      <CardInformation>
        <View style={Styles.containerTitle}>
          <Text style={GlobalStyles.titleCard}>{SOFTWARES_SKILLS.TITLE}</Text>
        </View>
        {renderInfoList(SOFTWARES_SKILLS.PROGRAMMING)}
        {renderInfoList(SOFTWARES_SKILLS.SOFTWARES)}
      </CardInformation>

      {/* EDUCATION */}
      <CardInformation>
        <View style={Styles.containerTitle}>
          <Text style={GlobalStyles.titleCard}>{EDUCATION.TITLE}</Text>
        </View>
        <Text style={GlobalStyles.title}>{EDUCATION.DEGREE.TITLE}</Text>
        <BottomLine />
        <Text style={GlobalStyles.textBold}>{EDUCATION.DEGREE.EXTRA}</Text>
        <View style={Styles.inlineView}>
          <Text style={Styles.bullet}>{'\u2B24'}</Text>
          <Text style={GlobalStyles.text}>{EDUCATION.DEGREE.CONTENT}</Text>
        </View>
        {renderInfoList(EDUCATION.COURSES)}
      </CardInformation>
    </ContainerScreens>
  );
};
