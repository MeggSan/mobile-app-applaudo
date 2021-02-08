import React from 'react';
import {View, TextInput} from 'react-native';

// COMPONENTS
import {Button} from '@components/button/Button';

// STYLES / OTHERS
import {GlobalStyles} from '@utils/GlobalStyles';
import {Styles} from './SearchBarStyles';
import {ANIMES} from '@constants/Strings';

export const SearchBar = ({value, handleSearch, handleButtonSearch}) => {
  return (
    <View style={Styles.containerHeader}>
      <View style={Styles.searchContainer}>
        <View style={Styles.search}>
          <TextInput
            autoCapitalize="none"
            style={GlobalStyles.text}
            placeholder={ANIMES.SEARCH_PLACEHOLDER}
            onChangeText={handleSearch}
            value={value}
          />
        </View>
      </View>
      <View style={Styles.buttonContainer}>
        <Button onPress={handleButtonSearch} text={ANIMES.BUTTON_SEARCH} />
      </View>
    </View>
  );
};
