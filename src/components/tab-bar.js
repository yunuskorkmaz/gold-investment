import React from 'react';
import {Text} from 'react-native';
import {BarChart, Briefcase} from './icons';
import Box from './box';
import Ripple from 'react-native-material-ripple';
import Label from './text';
import {inject, observer} from 'mobx-react';
import theme from '../utils/theme';
import darktheme from '../utils/darktheme';
import lightheme from '../utils/lightheme';

function TabBar({state, descriptors, navigation, settingsStore}) {
  return (
    <Box flexDirection={'row'}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label = options.title || route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };
        const iconIsFocusColor = settingsStore.darkMode
          ? darktheme.colors.current
          : lightheme.colors.current;
        const iconColor = settingsStore.darkMode
          ? darktheme.colors.secondaryText
          : lightheme.colors.secondaryText;
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
            bg="listItemBg"
            borderTopWidth="1px"
            borderTopColor="line"
            onPress={onPress}>
            {route.name === 'Markets' && (
              <BarChart stroke={isFocused ? iconIsFocusColor : iconColor} />
            )}
            {route.name === 'Investment' && (
              <Briefcase stroke={isFocused ? iconIsFocusColor : iconColor} />
            )}
            <Label
              color={isFocused ? 'current' : 'primaryText'}
              style={{
                fontSize: 11,
                paddingTop: 4,
              }}>
              {label}
            </Label>
          </Box>
        );
      })}
    </Box>
  );
}

export default inject('settingsStore')(observer(TabBar));
