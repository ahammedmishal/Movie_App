import React from 'react'
import {View ,Text,FlatList, StyleSheet } from 'react-native'
import Card from './Card'
import PropTypes from 'prop-types'

const propTypes = {
    title: PropTypes.string,
    content: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    
}

class List extends React.PureComponent {
    
    render() {
        const {navigation ,title,content} = this.props
        return (
            <View style={styles.list}>

            <View>
                <Text style={styles.text}>{title}</Text>
            </View>

            <View>
                <FlatList 
                horizontal={true}
                data={content}
                renderItem={({item})=> <Card navigation ={navigation } item={item}/>}>
             </FlatList>
            </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    text: {
        fontSize:20,
        fontWeight:'bold',
        color:"black",
        paddingBottom:20,
        padding:15,

    },
    list : {
        marginTop:25,
    }

})

List.propTypes = propTypes

export default List;