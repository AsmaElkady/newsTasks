/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  useColorScheme,
} from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import Main from './src/screens/Main';
import * as eva from '@eva-design/eva';
import { ApplicationProvider  } from '@ui-kitten/components';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <ApplicationProvider {...eva} theme={eva.light}>
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Main />
    </SafeAreaView>
    </ApplicationProvider>
  );
};


export default App;
