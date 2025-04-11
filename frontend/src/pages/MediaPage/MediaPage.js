import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';

const MediaPage = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const [imageList, setImageList] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    // Lấy ảnh từ server
    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/images');
                setImageList(response.data);
            } catch (error) {
                console.error('Lỗi khi lấy ảnh:', error);
            }
        };

        fetchImages();
    }, []);

    const handleImageClick = (image) => {
        setSelectedImage(image);
        setShowModal(true);
    };

    const handleCloseModal = () => setShowModal(false);

    const handleAddImage = () => {
        if (user) {
            navigate('/admin');
        } else {
            navigate('/login');
        }
    };

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Thư viện ảnh</h2>
                <button className="btn btn-primary" onClick={handleAddImage}>+ Thêm ảnh</button>
            </div>

            <div className="row">
                {imageList.map((image) => (
                    <div className="col-sm-6 col-md-4 col-lg-3 mb-4" key={image.id}>
                        <div className="card h-100 shadow-sm">
                            <img
                                src={`http://localhost:5000${image.url}`}
                                className="card-img-top"
                                style={{ cursor: 'pointer' }}
                                onClick={() => handleImageClick(image)}
                                alt="Ảnh"
                            />
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal xem ảnh lớn */}
            {showModal && (
                <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Ảnh chi tiết</h5>
                                <button type="button" className="btn-close" onClick={handleCloseModal}></button>
                            </div>
                            <div className="modal-body text-center">
                                <img
                                    src={`http://localhost:5000${selectedImage.url}`}
                                    alt="Ảnh chi tiết"
                                    className="img-fluid"
                                />
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Đóng</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MediaPage;
