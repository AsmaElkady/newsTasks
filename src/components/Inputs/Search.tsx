import React from "react";
import { StyleSheet, useColorScheme } from "react-native";
import { Input } from '@ui-kitten/components'
import { ISearch } from '../../interfaces'

const Search: React.FC<ISearch> = ({value, placeholder, onChangeText}) => {
    const mode = useColorScheme()

    return(
        <Input
          status='basic'
          style={[styles.searchInput, {color : 'black'}]} 
          placeholder={placeholder} 
          value={value} 
          onChangeText={(e)=> onChangeText(e)}
          placeholderTextColor={mode == "dark" ? '#C5CEE0' : '#091C7A'}
        />
    )
}

export default Search

const styles = StyleSheet.create({
    searchInput: {
      margin: '5%',
      borderRadius: 10,
    }
})