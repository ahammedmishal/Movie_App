import React from 'react'
import VideoPlayer  from 'react-native-video-controls';

const Video = ({onClose})=>{

    return(

        <VideoPlayer 
            onBack = {()=>onClose()}
            onEnd = {()=>onClose()}
            seekColor={'#90adb3'}
            fullscreenOrientations = "all"
            source={{uri: "https://vjs.zencdn.net/v/oceans.mp4"}}   
           
       />

    );
};


export  default Video