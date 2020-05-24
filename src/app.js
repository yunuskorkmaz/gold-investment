import 'react-native-gesture-handler';
import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Markets from './pages/markets';
import Investment from './pages/investments';
import {NavigationContainer} from '@react-navigation/native';
import {
  ApplicationProvider,
  BottomNavigation,
  BottomNavigationTab,
  Text,
  IconRegistry,
} from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import {EvaIconsPack} from '@ui-kitten/eva-icons';

const AppStack = createStackNavigator();
const TabStack = createBottomTabNavigator();

const BottomTabBar = ({navigation, state}) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={index => navigation.navigate(state.routeNames[index])}>
    <BottomNavigationTab title="USERS" />
    <BottomNavigationTab title="ORDERS" />
  </BottomNavigation>
);

const TabNavigator = () => {
  return (
    <TabStack.Navigator tabBar={props => <BottomTabBar {...props} />}>
      <TabStack.Screen name="Markets" component={Markets} />
      <TabStack.Screen name="Investments" component={Investment} />
    </TabStack.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <AppStack.Navigator headerMode="none">
      <AppStack.Screen name="Home" component={TabNavigator} />
      <AppStack.Screen name="Detail" component={() => <Text>asd</Text>} />
      <AppStack.Screen name="Settings" component={Investment} />
    </AppStack.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <AppNavigator />
      </ApplicationProvider>
    </NavigationContainer>
  );
};

export default App;
