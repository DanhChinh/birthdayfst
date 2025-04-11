import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';



const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await login(username, password);
        console.log(success)
        if (success) {
            navigate('/admin');
        } 
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Đăng nhập</h2>
            <input type="text" placeholder="Tên đăng nhập" onChange={e => setUsername(e.target.value)} />
            <input type="password" placeholder="Mật khẩu" onChange={e => setPassword(e.target.value)} />
            <button type="submit">Đăng nhập</button>
        </form>
    );
};

export default Login;
