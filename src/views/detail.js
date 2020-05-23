import React, {useState} from 'react';
import Box from '../components/box';
import {StatusBar, Dimensions} from 'react-native';
import Label from '../components/text';
import Briefcase from '../components/icons/Briefcase';
import {useTheme} from 'styled-components';
import {LineChart} from 'react-native-chart-kit';
import ListCell from '../components/list-cell';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import ListRow from '../components/list-row';

import {YellowBox} from 'react-native';
import {ArrowDown, ArrowUp} from '../components/icons';

YellowBox.ignoreWarnings([
  'VirtualizedLists should never be nested', // TODO: Remove when fixed
]);

const DetailScreen = ({navigation, route}) => {
  const item = route.params.item;
  const {colors} = useTheme();
  var colorBg = 'transparent';
  const [detail, setDetail] = useState({});
  const [chartData, setChartData] = useState(null);
  if (item.change_rate > 0) {
    colorBg = colors.detailBgUp;
  } else if (item.change_rate < 0) {
    colorBg = colors.detailBgDown;
  } else {
    colorBg = colors.detailBgStatic;
  }
  navigation.setOptions({
    title: item.full_name,
    headerTintColor: colors.detailText,
    headerShown: true,
    headerStyle: {
      backgroundColor: colorBg,
      elevation: 0,
    },
  });
  StatusBar.setTranslucent(true);

  const getDetail = async code => {
    var request = await fetch(
      `https://finans.apipara.com/json/v9//gold?bank=1&code=${code}&auid=1`,
      {
        headers: {token: '_magic'},
        method: 'get',
      },
    );
    var data = await request.json();
    var labels = data.response.values.map((a, i) => {
      if (i % 4 == 0) return a.update_date;
      return '';
    });
    setDetail(data.response);
    var chartData = data.response.values.map(a => a.buying);
    setChartData({
      labels: labels,
      datasets: [
        {
          data: chartData,
        },
      ],
    });
  };

  React.useEffect(() => {
    getDetail(item.code);
    StatusBar.setBarStyle('light-content');
    StatusBar.setBackgroundColor('transparent');
  }, [item.code]);

  const renderItem = ({item}) => {
    return (
      <ListRow
        borderBottomColor="#999"
        borderBottomWidth={1}
        mb={1}
        bg="listItemBg"
        rippleOpacity={0.05}
        key={item.bank}>
        <ListCell
          color="primaryText"
          flex={1}
          fontWeight="600"
          alignItems="flex-start">
          {item.bank}
        </ListCell>
        <ListCell color="primaryText">{item.buying.toFixed(2)}</ListCell>
        <ListCell color="primaryText">{item.selling.toFixed(2)}</ListCell>
      </ListRow>
    );
  };

  return (
    <Box flex={1} bg={colors.pageBg}>
      <Box flexDirection="row" bg={colorBg} py="40px">
        <Box flex={1} alignItems="center" justifyContent="center">
          <Label color="detailText">Alış</Label>
          <Box mt="8px" flexDirection="row" alignItems="center">
            {item.change_rate > 0 ? (
              <ArrowUp stroke="white" width="20px" height="20px" />
            ) : item.change_rate < 0 ? (
              <ArrowDown stroke="white" width="20px" height="20px" />
            ) : null}
            <Label
              fontWeight="bold"
              ml="5px"
              fontSize="21px"
              color="detailText">
              {item && item.buying.toFixed(2)}
            </Label>
          </Box>
        </Box>
        <Box flex={1} alignItems="center" justifyContent="center">
          <Label color="detailText">Satış</Label>
          <Box mt="8px" flexDirection="row" alignItems="center">
            {item.change_rate > 0 ? (
              <ArrowUp stroke="white" width="20px" height="20px" />
            ) : item.change_rate < 0 ? (
              <ArrowDown stroke="white" width="20px" height="20px" />
            ) : null}
            <Label
              fontWeight="bold"
              ml="3px"
              fontSize="21px"
              color="detailText">
              {item && item.selling.toFixed(2)}
            </Label>
          </Box>
        </Box>
        <Box flex={1} alignItems="center" justifyContent="center">
          <Label color="detailText">Artış</Label>
          <Box mt="8px" flexDirection="row" alignItems="center">
            <Label
              fontWeight="bold"
              ml="10px"
              fontSize="21px"
              color="detailText">
              {item && '%' + item.change_rate.toFixed(2)}
            </Label>
          </Box>
        </Box>
      </Box>
      <ScrollView horizontal={false}>
        <Box flexDirection="row" my="15px">
          <Box flex={1} alignItems="center" justifyContent="center">
            <Label fontSize="12px" color="primaryText">
              Önceki Kapanış
            </Label>
            <Box mt="8px" flexDirection="row" alignItems="center">
              <Label
                fontWeight="bold"
                ml="10px"
                fontSize="17px"
                color="primaryText">
                {item && item.latest.toFixed(2)}
              </Label>
            </Box>
          </Box>
          <Box alignItems="center" justifyContent="center">
            <Label fontSize="12px" color="primaryText">
              Günün En Yüksek Değeri
            </Label>
            <Box mt="8px" flexDirection="row" alignItems="center">
              <Label
                fontWeight="bold"
                ml="10px"
                fontSize="17px"
                color="primaryText">
                {item && item.max.toFixed(2)}
              </Label>
            </Box>
          </Box>
          <Box flex={1} alignItems="center" justifyContent="center">
            <Label fontSize="12px" color="primaryText">
              Günün En Düşük Değeri
            </Label>
            <Box mt="8px" flexDirection="row" alignItems="center">
              <Label
                fontWeight="bold"
                ml="10px"
                fontSize="17px"
                color="primaryText">
                {item && item.min.toFixed(2)}
              </Label>
            </Box>
          </Box>
        </Box>
        <Box>
          {chartData && (
            <LineChart
              data={chartData}
              width={Dimensions.get('window').width} // from react-native
              height={220}
              withInnerLines={false}
              withOuterLines={false}
              chartConfig={{
                backgroundGradientFrom: colors.chartBg,
                backgroundGradientTo: colors.chartBg,
                color: (opacity = 1) =>
                  `rgba(${colors.chartColor}, ${opacity})`,
                labelColor: (opacity = 1) =>
                  `rgba(${colors.chartText}, ${opacity})`,
                propsForDots: {
                  r: '3',
                },
              }}
            />
          )}
        </Box>
        <FlatList
          horizontal={false}
          scrollEnabled={false}
          nestedScrollEnabled={false}
          data={detail.banks}
          renderItem={renderItem}
          keyExtractor={item => item.bank}
          ListHeaderComponent={
            detail.banks &&
            detail.banks.length && (
              <Box
                flexDirection="row"
                p={8}
                borderBottomWidth="1px"
                borderBottomColor="line">
                <ListCell
                  color="secondaryText"
                  flex={1}
                  fontSize={12}
                  alignItems="flex-start"
                />
                <ListCell color="secondaryText" fontSize={12}>
                  Alış
                </ListCell>
                <ListCell color="secondaryText" fontSize={12}>
                  Satış
                </ListCell>
              </Box>
            )
          }
        />
      </ScrollView>
    </Box>
  );
};

export default DetailScreen;
