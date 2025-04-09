import { useRef, useEffect } from 'react';
import { Birthday } from './canvas/Birthday';
import { timestamp } from './canvas/helpers';

const BirthdayText = ()=>{
  return (
    <div id='BirthdayText'>
            <div className="text text1">
            <span className="letter ">H</span>
            <span className="letter ">A</span>
            <span className="letter ">P</span>
            <span className="letter ">P</span>
            <span className="letter ">Y</span>
            <span className="letter "></span>
            <span className="letter ">B</span>
            <span className="letter ">I</span>
            <span className="letter ">R</span>
            <span className="letter ">T</span>
            <span className="letter ">H</span>
            <span className="letter ">D</span>
            <span className="letter ">A</span>
            <span className="letter ">Y</span>
        </div>
        <div className="text text2">
            <span className="letter ">T</span>
            <span className="letter ">H</span>
            <span className="letter ">U</span>
            <span className="letter "></span>
            <span className="letter ">H</span>
            <span className="letter ">U</span>
            <span className="letter ">Y</span>
            <span className="letter ">E</span>
            <span className="letter ">N</span>
            <span> <img id="bubu-play" src="assets/shared/img/bubu-play.gif" alt='bubu' />
            </span>
        </div>
    </div>
  )
}

const BirthdayCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const birthday = new Birthday(canvas, ctx);
    let then = timestamp();

    const loop = () => {
      requestAnimationFrame(loop);
      const now = timestamp();
      const delta = (now - then) / 1000;
      then = now;
      birthday.update(delta);
    };

    loop();

    window.addEventListener('resize', birthday.resize.bind(birthday));
    document.addEventListener('click', birthday.onClick.bind(birthday));
    document.addEventListener('touchstart', birthday.onClick.bind(birthday));

    return () => {
      window.removeEventListener('resize', birthday.resize.bind(birthday));
      document.removeEventListener('click', birthday.onClick.bind(birthday));
      document.removeEventListener('touchstart', birthday.onClick.bind(birthday));
    };
  }, []);

  return <canvas ref={canvasRef} id="BirthdayCanvas" />;
};

const Home = ()=>{
  return (
  <>
    <BirthdayCanvas />
    <BirthdayText />
  </>

  )
}
export default Home;
