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
  Appearance
} from 'react-native';
import MainNavigation from './src/navigation/index';
import * as eva from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { I18nextProvider } from 'react-i18next';
import i18n from './src/constants/translations';
import { darkTheme } from './theme/dark-theme';
import { lightTheme } from './theme/light-theme';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  Appearance.addChangeListener((scheme)=> console.log(scheme))


  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <SafeAreaView style={{ flex: 1 }} >
        <ApplicationProvider {...eva} theme={isDarkMode ? darkTheme : lightTheme}>
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
