import { useState } from 'react';

const MusicPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audio = document.getElementById('bg-music');

    const toggleMusic = () => {
        if (!audio) return;
        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <div className="music-toggle">
            <audio id="bg-music" src="/assets/shared/music/baihatcmsn.mp3" preload="auto" loop></audio>

            <button onClick={toggleMusic}>
                {isPlaying ?
                    (<img className='nav-icon' id="pause-icon" src="assets/shared/img/volume-high-solid.svg" ></img>) :
                    (<img className='nav-icon' id="play-icon" src="assets/shared/img/volume-xmark-solid.svg"></img>)
                }
            </button>


        </div>
    );
};

export default MusicPlayer;
