import axios from 'axios';

const API = 'http://localhost:5000/api/images';

export const getImages = () => axios.get(API);
export const uploadImage = (formData) => axios.post(API, formData);
export const deleteImage = (id) => axios.delete(`${API}/${id}`);