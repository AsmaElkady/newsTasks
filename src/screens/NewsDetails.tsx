import React from "react";
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Avatar } from '@ui-kitten/components';
import AppConfig from '../constants/AppConfig';
import { useRoute, RouteProp } from '@react-navigation/native';
import { NewsStackParamList } from '../navigation';
import { INews } from '../interfaces';
import moment from 'moment';

type newDetailsRouteType = RouteProp<NewsStackParamList, 'NewsDetails'>

const NewsDetails: React.FC = () => {
    const route = useRoute<newDetailsRouteType>()
    const details: INews = route.params.details

    return (
        <ScrollView style={styles.mainContainer}>
            <Avatar source={{ uri: details.urlToImage }} style={styles.imageStyle} />
            <View style={styles.infoStyle}>
                <Text category='h4' style={styles.titleStyle}>{details.title}</Text>
                <View style={styles.metadataStyle}>
                    <Text category='c1'>Author: {details.author}</Text>
                    <Text category='c1'>Source: {details.source.name}</Text>
                    <Text category='c1'>{moment(details.publishedAt).fromNow()}</Text>
                </View>
                <Text category='s1' style={styles.contentStyle}>{details.content}</Text>
            </View>
        </ScrollView>
    )
}

export default NewsDetails

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: 'white'
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
        backgroundColor: 'white',
        flex: 1,
        padding: '5%',
        elevation: 20
    },
    titleStyle: {
        flex: 1,
    },
    metadataStyle: {
        flex: 1,
        alignItems: 'flex-start',
        paddingVertical: '5%'
    },
    contentStyle: {
        lineHeight: 24
    }
})