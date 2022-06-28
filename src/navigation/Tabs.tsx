import React from 'react';
import { Text } from '@ui-kitten/components';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Main from '../screens/Main';
import Settings from '../screens/Settings';
import Icons from 'react-native-vector-icons/Ionicons'
import { useTranslation } from "react-i18next";

const Tab = createBottomTabNavigator();
const TabNavigator = () => {
    const { t } = useTranslation()
    return (
        <Tab.Navigator
            initialRouteName="exploreStack"
            screenOptions={{
                headerShown: true,
            }}
        >
            <Tab.Screen
                name="Main"
                component={Main}
                options={{
                    tabBarLabel: ({ focused }) => (
                    <Text status={focused ? 'primary' : 'basic'}>{t('News')}</Text>
                    ),
                    tabBarIcon: ({ focused }) => (
                    <Text status={focused ? 'primary' : 'basic'}>
                        <Icons name="home" size={20} />
                        </Text>
                    )
                }}
            />
            <Tab.Screen
                name="Settings"
                component={Settings}
                options={{
                    tabBarLabel: ({ focused }) => (
                        <Text status={focused ? 'primary' : 'basic'}>{t('Settings')}</Text>
                    ),
                    tabBarIcon: ({ focused }) => (
                        <Text status={focused ? 'primary' : 'basic'}>
                            <Icons name="settings" size={20} />
                        </Text>
                    ),
                }}
            />
        </Tab.Navigator>
    )
}
export default TabNavigator