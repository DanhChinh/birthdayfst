import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = async (username, password) => {
        try {
            const response = await axios.post('http://localhost:5000/api/login', {
                username,
                password
            });

            if (response.data.success) {
                setUser(response.data.user); // Lưu thông tin người dùng
                return true;
            } else {
                return false;
            }
        } catch (err) {
            console.error('Lỗi đăng nhập:', err);
            return false;
        }
    };

    const logout = () => setUser(null);

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
