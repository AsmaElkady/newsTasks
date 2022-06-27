import React from "react";
import { TextInput, StyleSheet } from "react-native";
import { ISearch } from '../../interfaces'

const Search: React.FC<ISearch> = ({value, placeholder, onChangeText}) => {
    return(
        <TextInput style={styles.searchInput} placeholder={placeholder} value={value} onChangeText={(e)=> onChangeText(e)} />
    )
}
export default Search

const styles = StyleSheet.create({
    searchInput: {
      margin: '5%',
      borderRadius: 10
    }
})