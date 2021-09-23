import React, {useEffect} from 'react';
import {Provider as PaperProvider, DefaultTheme} from 'react-native-paper';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import configureStore from './src/config/store/configureStore';
import MainNavigator from './src/navigations/MainNavigtor';

import {Colors} from './src/styles';

// import RNBootSplash from 'react-native-bootsplash';

const {persistor, store} = configureStore();
// persistor.purge();
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.PRIMARY,
    text: Colors.BLACK,
  },
};

const App = () => {
  // useEffect(() => {
  //   RNBootSplash.hide({duration: 250});
  // }, []);

  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <PersistGate persistor={persistor}>
          {/* <SafeAreaProvider> */}
          <MainNavigator />
          {/* </SafeAreaProvider> */}
        </PersistGate>
      </PaperProvider>
    </Provider>
  );
};
export default App;
