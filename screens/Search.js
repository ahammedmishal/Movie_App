import React ,{useState} from 'react'
import { SafeAreaView ,Keyboard ,Text, StyleSheet ,TextInput ,View ,TouchableOpacity, FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import Card from '../Components/Card'
import {searchMovieTV} from '../services/services'
import Error from '../Components/Error'

const Search = ({navigation}) => {


    const [text, onChangeText] = useState('');
    const [searchResults,setSearchResults] = useState();
    const [error,setError] = useState(false);

    const onSubmit = (query) =>{
        Promise.all( [searchMovieTV(query,'movie'),searchMovieTV(query,'tv') ])
            .then(([movies,tv])=>{
            const data = [...movies,...tv];
                setSearchResults(data);
            })
            .catch(()=>{
                setError(true);
            });
        };

    return (
        <React.Fragment>

            <SafeAreaView>
                <View style={styles.container}>
                    <View style={styles.form}>
                        <TextInput
                            style={styles.input}
                            onChangeText={onChangeText}
                            value={text}
                            color={'#4cbed8'}
                            placeholder="search movie"
                            placeholderTextColor="grey"
                           clearButtonMode='while-editing'
                            returnKeyType='search'
                        />
                     </View>
                     <TouchableOpacity onPress={()=>{
                         onSubmit(text)
                         Keyboard.dismiss()
                     }}>
                         <Icon name={'search-outline'}  size={30} color={'#4cbed8'}/>
                         
                     </TouchableOpacity>
                </View>

                <View style={styles.searchItems}>
                {/* search item result here */}
                     {searchResults && searchResults.length > 0 && (
                         <FlatList
                         numColumns={3}
                         data={searchResults}
                         renderItem={({item}) =>(
                            <Card navigation={navigation} item={item} />
                         )}
                         keyExtractor={item =>item.id}
                         />
                     )}

                  {/* when searched but no results */}
                  {searchResults && searchResults.length == 0 && (
                         <View style={[styles.empty,{paddingTop:20}]}>
                            <Text>No results matching your criteria</Text>
                            <Text>Try different keywords</Text>
                         </View>
                     )}

                  {/* when nothing is searched */}
                  {!searchResults && (
                         <View style={styles.empty}>
                            <Text>Type something to start searching</Text>
                         </View>
                     )}

                  {/* Error */}
                    {error && <Error/>}

                </View>

            </SafeAreaView>

        </React.Fragment>
    );
}

const styles = StyleSheet.create({
    container:{
        padding:10,
        flexDirection:'row',
        alignItems:'center',
    },
    input: {
        height: 40,
        padding:8,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius:15,
        borderWidth:0.5,
    },
    form:{
        flexBasis:'auto',
        flexGrow:1,
        paddingRight:8,
    },
    searchItems:{

    },
    empty:{
        alignItems:'center',
    },

  });

export default Search;