// import React, { useEffect, useState } from 'react';
// import { getImages } from '../api/image';

// const MediaPage = () => {
//     const [images, setImages] = useState([]);

//     useEffect(() => {
//         getImages()
//             .then(res => setImages(res.data))
//             .catch(err => console.error('Lỗi tải ảnh:', err));
//     }, []);

//     return (
//         <div className="container py-5">
//             <h2 className="text-center mb-4">Thư viện ảnh</h2>
//             <div className="row g-4">
//                 {images.map((img) => (
//                     <div className="col-6 col-md-3" key={img.id}>
//                         <div className="card">
//                             <img src={img.url} className="card-img-top" alt="img" />
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default MediaPage;
export default function MediaPage() {
    return (
        <div>
            <h1>MediaPage</h1>
        </div>
    )
}