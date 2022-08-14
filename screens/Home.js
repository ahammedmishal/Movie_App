import React from 'react';
import {useState, useEffect} from 'react';
import {Text,View,StyleSheet,Dimensions,ScrollView,StatusBar} from 'react-native';
import {getPopularMovies,getActionMovies,getPopularTv,getFamilyMovies} from '../services/services';
import {SliderBox} from 'react-native-image-slider-box';
import List from '../Components/List'


const dimensions = Dimensions.get('screen');
const STATUS_BAR_HEIGHT = StatusBar.currentHeight || 24


const Home = ({navigation }) => {  
 
  const [movieImages, setMovieImages] = useState();
  const [popularMovies , setPopularMovies] =useState();
  const [popularTv , setPopularTv] =useState();
  const [familyMovies,setFamilyMovies] =useState()
  const [actionMovies,setActionMovies] =useState()
  const [error, setError] = useState(false);


  const getData = () =>{
    
      return Promise.all([

        getPopularMovies(),
        getPopularTv(),
        getFamilyMovies(),
        getActionMovies(),

      ])
  }

  useEffect(() => {

    getData()
    .then(
    ([
      popularMoviesData,
      popularTvData,
      familyMoviesData,
      actionMoviesData,
    ])=>{

      const moviesImagesArray = [];
      popularMoviesData.forEach(movie => {
        moviesImagesArray.push(
          'https://image.tmdb.org/t/p/w500' + movie.poster_path,
        );
      });

      setMovieImages(moviesImagesArray);
      setPopularMovies(popularMoviesData)
      setPopularTv(popularTvData)
      setFamilyMovies(familyMoviesData)
      setActionMovies(actionMoviesData)

    }).catch(err=>{

    setError(err)

    })
  
  }, []);

  return (
    
    <React.Fragment>
      <StatusBar  />
      
      <ScrollView>

    {/* movieImages */}

    {movieImages && (
      
      <View
        style={styles.sliderContainer}>
        <SliderBox images={movieImages ? movieImages : []} autoplay={true} circleLoop={true} sliderBoxHeight={dimensions.height / 1.5} dotStyle={styles.sliderStyle} ion-content overflow-scroll="true"/>
      </View>
      
    )}

    {/* popularMovies */}

    {popularMovies && (

    <View
     style={styles.Carousel}>
       
        <List navigation ={navigation } title="Popular Movies" content={popularMovies}/>
       
    </View>

    )}

    {/* popularTv */}

    {popularTv && (

    <View
     style={styles.Carousel}>
       
        <List navigation ={navigation } title="Popular TV Shows" content={popularTv}/>
       
    </View>

    )}

    {/* actionMovies */}

    {actionMovies && (

    <View
     style={styles.Carousel}>
       
        <List navigation ={navigation } title="Action Movies" content={actionMovies}/>
       
    </View>

    )}

    {/* familyMovies */}

    {familyMovies && (

    <View
     style={styles.Carousel}>
       
        <List navigation ={navigation } title="Family Movies" content={familyMovies}/>
       
    </View>

    )}

    </ScrollView>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
    sliderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    sliderStyle: {
        height : 0,
        
    },

    Carousel: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default Home;
