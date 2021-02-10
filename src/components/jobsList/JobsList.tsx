import React from 'react';
import {Text, View} from 'react-native';

// COMPONENTS
import {BottomLine} from '@components/bottomLine/BottomLine';
import {List} from '@components/list/List';

// STYLES
import {GlobalStyles} from '@utils/GlobalStyles';
import {Styles} from './JobsListStyles';

export const JobsList = ({jobs, jobTitle}: {jobs: any; jobTitle: string}) => {
  return (
    <View style={Styles.marginTopText}>
      <Text style={GlobalStyles.title}>{jobTitle + ' - ' + jobs.TITLE}</Text>
      <BottomLine />
      <Text style={GlobalStyles.subtitle}>{jobs.EXTRA}</Text>
      <List array={jobs.CONTENT} />
    </View>
  );
};
