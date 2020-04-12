import React from 'react';
import {StatusBar, Switch} from 'react-native';
import Box from '../components/box';
import Label from '../components/text';
import {inject, observer} from 'mobx-react';
import darktheme from '../utils/darktheme';
import lightheme from '../utils/lightheme';
import SafeAreaView from 'react-native-safe-area-view';
import Button from '../components/button';
import AsyncStorage from '@react-native-community/async-storage';

const Title = ({children}) => (
  <Label
    p={10}
    pt={25}
    color="primaryText"
    textTransform="uppercase"
    fontWeight="bold">
    {children}
  </Label>
);

const SwitchSetting = ({name, desc, value, onChange}) => (
  <Box
    flexDirection="row"
    bg="listItemBg"
    px={10}
    py={15}
    borderColor="line"
    borderTopWidth="1px"
    borderBottomWidth="1px">
    <Box flex={1} flexDirection="column">
      <Label color="primaryText" fontWeight="bold">
        {name}
      </Label>
      <Label fontSize={12} color="#999">
        {desc}
      </Label>
    </Box>
    <Box alignItems="flex-end" justifyContent="center" width="30%">
      <Switch onChange={onChange} value={value} />
    </Box>
  </Box>
);

function SettingsScreen({settingsStore: store}) {
  return (
    <Box flex={1} bg="pageBg" as={SafeAreaView}>
      <StatusBar
        barStyle={store.darkMode ? 'light-content' : 'dark-content'}
        backgroundColor={
          store.darkMode ? darktheme.colors.pageBg : lightheme.colors.listItemBg
        }
      />
      <Title>Görünüm Ayarları</Title>
      <SwitchSetting
        name="Koyu Tema"
        desc="Koyu temayı aktive et"
        value={store.darkMode}
        onChange={() => store.setDarkMode()}
      />
      <SwitchSetting
        name="Use AWS"
        value={store.useAws}
        onChange={() => store.setUseAws()}
      />
      <Box
        flexDirection="row"
        bg="listItemBg"
        px={10}
        py={15}
        borderColor="line"
        borderTopWidth="1px"
        borderBottomWidth="1px">
        <Box flex={1} flexDirection="column">
          <Label color="primaryText" fontWeight="bold">
            Ayarları Temizle
          </Label>
        </Box>
        <Box pt={10} alignItems="flex-end" justifyContent="center" width="30%">
          <Button
            onPress={() => {
              AsyncStorage.removeItem('settings');
              AsyncStorage.clear();
            }}>
            <Label color="primaryText">Temizle</Label>
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default inject('settingsStore', 'gold')(observer(SettingsScreen));
