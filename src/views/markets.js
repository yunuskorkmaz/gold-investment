import React from 'react';
import {FlatList, ToastAndroid, StatusBar} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Box from '../components/box';
import ListRow from '../components/list-row';
import ListCell from '../components/list-cell';
import moment from 'moment';
import Label from '../components/text';
import SafeAreaView from 'react-native-safe-area-view';
import {inject, observer} from 'mobx-react';
import darktheme from '../utils/darktheme';
import lightheme from '../utils/lightheme';

function MarketScreen({navigation, settingsStore,dataStore}) {
  const [state, setState] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [lastTime, setLastTime] = React.useState('');

  const fetchData = async () => {
    try {

    } catch (e) {
      ToastAndroid.show('hata', ToastAndroid.SHORT);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const renderItem = ({item}) => {
    var color = '#000';
    if (item.state === 1) {
      color = '#8FCF50';
    } else if (item.state === 2) {
      color = '#E75D5C';
    }
    return (
      <ListRow bg="listItemBg" rippleOpacity={0.05} key={item.name}>
        <ListCell
          color="primaryText"
          flex={1}
          fontWeight="600"
          alignItems="flex-start">
          {item.name}
        </ListCell>
        <ListCell color={color}>{item.buy}</ListCell>
        <ListCell color={color}>{item.sell}</ListCell>
        <ListCell color={color}>{item.diffPercent}</ListCell>
      </ListRow>
    );
  };

  return (
    <Box flex={1} as={SafeAreaView} bg="pageBg">
      <StatusBar
        barStyle={settingsStore.darkMode ? 'light-content' : 'dark-content'}
        backgroundColor={
          settingsStore.darkMode
            ? darktheme.colors.pageBg
            : lightheme.colors.listItemBg
        }
      />
      <Box
        flexDirection="row"
        bg="pageBg"
        p={8}
        borderBottomWidth="1px"
        borderBottomColor="line">
        <ListCell
          color="secondaryText"
          flex={1}
          fontSize={12}
          alignItems="flex-start">
          Güncelleme : {lastTime}
        </ListCell>
        <ListCell color="secondaryText" fontSize={12}>
          Alış
        </ListCell>
        <ListCell color="secondaryText" fontSize={12}>
          Satış
        </ListCell>
        <ListCell color="secondaryText" fontSize={12}>
          Fark
        </ListCell>
      </Box>
      <FlatList
        onRefresh={fetchData}
        refreshing={refreshing}
        data={state}
        renderItem={renderItem}
        keyExtractor={item => item.name}
      />
    </Box>
  );
}

export default inject('settingsStore','dataStore')(observer(MarketScreen));
