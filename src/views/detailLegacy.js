import React from 'react';
import Box from '../components/box';
import {StatusBar} from 'react-native';
import Label from '../components/text';
import Briefcase from '../components/icons/Briefcase';
import {useTheme} from 'styled-components';

const DetailLegacyScreen = ({navigation, route}) => {
  const item = route.params.item;
  const {colors} = useTheme();
  var colorBg = 'transparent';

  if (item.state === 1) {
    colorBg = colors.detailBgUp;
  } else if (item.state === 2) {
    colorBg = colors.detailBgDown;
  } else {
    colorBg = colors.detailBgStatic;
  }
  navigation.setOptions({
    title: item.name,
    headerTintColor: colors.detailText,
    headerShown: true,
    headerStyle: {
      backgroundColor: colorBg,
      elevation: 0,
    },
  });
  StatusBar.setTranslucent(true);
  StatusBar.setBackgroundColor('transparent');
  // useFocusEffect(
  //   React.useCallback(() => {
  //     if (item) {
  //       if (item.state === 1) {
  //         setBgColor(colors.detailBgUp);
  //       } else if (item.state === 2) {
  //         setBgColor(colors.detailBgDown);
  //       } else {
  //         setBgColor('blue');
  //       }
  //     }
  //   }, [
  //     bgColor,
  //     colors.detailBgDown,
  //     colors.detailBgUp,
  //     colors.detailText,
  //     item,
  //     navigation,
  //   ]),
  // );

  return (
    <Box flex={1} bg={colors.pageBg}>
      <Box flexDirection="row" bg={colorBg} py="40px">
        <Box flex={1} alignItems="center" justifyContent="center">
          <Label color="detailText">Alış</Label>
          <Box mt="8px" flexDirection="row" alignItems="center">
            <Briefcase stroke="white" width="20px" height="20px" />
            <Label
              fontWeight="bold"
              ml="10px"
              fontSize="21px"
              color="detailText">
              {item && item.buy}
            </Label>
          </Box>
        </Box>
        <Box flex={1} alignItems="center" justifyContent="center">
          <Label color="detailText">Satış</Label>
          <Box mt="8px" flexDirection="row" alignItems="center">
            <Briefcase stroke="white" width="20px" height="20px" />
            <Label
              fontWeight="bold"
              ml="10px"
              fontSize="21px"
              color="detailText">
              {item && item.sell}
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
              {item && item.diffPercent}
            </Label>
          </Box>
        </Box>
      </Box>
      <Box>
        <Label color="primaryText">{JSON.stringify(item)}</Label>
      </Box>
    </Box>
  );
};

export default DetailLegacyScreen;
