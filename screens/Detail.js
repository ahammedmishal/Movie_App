import React , {useState,useEffect} from 'react'
import StarRating from 'react-native-star-rating';
import dateformat from 'dateformat'
import {getMovie} from '../services/services'
import {ScrollView,View,Modal,Text,Image,StyleSheet,Dimensions,ActivityIndicator, Pressable} from 'react-native'
import PlayButton from '../Components/PlayButton';


import Video from '../Components/Video';


const height = Dimensions.get('screen').height;
const placeholderImage = require('../assets/images/placeholder.png')

const Detail = ({route,navigation}) => {

    const movieId = route.params.movieId;

    const [movieDetail,setMovieDetail] = useState();
    const [loaded,setLoaded] = useState(false);
    const [modalVisible,setModalVisible] =useState(false);


    useEffect(() => {
        getMovie(movieId).then(movieData=>{
            setMovieDetail(movieData)
            setLoaded(true)
        });
    },[movieId]);

    const videoShown = () =>{
        setModalVisible(!modalVisible);
    }

    return (
        <React.Fragment>
           {loaded && (
            <View>
           <ScrollView >
               <Image
            resizeMode="cover" 
            style={styles.image}
            source={

                
                movieDetail.poster_path ? {uri:'https://image.tmdb.org/t/p/w500' + movieDetail.poster_path} : placeholderImage 
            
            }/>

            <View style={styles.container}> 

                <View style={styles.PlayButton}>
                    <PlayButton handlePress={videoShown} />
                </View>

                <Text style={styles.movieTitle}>{movieDetail.title}</Text>

                {movieDetail.genres && (
                <View style={styles.genresContainer}>
                    {movieDetail.genres.map(genre =>{
                        return <Text style={styles.genre} key={genre.id}>{genre.name}</Text>
                    })} 
                </View>
                )}
                <StarRating starSize={30} fullStarColor={'gold'} disabled={true} maxStars={5} rating={movieDetail.vote_average/2}/>
                <Text style={styles.overview} > {movieDetail.overview}</Text>
                <Text style={styles.release} > {"release date: "+dateformat(movieDetail.release_date,'mmmm dS, yyyy')}</Text>
            </View>
            </ScrollView>

            <Modal 
             supportedOrientations={['portrait','landscape']}
             animationType="slide" visible={modalVisible}>

                <View style={styles.backgroundVideo} >
                
                   <Video onClose={videoShown}/>

                </View>

            </Modal>

            </View>

            )}
            {!loaded && <ActivityIndicator size="large" />}
        </React.Fragment>
    );
}

const styles =StyleSheet.create({

    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    backgroundVideo:{
        flex:1,
        alignContent:'center',
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        height:'100%',
        width: '100%',
        right: 0,
        backgroundColor:'black',
    },
    genresContainer: {
        flexDirection:'row',
        alignItems:'center',
        marginTop:10,
        marginBottom:10,
    },
    genre:{
        marginRight:10,
        fontWeight:'bold',
       
    },
    image:{
        height:height/2,
    },
    movieTitle : {
        fontSize:24,
        fontWeight:'bold',
        marginTop:25,
        padding:4,
        
    },
    overview:{
        padding:15,
    },
    release:{
        fontWeight:'bold',
        
    },
    PlayButton:{
        position:'absolute',
        top:-25,
        right:20,
    },

})



export default Detail;