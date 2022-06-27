import React, { useState, useEffect } from "react";
import { View, FlatList, ListRenderItem } from 'react-native';
import NewsHeading from '../components/News/NewsHeading';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp, } from "@react-navigation/stack";
import { NewsStackParamList } from '../navigation';
import { INews } from '../interfaces';
import Search from '../components/Inputs/Search'

const Main: React.FC = () => {
    const [news, setNews] = useState<INews[]>([])
    const [searchNews, setSearchNews] = useState<INews[]>([])
    const [page, setPage] = useState<number>(1)
    const [count, setCount] = useState<number>(0)
    const [totalItems, setTotalItems] = useState<number>(0)
    const [loading, setLoading] = useState<boolean>(true)
    const [search, setSearch] = useState<boolean>(false)
    const [searchValue, setSearchValue] = useState<string>('')
    const [refresh, setRefresh] = useState<boolean>(false)
    const navigation = useNavigation<StackNavigationProp<NewsStackParamList, "Main">>();

    useEffect(() => {
        if (!search && totalItems >= count) {
            getData()
        }
    }, [page, refresh])

    useEffect(() => {
        if (searchValue.length > 0 && search) {
            setNews([])
            getSearchData()
        } else {
            getData()
        }
    }, [search, searchValue])

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
            }).catch((error: AxiosError) => {
                console.log('error', error)
            })
    }

    const getSearchData: () => void = () => {
        setLoading(true)
        axios.get<INews[]>('https://newsapi.org/v2/top-headlines?country=us&apiKey=6172c905911f4f77af1edb2f0df4d25c&q=' + searchValue)
            .then(async (response: AxiosResponse) => {
                setLoading(false)
                if (response.status == 200) {
                    await setSearchNews(response.data.articles)
                    await setTotalItems(0)
                    await setCount(0)
                }
            }).catch((error: AxiosError) => {
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
            <Search value={searchValue} placeholder="Search" onChangeText={(e: string) => { e == '' ? (setSearch(false), setSearchValue(e)) : (setSearch(true), setSearchValue(e), setPage(1)) }} />
            <View style={{ paddingBottom: 120 }}>
                <FlatList
                    data={search ? searchNews : news}
                    renderItem={renderItem}
                    initialNumToRender={10}
                    refreshing={loading}
                    onRefresh={()=> setRefresh(!refresh)}
                    onEndReachedThreshold={2}
                    onEndReached={async () => await setPage(page + 1)}
                />
            </View>
        </View>
    )
}

export default Main