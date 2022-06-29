import React, { useEffect } from "react";
import { View, ScrollView, useColorScheme, StyleSheet, Appearance } from 'react-native';
import { Text, Avatar } from '@ui-kitten/components';
import AppConfig from '../constants/AppConfig';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from "@react-navigation/stack";
import { NewsStackParamList } from '../navigation';
import { INews } from '../interfaces';
import { useTranslation } from "react-i18next";
import moment from 'moment';

type newDetailsRouteType = RouteProp<NewsStackParamList, 'NewsDetails'>

const NewsDetails: React.FC = () => {
    const { t, i18n } = useTranslation();
    const navigation = useNavigation<StackNavigationProp<NewsStackParamList, "NewsDetails">>();
    const route = useRoute<newDetailsRouteType>()
    const details: INews = route.params.details
    const mode = Appearance.getColorScheme()
    const scheme = useColorScheme()
    const selectedLang = i18n.language

    useEffect(() => {
        navigation.setOptions({
            title: t("NewsDetails"),
            headerBackTitleVisible: false
        });
    }, [navigation]);

    return (
        <ScrollView style={styles.mainContainer}>
            <Avatar source={{ uri: details.urlToImage }} style={styles.imageStyle} />
            <View style={[styles.infoStyle, { backgroundColor: mode == 'dark' ? 'black' : '#F2F2F2' }]}>
                <Text category='h4' style={styles.titleStyle}>{details.title}</Text>
                <View style={styles.metadataStyle}>
                    <Text category='c1'>{t('Author') + details.author}</Text>
                    <Text category='c1'>{t('Source') + details.source.name}</Text>
                    <Text category='c1'>{moment(details.publishedAt).fromNow()}</Text>
                </View>
                <Text category='s1' style={styles.contentStyle}>{selectedLang == 'ar' ? details.description : details.content}</Text>
            </View>
        </ScrollView>
    )
}

export default NewsDetails

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        // backgroundColor: 'white',
    },
    imageStyle: {
        width: AppConfig.windowWidth,
        height: AppConfig.windowHeight * 0.35,
        borderRadius: 0,
        resizeMode: 'cover'
    },
    infoStyle: {
        marginTop: -AppConfig.windowHeight * 0.03,
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
        flex: 1,
        padding: '5%',
        elevation: 20,
        height: '100%',
        alignItems: 'flex-start'
    },
    titleStyle: {
        flex: 1,
        textAlign: 'center'
    },
    metadataStyle: {
        flex: 1,
        paddingVertical: '5%',
        alignItems: 'flex-start'
    },
    contentStyle: {
        lineHeight: 24,
        textAlign: 'center'
    }
})