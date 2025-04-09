import { Link } from 'react-router-dom';
import MusicPlayer from './MusicPlayer';
import { useState } from 'react';
import Share from './Share';

export default function Navbar() {
    const [page, setPage] = useState("/media");
    const handleClick = () => {
        page == "/" ? setPage("/media") : setPage("/");
    }
    return (
        // <nav className="navbar navbar-expand navbar-dark bg-dark px-3">
        //     <Link to="/" className="navbar-brand">🎉 Birthday App</Link>
        //     <div className="navbar-nav">
        //         <Link to="/" className="nav-link">Trang chủ</Link>
        //         <Link to="/media" className="nav-link">Thư viện</Link>
        //         <Link to="/admin" className="nav-link">Admin</Link>
        //         <Link to="/login" className="nav-link">Đăng nhập</Link>
        //     </div>
        // </nav>

        <div className='myNav'>
            <MusicPlayer />
            <Link onClick={handleClick}
                to={page}
                className="nav-link btn"
            >
                <img className='nav-icon' id="arrows-rotate-icon" src="assets/shared/img/arrows-rotate-solid.svg" ></img>
            </Link>

            <Share />


        </div>
    );
}
