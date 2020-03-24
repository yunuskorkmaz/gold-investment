import React from 'react';
import {FlatList, ToastAndroid, StatusBar, View} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Box from '../components/box';
import ListRow from '../components/list-row';
import ListCell from '../components/list-cell';
import SafeAreaView from 'react-native-safe-area-view';
import {inject, observer} from 'mobx-react';
import {useFocusEffect} from '@react-navigation/native';
import darktheme from '../utils/darktheme';
import lightheme from '../utils/lightheme';
import moment from 'moment-timezone';
import {useTheme} from 'styled-components';

function MarketScreen({navigation, settingsStore, dataStore}) {
  const [state, setState] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const {colors} = useTheme();
  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBackgroundColor(colors.pageBg);
      StatusBar.setBarStyle(
        settingsStore.darkMode ? 'light-content' : 'dark-content',
      );
      dataStore.syncData();
    }, [colors.pageBg, dataStore, settingsStore.darkMode]),
  );

  React.useEffect(() => {
    setState([
      {
        name: 'Test düşüş',
        buy: '100',
        sell: '100',
        diff: '0',
        diffPercent: '100%',
        state: 2,
      },
      {
        name: 'Test yükseliş',
        buy: '100',
        sell: '100',
        diff: '0',
        diffPercent: '100%',
        state: 1,
      },
      {
        name: 'Test static',
        buy: '100',
        sell: '100',
        diff: '0',
        diffPercent: '100%',
        state: 0,
      },
      ...dataStore.liveData.data,
    ]);
  }, [dataStore.liveData.data]);

  const onRefreshing = async () => {
    await dataStore.syncData();
  };

  const renderItem = ({item}) => {
    var color = 'primaryText';
    if (item.state === 1) {
      color = '#8FCF50';
    } else if (item.state === 2) {
      color = '#E75D5C';
    }
    return (
      <ListRow
        bg="listItemBg"
        rippleOpacity={0.05}
        key={item.name}
        onPress={() => navigation.navigate('Detail', {item: item})}>
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

  const sparator = () => {
    return (
      <View
        style={{
          height: 1,
          flex: 1,
          backgroundColor: '#CED0CE',
        }}
      />
    );
  };

  return (
    <Box flex={1} as={SafeAreaView} bg="pageBg">
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
          Güncelleme :{' '}
          {moment(dataStore.liveData.date)
            .tz('Europe/Istanbul')
            .format('HH:mm')}
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
        onRefresh={() => dataStore.syncData()}
        refreshing={refreshing}
        data={state}
        renderItem={renderItem}
        keyExtractor={item => item.name}
        ItemSeparatorComponent={sparator}
      />
    </Box>
  );
}

const stores = ['dataStore', 'settingsStore'];
export default inject(...stores)(observer(MarketScreen));
