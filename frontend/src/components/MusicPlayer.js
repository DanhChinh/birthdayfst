import { useState, useRef } from 'react';

const MusicPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null); // tạo tham chiếu đến thẻ <audio>

    const toggleMusic = () => {
        const audio = audioRef.current;
        if (!audio) {
            console.log("Không có âm thanh");
            return;
        }

        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <div className="music-toggle">
            <audio
                ref={audioRef}
                id="bg-music"
                src="/assets/shared/music/baihatcmsn.mp3"
                preload="auto"
                loop
            ></audio>

            <button onClick={toggleMusic} className='btn'>
                {isPlaying ? (
                    <img className='nav-icon' id="pause-icon" src="assets/shared/img/volume-high-solid.svg" />
                ) : (
                    <img className='nav-icon' id="play-icon" src="assets/shared/img/volume-xmark-solid.svg" />
                )}
            </button>
        </div>
    );
};

export default MusicPlayer;
