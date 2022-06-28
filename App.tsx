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
import MainNavigation from './src/navigation/index';
import * as eva from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { I18nextProvider } from 'react-i18next';
import i18n from './src/constants/translations';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <SafeAreaView style={{ flex: 1 }} >
        <ApplicationProvider {...eva} theme={eva.light}>
          <I18nextProvider i18n={i18n}>
            <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
            <MainNavigation />
          </I18nextProvider>
        </ApplicationProvider>
      </SafeAreaView>
    </>
  );
};


export default App;
