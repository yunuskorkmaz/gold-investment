import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SettingsScreen from './views/settings';
import MarketScreen from './views/markets';
import InvestmentScreen from './views/investment';
import TabBar from './components/tab-bar';
import {useTheme} from 'styled-components';
import HeaderRight from './components/header-right';
import DetailScreen from './views/detail';
const AppStack = createStackNavigator();
const TabStack = createBottomTabNavigator();
function TabScreen() {
  return (
    <TabStack.Navigator tabBar={props => <TabBar {...props} />}>
      <TabStack.Screen
        name={'Markets'}
        options={{
          title: 'Piyasalar',
        }}
        component={MarketScreen}
      />
      <TabStack.Screen
        name={'Investment'}
        options={{title: 'Varlıklarım'}}
        component={InvestmentScreen}
      />
    </TabStack.Navigator>
  );
}

function Navigation() {
  const {colors} = useTheme();
  const headerStyle = {
    headerStyle: {
      backgroundColor: colors.headerBg,
      elevation: 0,
    },
    headerTintColor: colors.primaryText,
  };
  return (
    <NavigationContainer>
      <AppStack.Navigator
        screenOptions={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}>
        <AppStack.Screen
          name={'Home'}
          component={TabScreen}
          options={{
            ...headerStyle,
            headerRight: () => <HeaderRight />,
            title: 'Altın Hesabı',
          }}
        />
        <AppStack.Screen
          name={'Settings'}
          component={SettingsScreen}
          options={{...headerStyle, title: 'Ayarlar'}}
        />
        <AppStack.Screen
          name={'Detail'}
          component={DetailScreen}
          options={{...headerStyle, title: 'Detail'}}
        />
      </AppStack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
