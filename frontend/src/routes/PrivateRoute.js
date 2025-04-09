import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext.js';

const PrivateRoute = ({ children }) => {
    const { user } = useContext(AuthContext);
    const location = useLocation();

    if (!user) {
        // Nếu chưa đăng nhập → chuyển hướng về trang login, nhớ vị trí cũ
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children; // Đã đăng nhập → hiển thị nội dung bên trong
};

export default PrivateRoute;
