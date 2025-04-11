import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';
import { getImages, uploadImage, deleteImage } from '../../api/image';


const Admin = () => {
    const { user, logout } = useAuth();
    const [image, setImage] = useState(null);
    const [imageList, setImageList] = useState([]);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');


    // Fetch danh sách ảnh từ server
    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await getImages();
                setImageList(response.data);
            } catch (error) {
                console.error('Lỗi khi lấy danh sách ảnh:', error);
                setError('Không thể tải danh sách ảnh.');
            }
        };
        fetchImages();
    }, []);

    // Hàm xử lý thay đổi file ảnh
    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
    };

    // Hàm tải ảnh lên
    const handleUpload = async () => {
        if (!image) {
            setError('Vui lòng chọn một ảnh để tải lên.');
            return;
        }
    
        const formData = new FormData();
        formData.append('image', image);
    
        try {
            const response = await axios.post('http://localhost:5000/api/images', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
    
            if (response.data.success) {
                setSuccessMessage('Tải ảnh lên thành công!');
                // Thêm ảnh với ID trả về từ backend
                setImageList((prevList) => [
                    ...prevList,
                    { id: response.data.id, url: response.data.url }, // Sử dụng ID từ backend
                ]);
                setImage(null); // Reset file input
            } else {
                setError('Lỗi khi tải ảnh lên!');
            }
        } catch (error) {
            console.error('Lỗi khi tải ảnh lên:', error);
            setError('Có lỗi xảy ra khi tải ảnh lên.');
        }
    };
    
    // Hàm xóa ảnh
    const handleDelete = async (id, url) => {
        try {
            const response = await axios.delete(`http://localhost:5000/api/images/${id}`);
    
            if (response.data.success) {
                setImageList((prevList) => prevList.filter((img) => img.id !== id));
                setSuccessMessage('Xóa ảnh thành công!');
            } else {
                setError('Lỗi khi xóa ảnh!');
            }
        } catch (error) {
            console.error('Lỗi khi xóa ảnh:', error);
            setError('Có lỗi xảy ra khi xóa ảnh.');
        }
    };


    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col">
                    <h2>Chào {user?.username}</h2>
                    <button className="btn btn-danger" onClick={logout}>Đăng xuất</button>
                </div>
            </div>

            {/* Thông báo lỗi hoặc thành công */}
            {error && <div className="alert alert-danger mt-3">{error}</div>}
            {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}

            <div className="row my-4">
                <div className="col-md-6">
                    <h3>Thêm ảnh</h3>
                    <div className="mb-3">
                        <label htmlFor="formFile" className="form-label">Chọn ảnh để tải lên</label>
                        <input className="form-control" 
                                type="file" id="formFile" 
                                accept="image/png, image/jpeg"
                                onChange={handleFileChange} 
                        />
                    </div>
                    <button className="btn btn-primary" onClick={handleUpload}>Tải ảnh lên</button>
                </div>
            </div>

            <div className="row">
                <div className="col">
                    <h3>Danh sách ảnh đã tải lên</h3>
                    <div className="list-group">
                        {imageList.map((image) => (
                            <div className="list-group-item" key={image.id}>
                                <div className="row">
                                    <div className="col-md-2">
                                        <img src={`http://localhost:5000${image.url}`} alt="Ảnh" className="img-thumbnail" />
                                    </div>
                                    <div className="col-md-8">
                                        <p>{image.url}</p>
                                    </div>
                                    <div className="col-md-2">
                                        <button className="btn btn-danger" onClick={() => handleDelete(image.id, image.url)}>Xóa</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Admin;
