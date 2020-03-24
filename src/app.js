import 'react-native-gesture-handler';
import React from 'react';
import {ThemeProvider} from 'styled-components';
import {Provider} from 'mobx-react';
import light from './utils/lightheme';
import dark from './utils/darktheme';
import settingsStore from './stores/settingsStore';
import dataStore from './stores/dataStore';
import {inject, observer} from 'mobx-react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Navigation from './navigation';

const stores = {
  settingsStore: new settingsStore(),
  dataStore: new dataStore(),
};

function MainComponent({settingsStore: store}) {
  return (
    <ThemeProvider theme={store.darkMode ? dark : light}>
      <Navigation />
    </ThemeProvider>
  );
}

const Main = inject('settingsStore')(observer(MainComponent));

function App() {
  return (
    <SafeAreaProvider>
      <Provider {...stores}>
        <Main />
      </Provider>
    </SafeAreaProvider>
  );
}

export default App;
