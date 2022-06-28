import React, { Suspense } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import NewsDetails from '../screens/NewsDetails';
import { INews } from '../interfaces';
import TabNavigator from './Tabs';
//const TabNavigator = React.lazy(() => import('./Tabs'));

export type NewsStackParamList = {
    TabNavigator: undefined,
    Main: undefined,
    NewsDetails: {details: INews},
    Settings: undefined
}

const Stack = createNativeStackNavigator<NewsStackParamList>();

const MainNavigation = () => {
    return (
        <Suspense>
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName='TabNavigator'
                screenOptions={{
                    gestureEnabled: true,
                }}
            >
                <Stack.Screen name='TabNavigator' component={TabNavigator} options={{headerShown: false,}}/>
                <Stack.Screen name="NewsDetails" component={NewsDetails} options={{headerShown: true}}/>
            </Stack.Navigator>
        </NavigationContainer>
        </Suspense>
    )
}

export default MainNavigation