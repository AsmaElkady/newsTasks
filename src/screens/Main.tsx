import React, { useState, useEffect } from "react";
import { View, FlatList, ListRenderItem } from 'react-native';
import NewsHeading from '../components/News/NewsHeading';
import axios, { AxiosResponse } from 'axios';

interface News {
    source: Source,
    title: string,
    description: string,
    url: string,
    urlToImage: string,
    publishedAt: string,
    content: string
}

export interface Source {
    id: any,
    name: string
}

const Main: React.FC = () => {
    const [news, setNews] = useState<News[]>([])
    const [page, setPage] = useState<number>(1)
    const [count, setCount] = useState<number>(0)
    const [totalItems, setTotalItems] = useState<number>(0)
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        if (totalItems >= count) {
            getData()
        }
    }, [page])

    const getData: () => void = () => {
        setLoading(true)
        axios.get<News[]>('https://newsapi.org/v2/top-headlines?country=us&apiKey=6172c905911f4f77af1edb2f0df4d25c&pageSize=10&page=' + page)
            .then(async (response: AxiosResponse) => {
                setLoading(false)
                if (response.status == 200) {
                    news.length === 0 ? await setNews(response.data.articles) : await news.push(...response.data.articles)
                    await setTotalItems(response.data.totalResults)
                    await setCount(news.length)
                }
            })
    }

    const renderItem: ListRenderItem<News> = ({ item, index }) => {
        return (
            <NewsHeading key={index} title={item.title} img={item.urlToImage} onPress={() => console.log(item)} />
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