import React from 'react';
import {BarChart, Briefcase} from './icons';
import Box from './box';
import Ripple from 'react-native-material-ripple';
import Label from './text';
import {inject, observer} from 'mobx-react';
import {useTheme} from 'styled-components';

function TabBar({state, descriptors, navigation, settingsStore}) {
  const {colors} = useTheme();
  return (
    <Box
      flexDirection={'row'}
      bg="headerBg"
      borderTopWidth="1px"
      borderTopColor="line">
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label = options.title || route.name;

        const isFocused = state.index === index;
        isFocused && settingsStore.setCurrentTab(route.name);
        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };
        const iconIsFocusColor = colors.current;
        const iconColor = colors.secondaryText;
        return (
          <Box
            as={Ripple}
            key={index}
            rippleCentered={true}
            flex={1}
            height={53}
            flexDirection={'column'}
            justifyContent="center"
            alignItems="center"
            onPress={onPress}>
            {route.name === 'Markets' && (
              <BarChart stroke={isFocused ? iconIsFocusColor : iconColor} />
            )}
            {route.name === 'Investment' && (
              <Briefcase stroke={isFocused ? iconIsFocusColor : iconColor} />
            )}
            <Label
              color={isFocused ? 'current' : 'primaryText'}
              fontSize="11px"
              pt={4}>
              {label}
            </Label>
          </Box>
        );
      })}
    </Box>
  );
}

export default inject('settingsStore')(observer(TabBar));
