// import { useAuth } from '../context/AuthContext';

const Admin = () => {
    // const { user, logout } = useAuth();
    const logout = () => console.log("clicked");


    return (
        <div>
            {/* <h2>Chào {user?.username}</h2> */}
            <button onClick={logout}>Đăng xuất</button>
        </div>
    );
};

export default Admin;
