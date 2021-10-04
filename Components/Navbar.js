import React from 'react'
import {View,SafeAreaView, TouchableOpacity,Image, StyleSheet} from 'react-native'
import  Icon  from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types'


const propTypes = {
    main:PropTypes.bool,
}

const defaultProps = {
    main:false,
}
class Navbar extends React.PureComponent {

    render() {
        const {navigation,main} = this.props
        return (
            <SafeAreaView >
                { main ? (
                <View style={styles.mainNav}>
                    <Image style={styles.logo} source = {require('../assets/images/movies.png')} />
                    <TouchableOpacity
                         onPress={()=>{
                             navigation.navigate('Search');
                            }}>
                        <Icon name={'search-outline'} size={30} color={'#4cbed8'}/>
                     
                    </TouchableOpacity> 
                </View>
                ) : (  
                <View >
                   
                </View>
                )}
            </SafeAreaView>
        );
    }
}

Navbar.propTypes = propTypes;
Navbar.defaultProps = defaultProps;

const styles = StyleSheet.create({
    mainNav:{
        justifyContent:'space-between',
        flexDirection: 'row',
        alignItems:'center',
        backgroundColor:'#FAF9F6',
        paddingTop:5,
        paddingRight:10,
        paddingLeft:10,
        
    },
    logo:{
        width:40,
        height:50,
    },
})

export default Navbar;