import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as RNLocalize from 'react-native-localize';
import AsyncStorage from '@react-native-async-storage/async-storage';
import en from './en/en.json';
import ar from './ar/ar.json';


const LANGUAGES = {
  en,
  ar
};
const LANG_CODES = Object.keys(LANGUAGES);
const LANGUAGE_DETECTOR = {
  type: 'languageDetector',
  async: true,
  detect: callback => {
    AsyncStorage.getItem('@language', (err, language) => {
      // if error fetching stored data or no language was stored
      // display errors when in DEV mode as console statements
      if (err || !language) {
        if (err) {
          console.log('Error fetching Languages from asyncstorage ', err);
        } else {
          console.log('No language is set, choosing English as fallback');
        }
        const findBestAvailableLanguage = RNLocalize.findBestAvailableLanguage(LANG_CODES);
        callback(findBestAvailableLanguage.languageTag || 'en');
        return;
      }
      callback(language);
    });
  },
  init: () => { },
  cacheUserLanguage: language => {
    AsyncStorage.setItem('@language', language);
  }
}

i18n.use(LANGUAGE_DETECTOR)
.use(initReactI18next)
.init({
  compatibilityJSON: 'v3',
  resources: {
    en: en,
    ar: ar,
  },
  interpolation: {
    escapeValue: false // react already safes from xss
  }

});

export default i18n;