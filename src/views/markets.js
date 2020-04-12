import React from 'react';
import {FlatList, StatusBar, View} from 'react-native';
import Box from '../components/box';
import ListRow from '../components/list-row';
import ListCell from '../components/list-cell';
import SafeAreaView from 'react-native-safe-area-view';
import {inject, observer} from 'mobx-react';
import {useFocusEffect} from '@react-navigation/native';

import {useTheme} from 'styled-components';

function MainMarketScreen({navigation, settingsStore, dataStore, gold}) {
  const [state, setState] = React.useState([]);
  const [refreshing] = React.useState(false);
  const {colors} = useTheme();
  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBackgroundColor(colors.pageBg);
      StatusBar.setBarStyle(
        settingsStore.darkMode ? 'light-content' : 'dark-content',
      );
      //   dataStore.syncData();
      gold.fetchData();
    }, [colors.pageBg, gold, settingsStore.darkMode]),
  );

  React.useEffect(() => {
    setState([
      // {
      //   name: 'Test düşüş',
      //   buy: '100',
      //   sell: '100',
      //   diff: '0',
      //   diffPercent: '100%',
      //   state: 2,
      // },
      // {
      //   name: 'Test yükseliş',
      //   buy: '100',
      //   sell: '100',
      //   diff: '0',
      //   diffPercent: '100%',
      //   state: 1,
      // },
      // {
      //   name: 'Test static',
      //   buy: '100',
      //   sell: '100',
      //   diff: '0',
      //   diffPercent: '100%',
      //   state: 0,
      // },
      ...gold.data,
    ]);
  }, [gold.data]);

  const onRefreshing = async () => {
    await dataStore.syncData();
  };

  const renderItem = ({item}) => {
    var color = 'primaryText';
    if (item.change_rate > 0) {
      color = '#54a17e';
    } else if (item.change_rate < 0) {
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
          {item.full_name}
        </ListCell>
        <ListCell color={color}>{item.buying.toFixed(2)}</ListCell>
        <ListCell color={color}>{item.selling.toFixed(2)}</ListCell>
        <ListCell color={color}>%{item.change_rate.toFixed(2)}</ListCell>
      </ListRow>
    );
  };

  const sparator = () => {
    return (
      <View
        // eslint-disable-next-line react-native/no-inline-styles
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
          Güncelleme : {gold.time}
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
        onRefresh={() => gold.fetchData()}
        refreshing={refreshing}
        data={state}
        renderItem={renderItem}
        keyExtractor={item => item.name}
        ItemSeparatorComponent={sparator}
      />
    </Box>
  );
}

const stores = ['dataStore', 'settingsStore', 'gold'];
export default inject(...stores)(observer(MainMarketScreen));
