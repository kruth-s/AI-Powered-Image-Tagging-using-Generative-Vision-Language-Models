import React, { useContext } from "react";
import Sidebar from "./components/sidebar";
import Display from "./components/display";
import Player from "./components/player";
import { PlayerContext } from "./context/PlayerContext";

const App = () => {
  const context = useContext(PlayerContext);

  const { audioRef, track, songsData } = context;

  return (
    <div className="h-screen bg-black">
      {songsData.length !== 0 ? (
        <>
          <div className="h-[90%] flex">
            <Sidebar />
            <Display />
          </div>
          <Player />
        </>
      ) : null}

      <audio ref={audioRef} src={track?.file || null} preload="auto" />


    </div>
  );
};

export default App;
