import React from 'react';
import {Text, Image, View} from 'react-native';

// COMPONENTS
import {ContainerScreens} from '@components/containerScreens/ContainerScreens';
import {CardInformation} from '@components/cardInformation/CardInformation';
import {BottomLine} from '@components/bottomLine/BottomLine';
import {JobsList} from '@components/jobsList/JobsList';
import {InlineInfo} from '@components/inlineInfo/InlineInfo';
import {InfoList} from '@components/infoList/InfoList';

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
          <Text style={GlobalStyles.title}>{PRINCIPAL_INFO.NAME}</Text>
          <Text style={GlobalStyles.title}>{PRINCIPAL_INFO.TITLE}</Text>
        </View>
      </View>

      {/* PROFILE INFO */}
      <CardInformation>
        <View style={GlobalStyles.containerTitle}>
          <Text style={GlobalStyles.titleCard}>{PROFILE.TITLE}</Text>
        </View>
        <Text style={GlobalStyles.text}>{PROFILE.CONTENT}</Text>
      </CardInformation>

      {/* PERSONAL INFORMATION */}
      <CardInformation>
        <View style={GlobalStyles.containerTitle}>
          <Text style={GlobalStyles.titleCard}>{PERSONAL_INFO.TITLE}</Text>
        </View>
        <Text style={GlobalStyles.title}>
          {PERSONAL_INFO.CONTACT_INFO.TITLE}
        </Text>
        <BottomLine />
        <InlineInfo
          title={PERSONAL_INFO.CONTACT_INFO.EMAIL.TITLE}
          content={PERSONAL_INFO.CONTACT_INFO.EMAIL.CONTENT}
        />
        <InlineInfo
          title={PERSONAL_INFO.CONTACT_INFO.PHONE.TITLE}
          content={PERSONAL_INFO.CONTACT_INFO.PHONE.CONTENT}
        />
        <InlineInfo
          title={PERSONAL_INFO.CONTACT_INFO.LOCATION.TITLE}
          content={PERSONAL_INFO.CONTACT_INFO.LOCATION.CONTENT}
        />
        <InfoList information={PERSONAL_INFO.HOBBIES} />
        <InfoList information={PERSONAL_INFO.LANGUAGES} />
      </CardInformation>

      {/* PROFESSIONAL INFORMATION */}
      <CardInformation>
        <View style={GlobalStyles.containerTitle}>
          <Text style={GlobalStyles.titleCard}>{PROFESSIONAL_INFO.TITLE}</Text>
        </View>
        <JobsList jobs={PROFESSIONAL_INFO.NATIVAPPS} />
        <JobsList jobs={PROFESSIONAL_INFO.WAYU_INC} />
        <JobsList jobs={PROFESSIONAL_INFO.KRONO_GROUP} />
      </CardInformation>

      {/* SOFTWARE SKILLS */}
      <CardInformation>
        <View style={GlobalStyles.containerTitle}>
          <Text style={GlobalStyles.titleCard}>{SOFTWARES_SKILLS.TITLE}</Text>
        </View>
        <InfoList information={SOFTWARES_SKILLS.PROGRAMMING} />
        <InfoList information={SOFTWARES_SKILLS.SOFTWARES} />
      </CardInformation>

      {/* EDUCATION */}
      <CardInformation>
        <View style={GlobalStyles.containerTitle}>
          <Text style={GlobalStyles.titleCard}>{EDUCATION.TITLE}</Text>
        </View>
        <Text style={GlobalStyles.title}>{EDUCATION.DEGREE.TITLE}</Text>
        <BottomLine />
        <Text style={GlobalStyles.textBold}>{EDUCATION.DEGREE.EXTRA}</Text>
        <View style={Styles.inlineView}>
          <Text style={GlobalStyles.bullet}>{'\u2B24'}</Text>
          <Text style={GlobalStyles.text}>{EDUCATION.DEGREE.CONTENT}</Text>
        </View>
        <InfoList information={EDUCATION.COURSES} />
      </CardInformation>
    </ContainerScreens>
  );
};
