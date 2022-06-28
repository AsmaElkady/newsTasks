import React, { useEffect } from "react";
import { View, StyleSheet, Pressable, I18nManager } from 'react-native';
import { Text } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from "@react-navigation/stack";
import { NewsStackParamList } from '../navigation';
import { useTranslation } from "react-i18next";
import '../constants/translations/index'
import RNRestart from "react-native-restart";

const Settings: React.FC = () => {
    const { t, i18n } = useTranslation();
    const navigation = useNavigation<StackNavigationProp<NewsStackParamList, "Settings">>();
    const selected = i18n.language;
    const LANGUAGES = [
        { code: 'en', label: 'English' },
        { code: 'ar', label: 'العربية' }
    ];

    useEffect(() => {
        navigation.setOptions({
            headerShown: false
        });
    }, [navigation]);

    const changeLang = async (newLang: string) => {
        await i18n.changeLanguage(newLang)
        await I18nManager.forceRTL(newLang == 'ar' ? true : false)
        RNRestart.Restart()
    }

    return (
        <View style={styles.settingsView}>
            <Text category="h4" style={styles.titleStyle}>{t('Settings')}</Text>
            <Text category="h5" style={styles.selectTitleStyle}>{t('Language') + ' :'}</Text>
            {LANGUAGES.map((lang) => (
                <Pressable 
                  key={lang.code} 
                  style={styles.langStyle} 
                  onPress={() => changeLang(lang.code)}
                  disabled={selected == lang.code}
                >
                    <Text category="s1" status={selected == lang.code ? 'primary' : 'basic'}> {lang.label} </Text>
                </Pressable>
            ))
            }
        </View>
    )
}

export default Settings

const styles = StyleSheet.create({
    settingsView: {
        flex: 1,
        padding: '10%',
        alignItems: 'flex-start',
    },
    titleStyle: {
        textAlign: 'center',
        marginBottom: '10%',
        alignSelf: 'center'
    },
    selectTitleStyle: {
        marginBottom: '5%',
    },
    langStyle: {
        marginVertical: '2%',
        padding: 0,
        marginHorizontal: 0
    },
})