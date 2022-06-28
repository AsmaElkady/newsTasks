import { Dimensions } from 'react-native';

const AppConfig = {
    windowWidth: Dimensions.get('window').width,
    windowHeight: Dimensions.get('window').height,
    APIKey: '6172c905911f4f77af1edb2f0df4d25c',
    ArabicAPI: 'https://newsapi.org/v2/top-headlines?country=eg&apiKey=',
    EnglishAPI: 'https://newsapi.org/v2/top-headlines?country=us&apiKey='
}

export default AppConfig