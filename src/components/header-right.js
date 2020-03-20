import React from 'react';
import {Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Button from './button';
import {SettingsIcon} from './icons';
import Box from './box';
import darktheme from '../utils/darktheme';
import lightheme from '../utils/lightheme';
import {inject, observer} from 'mobx-react';

function HeaderRight({settingsStore}) {
  const navigation = useNavigation();
  const iconColor = settingsStore.darkMode
    ? darktheme.colors.secondaryText
    : lightheme.colors.secondaryText;
  return (
    <Box pr={10}>
      <Button onPress={() => navigation.navigate('Settings')}>
        <SettingsIcon stroke={iconColor} />
      </Button>
    </Box>
  );
}

export default inject("settingsStore")(observer(HeaderRight));
