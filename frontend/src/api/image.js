import axios from 'axios';

// API URL cho backend
const API = 'http://localhost:5000/api/images';

// Lấy danh sách ảnh từ server
export const getImages = () => {
    return axios.get(API);
};

// Upload ảnh lên server
export const uploadImage = (formData) => {
    return axios.post(API, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};

// Xóa ảnh khỏi server
export const deleteImage = (id) => {
    return axios.delete(`${API}/${id}`);
};
