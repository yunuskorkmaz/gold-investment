import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SettingsScreen from './views/settings';
import MarketScreen from './views/markets';
import InvestmentScreen from './views/investment';
import TabBar from './components/tab-bar';
import {ThemeProvider} from 'styled-components';
import {Provider} from 'mobx-react';
import light from './utils/lightheme';
import dark from './utils/darktheme';
import HeaderRight from './components/header-right';
import settingsStore from './stores/settingsStore';
import dataStore from './stores/dataStore';
import {inject, observer} from 'mobx-react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
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

const stores = {
  settingsStore,
  dataStore,
};

const headerStyle = darkMode => {
  const theme = darkMode ? dark : light;
  return {
    headerStyle: {
      backgroundColor: theme.colors.pageBg,
    },
    headerTintColor: theme.colors.primaryText,
  };
};

function MainComponent({settingsStore: store}) {
  return (
    <ThemeProvider theme={store.darkMode ? dark : light}>
      <NavigationContainer>
        <AppStack.Navigator>
          <AppStack.Screen
            name={'Home'}
            component={TabScreen}
            options={{
              ...headerStyle(store.darkMode),
              headerRight: () => <HeaderRight />,
              title: 'Altın Hesabı',
            }}
          />
          <AppStack.Screen
            name={'Settings'}
            component={SettingsScreen}
            options={{...headerStyle(store.darkMode), title: 'Ayarlar'}}
          />
        </AppStack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}

const Main = inject('settingsStore')(observer(MainComponent));

function App() {
  return (
    <Provider {...stores}>
      <SafeAreaProvider>
        <Main />
      </SafeAreaProvider>
    </Provider>
  );
}

export default App;
