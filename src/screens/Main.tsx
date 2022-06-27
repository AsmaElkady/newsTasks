import React, { useState, useEffect } from "react";
import { View, FlatList, ListRenderItem } from 'react-native';
import NewsHeading from '../components/News/NewsHeading';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp, } from "@react-navigation/stack";
import { NewsStackParamList } from '../navigation';
import { INews } from '../interfaces'

const Main: React.FC = () => {
    const [news, setNews] = useState<INews[]>([])
    const [page, setPage] = useState<number>(1)
    const [count, setCount] = useState<number>(0)
    const [totalItems, setTotalItems] = useState<number>(0)
    const [loading, setLoading] = useState<boolean>(true)
    const navigation = useNavigation<StackNavigationProp<NewsStackParamList, "Main">>();

    useEffect(() => {
        if (totalItems >= count) {
            getData()
        }
    }, [page])

    const getData: () => void = () => {
        setLoading(true)
        axios.get<INews[]>('https://newsapi.org/v2/top-headlines?country=us&apiKey=6172c905911f4f77af1edb2f0df4d25c&pageSize=10&page=' + page)
            .then(async (response: AxiosResponse) => {
                console.log(response)
                setLoading(false)
                if (response.status == 200) {
                    news.length === 0 ? await setNews(response.data.articles) : await news.push(...response.data.articles)
                    await setTotalItems(response.data.totalResults)
                    await setCount(news.length)
                } 
            }).catch((error: AxiosError)=>{
                console.log('error', error)
            })
    }

    const renderItem: ListRenderItem<INews> = ({ item, index }) => {
        return (
            <NewsHeading key={index} title={item.title} img={item.urlToImage} onPress={() => navigation.navigate('NewsDetails', { details: item })} />
        )
    }

    return (
        <View>
            <FlatList
                data={news}
                renderItem={renderItem}
                initialNumToRender={10}
                refreshing={loading}
                onEndReachedThreshold={2}
                onEndReached={async () => await setPage(page + 1)}
            />
        </View>
    )
}

export default Main