import React from "react";
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Text, Avatar } from '@ui-kitten/components';
import AppConfig from '../../constants/AppConfig';
import { useTranslation } from "react-i18next";

interface Props {
    title: string;
    img: string;
    onPress: ()=> void
}

const NewsHeading: React.FC<Props> = ({ title, img, onPress }) => {
    const {i18n} = useTranslation()
    const selectedLang = i18n.language

    return (
        <TouchableOpacity style={[styles.mainContainer]} onPress={onPress}>
            <Avatar source={{ uri: img }} size="large" style={styles.imageStyle} />
            <Text category='h6' status="info" style={[styles.titleStyle, {textAlign : selectedLang == 'ar' ? 'center' : 'left'}]}>{title}</Text>
        </TouchableOpacity>
    )
}

export default NewsHeading

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        margin: 10,
        borderWidth: 2,
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'center',
    },
    imageStyle: {
        width: AppConfig.windowWidth * 0.2,
        height: AppConfig.windowWidth * 0.2,
        borderRadius: 0,
        margin: 10
    },
    titleStyle: {
        flex: 1,
        margin: 10,
    }
})