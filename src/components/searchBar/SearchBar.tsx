import React from 'react';
import {View, TextInput} from 'react-native';

// COMPONENTS
import {Button} from '@components/button/Button';

// CONSTANTS
import {LIST} from '@constants/Strings';

// STYLES
import {GlobalStyles} from '@utils/GlobalStyles';
import {Styles} from './SearchBarStyles';

const {SEARCH_PLACEHOLDER, BUTTON_SEARCH} = LIST;

export const SearchBar = ({
  value,
  handleSearch,
  handleButtonSearch,
  placeholder,
}) => {
  return (
    <View style={Styles.containerHeader}>
      <View style={Styles.searchContainer}>
        <View style={Styles.search}>
          <TextInput
            autoCapitalize="none"
            style={[GlobalStyles.text, Styles.paddingInput]}
            placeholder={SEARCH_PLACEHOLDER + ' ' + placeholder}
            onChangeText={handleSearch}
            value={value}
          />
        </View>
      </View>
      <View style={Styles.buttonContainer}>
        <Button onPress={handleButtonSearch} text={BUTTON_SEARCH} />
      </View>
    </View>
  );
};
