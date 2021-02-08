import React from 'react';
import {View, TextInput} from 'react-native';

// COMPONENTS
import {Button} from '@components/button/Button';

// STYLES / OTHERS
import {GlobalStyles} from '@utils/GlobalStyles';
import {Styles} from './SearchBarStyles';
import {LIST} from '@constants/Strings';

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
            style={GlobalStyles.text}
            placeholder={LIST.SEARCH_PLACEHOLDER + ' ' + placeholder}
            onChangeText={handleSearch}
            value={value}
          />
        </View>
      </View>
      <View style={Styles.buttonContainer}>
        <Button onPress={handleButtonSearch} text={LIST.BUTTON_SEARCH} />
      </View>
    </View>
  );
};
