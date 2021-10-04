import axios from 'axios';

//Api url & Tv

const apiUrl = 'https://api.themoviedb.org/3';
const apiKey = 'api_key=85ab958d310f3c0f780143a80d7ba688';


//Get Popular Movies 

export const getPopularMovies = async () =>{

    const resp = await axios.get(`${apiUrl}/movie/popular?${apiKey}`);
       return resp.data.results;

  }


  export const getLatestMovies = async () =>{

    const resp = await axios.get(`${apiUrl}/movie/popular?${apiKey}`);
       return resp.data.results;

  }

  
  //Get Popular Tv  
  
  export const getPopularTv = async () =>{
    
    const resp = await axios.get(`${apiUrl}/tv/popular?${apiKey}`);
    return resp.data.results;
    
  }
  
  //Get Family Movies 
  
  export const getFamilyMovies = async () =>{
  
      const resp = await axios.get(`${apiUrl}/discover/movie?${apiKey}&with_genres=10751`);
         return resp.data.results;
  
    }


  
    export const getActionMovies = async () =>{
  
      const resp = await axios.get(`${apiUrl}/discover/movie?${apiKey}&with_genres=28`);
         return resp.data.results;
  
    }


      
    export const getMovie = async id =>{
  
      const resp = await axios.get(`${apiUrl}/movie/${id}?${apiKey}`);
         return resp.data;
  
    }

//serach for movie or tv by keyword
    export const searchMovieTV = async (query,type) =>{
  
      const resp = await axios.get(`${apiUrl}/search/${type}?${apiKey}&query=${query}`);
        return resp.data.results;
  
    }



  
  