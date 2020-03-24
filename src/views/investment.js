import React from 'react';
import {StatusBar} from 'react-native';
import Box from '../components/box';
import Label from '../components/text';
import darktheme from '../utils/darktheme';
import lightheme from '../utils/lightheme';
import {inject, observer} from 'mobx-react';
import {useFocusEffect} from '@react-navigation/native';
import SafeAreaView from 'react-native-safe-area-view';
import Button from '../components/button';

function InvestmentScreen({settingsStore, dataStore}) {
  useFocusEffect(
    React.useCallback(() => {
      dataStore.syncData();
    }, [dataStore]),
  );

  return (
    <Box flex={1} bg="pageBg" as={SafeAreaView}>
      <StatusBar
        barStyle={settingsStore.darkMode ? 'light-content' : 'dark-content'}
        backgroundColor={
          settingsStore.darkMode
            ? darktheme.colors.pageBg
            : lightheme.colors.listItemBg
        }
      />
      <Label color="primaryText">Investment Screen</Label>
      <Label>
        {JSON.stringify(dataStore.liveData)}
      </Label>
      <Button
        onPress={() => {
          dataStore.syncData();
        }}>
        <Label>
          stest
        </Label>
      </Button>

      <Button
        onPress={() => {
          dataStore.setClear();
        }}>
        <Label>
          clear
        </Label>
      </Button>
    </Box>
  );
}
export default inject('settingsStore', 'dataStore')(observer(InvestmentScreen));
