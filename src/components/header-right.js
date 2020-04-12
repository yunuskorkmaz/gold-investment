import React from 'react';
import {Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Button from './button';
import {SettingsIcon, Plus} from './icons';
import Box from './box';
import {inject, observer} from 'mobx-react';
import {useTheme} from 'styled-components';
import Ripple from 'react-native-material-ripple';

function HeaderRight({settingsStore, ...props}) {
  const navigation = useNavigation();
  const {colors} = useTheme();
  const iconColor = colors.secondaryText;
  return (
    <Box pr={10}>
      {settingsStore.currentTab == 'Investment' ? (
        <Button
          as={Ripple}
          rippleCentered={true}
          onPress={() => navigation.navigate('AddInvestment')}>
          <Plus stroke={colors.secondaryText} />
        </Button>
      ) : (
        <Button onPress={() => navigation.navigate('Settings')}>
          <SettingsIcon stroke={iconColor} />
        </Button>
      )}
    </Box>
  );
}

export default inject('settingsStore')(observer(HeaderRight));
