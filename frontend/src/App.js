import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './routes/PrivateRoute';
import Home from './pages/Home/Home';
import Admin from './pages/Admin/Admin';
import Login from './pages/Login/Login';
import MediaPage from './pages/MediaPage/MediaPage';
import Navbar from './components/Navbar';
import './App.css';


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/media" element={<MediaPage />} />
          {/* Bảo vệ route */}
          <Route path="/admin" element={
            <PrivateRoute>
              <Admin />
            </PrivateRoute>
          } />
        </Routes>
        <Navbar />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
