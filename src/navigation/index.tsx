import React, { Suspense } from 'react';
import { Appearance } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import NewsDetails from '../screens/NewsDetails';
import { INews } from '../interfaces';
import TabNavigator from './Tabs';
//const TabNavigator = React.lazy(() => import('./Tabs'));

export type NewsStackParamList = {
    TabNavigator: undefined,
    Main: undefined,
    //NewsDetails: {details: INews},
    NewsDetails: {
        title: string,
        author: string,
        description: string,
        url: string,
        urlToImage: string,
        publishedAt: string,
        content: string,
        source: string
    }
    Settings: undefined
}

const Stack = createNativeStackNavigator<NewsStackParamList>();

const MainNavigation = () => {
    const mode = Appearance.getColorScheme();
    const config = {
        screens: {
            NewsDetails: {
                path: "NewsDetails/:title/:author/:description/:url/:urlToImage/:publishedAt/:content/:source",
                parse: {
                    title: (title: string) => title,
                    author: (author: string) => author,
                    description: (description: string) => description,
                    url: (url: string) => url,
                    urlToImage: (urlToImage: string) => urlToImage,
                    publishedAt: (publishedAt: string) => publishedAt,
                    content: (content: string) => content,
                    source: (source: string)=> source
                },

            }
        }
    }

    return (
        <Suspense>
            <NavigationContainer
                theme={mode == "dark" ? DarkTheme : DefaultTheme}
                linking={{
                    prefixes: ["newstasks://"],
                    config
                }}
            >
                <Stack.Navigator
                    initialRouteName='TabNavigator'
                    screenOptions={{
                        gestureEnabled: true,
                    }}
                >
                    <Stack.Screen name='TabNavigator' component={TabNavigator} options={{ headerShown: false, }} />
                    <Stack.Screen name="NewsDetails" component={NewsDetails} options={{ headerShown: true }} />
                </Stack.Navigator>
            </NavigationContainer>
        </Suspense>
    )
}

export default MainNavigation