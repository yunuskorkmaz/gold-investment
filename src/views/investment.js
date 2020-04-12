import React from 'react';
import {StatusBar, Button} from 'react-native';
import Box from '../components/box';
import Label from '../components/text';
import darktheme from '../utils/darktheme';
import lightheme from '../utils/lightheme';
import {inject, observer} from 'mobx-react';
import {useFocusEffect} from '@react-navigation/native';
import SafeAreaView from 'react-native-safe-area-view';
import {FlatList} from 'react-native-gesture-handler';

function InvestmentScreen({navigation, gold}) {
  navigation.setOptions({
    headerRight: () => <Label>TEST</Label>,
    headerStyle: {
      backgroundColor: 'white',
      elevation: 0,
    },
  });

  useFocusEffect(React.useCallback(() => {}, []));

  return <Box flex={1} bg="pageBg"></Box>;
}
export default inject('gold')(observer(InvestmentScreen));
