import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Main from '../screens/Main';
import NewsDetails from '../screens/NewsDetails';
import { INews } from '../interfaces'

export type NewsStackParamList = {
    Main: undefined,
    NewsDetails: {details: INews}
}

const Stack = createNativeStackNavigator<NewsStackParamList>();

const MainNavigation = () => {
    return (

        <NavigationContainer>
            <Stack.Navigator
                initialRouteName='Main'
                screenOptions={{
                    gestureEnabled: true,

                }}
            >
                <Stack.Screen name="Main" component={Main} />
                <Stack.Screen name="NewsDetails" component={NewsDetails} />
            </Stack.Navigator>
        </NavigationContainer>

    )
}

export default MainNavigation