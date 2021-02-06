import React from 'react';
import {Text, Image} from 'react-native';

// COMPONENTS
import {ContainerScreens} from '../../components/containerScreens/ContainerScreens';

// STYLES / OTHERS
import {Styles} from './HomeStyles';
import {IMAGES} from '../../library/constants/Images';
import {
  PRINCIPAL_INFO,
  PROFILE,
  PERSONAL_INFO,
  SOFTWARES_SKILLS,
  PROFESSIONAL_INFO,
  EDUCATION,
} from '../../library/constants/HomeInformation';

export const Home = () => {
  const renderInfoList = (information) => {
    return (
      <>
        <Text style={Styles.title}>{information.TITLE}</Text>
        {information.CONTENT.map((content) => (
          <Text style={Styles.text}>{content}</Text>
        ))}
      </>
    );
  };

  const renderJobsList = (jobs) => {
    return (
      <>
        <Text style={Styles.title}>{jobs.TITLE}</Text>
        <Text style={Styles.subtitle}>{jobs.EXTRA}</Text>
        {jobs.CONTENT.map((content) => (
          <Text style={Styles.text}>{content}</Text>
        ))}
      </>
    );
  };

  return (
    <ContainerScreens>
      <Image
        style={Styles.imageProfile}
        source={IMAGES.MEGGIE_PHOTO}
        // resizeMode="cover"
      />
      <Text style={Styles.title}>{PRINCIPAL_INFO.NAME}</Text>
      <Text style={Styles.title}>{PRINCIPAL_INFO.TITLE}</Text>
      <Text style={Styles.title}>{PROFILE.TITLE}</Text>
      <Text>{PROFILE.CONTENT}</Text>
      <Text>{PERSONAL_INFO.TITLE}</Text>
      <Text>{PERSONAL_INFO.CONTACT_INFO.TITLE}</Text>
      <Text>{PERSONAL_INFO.CONTACT_INFO.EMAIL.TITLE}</Text>
      <Text>{PERSONAL_INFO.CONTACT_INFO.EMAIL.CONTENT}</Text>
      <Text>{PERSONAL_INFO.CONTACT_INFO.PHONE.TITLE}</Text>
      <Text>{PERSONAL_INFO.CONTACT_INFO.PHONE.CONTENT}</Text>
      <Text>{PERSONAL_INFO.CONTACT_INFO.LOCATION.TITLE}</Text>
      <Text>{PERSONAL_INFO.CONTACT_INFO.LOCATION.CONTENT}</Text>
      {renderInfoList(PERSONAL_INFO.HOBBIES)}
      {renderInfoList(PERSONAL_INFO.LANGUAGES)}
      <Text>{PROFESSIONAL_INFO.TITLE}</Text>
      {renderJobsList(PROFESSIONAL_INFO.NATIVAPPS)}
      {renderJobsList(PROFESSIONAL_INFO.WAYU_INC)}
      {renderJobsList(PROFESSIONAL_INFO.KRONO_GROUP)}
      <Text>{SOFTWARES_SKILLS.TITLE}</Text>
      {renderInfoList(SOFTWARES_SKILLS.PROGRAMMING)}
      {renderInfoList(SOFTWARES_SKILLS.SOFTWARES)}
      <Text>{EDUCATION.TITLE}</Text>
      <Text>{EDUCATION.DEGREE.TITLE}</Text>
      <Text>{EDUCATION.DEGREE.EXTRA}</Text>
      <Text>{EDUCATION.DEGREE.CONTENT}</Text>
      {renderInfoList(EDUCATION.COURSES)}
    </ContainerScreens>
  );
};
