import { createContext, useRef, useState, useEffect } from "react";
import axios from 'axios'

export  const PlayerContext = createContext();

export const PlayerContextProvider = (props) => {
  const audioRef = useRef();
  const seekBg = useRef();
  const seekBar = useRef();

  const url = "https://harbour-6l47.onrender.com";

  const [songsData, setSongsData] = useState([]);
  const [albumsData, setAlbumsData] = useState([]);
  const [track, setTrack] = useState(null);
  const [playStatus, setPlayStatus] = useState(false);
  const [time, setTime] = useState({

    currentTime: {
      second: 0,
      minute: 0,
    },
    totalTime: {
      second: 0,
      minute: 0,
    },
  })

  const play = () => {
    audioRef.current.play();
    setPlayStatus(true);
  }

  const pause = () => {
    audioRef.current.pause();
    setPlayStatus(false);
  }

  const playwithId = async (id) => {

    await songsData.map((item)=>{
      if (id === item._id) {
        setTrack(item);
        
      }
    })
    await audioRef.current.play();
    setPlayStatus(true);
  }

  const previous = async () => {

    songsData.map(async(item,index)=>{

      if (track._id === item._id && index > 0) {

            await setTrack(songsData[index-1]);
            await audioRef.current.play();
            setPlayStatus(true);
      }
    })
  }

    const next = async () => {

    songsData.map(async(item,index)=>{

      if (track._id === item._id && index < songsData.length) {

            await setTrack(songsData[index+1]);
            await audioRef.current.play();
            setPlayStatus(true);
      }
    })
  }


  const seekSong = async (e) => {
    audioRef.current.currentTime = (e.nativeEvent.offsetX / seekBg.current.offsetWidth) * audioRef.current.duration;
    
    
  }

  // const getSongsData = async () => {
    
  //   try {
  //     // const response = await fetch('https://api.spotify.com/v1/me/tracks?limit=50',
  //     const response = await axios.get(`${url}/api/song/list`)
  //     setSongsData(response.data.songs);
  //     setTrack(response.data.songs[0]);

  //   } catch (error) {
  //     console.error("Error fetching albums:", error);
  //   }
  // }
  const getSongsData = async () => {
  try {
    const response = await axios.get(`${url}/api/song/list`);
    setSongsData(response.data.songs);

    // set track only if songs available
    if (response.data.songs.length > 0) {
      setTrack(response.data.songs[0]);
    }

  } catch (error) {
    console.error("Error fetching songs:", error);
  }
};


    const getAlbumsData =async () => {
      
      try {
        const response = await axios.get(`${url}/api/album/list`);
        setAlbumsData(response.data.albums);
      } catch (error) {
        console.error("Error fetching albums:", error);
      }

    }

  useEffect(() => {
  const timeout = setTimeout(() => {
    if (audioRef.current) {
      audioRef.current.ontimeupdate = () => {
        seekBar.current.style.width = (Math.floor(audioRef.current.currentTime) / Math.floor(audioRef.current.duration)) * 100 + "%";        
        setTime({
          currentTime: {
            second: Math.floor(audioRef.current.currentTime % 60),
            minute: Math.floor(audioRef.current.currentTime / 60),
          },
          totalTime: {
            second: Math.floor(audioRef.current.duration % 60),
            minute: Math.floor(audioRef.current.duration / 60),
          },
        });
      };
    }
  }, 1000);

  return () => clearTimeout(timeout); // cleanup
}, [audioRef])

useEffect(()=>{

  getSongsData();
  getAlbumsData();

},[]);



  const contextValue = {
    audioRef,
    seekBar,
    seekBg,
    track,setTrack,
    playStatus, setPlayStatus,
    time,setTime,
    play,pause,
    playwithId,
    previous,next,
    seekSong,
    songsData,albumsData
  };

  return (
    <PlayerContext.Provider value={contextValue}>
      {props.children}
    </PlayerContext.Provider>
  );
};
